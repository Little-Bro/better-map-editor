let saveButton, loadButton;
let lineStarted;
let oriX, oriY, destX, destY;
let origin_point_json, destination_point_json;
let initial_data;

// loading map file
function preload() {
  initial_data = loadJSON('./blank_map.json');
}

function setup() {
  createCanvas(601, 601);

  lineStarted = false;

  saveButton = createButton('save map');
  loadButton = createButton('load map');
}

function draw() {
  background(200);
  drawLines(initial_data);

  saveButton.mousePressed(() => {
    let fileName = prompt('enter file name');
    save(initial_data, `${fileName}.json`);
  });

  loadButton.mousePressed(() => {
    let fileName = prompt('enter map name');
    initial_data = loadJSON(`${fileName}.json`);
  });

  if (lineStarted) {
    line(oriX, oriY, mouseX, mouseY);
  }
}

function mousePressed() {
  if (!lineStarted) {
    lineStarted = true;
    oriX = mouseX;
    oriY = mouseY;

    origin_point_json = JSON.stringify([oriX, oriY]);

  } else {
    lineStarted = false;
    destX = mouseX;
    destY = mouseY;

    destination_point_json = JSON.stringify([destX, destY]);

    // loading data into json
    initial_data[origin_point_json] = destination_point_json;
    console.log(initial_data);
  }
}

function drawLines(json_data) {
  for (let key in json_data) {
    let value = json_data[key];

    let origin = JSON.parse(key);
    let destination = JSON.parse(value);

    line(origin[0], origin[1], destination[0], destination[1]);
  }
}