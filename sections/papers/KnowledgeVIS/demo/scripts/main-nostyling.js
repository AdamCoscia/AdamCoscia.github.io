import utils from "./utils.js";

import HeatMap from "./plots/HeatMap.js";
import SetView from "./plots/SetView.js";
import ScatterPlot from "./plots/ScatterPlot.js";

import SubjectSets from "./sets/SubjectSets.js";
import SentenceSets from "./sets/SentenceSets.js";

// set backend URL
var backendURL = "http://localhost:3000";

// get dom elements
var elements = {
  header: document.getElementById("header-row"),
  content: document.getElementById("content-row"),
  settings: {
    panel: document.getElementById("settings-panel"),
    inputWrapper: document.getElementById("input-wrapper"),
    filterWrapper: document.getElementById("filter-wrapper"),

    subjectsTextInput: document.getElementById("subjects-text-input"),
    sentenceTextInput: document.getElementById("sentence-text-input"),
    dataQueryButton: document.getElementById("data-query-button"),
    dataExportButton: document.getElementById("data-export-button"),

    subjectsSetSelect: document.getElementById("subjects-set-select"),
    subjectsFileInput: document.getElementById("subjects-file-input"),

    sentenceTypeSelect: document.getElementById("sentence-type-select"),
    sentenceVariationSelect: document.getElementById("sentence-variation-select"),

    settingsModelSelect: document.getElementById("settings-model-select"),
    settingsTopkInput: document.getElementById("settings-topk-input"),
    settingsFillRadio: document.getElementsByName("settings-fill-radio"),

    searchTextInput: document.getElementById("search-text-input"),
    searchHighlightButton: document.getElementById("search-highlight-button"),
    searchClearButton: document.getElementById("search-clear-button"),

    filterSharedCheckbox: document.getElementById("filter-shared-checkbox"),
    filterUniqueCheckbox: document.getElementById("filter-unique-checkbox"),

    selectAllSubjectsButton: document.getElementById("selectall-subjects-button"),
    deselectAllSubjectsButton: document.getElementById("deselectall-subjects-button"),
    showSubjectsDiv: document.getElementById("show-subjects-div"),
  },
  views: {
    panel: document.getElementById("views-panel"),
    heatMap: {
      wrapper: document.getElementById("heat-map-wrapper"),
      controls: {
        sortSelect: document.getElementById("heat-sort-select"),
        resetButton: document.getElementById("heat-reset-button"),
      },
      el: d3.select("#heat-map"),
      plot: new HeatMap(utils, d3.select("#heat-map")),
    },
    setView: {
      wrapper: document.getElementById("set-view-wrapper"),
      controls: {
        sortSelect: document.getElementById("set-sort-select"),
        resetButton: document.getElementById("set-reset-button"),
      },
      el: d3.select("#set-view"),
      plot: new SetView(utils, d3.select("#set-view")),
    },
    scatterPlot: {
      wrapper: document.getElementById("scatter-plot-wrapper"),
      controls: {
        labelsCheckbox: document.getElementById("scatter-labels-checkbox"),
        resetButton: document.getElementById("scatter-reset-button"),
      },
      el: d3.select("#scatter-plot"),
      plot: new ScatterPlot(utils, d3.select("#scatter-plot")),
    },
  },
  dividers: {
    inputFilterDivider: document.getElementById("input-filter-divider"),
    settingsViewsDivider: document.getElementById("settings-views-divider"),
    heatSetDivider: document.getElementById("heat-set-divider"),
    setScatterDivider: document.getElementById("set-scatter-divider"),
  },
};

// create data store
var store = {
  subjectSets: SubjectSets,
  sentenceSets: SentenceSets,
  predictionsNameKey: null,
  subjectsFilter: [],
};

// fire events when the page loads
window.onload = init;

