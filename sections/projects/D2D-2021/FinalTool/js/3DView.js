import * as THREE from "./libs/three/build/three.module.js";
import { OrbitControls } from "./libs/three/examples/jsm/controls/OrbitControls.js";

class clipPlane {
  constructor(normal, constant) {
    this.plane = new THREE.Plane(normal, constant);
    this.bounds = [0, 0];
    this.global = false;
    this.helper = undefined;
  }
}

Object.defineProperty(clipPlane.prototype, "normal", {
  get() {
    return this.plane.normal;
  },
  set(val) {
    this.plane.set(val, this.plane.constant);
  },
});

Object.defineProperty(clipPlane.prototype, "constant", {
  get() {
    return this.plane.constant;
  },
  set(val) {
    this.plane.set(this.plane.normal, val);
  },
});

export default class ThreeDView {
  // key variables
  canvas;
  renderer;
  scene;
  controls;
  camera;
  mesh;
  gridHelper;
  axesHelper;
  frustumHelper;
  light1;
  light2;
  dataPoints; // list of data points
  dataTable; // lookup table of data points indexed by `(x, y, z)`
  dataBounds; // min-max of incoming data x, y, z

  // helper objects
  matrix = new THREE.Matrix4(); // dummy matrix helper
  color = new THREE.Color(); // dummy color helper
  cmaps = {
    Viridis: d3.interpolateViridis,
    Cividis: d3.interpolateCividis,
    Greys: d3.interpolateGreys,
    Inferno: d3.interpolateInferno,
    Plasma: d3.interpolatePlasma,
    Magma: d3.interpolateMagma,
  };
  clipPlanes = {
    x: new clipPlane(new THREE.Vector3(1, 0, 0), 0),
    y: new clipPlane(new THREE.Vector3(0, -1, 0), 0),
    z: new clipPlane(new THREE.Vector3(0, 0, -1), 0),
  };

  // parameters
  file = $("#3d-file-select").find(":selected").text().trim(); // file to load
  shape = $("#shape-select").find(":selected").text().trim(); // shape to render
  cmap = $("#cmap-select").find(":selected").text().trim(); // color map to use
  variable = $("#variable-select").find(":selected").text().trim(); // variable to display
  showInterp = $("#interp-toggle-checkbox").prop("checked"); // whether to show interpolated values

  // flags
  renderRequested = false; // flag for whether to re-render or not
  gridHelperVisible = true; // show grid helper by default
  axesHelperVisible = false; // hide axes helper by default
  frustumHelperVisible = false; // hide frustum helper by default
  xClipPlaneHelperVisible = true; // show clip plane helpers by default
  yClipPlaneHelperVisible = true;
  zClipPlaneHelperVisible = true;
  hideCameraSliders = false; // hide sliders by default
  hideViewSliders = false;

  constructor() {
    // set the event listeners
    $(window).on("resize", this.requestRenderIfNotRequested);
    $("#3d-file-select, #shape-select, #cmap-select, #variable-select, #interp-toggle-checkbox").on(
      "change",
      this.clean
    );
    $("#fov-input, #near-input, #far-input").on("input", this.updateCamera);
    $("#grid-elev-input, #x-clip-input, #y-clip-input, #z-clip-input").on("input", this.updateObjects);
    $(`#grid-elev-toggle-checkbox,
       #x-clip-global-checkbox,
       #y-clip-global-checkbox,
       #z-clip-global-checkbox,
       #x-clip-flip-checkbox,
       #y-clip-flip-checkbox,
       #z-clip-flip-checkbox,
       #x-clip-helper-checkbox,
       #y-clip-helper-checkbox,
       #z-clip-helper-checkbox
    `).on("click", this.updateHelpers);
    $("#camera-reset-btn").on("click", this.resetCamera);
    $("#view-reset-btn").on("click", this.resetView);
    $("#camera-sliders-toggle-icon").on("click", () => {
      if (this.hideCameraSliders) {
        this.hideCameraSliders = false;
        $("#camera-sliders-toggle-icon").html("&#x25BC;");
        $("#camera-sliders").hide();
      } else {
        this.hideCameraSliders = true;
        $("#camera-sliders-toggle-icon").html("&#x25B2;");
        $("#camera-sliders").show();
      }
    });
    $("#view-sliders-toggle-icon").on("click", () => {
      if (this.hideViewSliders) {
        this.hideViewSliders = false;
        $("#view-sliders-toggle-icon").html("&#x25BC;");
        $("#view-sliders").hide();
      } else {
        this.hideViewSliders = true;
        $("#view-sliders-toggle-icon").html("&#x25B2;");
        $("#view-sliders").show();
      }
    });

    // set initial camera inputs and params
    $("#fov-input").val(50);
    $("#near-input").val(0.1);
    $("#far-input").val(2000);
    $("#fov-output").html($("#fov-input").val());
    $("#near-output").html($("#near-input").val());
    $("#far-output").html($("#far-input").val());
    $("#near-input").attr("max", parseFloat($("#far-input").val()) - 0.1);
    $("#far-input").attr("min", parseFloat($("#near-input").val()) + 0.1);

    // set initial view inputs and params
    $("#grid-elev-input").val(-30);
    $("#grid-elev-output").html(`${$("#grid-elev-input").val()}cm`);

    // hide the sliders initially
    $("#camera-sliders").hide();
    $("#view-sliders").hide();
  }

