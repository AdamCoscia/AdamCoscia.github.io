const BACKGROUNDS = {
  "Pescadero_final.csv": [
    "None",
    "Auka_LASSmb_Topo5cm_slope3710-3630",
    // "Auka_Lidar_Topo2cm_slope3710-3630",
    "Auka_Pmos_LeftRaw_5cm",
    "MAUV_SoPB_TopoSq_1m_slope3796-3334",
  ],
  "SantaMonica_GeoChem_repeat.csv": [
    "None",
    "SantaMonica_650mMound_MAUV_Topo1m_slope820-560",
    // "SantaMonica_800mMound_LASS_PmosRightRaw1cm",
    "SantaMonica_800mMound_LASS_Topo5cm_slope825-800",
    "SantaMonica_800mMound_MAUV_Topo1m_slope880-760",
    "SantaMonica_MAUV_Topo2m_slope900-50",
    "SantaMonica_NWMounds_MAUV_Topo1m_slope625-500",
  ],
};
const SITES = {
  "Pescadero_final.csv": ["All", "Diane's vent", "Matterhorn", "Z vent", "Abuelita", "between Big Cave & Red hill"],
  "SantaMonica_GeoChem_repeat.csv": [
    "All",
    "Del Mar seeps, in frenulate bed",
    "Del Mar seeps, yellow mat",
    "Santa Monica mounds 863m white dirty mat",
    "Santa Monica mounds 863m orange mat",
    "injector cores site 2",
    "Santa Monica mounds 800m site 1",
  ],
};
const loadingAnimationElem = $("#loading-animation")[0];

export default class MapView {
  // plot helpers
  containerWidth;
  containerHeight;
  svgWidth;
  svgHeight;
  plotMargins;
  plotWidth;
  plotHeight;

  // svg and plot groups
  svg;
  plotGroup;
  bgGroup;
  marksGroup;
  xScale;
  xAxis;
  xAxisGroup;
  xGridlinesGroup;
  yScale;
  yAxis;
  yAxisGroup;
  yGridlinesGroup;

  // variables
  xVar;
  yVar;
  unit;
  background;
  data;

  constructor() {
    // get reference to svg
    this.svg = d3.select("#svg");

    // variables to be plotted on the x and y axes
    // this.unit = $("#units-select").find(":selected").text();
    this.unit = "Degrees";
    switch (this.unit) {
      case "Degrees":
        this.xVar = "Longitude_deg";
        this.yVar = "Latitude_deg";
        break;
      case "Centimeters":
        this.xVar = "Longitude_rel_cm";
        this.yVar = "Latitude_rel_cm";
        break;
    }

    // populate the background select list based on the cruise selected
    let el = $("#bg-select").get(0);
    while (el.options.length > 0) {
      el.remove(el.options.length - 1);
    }
    let newOpts = BACKGROUNDS[$("#map-file-select").find(":selected").text()];
    for (let i = 0; i < newOpts.length; i++) {
      const opt = document.createElement("option");
      opt.text = newOpts[i];
      el.add(opt, null);
    }

    // define background image files
    this.background = {
      name: $("#bg-select").find(":selected").text(),
      png: `assets/backgrounds/${$("#bg-select").find(":selected").text()}.png`,
      json: `assets/backgrounds/${$("#bg-select").find(":selected").text()}.json`,
      tif: `assets/backgrounds/${$("#bg-select").find(":selected").text()}.tif`,
      meta: undefined,
    };

    // populate the site select list based on the cruise selected
    el = $("#site-select").get(0);
    while (el.options.length > 0) {
      el.remove(el.options.length - 1);
    }
    newOpts = SITES[$("#map-file-select").find(":selected").text()];
    for (let i = 0; i < newOpts.length; i++) {
      const opt = document.createElement("option");
      opt.text = newOpts[i];
      el.add(opt, null);
    }

    // define data object
    this.data = {
      file: $("#map-file-select").find(":selected").text(),
      site: $("#site-select").find(":selected").text(),
      points: [],
      extent: {
        x: [0, 100],
        y: [0, 100],
      },
      filter: {
        x: [0, 100],
        y: [0, 100],
      },
      filterStack: [],
    };

    // update inputs
    $("#x-min-input").val(this.data.filter["x"][0]);
    $("#x-max-input").val(this.data.filter["x"][1]);
    $("#y-min-input").val(this.data.filter["y"][0]);
    $("#y-max-input").val(this.data.filter["y"][1]);

    // set the event listeners
    $(window).on("resize", this.clean);
    $("#map-file-select, #bg-select").on("change", this.clean);
    $("#site-select").on("change", this.filterBySite);
    $("#x-min-input, #x-max-input, #y-min-input, #y-max-input").on("change", this.filterByLatLong);
    $("#reset-btn").on("click", this.resetFilters);
    $(".numberCircle").bind("click", () => $("#modal").show());
    $("#hide-modal-btn").on("click", () => $("#modal").hide());
  }

