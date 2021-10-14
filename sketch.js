let geodata;
let waterData;
let treeData;

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

let colorScale = d3.scaleLinear(); //.domain([0, 50]).range(["#ff0000", "#00ff00"]);

function preload() {
  geodata = loadJSON("lucerne-trees.json");
}

function setup() {
  createCanvas(900, 650);

  // console.log(geodata);
  waterData = geodata.features;
  treeData = geodata.features;

  console.log(treeData[2500].properties);

  let maxHoehe = d3.max(treeData, function (d) {
    return d.properties.BAUMHOEHE;
  });

  let minHoehe = d3.min(treeData, function (d) {
    return d.properties.BAUMHOEHE;
  });

  let extent = d3.extent(treeData, function (d) {
    return d.properties.BAUMHOEHE;
  });

  colorScale.domain(extent).range(["#ff0000", "#00ff00"]);

  console.log("maxHoehe", maxHoehe);
  console.log("minHoehe", minHoehe);
  console.log("extent", extent);

  let col = colorScale(25);
  console.log("col", col);

  let gattungen = treeData.map(function (d) {
    return d.properties.GATTUNG;
  });

  console.log("gattungen", gattungen);

  let gattungenSet = _.uniq(gattungen);
  console.log("gattungenSet", gattungenSet);

  noLoop();
}

function draw() {
  background(0);
  // clear();
  // drawWater();

  drawTrees();
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];
    let geometry = treeObject.geometry;
    let properties = treeObject.properties;
    // console.log(properties);
    let coordinates = geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    noStroke();
    fill(255, 5);
    ellipse(x, y, 10, 10);
    ellipse(x, y, 5, 5);
    ellipse(x, y, 3, 3);
  }
}

function drawWater() {
  for (let i = 0; i < waterData.length; i++) {
    let waterObject = waterData[i];
    let geometry = waterObject.geometry;
    let coordinates = geometry.coordinates[0][0];
    noStroke();
    fill(random(0, 255), random(0, 255), random(255, 0));
    beginShape();
    for (let j = 0; j < coordinates.length; j++) {
      let coord = coordinates[j];
      let lat = coord[1];
      let lon = coord[0];

      let x = map(lon, bounds.left, bounds.right, 0, width);
      let y = map(lat, bounds.top, bounds.bottom, 0, height);
      // console.log(x, y);

      vertex(x, y);
    }
    endShape();
  }
}