function init() {
  // set options for variable selects
  for (const [key, value] of Object.entries(store.subjectSets)) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = value.textContent;
    elements.settings.subjectsSetSelect.appendChild(opt);
  }
  for (const [key, value] of Object.entries(store.sentenceSets)) {
    const optType = document.createElement("option");
    optType.value = key;
    optType.textContent = value.label;
    elements.settings.sentenceTypeSelect.appendChild(optType);
  }

  // get drawing space height and width
  const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  // set input and filter wrapper widths
  const inputWrapperWidth = utils.getAbsoluteWidth(elements.settings.inputWrapper);
  const inputFilterDividerWidth = utils.getAbsoluteWidth(elements.dividers.inputFilterDivider);
  const filterWrapperWidth = viewWidth - inputWrapperWidth - inputFilterDividerWidth;
  elements.settings.inputWrapper.style.width = `${inputWrapperWidth}px`;
  elements.settings.filterWrapper.style.width = `${filterWrapperWidth}px`;

  // set settings and views panel heights
  const headerHeight = utils.getAbsoluteHeight(elements.header);
  const settingsPanelHeight = utils.getAbsoluteHeight(elements.settings.panel);
  const settingsViewsDividerHeight = utils.getAbsoluteHeight(elements.dividers.settingsViewsDivider);
  const viewsPanelHeight = viewHeight - headerHeight - settingsPanelHeight - settingsViewsDividerHeight;
  elements.settings.panel.style.height = `${settingsPanelHeight}px`;
  elements.views.panel.style.height = `${viewsPanelHeight}px`;

  // set each view's width
  const heatSetDividerWidth = utils.getAbsoluteWidth(elements.dividers.heatSetDivider);
  const setScatterDividerWidth = utils.getAbsoluteWidth(elements.dividers.setScatterDivider);
  const remainingWidth = viewWidth - heatSetDividerWidth - setScatterDividerWidth;
  elements.views.heatMap.wrapper.style.width = `${remainingWidth / 3}px`;
  elements.views.setView.wrapper.style.width = `${remainingWidth / 3}px`;
  elements.views.scatterPlot.wrapper.style.width = `${remainingWidth / 3}px`;

  // initialize views
  const viewNames = ["heatMap", "setView", "scatterPlot"];
  viewNames.forEach((view) => elements.views[view].plot.init());

  // set event listeners
  setListeners();

  // set defaults
  elements.settings.subjectsTextInput.value = "New York; Texas; California";
  elements.settings.sentenceTextInput.value = "In [X], they like to buy [Y].";
  elements.settings.settingsTopkInput.value = 30;
  elements.settings.settingsFillRadio[0].checked = true;
}

/**
 * TODO
 * @param {*} params
 */
function requestData(params) {
  // clear views and disable controls
  clearAllViews();
  disableAllViewControls();
  clearFilterPanel();
  disableAllFilterControls();
  elements.settings.dataQueryButton.disabled = true;
  elements.settings.dataExportButton.disabled = true;

  // create options
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const body = JSON.stringify(params);

  // connect to backend
  fetch(backendURL + "/", {
    method: "GET",
    headers: headers,
  })
    .then(() => {
      // if backend allows connection, request data
      fetch(backendURL + "/getData", {
        method: "POST",
        headers: headers,
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          saveData(data);
        })
        .catch((error) => {
          utils.handleFetchError(error);
        })
        .finally(function () {
          elements.settings.dataQueryButton.disabled = false; // enable query button
        });
    })
    .catch((error) => {
      utils.handleFetchError(error);
      console.log("not connected :(");
      elements.settings.dataQueryButton.disabled = false; // enable query button
    });
}

/**
 * TODO
 * @param {*} data
 */