  init = () => {
    // get layout
    this.containerWidth = $("#view").width() - 8; // #plot-container border
    this.containerHeight = $("#view").height() - 8; // #plot-container border
    if (this.containerWidth / 2 > this.containerHeight) {
      this.svgWidth = this.containerHeight;
      this.svgHeight = this.containerHeight;
    } else {
      this.svgWidth = this.containerWidth / 2;
      this.svgHeight = this.containerWidth / 2;
    }

    // set plot margins, width and height
    this.plotMargins = { top: 30, bottom: 60, left: 80, right: 20 };
    this.plotWidth = this.svgWidth - this.plotMargins.left - this.plotMargins.right;
    this.plotHeight = this.svgHeight - this.plotMargins.top - this.plotMargins.bottom;

    // update svg
    this.svg.selectAll("*").remove(); // clear out any objects already in the svg
    this.svg.attr("width", this.svgWidth).attr("height", this.svgHeight);

    // add loading text
    this.svg
      .append(() => loadingAnimationElem)
      .attr("width", "25px")
      .attr("height", "25px");
    this.svg.append("text").attr("id", "loading-text").attr("x", "25px").attr("dy", "1.1em").html("Loading data ...");

    // Add plot group, containing axes, marks, and legend
    this.plotGroup = this.svg
      .append("g")
      .classed("plot", true)
      .attr("transform", `translate(${this.plotMargins.left},${this.plotMargins.top})`);

    // add background group and elevation background
    if (this.background.name && this.background.name !== "None") {
      this.bgGroup = this.plotGroup.append("g").classed("bg", true);
      this.bgGroup
        .append("svg")
        .attr("width", this.plotWidth)
        .attr("height", this.plotHeight)
        .append("svg:image")
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", this.background.png);
    }

    // Add X and Y axis groups
    this.yAxisGroup = this.plotGroup.append("g").classed("y", true).classed("axis", true);
    this.xAxisGroup = this.plotGroup
      .append("g")
      .classed("x", true)
      .classed("axis", true)
      .attr("transform", `translate(${0},${this.plotHeight})`);

    // add gridlines groups
    this.xGridlinesGroup = this.plotGroup.append("g").classed("x-gridlines", true);
    this.yGridlinesGroup = this.plotGroup.append("g").classed("y-gridlines", true);

    // Add data marks group
    this.marksGroup = this.plotGroup.append("g").classed("marks", true);

    // Add drag region to marks group
    let dragRegion = this.marksGroup
      .append("rect")
      .attr("width", this.plotWidth)
      .attr("height", this.plotHeight)
      .style("opacity", 0)
      .on("contextmenu", (e) => {
        // right-click to restore the previous filter, if possible
        e.preventDefault();
        if (this.data.filterStack.length > 0) {
          this.data.filter = this.data.filterStack.pop();
          this.draw();
        }
        return false;
      });

    // define the selection rectangle
    let selectionRect = {
      element: null,
      previousElement: null,
      container: this.marksGroup,
      currentY: 0,
      currentX: 0,
      originX: 0,
      originY: 0,
      init: function (newX, newY) {
        let rectElement = this.container
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("height", 0)
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("stroke", "#545454")
          .attr("stroke-width", "2px")
          .attr("stroke-opacity", "1")
          .attr("fill", "white")
          .attr("fill-opacity", "0.5")
          .classed("selection", true);
        this.setElement(rectElement);
        this.originX = newX;
        this.originY = newY;
        this.update(newX, newY);
      },
      update: function (newX, newY) {
        this.currentX = newX;
        this.currentY = newY;
        const x = this.currentX < this.originX ? this.currentX : this.originX;
        const y = this.currentY < this.originY ? this.currentY : this.originY;
        const rectWidth = Math.abs(this.currentX - this.originX);
        const rectHeight = Math.abs(this.currentY - this.originY);
        this.element.attr("x", x).attr("y", y).attr("width", rectWidth).attr("height", rectHeight);
      },
      setElement: function (ele) {
        this.previousElement = this.element;
        this.element = ele;
      },
      remove: function () {
        this.element.remove();
        this.element = null;
      },
      removePrevious: function () {
        if (this.previousElement) {
          this.previousElement.remove();
        }
      },
      getCurrentAttributes: function () {
        const x = +this.element.attr("x");
        const y = +this.element.attr("y");
        const rectWidth = +this.element.attr("width");
        const rectHeight = +this.element.attr("height");
        return {
          x1: x,
          y1: y,
          x2: x + rectWidth,
          y2: y + rectHeight,
        };
      },
    };

    let dragStart = (e) => {
      selectionRect.init(e.x, e.y);
      selectionRect.removePrevious();
    };

    let dragMove = (e) => {
      let newX = e.x < 0 ? 0 : e.x > this.plotWidth ? this.plotWidth : e.x;
      let newY = e.y < 0 ? 0 : e.y > this.plotHeight ? this.plotHeight : e.y;
      selectionRect.update(newX, newY);
    };

    let dragEnd = () => {
      let attrs = selectionRect.getCurrentAttributes();
      selectionRect.remove();
      if (attrs.x2 - attrs.x1 > 1 && attrs.y2 - attrs.y1 > 1) {
        // push the prior filter values onto the filter stack
        this.data.filterStack.push($.extend(true, {}, this.data.filter));
        // update filter values
        this.data.filter["x"][0] = this.xScale.invert(attrs.x1);
        this.data.filter["x"][1] = this.xScale.invert(attrs.x2);
        this.data.filter["y"][0] = this.yScale.invert(attrs.y2);
        this.data.filter["y"][1] = this.yScale.invert(attrs.y1);
        // apply transformations to the filters
        this.squareFilters();
        // update input field values
        $("#x-min-input").val(this.xScale.invert(attrs.x1));
        $("#x-max-input").val(this.xScale.invert(attrs.x2));
        $("#y-min-input").val(this.yScale.invert(attrs.y2));
        $("#y-max-input").val(this.yScale.invert(attrs.y1));
        // re-draw the vis
        this.draw();
      }
    };

    let dragBehavior = d3.drag().on("start", dragStart).on("drag", dragMove).on("end", dragEnd);
    dragRegion.call(dragBehavior);
  };

