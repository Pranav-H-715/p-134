img = "";
Status = "";
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object is Detecting";
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        ObjectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            percentage = Math.floor(objects[i].confidence * 100) + "%";
            label = objects[i].label;
            fill(r,g,b);
            text(label + " " + percentage, objects[i].x + 20, objects[i].y + 20)
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }
}
function modelLoaded() {
    console.log("cocoSsd initialized");
    Status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
        console.log(results);
        objects = results;
    }