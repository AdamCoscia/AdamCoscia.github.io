export default class HeatMap {
  constructor(utils, elem) {
    this.utils = utils;
    this.legend = d3.select("#heat-map-legend");
    this.tooltip = d3.select("#views-tooltip");
    this.controls = {
      filterShared: false,
      filterUnique: false,
      disableZoom: false,
      sortBy: "rank",
    };
    this.data = {
      groups: [],
      heatMapData: [],
      subjectsFilter: [],
      subjectsIDKey: {},
      predictionsIDKey: {},
      predictionsNameKey: {},
      predictionsClusters: {},
      predictionsExtent: [],
    };
    this.plot = {
      el: elem,
      defs: null,
      zoom: null,
      interactionLayer: null,
      heatMap: null,
      subjects: [],
      predictions: [],
      clusters: [],
      rows: [],
      columns: [],
      minYScaleBandwidth: 8,
      margin: {
        t: 8,
        r: 8,
        b: 8,
        l: 72,
      },
    };
  }

  init() {
    const self = this;

    const svg = self.plot.el;
    const margin = self.plot.margin;

    // add groups in layer order (i.e., draw element groups in this order)
    const interactionLayer = svg.append("g").attr("class", "interaction-layer");
    const heatMap = interactionLayer.append("g").attr("class", "heat-map");

    // add zoom and pan to the svg
    const filtered = (event) => {
      return !self.controls.disableZoom && self.data.subjectsFilter.length;
    };
    const delta = (event) => {
      return Math.sign(event.deltaY) * 0.05; // scroll 5% of element height - bottom boundary
    };
    const zoomed = ({ transform }) => {
      const fh = parseFloat(svg.style("height"));
      const nrows = self.plot.rows.length;
      const bw = self.plot.minYScaleBandwidth; // px
      const bb = Math.max(fh, bw * nrows + margin.b);
      const yScale = d3
        .scaleLinear()
        .domain([1, 2])
        .range([0, fh - bb]);
      d3.select(".heat-scrollable-group").attr("transform", `translate(0, ${yScale(transform.k)})`);
    };

    const zoom = d3.zoom().scaleExtent([1, 2]).filter(filtered).wheelDelta(delta).on("zoom", zoomed);
    svg.call(zoom).on("dblclick.zoom", null);

    // save groups to access later
    self.plot.defs = svg.select("defs");
    self.plot.zoom = zoom;
    self.plot.interactionLayer = interactionLayer;
    self.plot.heatMap = heatMap;
  }

  drawLegend(colorScale) {
    // See: https://observablehq.com/@d3/color-legend
    const templateString = `
    <div id="heat-legend-wrapper">
      ${colorScale
        .domain()
        .map((value) => {
          return `
          <div class="legend-clusters-item">
            <div 
              id="cluster-${value}" 
              class="legend-clusters-swatch" 
              style="background-color: ${colorScale(value)}"
            ></div>
            <div 
              id="cluster-${value}" 
              class="legend-clusters-label" 
              title="${value}"
            >${value}</div>
          </div>`;
        })
        .join("")}
    </div>`;
    const legendDiv = this.utils.createElementFromTemplate(templateString);
    this.legend.append(() => legendDiv);
  }

  resetZoom() {
    this.plot.el.call(this.plot.zoom.transform, d3.zoomIdentity);
  }

  clear() {
    this.plot.heatMap.selectAll("*").remove();
    this.legend.selectAll("*").remove();
  }

  render() {
    const SF = this.data.subjectsFilter; //      (List)   [sid1, sid2, ...]
    const SIK = this.data.subjectsIDKey; //      (Object) {sid1: s1, sid2: s2, ...}

    const DNK = this.data.predictionsNameKey; // (Object) {p1: pid1, p2: pid2 ...}
    const DC = this.data.predictionsClusters; // (Object) {p1: c1, p2: c1, ...}
    const DE = this.data.predictionsExtent; //   (List)   min/max values for predictions [min, max]

    const S = this.data.groups.map((sentenceGroup) => sentenceGroup.subjects).flat();
    const D = this.utils.deepCopy(this.data.heatMapData);

    if (!SF.length) return; // don't plot if all subjects filtered out

    const self = this;
    self.controls.disableZoom = false;

    // sort and filter subjects and predictions
    self.plot.subjects = filterSubjects(S, SF);
    self.plot.predictions = filterPredictions(D, SF);
    sortPredictions(self.plot.predictions, self.controls.sortBy);

    // Labels of clusters, rows, and columns
    self.plot.clusters = [...new Set(Object.values(DC))];
    self.plot.rows = [...new Set(self.plot.predictions.map((d) => d.name))];
    self.plot.columns = self.plot.subjects.map((s) => s.id);

    // first draw legend, so SVG size scales properly
    const tickColorScale = d3.scaleOrdinal(self.utils.schemeTableau20).domain(self.plot.clusters);
    self.legend.selectAll("*").remove();
    if (self.plot.clusters.length > 1) self.drawLegend(tickColorScale);

    // get plot elements
    const svg = self.plot.el;
    const heatMap = self.plot.heatMap;
    const margin = self.plot.margin;

    // get height and width
    const fw = parseFloat(svg.style("width"));
    const fh = parseFloat(svg.style("height"));

    // compute bounds (top, right, bottom, left)
    const bw = self.plot.minYScaleBandwidth; // px
    const tb = margin.t;
    const rb = fw - margin.r;
    const bb = Math.max(fh - margin.b, bw * self.plot.rows.length);
    const lb = margin.l;

    // compute scales
    const xScale = d3.scaleBand().domain(self.plot.columns).range([lb, rb]);
    const yScale = d3.scaleBand().domain(self.plot.rows);
    const colorScheme = d3.interpolatePuRd;
    const barsColorScale = d3.scaleSequentialSqrt(DE, colorScheme);

    // create x-axis subject groups
    let nSubjectsSoFar = 0;
    let xAxisGroupsTranslateY = 0;
    const xAxisGroups = (g) => {
      const ySpacing = 12; // space between lines, in px
      let maxLines = 0; // max number of lines drawn across all subject groups
      g.attr("class", "x-axis-groups")
        .attr("fill", "none")
        .attr("font-size", "10")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(0, ${tb})`)
        .selectAll("g")
        .data(self.data.groups)
        .join("g")
        .attr("class", "x-axis-group")
        .attr("opacity", 1)
        .attr("transform", (d) => {
          const nSubjectsVisible = d.subjects.filter((subject) => SF.includes(subject.id)).length;
          const x = lb + nSubjectsSoFar * xScale.bandwidth() + (1 / 2) * nSubjectsVisible * xScale.bandwidth();
          nSubjectsSoFar += nSubjectsVisible;
          return `translate(${x},0)`;
        })
        .append("text")
        .attr("fill", "currentColor")
        .attr("y", 3)
        .attr("dy", "0.71em")
        .html(function (d) {
          const nSubjectsVisible = d.subjects.filter((subject) => SF.includes(subject.id)).length;
          if (nSubjectsVisible >= 1 && d.subjects.length > 1) {
            const maxWidth = nSubjectsVisible * xScale.bandwidth(); // px
            const [html, nlines] = splitTextIntoLinesByMaxWidth(this, d.template, ySpacing, maxWidth);
            maxLines = Math.max(maxLines, nlines);
            return html;
          } else {
            return "";
          }
        });
      // only translate group if any subject group is drawn
      xAxisGroupsTranslateY = maxLines > 0 ? tb + (maxLines - 1) * ySpacing : 0;
      g.attr("transform", `translate(0, ${xAxisGroupsTranslateY})`);
    };

    // create x-axis
    const xAxis = (g) => {
      g.attr("class", "x-axis")
        .call(d3.axisBottom(xScale).tickSize(0))
        .call((g) => {
          g.select(".domain").remove();
          const maxWidth = xScale.bandwidth(); // px
          const ySpacing = 12; // space between lines, in px
          let maxLines = 1; // max number of lines drawn across all subjects
          g.selectAll(".tick text").html(function (d) {
            const subject = SIK[d]; // get subject text
            const [html, nlines] = splitTextIntoLinesByMaxWidth(this, subject, ySpacing, maxWidth);
            maxLines = Math.max(maxLines, nlines);
            return html;
          });
          const xAxisTranslateY = tb + (maxLines - 1) * ySpacing;
          const padTop = xAxisGroupsTranslateY > 0 ? xAxisGroupsTranslateY + tb : 0;
          g.attr("transform", `translate(0, ${padTop + xAxisTranslateY})`);
        });
    };

    // create y-axis
    const yAxis = (g) => {
      g.attr("class", "y-axis")
        .attr("transform", `translate(${lb},0)`)
        .call(d3.axisLeft(yScale).tickSize(0))
        .call((g) => {
          g.select(".domain").remove();
          if (self.plot.clusters.length > 1) {
            g.selectAll(".tick text").style("fill", function () {
              const value = d3.select(this).text();
              return tickColorScale(DC[value]); // color label by cluster label
            });
          }
        });
    };

    // heat map
    // Based on: https://observablehq.com/@mbostock/the-impact-of-vaccines

    // clear previous plot
    heatMap.selectAll("*").remove();

    // create scrollable group, to go below x-axis
    const scrollableGroup = heatMap.append("g").attr("class", "heat-scrollable-group");

    // draw x-axis
    const xAxisBackground = heatMap.append("rect").attr("x", 0).attr("y", 0).attr("width", fw).attr("fill", "white");
    const xAxisGroupsEl = heatMap.append("g").call(xAxisGroups);
    const xAxisGroupsHeight = xAxisGroupsEl.node().getBBox().height;
    const xAxisEl = heatMap.append("g").call(xAxis);
    const xAxisHeight = xAxisEl.node().getBBox().height;
    const xAxisBackgroundHeight = tb * 2 + xAxisHeight + xAxisGroupsHeight;
    xAxisBackground.attr("height", xAxisBackgroundHeight);

    // update yScale range to adjust for x-axis computed height
    yScale.range([xAxisBackgroundHeight, bb]);

    // draw y-axis
    scrollableGroup.append("g").call(yAxis);

    // draw background
    scrollableGroup
      .append("rect")
      .attr("x", xScale(self.plot.columns[0]))
      .attr("y", yScale(self.plot.rows[0]))
      .attr("width", xScale.bandwidth() * self.plot.columns.length)
      .attr("height", yScale.bandwidth() * self.plot.rows.length)
      .attr("fill", "url(#diagonalHatch)");

    // draw heat map
    scrollableGroup
      .append("g")
      .attr("class", "heat-prediction-rects")
      .selectAll("rect")
      .data(self.plot.predictions)
      .join("rect")
      .attr("id", (d) => DNK[d.name])
      .attr("class", "heat-prediction-rect")
      .attr("x", (d) => xScale(d.parent))
      .attr("y", (d) => yScale(d.name))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => barsColorScale(d.value))
      .on("mouseenter", mouseenter)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("click", click);

    // ============================= HOVER ================================= //

    function mouseenter(event, d) {
      d3.selectAll(`#${this.getAttribute("id")}`).attr("hovered", true);
      d3.selectAll(`#cluster-${DC[d.name]}`).style("font-weight", 900); // don't override attributes
      let sentence = "";
      for (let i = 0; i < self.data.groups.length; i++) {
        const sentenceGroup = self.data.groups[i];
        const groupSubjectIDs = sentenceGroup.subjects.map((subject) => subject.id);
        if (groupSubjectIDs.includes(d.parent)) {
          sentence = sentenceGroup.template.replace("[subject]", SIK[d.parent]);
          break;
        }
      }
      const html = `
        <span><b>"${sentence}"</b></span>
        <br />
        <span>&#8250; ${d.name} (${DC[d.name]}): ${d.value.toFixed(3)}</span>`;
      self.tooltip.html(html);
      self.tooltip.style("display", "block").style("opacity", 1);
    }
    function mousemove(event, d) {
      positionTooltip(event.x, event.y);
    }
    function mouseleave(event, d) {
      d3.selectAll(`#${this.getAttribute("id")}`).attr("hovered", "");
      d3.selectAll(`#cluster-${DC[d.name]}`).style("font-weight", ""); // don't override attributes
      self.tooltip.html("");
      self.tooltip.style("display", "none").style("opacity", 0);
    }

    // ============================= CLICK ================================= //

    function click(event, d) {
      const selected = d3.select(this).attr("selected") === "true";
      d3.selectAll(`rect#${DNK[d.name]}.heat-prediction-rect`).attr("selected", !selected);
    }

    // ============================= HELPER ================================ //

    /**
     * TODO
     * @param {*} eventX
     * @param {*} eventY
     */
    function positionTooltip(eventX, eventY) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const width = self.tooltip.node().getBoundingClientRect().width + 2;
      const height = self.tooltip.node().getBoundingClientRect().height + 2;
      const left = eventX + width + 8 >= vw ? vw - width : eventX + 8;
      const top = eventY - height - 8 <= 0 ? 0 : eventY - height - 8;
      self.tooltip.style("left", `${left}px`).style("top", `${top}px`);
    }

    /**
     * TODO
     * @param {Array} subjects list of objects; e.g., `[{sid1, s1}, {sid2, s2}, ...]`.
     * @param {Array} keep list of subject ids to keep; e.g., `[s1, s2, ...]`.
     * @returns shallow copy of filtered array.
     */
    function filterSubjects(subjects, keep) {
      const filtered = (s) => keep.includes(s.id);
      return subjects.filter(filtered);
    }

    /**
     * TODO
     * @param {Array} predictions list of prediction objects; e.g., `[{sid1, pid1, p1, value}, {sid1, pid2, p2, value}, ...]`.
     * @param {Array} keep list of subject ids to keep; e.g., `[s1, s2, ...]`.
     * @returns shallow copy of filtered array.
     */
    function filterPredictions(predictions, keep) {
      let newPredictions = predictions.filter((d) => keep.includes(d.parent)); // remove predictions for filtered out parents
      if (self.controls.filterShared || self.controls.filterUnique) {
        // if filterShared, keep only predictions that have all subjects as parents
        // if filterUnique, keep only predictions with a single unique parent
        const counts = {};
        for (const d of newPredictions) {
          counts[d.name] = counts[d.name] ? counts[d.name] + 1 : 1;
        }
        const targetCount = self.controls.filterShared ? self.plot.subjects.length : 1;
        const names = Object.keys(counts).filter((d) => counts[d] == targetCount);
        newPredictions = newPredictions.filter((d) => names.includes(d.name));
      }
      return newPredictions;
    }

    /**
     * TODO
     * @param {Array} predictions list of prediction objects; e.g., `[{sid1, pid1, p1, value}, {sid1, pid2, p2, value}, ...]`.
     * @param {String} method one of "method", "rank", "group-name", or "group-rank".
     */
    function sortPredictions(predictions, method) {
      const clusters = self.plot.clusters;
      switch (method) {
        case "name":
          predictions.sort((a, b) => d3.ascending(a.name, b.name));
          break;
        case "rank":
          predictions.sort((a, b) => d3.descending(a.value, b.value));
          break;
        case "group-name":
          predictions.sort((a, b) => d3.ascending(a.name, b.name));
          predictions.sort((a, b) => clusters.indexOf(DC[a.name]) - clusters.indexOf(DC[b.name]));
          break;
        case "group-rank":
          predictions.sort((a, b) => d3.descending(a.value, b.value));
          predictions.sort((a, b) => clusters.indexOf(DC[a.name]) - clusters.indexOf(DC[b.name]));
          break;
      }
    }

    /**
     * TODO
     *
     * See: https://stackoverflow.com/a/38162224
     *
     * @param {*} element
     * @param {*} text
     * @param {*} ySpacing
     * @param {*} maxWidth
     * @returns
     */
    function splitTextIntoLinesByMaxWidth(element, text, ySpacing, maxWidth) {
      // create test element to get rendered width of text
      element.innerHTML = '<tspan id="PROCESSING">busy</tspan >';
      const testElem = document.getElementById("PROCESSING");

      // split text into set of lines shorter than the max width allowed
      let line = "";
      const lines = [];
      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        testElem.innerHTML = testLine;
        const testWidth = testElem.getBoundingClientRect().width;
        if (testWidth > maxWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      testElem.remove();

      // create final html
      let html = "";
      const nlines = lines.length;
      if (nlines > 1) {
        lines.forEach((l, i) => {
          if (i == 0) {
            const y = (nlines - 1) * ySpacing;
            html += `<tspan x="0" y="${-y}" dy="10">${l}</tspan>`;
          } else {
            html += `<tspan x="0" dy="${ySpacing}">${l}</tspan>`;
          }
        });
      } else {
        html += `<tspan x="0">${lines[0]}</tspan>`;
      }

      return [html, nlines];
    }
  }
}