  minFilters = () => {
    // if diff is < 100m, apply a buffer to get extents to be 100m
    const xDiff = this.data.filter["x"][1] - this.data.filter["x"][0];
    const yDiff = this.data.filter["y"][1] - this.data.filter["y"][0];
    if (xDiff < 9.009e-4) {
      const bufferX = 4545.4545454545 * (1e-7 / 1.11) - xDiff / 2; // 50m - half the existing extent
      this.data.filter["x"][0] -= bufferX;
      this.data.filter["x"][1] += bufferX;
    }
    if (yDiff < 9.009e-4) {
      const bufferY = 4545.4545454545 * (1e-7 / 1.11) - yDiff / 2; // 50m - half the existing extent
      this.data.filter["y"][0] -= bufferY;
      this.data.filter["y"][1] += bufferY;
    }
  };

  squareFilters = () => {
    // make the extents square
    const xDiff = this.data.filter["x"][1] - this.data.filter["x"][0];
    const yDiff = this.data.filter["y"][1] - this.data.filter["y"][0];
    const adjustX = (yDiff - xDiff) / 2;
    const adjustY = (xDiff - yDiff) / 2;
    if (xDiff < yDiff) {
      this.data.filter["x"][0] -= adjustX;
      this.data.filter["x"][1] += adjustX;
    } else if (yDiff < xDiff) {
      this.data.filter["y"][0] -= adjustY;
      this.data.filter["y"][1] += adjustY;
    }
  };

  padFilters = () => {
    // pad the filters by 1/20 of viewport window to give a border around points
    const padX = (this.data.filter["x"][1] - this.data.filter["x"][0]) / 20;
    const padY = (this.data.filter["y"][1] - this.data.filter["y"][0]) / 20;
    this.data.filter["x"][0] -= padX;
    this.data.filter["x"][1] += padX;
    this.data.filter["y"][0] -= padY;
    this.data.filter["y"][1] += padY;
  };