function saveData(data) {
  const heatMapPlot = elements.views.heatMap.plot;
  const setViewPlot = elements.views.setView.plot;
  const scatterPlot = elements.views.scatterPlot.plot;

  // meta data
  const sentence = data["sentence"];

  // subjects data
  const showAtMostInitially = 5;
  const subjects = data["subjects"];
  const subjectsIDKey = data["subjectsIDKey"];
  const subjectsNameKey = data["subjectsNameKey"];
  const subjectsFilter = subjects.map((s) => s.id).slice(0, showAtMostInitially);

  // predictions data
  const heatMapData = data["heatMapData"];
  const setViewData = data["setViewData"];
  const scatterPlotData = data["scatterPlotData"];
  const predictionsIDKey = data["predictionsIDKey"];
  const predictionsNameKey = data["predictionsNameKey"];
  const predictionsClusters = data["predictionsClusters"];

  // get value range extent of predictions
  const predictionsExtent = d3.extent(heatMapData.map((d) => d.value));

  // save deep copy of data
  heatMapPlot.data.sentence = utils.deepCopy(sentence);
  heatMapPlot.data.subjects = utils.deepCopy(subjects);
  heatMapPlot.data.subjectsIDKey = utils.deepCopy(subjectsIDKey);
  heatMapPlot.data.subjectsNameKey = utils.deepCopy(subjectsNameKey);
  heatMapPlot.data.subjectsFilter = utils.deepCopy(subjectsFilter);
  heatMapPlot.data.predictions = utils.deepCopy(heatMapData);
  heatMapPlot.data.predictionsIDKey = utils.deepCopy(predictionsIDKey);
  heatMapPlot.data.predictionsNameKey = utils.deepCopy(predictionsNameKey);
  heatMapPlot.data.predictionsClusters = utils.deepCopy(predictionsClusters);
  heatMapPlot.data.predictionsExtent = utils.deepCopy(predictionsExtent);

  setViewPlot.data.sentence = utils.deepCopy(sentence);
  setViewPlot.data.subjects = utils.deepCopy(subjects);
  setViewPlot.data.subjectsIDKey = utils.deepCopy(subjectsIDKey);
  setViewPlot.data.subjectsNameKey = utils.deepCopy(subjectsNameKey);
  setViewPlot.data.subjectsFilter = utils.deepCopy(subjectsFilter);
  setViewPlot.data.predictions = utils.deepCopy(setViewData);
  setViewPlot.data.predictionsIDKey = utils.deepCopy(predictionsIDKey);
  setViewPlot.data.predictionsNameKey = utils.deepCopy(predictionsNameKey);
  setViewPlot.data.predictionsClusters = utils.deepCopy(predictionsClusters);
  setViewPlot.data.predictionsExtent = utils.deepCopy(predictionsExtent);

  scatterPlot.data.sentence = utils.deepCopy(sentence);
  scatterPlot.data.subjects = utils.deepCopy(subjects);
  scatterPlot.data.subjectsIDKey = utils.deepCopy(subjectsIDKey);
  scatterPlot.data.subjectsNameKey = utils.deepCopy(subjectsNameKey);
  scatterPlot.data.subjectsFilter = utils.deepCopy(subjectsFilter);
  scatterPlot.data.predictions = utils.deepCopy(scatterPlotData);
  scatterPlot.data.predictionsIDKey = utils.deepCopy(predictionsIDKey);
  scatterPlot.data.predictionsNameKey = utils.deepCopy(predictionsNameKey);
  scatterPlot.data.predictionsClusters = utils.deepCopy(predictionsClusters);
  scatterPlot.data.predictionsExtent = utils.deepCopy(predictionsExtent);

  // add filters for all subjects
  let checkedString = 'checked="true"';
  subjects.forEach((d, i) => {
    if (i >= showAtMostInitially) checkedString = ""; // only show limited number of subjects to start
    const templateString = `
      <div class="flex-row">
        <input type="checkbox" id="show-subject-${d.id}" value="${d.id}" ${checkedString} />
        <label for="show-subject-${d.id}">${d.name}</label>
      </div>`;
    const div = utils.createElementFromTemplate(templateString);
    const showSubjectCheckbox = elements.settings.showSubjectsDiv.appendChild(div).children[0];
    showSubjectCheckbox.addEventListener("click", () => {
      const value = showSubjectCheckbox.value; // string
      const checked = showSubjectCheckbox.checked; // boolean
      if (checked) {
        store.subjectsFilter.push(value);
        heatMapPlot.data.subjectsFilter.push(value);
        setViewPlot.data.subjectsFilter.push(value);
        scatterPlot.data.subjectsFilter.push(value);
      } else {
        store.subjectsFilter = store.subjectsFilter.filter((item) => item !== value);
        heatMapPlot.data.subjectsFilter = heatMapPlot.data.subjectsFilter.filter((item) => item !== value);
        setViewPlot.data.subjectsFilter = setViewPlot.data.subjectsFilter.filter((item) => item !== value);
        scatterPlot.data.subjectsFilter = scatterPlot.data.subjectsFilter.filter((item) => item !== value);
      }
      clearAllViews();
      disableAllViewControls();
      if (store.subjectsFilter.length) {
        renderAllViews();
        resetZoomAllViews();
        enableAllViewControls();
      }
    });
  });

  // store data
  store.predictionsNameKey = predictionsNameKey;
  store.subjectsFilter = subjectsFilter;

  // render views and enable controls
  if (store.subjectsFilter.length) {
    renderAllViews();
    resetZoomAllViews();
    enableAllViewControls();
    enableAllFilterControls();
    elements.settings.dataExportButton.disabled = false;
  }
}