  init = () => {
    this.canvas = $("#c")[0]; // canvas

    // renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.localClippingEnabled = true;

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x004561);

    // camera
    const fov = 50; // field of view
    const aspect = 2; // aspect ratio; the canvas default is 2
    const near = 0.1; // near clipping plane
    const far = 2000; // far clipping plane
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(-100, 50, 100); // move camera away from origin

    // controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.listenToKeyEvents(window);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 0;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    $(this.controls).on("change", this.requestRenderIfNotRequested);

    // lights
    this.light1 = new THREE.HemisphereLight(0xffffff, 0x000088);
    this.light1.position.set(-1, 1.5, 1);
    this.scene.add(this.light1);
    this.light2 = new THREE.HemisphereLight(0xffffff, 0x880000, 0.5);
    this.light2.position.set(-1, -1.5, -1);
    this.scene.add(this.light2);

    // frustum helper
    this.frustumHelper = new THREE.CameraHelper(this.camera);
    this.frustumHelper.name = "frustumHelper";
    this.frustumHelper.visible = this.frustumHelperVisible;
    this.scene.add(this.frustumHelper);

    // grid helper
    this.gridHelper = new THREE.GridHelper(1000, 1000, "black", "#C2B280");
    this.gridHelper.name = "gridHelper";
    this.gridHelper.visible = this.gridHelperVisible;
    this.scene.add(this.gridHelper);

    // axis helper
    this.axesHelper = new THREE.AxesHelper(25);
    this.axesHelper.name = "axesHelper";
    this.axesHelper.visible = this.axesHelperVisible;
    this.scene.add(this.axesHelper);