  setExtentsToFilter = () => {
    // update the extent to match the current filter
    this.data.extent["x"][0] = this.data.filter["x"][0];
    this.data.extent["x"][1] = this.data.filter["x"][1];
    this.data.extent["y"][0] = this.data.filter["y"][0];
    this.data.extent["y"][1] = this.data.filter["y"][1];
  };

  loadFile = async (url) => {
    const res = await fetch(url);
    return res.text();
  };

  parseData = (contents) => {
    $.csv.toObjects(contents, {}, (err, points) => {
      if (err) {
        console.log(err);
      } else {
        // set initial filter to first point
        let p = points[0];
        this.data.filter["x"][0] = p[this.xVar];
        this.data.filter["x"][1] = p[this.xVar];
        this.data.filter["y"][0] = p[this.yVar];
        this.data.filter["y"][1] = p[this.yVar];
        this.data.points.push(p);
        // collect points
        for (let i = 1; i < points.length; i++) {
          p = points[i];
          this.data.filter["x"][0] = Math.min(this.data.filter["x"][0], p[this.xVar]);
          this.data.filter["x"][1] = Math.max(this.data.filter["x"][1], p[this.xVar]);
          this.data.filter["y"][0] = Math.min(this.data.filter["y"][0], p[this.yVar]);
          this.data.filter["y"][1] = Math.max(this.data.filter["y"][1], p[this.yVar]);
          this.data.points.push(p);
        }
        // apply transformations to the filters
        this.squareFilters();
        this.padFilters();
        this.setExtentsToFilter();
        // update the input elements
        $("#x-min-input").val(this.data.extent["x"][0]);
        $("#x-max-input").val(this.data.extent["x"][1]);
        $("#y-min-input").val(this.data.extent["y"][0]);
        $("#y-max-input").val(this.data.extent["y"][1]);
      }
    });
  };

  loadBGMeta = async () => {
    // const tiff = await fetch(this.background.tif).then((response) =>
    //   response.arrayBuffer().then((buffer) => GeoTIFF.fromArrayBuffer(buffer))
    // );
    // const image = await tiff.getImage();
    // this.background.meta = {
    //   width: image.getWidth(),
    //   height: image.getHeight(),
    //   tileWidth: image.getTileWidth(),
    //   tileHeight: image.getTileHeight(),
    //   samplesPerPixel: image.getSamplesPerPixel(),
    //   origin: image.getOrigin(),
    //   resolution: image.getResolution(),
    //   bbox: image.getBoundingBox(),
    // };
    this.background.meta = await fetch(this.background.json).then((response) =>
      response.text().then((contents) => JSON.parse(contents))
    );
    return this.background.meta;
  };

  filterBySite = () => {
    this.data.site = $("#site-select").find(":selected").text(); // get new site
    this.data.filterStack = []; // start a new filter stack

    // filter by site
    if (this.data.site == "All") {
      // set initial filter to first point
      let p = this.data.points[0];
      this.data.filter["x"][0] = p[this.xVar];
      this.data.filter["x"][1] = p[this.xVar];
      this.data.filter["y"][0] = p[this.yVar];
      this.data.filter["y"][1] = p[this.yVar];
      for (let i = 1; i < this.data.points.length; i++) {
        p = this.data.points[i];
        this.data.filter["x"][0] = Math.min(this.data.filter["x"][0], p[this.xVar]);
        this.data.filter["x"][1] = Math.max(this.data.filter["x"][1], p[this.xVar]);
        this.data.filter["y"][0] = Math.min(this.data.filter["y"][0], p[this.yVar]);
        this.data.filter["y"][1] = Math.max(this.data.filter["y"][1], p[this.yVar]);
      }
    } else {
      // set initial filter to first point contained in the filter
      let i = 0;
      while (this.data.site !== this.data.points[i]["Site"]) i++;
      let p = this.data.points[i];
      this.data.filter["x"][0] = p[this.xVar];
      this.data.filter["x"][1] = p[this.xVar];
      this.data.filter["y"][0] = p[this.yVar];
      this.data.filter["y"][1] = p[this.yVar];
      i++;
      for (i; i < this.data.points.length; i++) {
        p = this.data.points[i];
        if (this.data.site == p["Site"]) {
          this.data.filter["x"][0] = Math.min(this.data.filter["x"][0], p[this.xVar]);
          this.data.filter["x"][1] = Math.max(this.data.filter["x"][1], p[this.xVar]);
          this.data.filter["y"][0] = Math.min(this.data.filter["y"][0], p[this.yVar]);
          this.data.filter["y"][1] = Math.max(this.data.filter["y"][1], p[this.yVar]);
        }
      }
    }

    // apply transformations to the filters
    this.minFilters();
    this.squareFilters();
    this.padFilters();

    // update the input elements
    $("#x-min-input").val(this.data.extent["x"][0]);
    $("#x-max-input").val(this.data.extent["x"][1]);
    $("#y-min-input").val(this.data.extent["y"][0]);
    $("#y-max-input").val(this.data.extent["y"][1]);

    this.draw(); // re-draw the vis
  };