/**
 * TODO
 */
function disableAllViewControls() {
  elements.views.heatMap.controls.sortSelect.disabled = true;
  elements.views.heatMap.controls.resetButton.disabled = true;
  elements.views.setView.controls.sortSelect.disabled = true;
  elements.views.setView.controls.resetButton.disabled = true;
  elements.views.scatterPlot.controls.resetButton.disabled = true;
}

/**
 * TODO
 */
function enableAllViewControls() {
  elements.views.heatMap.controls.sortSelect.disabled = false;
  elements.views.heatMap.controls.resetButton.disabled = false;
  elements.views.setView.controls.sortSelect.disabled = false;
  elements.views.setView.controls.resetButton.disabled = false;
  elements.views.scatterPlot.controls.resetButton.disabled = false;
}

/**
 * TODO
 */
function disableAllFilterControls() {
  elements.settings.searchTextInput.disabled = true;
  elements.settings.searchHighlightButton.disabled = true;
  elements.settings.filterSharedCheckbox.disabled = true;
  elements.settings.filterUniqueCheckbox.disabled = true;
  elements.settings.selectAllSubjectsButton.disabled = true;
  elements.settings.deselectAllSubjectsButton.disabled = true;
}

/**
 * TODO
 */
function enableAllFilterControls() {
  elements.settings.searchTextInput.disabled = false;
  elements.settings.searchHighlightButton.disabled = false;
  elements.settings.searchClearButton.disabled = false;
  elements.settings.filterSharedCheckbox.disabled = false;
  elements.settings.filterUniqueCheckbox.disabled = false;
  elements.settings.selectAllSubjectsButton.disabled = false;
  elements.settings.deselectAllSubjectsButton.disabled = false;
}

/**
 * TODO
 */
function clearFilterPanel() {
  const showSubjectsDiv = elements.settings.showSubjectsDiv;
  while (showSubjectsDiv.firstChild) {
    showSubjectsDiv.removeChild(showSubjectsDiv.lastChild);
  }
}

/**
 * TODO
 */
function resetZoomAllViews() {
  resetZoom("heatMap");
  resetZoom("setView");
}

/**
 * TODO
 */
function clearAllViews() {
  clearView("heatMap");
  clearView("setView");
  clearView("scatterPlot");
}

/**
 * TODO
 */
function renderAllViews() {
  renderView("heatMap");
  renderView("setView");
  renderView("scatterPlot");
}

/**
 * TODO
 * @param {String} viewName heatMap or setView
 */
function resetZoom(viewName) {
  const view = elements.views[viewName];
  const display = view.el.node().getAttribute("display");
  if (display === null || display === "") view.plot.resetZoom();
}

/**
 * TODO
 * @param {String} viewName heatMap, setView, or scatterPlot
 */
function clearView(viewName) {
  const view = elements.views[viewName];
  const display = view.el.node().getAttribute("display");
  if (display === null || display === "") view.plot.clear();
}

/**
 * TODO
 * @param {String} viewName heatMap, setView, or scatterPlot
 */