    // plane helpers
    this.clipPlanes.x.helper = new THREE.PlaneHelper(this.clipPlanes.x.plane, 60, 0xff0000);
    this.clipPlanes.x.helper.name = "xClipPlaneHelper";
    this.clipPlanes.x.helper.visible = this.xClipPlaneHelperVisible;
    this.clipPlanes.y.helper = new THREE.PlaneHelper(this.clipPlanes.y.plane, 60, 0x00ff00);
    this.clipPlanes.y.helper.name = "yClipPlaneHelper";
    this.clipPlanes.x.helper.visible = this.yClipPlaneHelperVisible;
    this.clipPlanes.z.helper = new THREE.PlaneHelper(this.clipPlanes.z.plane, 60, 0x0000ff);
    this.clipPlanes.z.helper.name = "zClipPlaneHelper";
    this.clipPlanes.x.helper.visible = this.zClipPlaneHelperVisible;
    this.scene.add(this.clipPlanes.x.helper);
    this.scene.add(this.clipPlanes.y.helper);
    this.scene.add(this.clipPlanes.z.helper);
  };

  loadFile = async (url) => {
    const res = await fetch(url);
    return res.text();
  };

  parseData = (text) => {
    // initialize new data structures
    this.dataPoints = [];
    this.dataTable = {};
    this.dataBounds = {
      x: [0, 0],
      y: [0, 0],
      z: [0, 0],
      d: [0, 0],
    };
    const vars = $.map($("#variable-select option"), (opt) => opt.text);
    vars.forEach((v) => (this.dataBounds[v] = [0, 0]));
    // parse csv data, where each row becomes an object
    $.csv.toObjects(text, {}, (err, data) => {
      if (err) {
        console.log(err);
      }
      // set initial x,y,z,dist bounds using first point
      // these columns are always fully populated, so taking the first
      // value should be fine
      let i = 0;
      let d = data[i];
      this.dataBounds.x[0] = parseFloat(d.X);
      this.dataBounds.x[1] = parseFloat(d.X);
      this.dataBounds.y[0] = parseFloat(d.Y);
      this.dataBounds.y[1] = parseFloat(d.Y);
      this.dataBounds.z[0] = parseFloat(d.Z);
      this.dataBounds.z[1] = parseFloat(d.Z);
      this.dataBounds.d[0] = parseFloat(d["dist_to_nearest"]);
      this.dataBounds.d[1] = parseFloat(d["dist_to_nearest"]);
      // some datasets (like linear) have missing values for variables
      // walk through until you can set initial bounds on each variable
      let varSet = vars.map(() => false);
      let stopIter = true;
      for (let j = 0; j < data.length; j++) {
        for (let k = 0; k < vars.length; k++) {
          if (!varSet[k]) {
            const v = parseFloat(data[j][vars[k]]);
            if (v) {
              this.dataBounds[vars[k]][0] = v;
              this.dataBounds[vars[k]][1] = v;
              varSet[k] = true;
            } else {
              stopIter = false;
            }
          }
        }
        if (stopIter) break;
      }
      // store first data point
      this.dataPoints.push(d);
      this.dataTable[`(${d.X}, ${d.Y}, ${d.Z})`] = d;
      i++;
      // walk through the rest of the points
      for (i; i < data.length; i++) {
        d = data[i];
        this.dataBounds.x[0] = Math.min(this.dataBounds.x[0], parseFloat(d.X));
        this.dataBounds.x[1] = Math.max(this.dataBounds.x[1], parseFloat(d.X));
        this.dataBounds.y[0] = Math.min(this.dataBounds.y[0], parseFloat(d.Y));
        this.dataBounds.y[1] = Math.max(this.dataBounds.y[1], parseFloat(d.Y));
        this.dataBounds.z[0] = Math.min(this.dataBounds.z[0], parseFloat(d.Z));
        this.dataBounds.z[1] = Math.max(this.dataBounds.z[1], parseFloat(d.Z));
        this.dataBounds.d[0] = Math.min(this.dataBounds.d[0], parseFloat(d["dist_to_nearest"]));
        this.dataBounds.d[1] = Math.max(this.dataBounds.d[1], parseFloat(d["dist_to_nearest"]));
        for (let k = 0; k < vars.length; k++) {
          const v = parseFloat(d[vars[k]]);
          if (v) {
            this.dataBounds[vars[k]][0] = Math.min(this.dataBounds[vars[k]][0], v);
            this.dataBounds[vars[k]][1] = Math.max(this.dataBounds[vars[k]][1], v);
          }
        }
        this.dataPoints.push(d);
        this.dataTable[`(${d.X}, ${d.Y}, ${d.Z})`] = d;
      }
      const step = parseInt(this.file.split(".")[0].split("_")[3].replace("cm", ""));
      // set clipping plane bounds
      this.clipPlanes.x.bounds = [this.dataBounds.x[0] - step / 2, this.dataBounds.x[1] + step / 2];
      this.clipPlanes.y.bounds = [this.dataBounds.z[0], this.dataBounds.z[1]];
      this.clipPlanes.z.bounds = [this.dataBounds.y[0] - step / 2, this.dataBounds.y[1] + step / 2];
      // set constants, applying small correction to start
      this.clipPlanes.x.constant = -Math.sign(this.clipPlanes.x.normal.x) * this.clipPlanes.x.bounds[0] + 0.01;
      this.clipPlanes.y.constant = 30.01;
      this.clipPlanes.z.constant = Math.sign(this.clipPlanes.z.normal.z) * this.clipPlanes.z.bounds[0] + 0.01;
      // set clipping plane limits
      $("#x-clip-input").attr("min", this.clipPlanes.x.bounds[0]);
      $("#x-clip-input").attr("max", this.clipPlanes.x.bounds[1]);
      $("#x-clip-input").attr("step", step);
      $("#x-clip-input").val(this.clipPlanes.x.bounds[0]);
      $("#y-clip-input").attr("min", -30);
      $("#y-clip-input").attr("max", 0);
      $("#y-clip-input").attr("step", 1);
      $("#y-clip-input").val(0);
      $("#z-clip-input").attr("min", this.clipPlanes.z.bounds[0]);
      $("#z-clip-input").attr("max", this.clipPlanes.z.bounds[1]);
      $("#z-clip-input").attr("step", step);
      $("#z-clip-input").val(this.clipPlanes.z.bounds[0]);
      // set clip limit outputs
      $("#x-clip-output").html(`${$("#x-clip-input").val()}cm`);
      $("#y-clip-output").html(`${$("#y-clip-input").val()}cm`);
      $("#z-clip-output").html(`${$("#z-clip-input").val()}cm`);
    });
  };

  addMesh = () => {
    // build the geometry
    let geometry;
    const height = 1; // y axis, 1 cm depth
    switch (this.shape) {
      case "Cylinder":
        const radiusTop = 7 / 2; // 7 cm diameter
        const radiusBottom = 7 / 2; // 7 cm diameter
        const radialSegments = 12; // number of edges
        geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        break;
      case "Prism":
        const res = parseInt(this.file.split(".")[0].split("_")[3].replace("cm", "")); // based on the interpolation
        const width = res; // x axis, in cm
        const depth = res; // z axis, in cm
        geometry = new THREE.BoxGeometry(width, height, depth);
        break;
    }

    // build the material
    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      clippingPlanes: [this.clipPlanes.x.plane, this.clipPlanes.y.plane, this.clipPlanes.z.plane],
      clipIntersection: true,
    });

    // create a new instanced mesh
    this.mesh = new THREE.InstancedMesh(geometry, material, this.dataPoints.length);

    // apply transformations at every vertex to get final shape
    const colorScale = this.cmaps[this.cmap]; // get interpolator
    const varBounds = this.dataBounds[this.variable]; // get var bounds
    for (let i = 0; i < this.dataPoints.length; i++) {
      const dataPoint = this.dataPoints[i];
      const o = parseFloat(dataPoint["observed"]);
      if (this.showInterp) {
        const v = parseFloat(dataPoint[this.variable]);
        if (v) {
          // transform
          const x = parseFloat(dataPoint.X);
          const y = parseFloat(dataPoint.Y);
          const z = parseFloat(dataPoint.Z);
          // const d = parseFloat(dataPoint["dist_to_nearest"]);
          // const d_norm = (d - this.dataBounds.d[1]) / (this.dataBounds.d[0] - this.dataBounds.d[1]);
          // this.matrix.makeScale(1, d_norm, 1);
          this.matrix.setPosition(x, -(z + height / 2) + 30, -y);
          this.mesh.setMatrixAt(i, this.matrix);

          // color
          let v_norm = (v - varBounds[0]) / (varBounds[1] - varBounds[0]);
          if (this.cmap == "Greys") v_norm = 1 - v_norm; // invert scale
          this.mesh.setColorAt(i, this.color.set(colorScale(v_norm)));

          // border
          if (o) {
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
            line.geometry.applyMatrix4(this.matrix);
            this.scene.add(line);
          }
        }
      } else if (!this.showInterp && o) {
        const v = parseFloat(dataPoint[this.variable]);
        if (v) {
          // transform
          const x = parseFloat(dataPoint.X);
          const y = parseFloat(dataPoint.Y);
          const z = parseFloat(dataPoint.Z);
          // const d = parseFloat(dataPoint["dist_to_nearest"]);
          // const d_norm = (d - this.dataBounds.d[1]) / (this.dataBounds.d[0] - this.dataBounds.d[1]);
          // this.matrix.makeScale(1, d_norm, 1);
          this.matrix.setPosition(x, -(z + height / 2) + 30, -y);
          this.mesh.setMatrixAt(i, this.matrix);

          // color
          let v_norm = (v - varBounds[0]) / (varBounds[1] - varBounds[0]);
          if (this.cmap == "Greys") v_norm = 1 - v_norm; // invert scale
          this.mesh.setColorAt(i, this.color.set(colorScale(v_norm)));

          // border
          // const edges = new THREE.EdgesGeometry(geometry);
          // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
          // line.geometry.applyMatrix4(this.matrix);
          // this.scene.add(line);
        }
      }
    }

    // add mesh to the scene
    this.scene.add(this.mesh);
  };

  updateHelpers = (e) => {
    const el = $(e.target);
    const id = el.attr("id");
    switch (id) {
      case "grid-elev-toggle-checkbox":
        this.gridHelperVisible = !this.gridHelperVisible; // toggle
        this.gridHelper.visible = this.gridHelperVisible; // set state
        if (this.gridHelperVisible) {
          this.updateObjects();
        } else {
          this.requestRenderIfNotRequested();
        }
        break;
      case "x-clip-global-checkbox":
        this.clipPlanes.x.global = !this.clipPlanes.x.global;
        this.updateObjects();
        break;
      case "y-clip-global-checkbox":
        this.clipPlanes.y.global = !this.clipPlanes.y.global;
        this.updateObjects();
        break;
      case "z-clip-global-checkbox":
        this.clipPlanes.z.global = !this.clipPlanes.z.global;
        this.updateObjects();
        break;
      case "x-clip-flip-checkbox":
        this.clipPlanes.x.normal = this.clipPlanes.x.normal.negate();
        this.updateObjects();
        break;
      case "y-clip-flip-checkbox":
        this.clipPlanes.y.normal = this.clipPlanes.y.normal.negate();
        this.updateObjects();
        break;
      case "z-clip-flip-checkbox":
        this.clipPlanes.z.normal = this.clipPlanes.z.normal.negate();
        this.updateObjects();
        break;
      case "x-clip-helper-checkbox":
        this.xClipPlaneHelperVisible = !this.xClipPlaneHelperVisible; // toggle
        this.clipPlanes.x.helper.visible = this.xClipPlaneHelperVisible; // set state
        this.requestRenderIfNotRequested();
        break;
      case "y-clip-helper-checkbox":
        this.yClipPlaneHelperVisible = !this.yClipPlaneHelperVisible; // toggle
        this.clipPlanes.y.helper.visible = this.yClipPlaneHelperVisible; // set state
        this.requestRenderIfNotRequested();
        break;
      case "z-clip-helper-checkbox":
        this.zClipPlaneHelperVisible = !this.zClipPlaneHelperVisible; // toggle
        this.clipPlanes.z.helper.visible = this.zClipPlaneHelperVisible; // set state
        this.requestRenderIfNotRequested();
        break;
    }
  };

  updateObjects = () => {
    // adjust gridHelper
    if (this.gridHelperVisible) this.gridHelper.position.y = 30 + parseFloat($("#grid-elev-input").val());

    // adjust clip planes, correcting at the boundaries to avoid glitchy textures
    // this took forever to figure out... I hope someone appreciates this...

    // x axis
    const xSign = Math.sign(this.clipPlanes.x.normal.x);
    const xInput = parseFloat($("#x-clip-input").val());
    if (xInput == this.clipPlanes.x.bounds[0]) {
      this.clipPlanes.x.constant = -xSign * (xInput - 0.01);
    } else if (xInput == this.clipPlanes.x.bounds[1]) {
      this.clipPlanes.x.constant = -xSign * (xInput + 0.01);
    } else {
      this.clipPlanes.x.constant = -xSign * xInput + 0.01;
    }

    // y axis
    const ySign = Math.sign(this.clipPlanes.y.normal.y);
    const yInput = parseFloat($("#y-clip-input").val());
    if (yInput == this.clipPlanes.y.bounds[0]) {
      this.clipPlanes.y.constant = -ySign * (yInput + 30.01);
    } else if (yInput == -(this.clipPlanes.y.bounds[1] + 1)) {
      this.clipPlanes.y.constant = -ySign * (yInput + 29.99);
    } else {
      this.clipPlanes.y.constant = -ySign * (yInput + 30) + 0.01;
    }

    // z axis
    const zSign = Math.sign(this.clipPlanes.z.normal.z);
    const zInput = parseFloat($("#z-clip-input").val());
    if (zInput == this.clipPlanes.z.bounds[0]) {
      this.clipPlanes.z.constant = zSign * (zInput - 0.01);
    } else if (zInput == this.clipPlanes.z.bounds[1]) {
      this.clipPlanes.z.constant = zSign * (zInput + 0.01);
    } else {
      this.clipPlanes.z.constant = zSign * zInput + 0.01;
    }

    // update outputs
    $("#grid-elev-output").html(`${$("#grid-elev-input").val()}cm`);
    $("#x-clip-output").html(`${$("#x-clip-input").val()}cm`);
    $("#y-clip-output").html(`${$("#y-clip-input").val()}cm`);
    $("#z-clip-output").html(`${$("#z-clip-input").val()}cm`);

    // set global clip planes, if any are toggled
    let globalPlanes = [];
    if (this.clipPlanes.x.global) globalPlanes.push(this.clipPlanes.x.plane);
    if (this.clipPlanes.y.global) globalPlanes.push(this.clipPlanes.y.plane);
    if (this.clipPlanes.z.global) globalPlanes.push(this.clipPlanes.z.plane);
    this.renderer.clippingPlanes = globalPlanes.length > 0 ? globalPlanes : Object.freeze([]);

    // re-render
    this.requestRenderIfNotRequested();
  };

  updateCamera = () => {
    // update camera
    this.camera.fov = parseFloat($("#fov-input").val());
    this.camera.near = parseFloat($("#near-input").val());
    this.camera.far = parseFloat($("#far-input").val());
    this.camera.updateProjectionMatrix();
    // update outputs to match inputs
    $("#fov-output").html($("#fov-input").val());
    $("#near-output").html($("#near-input").val());
    $("#far-output").html($("#far-input").val());
    // update max / min ranges for clipping planes
    $("#near-input").attr("max", parseFloat($("#far-input").val()) - 0.1);
    $("#far-input").attr("min", parseFloat($("#near-input").val()) + 0.1);
    // re-render
    this.requestRenderIfNotRequested();
  };

  resetCamera = () => {
    // update inputs to be default value
    $("#fov-input").val(50);
    $("#near-input").val(0.1);
    $("#far-input").val(2000);
    // update orbit controls camera
    this.controls.object.position.set(-100, 50, 100);
    this.controls.target = new THREE.Vector3(100, 0, -100);
    this.updateCamera();
  };

  resetView = () => {
    // reset gridhelper
    this.gridHelperVisible = true; // set flag
    this.gridHelper.visible = true; // set state
    this.gridHelper.position.y = 0; // set position
    $("#grid-elev-toggle-checkbox").prop("checked", true);
    $("#grid-elev-input").val(-30);
    $("#grid-elev-output").html(`${$("#grid-elev-input").val()}cm`);

    // reset global clip planes
    this.clipPlanes.x.global = false;
    this.clipPlanes.y.global = false;
    this.clipPlanes.z.global = false;
    $("#x-clip-global-checkbox").prop("checked", false);
    $("#y-clip-global-checkbox").prop("checked", false);
    $("#z-clip-global-checkbox").prop("checked", false);
    this.renderer.clippingPlanes = Object.freeze([]);

    // reset clipping plane normals and inputs
    this.clipPlanes.x.normal = new THREE.Vector3(1, 0, 0);
    this.clipPlanes.y.normal = new THREE.Vector3(0, -1, 0);
    this.clipPlanes.z.normal = new THREE.Vector3(0, 0, -1);
    $("#x-clip-flip-checkbox").prop("checked", false);
    $("#y-clip-flip-checkbox").prop("checked", false);
    $("#z-clip-flip-checkbox").prop("checked", false);

    // reset clipping plane helpers
    this.xClipPlaneHelperVisible = true; // set flag
    this.clipPlanes.x.helper.visible = true; // set state
    $("#x-clip-helper-checkbox").prop("checked", true);
    this.yClipPlaneHelperVisible = true; // set flag
    this.clipPlanes.y.helper.visible = true; // set state
    $("#y-clip-helper-checkbox").prop("checked", true);
    this.zClipPlaneHelperVisible = true; // set flag
    this.clipPlanes.z.helper.visible = true; // set state
    $("#z-clip-helper-checkbox").prop("checked", true);

    // reset clipping plane constants, inputs and outputs
    this.clipPlanes.x.constant = -Math.sign(this.clipPlanes.x.normal.x) * this.clipPlanes.x.bounds[0] + 0.01;
    this.clipPlanes.y.constant = 30.01;
    this.clipPlanes.z.constant = Math.sign(this.clipPlanes.z.normal.z) * this.clipPlanes.z.bounds[0] + 0.01;
    $("#x-clip-input").val(this.clipPlanes.x.bounds[0]);
    $("#y-clip-input").val(0);
    $("#z-clip-input").val(this.clipPlanes.z.bounds[0]);
    $("#x-clip-output").html(`${$("#x-clip-input").val()}cm`);
    $("#y-clip-output").html(`${$("#y-clip-input").val()}cm`);
    $("#z-clip-output").html(`${$("#z-clip-input").val()}cm`);

    // reset options
    if (!this.showInterp) {
      this.showInterp = true;
      $("#interp-toggle-checkbox").prop("checked", true);
      this.clean(); // have to remove old stuff to re-enable interpolation
    } else {
      this.requestRenderIfNotRequested();
    }
  };

  clean = (e = null) => {
    // reset parameters
    this.file = $("#3d-file-select").find(":selected").text().trim();
    this.shape = $("#shape-select").find(":selected").text().trim();
    this.cmap = $("#cmap-select").find(":selected").text().trim();
    this.variable = $("#variable-select").find(":selected").text().trim();
    this.showInterp = $("#interp-toggle-checkbox").prop("checked");

    // remove currently drawn meshes and lines
    const dontRemove = [
      "gridHelper",
      "axesHelper",
      "frustumHelper",
      "xClipPlaneHelper",
      "yClipPlaneHelper",
      "zClipPlaneHelper",
    ];
    const meshes = [];
    const lines = [];
    this.scene.traverse(function (object) {
      if (object.isMesh) {
        meshes.push(object);
      } else if (object.isLine && dontRemove.indexOf(object.name) == -1) {
        lines.push(object);
      }
    });
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      mesh.material.dispose();
      mesh.geometry.dispose();
      this.scene.remove(mesh);
    }
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      line.material.dispose();
      line.geometry.dispose();
      this.scene.remove(line);
    }

    // load new data based on the calling element id
    const loadData = e ? ($(e.target).attr("id") == "3d-file-select" ? true : false) : false;
    this.animate(loadData);
  };

  animate = (loadData) => {
    if (loadData) {
      this.loadFile(`assets/data/${this.file}`)
        .then(this.parseData)
        .then(this.addMesh)
        .then(this.requestRenderIfNotRequested);
    } else {
      this.addMesh();
      this.requestRenderIfNotRequested();
    }
  };

  requestRenderIfNotRequested = () => {
    if (!this.renderRequested) {
      this.renderRequested = true;
      requestAnimationFrame(this.render);
    }
  };

  resizeRendererToDisplaySize = () => {
    const pixelRatio = window.devicePixelRatio;
    const width = (this.canvas.clientWidth * pixelRatio) | 0;
    const height = (this.canvas.clientHeight * pixelRatio) | 0;
    const needResize = this.canvas.width !== width || this.canvas.height !== height;
    if (needResize) this.renderer.setSize(width, height, false);
    return needResize;
  };

  render = () => {
    this.renderRequested = false;
    if (this.resizeRendererToDisplaySize()) {
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