  filterByLatLong = () => {
    this.data.filterStack.push($.extend(true, {}, this.data.filter)); // store previous filter state in the filter stack

    const xFilter = this.data.filter["x"];
    const xExtent = this.data.extent["x"];
    const yFilter = this.data.filter["y"];
    const yExtent = this.data.extent["y"];

    // x-min
    xFilter[0] = parseFloat($("#x-min-input").val());
    if (xFilter[0] < xExtent[0]) xFilter[0] = xExtent[0];
    if (xFilter[0] > xFilter[1]) xFilter[0] = xFilter[1] - 1;
    // x-max
    xFilter[1] = parseFloat($("#x-max-input").val());
    if (xFilter[1] < xFilter[0]) xFilter[1] = xFilter[0] + 1;
    if (xFilter[1] > xExtent[1]) xFilter[1] = xExtent[1];
    // y-min
    yFilter[0] = parseFloat($("#y-min-input").val());
    if (yFilter[0] < yExtent[0]) yFilter[0] = yExtent[0];
    if (yFilter[0] > yFilter[1]) yFilter[0] = yFilter[1] - 1;
    // y-max
    yFilter[1] = parseFloat($("#y-max-input").val());
    if (yFilter[1] < yFilter[0]) yFilter[1] = yFilter[0] + 1;
    if (yFilter[1] > yExtent[1]) yFilter[1] = yExtent[1];

    // update the input elements
    $("#x-min-input").val(xFilter[0]);
    $("#x-max-input").val(xFilter[1]);
    $("#y-min-input").val(yFilter[0]);
    $("#y-max-input").val(yFilter[1]);

    this.draw(); // re-draw the vis
  };

  resetFilters = () => {
    $("#site-select")[0].selectedIndex = 0; // reset filter list to 'all'
    this.data.site = $("#site-select").find(":selected").text();
    this.data.filterStack = []; // reset filter stack

    // reset filters to the extent
    this.data.filter["x"][0] = this.data.extent["x"][0];
    this.data.filter["x"][1] = this.data.extent["x"][1];
    this.data.filter["y"][0] = this.data.extent["y"][0];
    this.data.filter["y"][1] = this.data.extent["y"][1];
    // update input fields
    $("#x-min-input").val(this.data.extent["x"][0]);
    $("#x-max-input").val(this.data.extent["x"][1]);
    $("#y-min-input").val(this.data.extent["y"][0]);
    $("#y-max-input").val(this.data.extent["y"][1]);

    this.draw(); // re-draw the vis
  };

  clean = (e = null) => {
    const loadData = e ? ($(e.target).attr("id") == "map-file-select" ? true : false) : false;

    if (loadData) {
      // variables to be plotted on the x and y axes
      // unit = $("#units-select").find(":selected").text();
      this.unit = "Degrees";
      switch (this.unit) {
        case "Degrees":
          this.xVar = "Longitude_deg";
          this.yVar = "Latitude_deg";
          break;
        case "Centimeters":
          this.xVar = "Longitude_rel_cm";
          this.yVar = "Latitude_rel_cm";
          break;
      }
      // populate the site select list based on the cruise selected
      let el = $("#site-select").get(0);
      while (el.options.length > 0) {
        el.remove(el.options.length - 1);
      }
      let newOpts = SITES[$("#map-file-select").find(":selected").text()];
      for (let i = 0; i < newOpts.length; i++) {
        const opt = document.createElement("option");
        opt.text = newOpts[i];
        el.add(opt, null);
      }
      // reset data object
      this.data = {
        file: $("#map-file-select").find(":selected").text(),
        site: $("#site-select").find(":selected").text(),
        points: [],
        extent: {
          x: [0, 100],
          y: [0, 100],
        },
        filter: {
          x: [0, 100],
          y: [0, 100],
        },
        filterStack: [],
      };
      // populate the background select list based on the cruise selected
      el = $("#bg-select").get(0);
      while (el.options.length > 0) {
        el.remove(el.options.length - 1);
      }
      newOpts = BACKGROUNDS[$("#map-file-select").find(":selected").text()];
      for (let i = 0; i < newOpts.length; i++) {
        const opt = document.createElement("option");
        opt.text = newOpts[i];
        el.add(opt, null);
      }
      // update inputs
      $("#x-min-input").val(this.data.filter["x"][0]);
      $("#x-max-input").val(this.data.filter["x"][1]);
      $("#y-min-input").val(this.data.filter["y"][0]);
      $("#y-max-input").val(this.data.filter["y"][1]);
    }

    // define background image files
    this.background = {
      name: $("#bg-select").find(":selected").text(),
      png: `assets/backgrounds/${$("#bg-select").find(":selected").text()}.png`,
      json: `assets/backgrounds/${$("#bg-select").find(":selected").text()}.json`,
      tif: `assets/backgrounds/${$("#bg-select").find(":selected").text()}.tif`,
      meta: undefined,
    };
    this.init(); // re-initialize svg
    this.animate(loadData); // load new data based on the calling element id
  };