function renderView(viewName) {
  const view = elements.views[viewName];
  const display = view.el.node().getAttribute("display");
  if (display === null || display === "") view.plot.render();
}

/**
 * TODO
 */
function setListeners() {
  // INPUTS
  const subjectsTextInput = elements.settings.subjectsTextInput;
  const sentenceTextInput = elements.settings.sentenceTextInput;
  const dataQueryButton = elements.settings.dataQueryButton;
  const dataExportButton = elements.settings.dataExportButton;
  // OPTIONS
  const subjectsSetSelect = elements.settings.subjectsSetSelect;
  const subjectsFileInput = elements.settings.subjectsFileInput;
  const sentenceTypeSelect = elements.settings.sentenceTypeSelect;
  const sentenceVariationSelect = elements.settings.sentenceVariationSelect;
  const settingsModelSelect = elements.settings.settingsModelSelect;
  const settingsTopKInput = elements.settings.settingsTopkInput;
  const settingsFillRadio = elements.settings.settingsFillRadio;
  // FILTERS
  const searchHighlightButton = elements.settings.searchHighlightButton;
  const searchClearButton = elements.settings.searchClearButton;
  const searchTextInput = elements.settings.searchTextInput;
  const filterSharedCheckbox = elements.settings.filterSharedCheckbox;
  const filterUniqueCheckbox = elements.settings.filterUniqueCheckbox;
  const selectAllSubjectsButton = elements.settings.selectAllSubjectsButton;
  const deselectAllSubjectsButton = elements.settings.deselectAllSubjectsButton;
  const showSubjectsDiv = elements.settings.showSubjectsDiv;
  // VIEWS
  const heatMapPlot = elements.views.heatMap.plot;
  const heatMapSortSelect = elements.views.heatMap.controls.sortSelect;
  const heatMapResetButton = elements.views.heatMap.controls.resetButton;
  const setViewPlot = elements.views.setView.plot;
  const setViewSortSelect = elements.views.setView.controls.sortSelect;
  const setViewResetButton = elements.views.setView.controls.resetButton;
  const scatterPlot = elements.views.scatterPlot.plot;
  const scatterPlotLabelsCheckbox = elements.views.scatterPlot.controls.labelsCheckbox;
  const scatterPlotResetButton = elements.views.scatterPlot.controls.resetButton;
  // DIVIDERS
  const inputWrapper = elements.settings.inputWrapper;
  const inputFilterDivider = elements.dividers.inputFilterDivider;
  const filterWrapper = elements.settings.filterWrapper;
  const settingsPanel = elements.settings.panel;
  const settingsViewsDivider = elements.dividers.settingsViewsDivider;
  const viewsPanel = elements.views.panel;
  const heatMapWrapper = elements.views.heatMap.wrapper;
  const heatSetDivider = elements.dividers.heatSetDivider;
  const setViewWrapper = elements.views.setView.wrapper;
  const setScatterDivider = elements.dividers.setScatterDivider;
  const scatterPlotWrapper = elements.views.scatterPlot.wrapper;

  // re-render on window resize
  window.addEventListener("resize", utils.throttle(renderAllViews, 1000), true);

  // INPUTS

  dataQueryButton.addEventListener("click", () => {
    // assume query params are valid
    subjectsTextInput.style.border = "";
    settingsFillRadio.forEach((x) => (x.parentElement.style.border = ""));
    settingsTopKInput.style.border = "";
    sentenceTextInput.style.border = "";

    // split subjects String into list of subjects objects
    // from: "subject1; subject2; ..."
    // to:   [{sid1, subject1}, {sid2, subject2}, ...]
    const subjects = subjectsTextInput.value
      .split(";")
      .map((x) => x.trim())
      .filter((x) => x)
      .map((x, i) => {
        return { id: `s${i}`, name: x };
      });

    // get selected radio button from set of options
    let fill = null;
    for (let i = 0; i < settingsFillRadio.length; i++) {
      if (settingsFillRadio[i].checked) {
        fill = settingsFillRadio[i].value;
      }
    }

    const topk = parseInt(settingsTopKInput.value);
    const model = settingsModelSelect.value;
    const sentence = sentenceTextInput.value;

    const validSubjects = subjects.length; // at least one subject is required
    const validFill = fill; // must have a selected fill
    const validTopK = !isNaN(topk) && topk > 0; // topk must be number greater than 0
    const validSentence = /\[X\].* .*\[Y\]|\[Y\].* .*\[X\]/.test(sentence); // sentence must contain [X] and [Y]

    if (!validSubjects) {
      console.log("invalid subjects:");
      console.log(subjects);
      subjectsTextInput.style.border = "1px solid red";
    } else if (!validTopK) {
      console.log("invalid topk:");
      console.log(topk);
      settingsTopKInput.style.border = "1px solid red";
    } else if (!validFill) {
      console.log("invalid fill:");
      console.log(fill);
      settingsFillRadio.forEach((x) => (x.parentElement.style.border = "1px solid red"));
    } else if (!validSentence) {
      console.log("invalid sentence:");
      console.log(sentence);
      sentenceTextInput.style.border = "1px solid red";
    } else {
      // valid params
      requestData({
        subjects: subjects,
        fill: fill,
        topk: topk,
        model: model,
        sentence: sentence,
      });
    }
  });

  subjectsSetSelect.addEventListener("change", () => {
    const value = subjectsSetSelect.value;
    subjectsTextInput.value = store.subjectSets[value].data.join("; ");
  });

  subjectsFileInput.addEventListener("change", () => {
    const file = subjectsFileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        subjectsTextInput.value = text.replace(/(?:\r\n|\r|\n)/g, "; ");
      };
      reader.readAsText(file);
    }
  });

  sentenceTypeSelect.addEventListener("change", () => {
    const value = sentenceTypeSelect.value;
    const phrases = store.sentenceSets[value].manualParaphrase;
    while (sentenceVariationSelect.firstChild) {
      // clear variations select options
      sentenceVariationSelect.removeChild(sentenceVariationSelect.lastChild);
    }
    if (phrases.length) {
      // multiple phrases -- add new options
      elements.settings.sentenceVariationSelect.disabled = false;
      phrases.forEach((phrase, i) => {
        const optVariation = document.createElement("option");
        optVariation.value = i;
        optVariation.textContent = phrase;
        elements.settings.sentenceVariationSelect.appendChild(optVariation);
      });
      sentenceTextInput.value = phrases[0];
    } else {
      // no phrases -- disable select
      elements.settings.sentenceVariationSelect.disabled = true;
      sentenceTextInput.value = "";
    }
  });
  sentenceVariationSelect.addEventListener("change", () => {
    const value = sentenceVariationSelect.value;
    const phrases = store.sentenceSets[sentenceTypeSelect.value].manualParaphrase;
    sentenceTextInput.value = phrases[value];
  });

  // FILTERS

  searchHighlightButton.addEventListener("click", () => {
    searchTextInput.style.border = ""; // assume query params are valid
    const names = searchTextInput.value // split names String into list of names
      .split(";")
      .map((x) => x.trim())
      .filter((x) => x);
    const validNames = names.length; // at least one names is required
    if (!validNames) {
      searchTextInput.style.border = "1px solid red";
    } else {
      names.forEach((name) => d3.selectAll(`#${store.predictionsNameKey[name]}`).attr("selected", true));
    }
  });

  searchClearButton.addEventListener("click", () => {
    d3.selectAll("#heat-map .heat-prediction-rect").attr("selected", "");
    d3.selectAll("#set-view .set-prediction-text").attr("selected", "");
    d3.selectAll("#scatter-plot .scatter-common-prediction-text").attr("selected", "");
  });

  filterSharedCheckbox.addEventListener("click", () => {
    const checked = filterSharedCheckbox.checked; // boolean
    filterUniqueCheckbox.checked = false;
    heatMapPlot.controls.filterShared = checked;
    heatMapPlot.controls.filterUnique = false;
    setViewPlot.controls.filterShared = checked;
    setViewPlot.controls.filterUnique = false;
    scatterPlot.controls.filterShared = checked;
    scatterPlot.controls.filterUnique = false;
    clearAllViews();
    disableAllViewControls();
    if (store.subjectsFilter.length) {
      renderAllViews();
      resetZoomAllViews();
      enableAllViewControls();
    }
  });

  filterUniqueCheckbox.addEventListener("click", () => {
    const checked = filterUniqueCheckbox.checked; // boolean
    filterSharedCheckbox.checked = false;
    heatMapPlot.controls.filterShared = false;
    heatMapPlot.controls.filterUnique = checked;
    setViewPlot.controls.filterShared = false;
    setViewPlot.controls.filterUnique = checked;
    scatterPlot.controls.filterShared = false;
    scatterPlot.controls.filterUnique = checked;
    clearAllViews();
    disableAllViewControls();
    if (store.subjectsFilter.length) {
      renderAllViews();
      resetZoomAllViews();
      enableAllViewControls();
    }
  });

  selectAllSubjectsButton.addEventListener("click", () => {
    // clear subjects filters
    store.subjectsFilter = [];
    heatMapPlot.data.subjectsFilter = [];
    setViewPlot.data.subjectsFilter = [];
    scatterPlot.data.subjectsFilter = [];
    // set all checkboxes to checked
    [...showSubjectsDiv.children].forEach((child) => {
      const showSubjectCheckbox = child.children[0]; // get checkbox
      const value = showSubjectCheckbox.value; // string
      showSubjectCheckbox.checked = true; // set checked
      store.subjectsFilter.push(value);
      heatMapPlot.data.subjectsFilter.push(value);
      setViewPlot.data.subjectsFilter.push(value);
      scatterPlot.data.subjectsFilter.push(value);
    });
    // re-render views and enable controls
    clearAllViews();
    renderAllViews();
    resetZoomAllViews();
    enableAllViewControls();
  });

  deselectAllSubjectsButton.addEventListener("click", () => {
    // clear subjects filters
    store.subjectsFilter = [];
    heatMapPlot.data.subjectsFilter = [];
    setViewPlot.data.subjectsFilter = [];
    scatterPlot.data.subjectsFilter = [];
    // set all checkboxes to unchecked
    [...showSubjectsDiv.children].forEach((child) => {
      const showSubjectCheckbox = child.children[0]; // get checkbox
      showSubjectCheckbox.checked = false; // set unchecked
    });
    // clear views and disable controls
    clearAllViews();
    disableAllViewControls();
  });

  // VIEWS

  heatMapSortSelect.addEventListener("change", () => {
    const value = heatMapSortSelect.value;
    heatMapPlot.controls.sortBy = value;
    clearView("heatMap");
    renderView("heatMap");
    resetZoom("heatMap");
  });

  heatMapResetButton.addEventListener("click", () => {
    clearView("heatMap");
    renderView("heatMap");
    resetZoom("heatMap");
  });

  setViewSortSelect.addEventListener("change", () => {
    const value = setViewSortSelect.value;
    setViewPlot.controls.sortBy = value;
    clearView("setView");
    renderView("setView");
    resetZoom("setView");
  });

  setViewResetButton.addEventListener("click", () => {
    clearView("setView");
    renderView("setView");
    resetZoom("setView");
  });

  scatterPlotLabelsCheckbox.addEventListener("click", () => {
    const value = scatterPlotLabelsCheckbox.checked;
    d3.select("#scatter-plot").attr("hide-labels", value ? "true" : "false");
  });

  scatterPlotResetButton.addEventListener("click", () => {
    scatterPlotLabelsCheckbox.checked = false;
    clearView("scatterPlot");
    renderView("scatterPlot");
  });

  // DIVIDERS

  const mousemoveInputFilterDivider = (event) => {
    const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const inputFilterDividerWidth = utils.getAbsoluteWidth(inputFilterDivider);
    const inputWrapperWidth = event.clientX;
    inputWrapper.style.width = `${inputWrapperWidth}px`;
    const filterWrapperWidth = viewWidth - inputWrapperWidth - inputFilterDividerWidth;
    filterWrapper.style.width = `${filterWrapperWidth}px`;
  };

  const mousemoveSettingsViewsDivider = (event) => {
    const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const headerHeight = utils.getAbsoluteHeight(elements.header);
    const settingsViewsDividerHeight = utils.getAbsoluteHeight(settingsViewsDivider);
    const settingsPanelHeight = Math.min(
      Math.max(event.clientY - headerHeight, 0), // set to this value
      viewHeight - headerHeight - settingsViewsDividerHeight // don't go past this value
    );
    settingsPanel.style.height = `${settingsPanelHeight}px`;
    const viewsPanelHeight = Math.max(viewHeight - headerHeight - settingsPanelHeight - settingsViewsDividerHeight, 0);
    viewsPanel.style.height = `${viewsPanelHeight}px`;
  };

  const mousemoveHeatSetDivider = (event) => {
    const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const heatSetDividerWidth = utils.getAbsoluteWidth(heatSetDivider);
    const setScatterDividerWidth = utils.getAbsoluteWidth(setScatterDivider);
    const scatterPlotWrapperWidth = utils.getAbsoluteWidth(scatterPlotWrapper);
    const heatMapWrapperWidth = Math.min(
      Math.max(event.clientX, 0), // set to this value
      viewWidth - heatSetDividerWidth - setScatterDividerWidth - scatterPlotWrapperWidth // don't go past this value
    );
    heatMapWrapper.style.width = `${heatMapWrapperWidth}px`;
    const setViewWrapperWidth = Math.max(
      viewWidth - heatMapWrapperWidth - heatSetDividerWidth - setScatterDividerWidth - scatterPlotWrapperWidth,
      0
    );
    setViewWrapper.style.width = `${setViewWrapperWidth}px`;
  };

  const mousemoveSetScatterDivider = (event) => {
    const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const heatSetDividerWidth = utils.getAbsoluteWidth(heatSetDivider);
    const setScatterDividerWidth = utils.getAbsoluteWidth(setScatterDivider);
    const heatMapWrapperWidth = utils.getAbsoluteWidth(heatMapWrapper);
    const setViewWrapperWidth = Math.min(
      Math.max(event.clientX - heatMapWrapperWidth - heatSetDividerWidth, 0), // set to this value
      viewWidth - heatMapWrapperWidth - heatSetDividerWidth - setScatterDividerWidth // don't go past this value
    );
    setViewWrapper.style.width = `${setViewWrapperWidth}px`;
    const scatterPlotWrapperWidth = Math.max(
      viewWidth - heatMapWrapperWidth - heatSetDividerWidth - setViewWrapperWidth - setScatterDividerWidth,
      0
    );
    scatterPlotWrapper.style.width = `${scatterPlotWrapperWidth}px`;
  };

  let dragTarget;
  let dragTargetID;

  const dragListeners = {
    "input-filter-divider": mousemoveInputFilterDivider,
    "settings-views-divider": mousemoveSettingsViewsDivider,
    "heat-set-divider": mousemoveHeatSetDivider,
    "set-scatter-divider": mousemoveSetScatterDivider,
  };

  const mousedown = (event) => {
    event.preventDefault();
    dragTarget = event.target;
    dragTarget.classList.add("dragging");
    dragTargetID = dragTarget.getAttribute("id");
    window.addEventListener("mousemove", dragListeners[dragTargetID], true);
  };

  const mouseup = (event) => {
    if (dragTarget) {
      event.preventDefault();
      dragTarget.classList.remove("dragging");
      dragTargetID = dragTarget.getAttribute("id");
      dragTarget = null;
      window.removeEventListener("mousemove", dragListeners[dragTargetID], true);
    }
  };

  inputFilterDivider.addEventListener("mousedown", mousedown, false);
  settingsViewsDivider.addEventListener("mousedown", mousedown, false);
  heatSetDivider.addEventListener("mousedown", mousedown, false);
  setScatterDivider.addEventListener("mousedown", mousedown, false);

  window.addEventListener("mouseup", mouseup, false);
}