  animate = (loadData) => {
    const loadBG = this.background.name && this.background.name !== "None";
    if (loadData) {
      if (loadBG) {
        this.loadFile(`assets/data/${this.data.file}`)
          .then(this.parseData)
          .then(() => this.loadBGMeta.then(this.draw));
      } else {
        this.loadFile(`assets/data/${this.data.file}`).then(this.parseData).then(this.draw);
      }
    } else if (loadBG) {
      this.loadBGMeta().then(this.draw);
    } else {
      this.draw();
    }
  };

  draw = () => {
    if (!this.data.points) return; // if there's no dataset don't update the scatter plot

    const xFilter = this.data.filter["x"];
    const yFilter = this.data.filter["y"];

    // create list of data points
    let rawData = this.data.points.map((dataPoint) => {
      return {
        ...dataPoint,
        xVar: dataPoint[this.xVar],
        yVar: dataPoint[this.yVar],
      };
    });

    // filter list of data points
    let prepared = rawData.filter((dataPoint) => {
      return (
        dataPoint[this.xVar] >= xFilter[0] &&
        dataPoint[this.xVar] <= xFilter[1] &&
        dataPoint[this.yVar] >= yFilter[0] &&
        dataPoint[this.yVar] <= yFilter[1]
      );
    });

    // output extents formatted
    let xDiff, yDiff;
    switch (this.unit) {
      case "Degrees":
        xDiff = (xFilter[1] - xFilter[0]) * (1.11 / 1e-7); // convert to cm
        yDiff = (yFilter[1] - yFilter[0]) * (1.11 / 1e-7); // convert to cm
        break;
      case "Centimeters":
        xDiff = xFilter[1] - xFilter[0]; // already in cm
        yDiff = yFilter[1] - yFilter[0]; // already in cm
        break;
    }
    $("#x-scale-output").html(`
      ${Math.round((xDiff + Number.EPSILON) * 100) / 100}cm |
      ${Math.round((xDiff / 100 + Number.EPSILON) * 100) / 100}m |
      ${Math.round((xDiff / 100000 + Number.EPSILON) * 100) / 100}km
    `);
    $("#y-scale-output").html(`
      ${Math.round((yDiff + Number.EPSILON) * 100) / 100}cm |
      ${Math.round((yDiff / 100 + Number.EPSILON) * 100) / 100}m |
      ${Math.round((yDiff / 100000 + Number.EPSILON) * 100) / 100}km
    `);

    // get unique cylinder names plotted
    let unique = [...new Set(prepared.map((d) => d.Cylinder))];
    $("#cylinder-output-title").html(`Currently visible cylinders (${unique.length}):`);
    if (unique.length > 0) {
      $("#cylinder-output").html(`[${unique.map((name) => `"${name}"`).join(", ")}]`);
    } else {
      $("#cylinder-output").html("None visible. To zoom out, press the Reset button.");
    }

    // Create scales and axes based on vis matrix
    let xAxisTitle, yAxisTitle;
    switch (this.unit) {
      case "Degrees":
        xAxisTitle = "Longitude (decimal degrees)";
        yAxisTitle = "Latitude (decimal degrees)";
        break;
      case "Centimeters":
        xAxisTitle = "Relative Longitude (cm)";
        yAxisTitle = "Relative Latitude (cm)";
        break;
    }

    // set scales
    this.xScale = d3.scaleLinear().domain(xFilter).range([0, this.plotWidth]);
    this.yScale = d3.scaleLinear().domain(yFilter).range([this.plotHeight, 0]);

    // set axes
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);

    // draw axes
    this.xAxisGroup.call(this.xAxis);
    this.yAxisGroup.call(this.yAxis);

    // draw axis titles
    this.xAxisGroup.select(".x.axis.title").remove();
    this.xAxisGroup
      .append("g")
      .classed("x axis title", true)
      .attr("opacity", 1)
      .attr("transform", `translate(${this.plotWidth / 2}, 0)`)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .attr("dy", "4.5em")
      .text(xAxisTitle);
    this.yAxisGroup.select(".y.axis.title").remove();
    this.yAxisGroup
      .append("g")
      .classed("y axis title", true)
      .attr("opacity", 1)
      .attr("transform", `translate(-45, ${this.plotHeight / 2})`)
      .append("text")
      .attr("fill", "currentColor")
      .text(yAxisTitle);

    // prepare data labels for yAxis
    this.yAxisGroup
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "0.8em")
      .attr("dy", "-1.21em")
      .attr("transform", "rotate(-90)");

    // stagger every other tick label
    this.xAxisGroup.selectAll(".tick").each(function (_, i) {
      if (i % 2 !== 0) {
        d3.select(this).select("line").attr("y2", 15);
        d3.select(this).select("text").attr("dy", "1.91em");
      }
    });
    this.yAxisGroup.selectAll(".tick").each(function (_, i) {
      if (i % 2 !== 0) {
        d3.select(this).select("line").attr("x2", -15);
        d3.select(this).select("text").attr("dy", "-2.41em");
      }
    });

    // add gridlines
    let xGridlines = d3.axisTop().tickFormat("").tickSize(-this.plotHeight).scale(this.xScale);
    this.xGridlinesGroup.select("*").remove();
    this.xGridlinesGroup.call(xGridlines).call((g) => g.select(".domain").remove());
    let yGridlines = d3.axisRight().tickFormat("").tickSize(this.plotWidth).scale(this.yScale);
    this.yGridlinesGroup.select("*").remove();
    this.yGridlinesGroup.call(yGridlines).call((g) => g.select(".domain").remove());

    // Define the div for the tooltip
    d3.selectAll(".tooltip").remove();
    let div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // JOIN data selection
    let dataBound = this.marksGroup.selectAll(".post").data(prepared);

    // DELETE extra points
    dataBound.exit().remove();

    // ENTER new points (starting invisible, later fade them in)
    let enterSelection = dataBound.enter().append("g").classed("post", true);

    // UPDATE all existing points
    enterSelection.append("circle");
    enterSelection
      .merge(dataBound)
      .select("circle")
      .attr("transform", (d) => `translate(${this.xScale(d["xVar"])},${this.yScale(d["yVar"])})`)
      .attr("r", 6)
      .style("fill", "white")
      .style("fill-opacity", 0.8)
      .style("stroke-width", "1px")
      .style("stroke", "black")
      .style("cursor", "pointer")
      .on("mouseover", function (e, d) {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(`${d.Cylinder}<br />${d.Site}<br />(${d.Latitude_deg}, ${d.Longitude_deg})`)
          .style("left", e.x + 10 + "px")
          .style("top", e.y - 45 + "px");
      })
      .on("mousemove", function (e, d) {
        div.style("left", e.x + 10 + "px").style("top", e.y - 45 + "px");
      })
      .on("mouseout", function () {
        div.transition().duration(500).style("opacity", 0);
      });

    // finally update the background PNG
    if (this.background.name && this.background.name !== "None") {
      this.bgGroup
        .select("image")
        .attr("x", this.xScale(this.background.meta.origin[0]))
        .attr("y", this.yScale(this.background.meta.origin[1]))
        .attr("width", this.xScale(this.background.meta.bbox[2]) - this.xScale(this.background.meta.bbox[0]))
        .attr("height", this.yScale(this.background.meta.bbox[1]) - this.yScale(this.background.meta.bbox[3]))
        .on("load", () => {
          this.svg.select("#loading-animation").remove();
          this.svg.select("#loading-text").remove();
        });
    }

    this.svg.select("#loading-animation").remove();
    this.svg.select("#loading-text").remove();
  };
}
