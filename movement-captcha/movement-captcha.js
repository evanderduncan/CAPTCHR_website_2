let video;
let poseNet;
let poses = [];
let rightWrist;
let leftWrist;
let blueCircle;
let redCircle;
let blueCircleSize = 40;
let blueCircleAttachedRight = false;
let blueCircleAttachedLeft = false;
let detachDelay = 100; 
let counter = 0;
let counterElem;

function setup() {
  var canvas = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  counterElem = document.getElementById("counter-value");

  let nextPageBtn = document.getElementById("next-page-btn");
  nextPageBtn.classList.add("hidden");

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", function (results) {
    poses = results;
  });

  video.hide();

  blueCircle = createVector(random(width), random(height));
  blueCircleAttachedRight = false;
  blueCircleAttachedLeft = false;
  
  redCircle = createVector(random(width), random(height));
}

function modelLoaded() {
  console.log("Model Loaded!");
}

function draw() {
  translate(video.width, 0);
  
  scale(-1, 1);
  image(video, 0, 0, width, height);

  textSize(25);
  fill(255);
  counterElem.innerHTML = counter;
  console.log("Counter: " + counter);
  
  if (poses.length > 0) {
  
    let pose = poses[0].pose;
    let rightWrist = pose.rightWrist;
    let leftWrist = pose.leftWrist;
    
    if (rightWrist) {
      fill(255, 255, 255);
      noStroke();
      ellipse(rightWrist.x, rightWrist.y, 10, 10);

      if (dist(rightWrist.x, rightWrist.y, blueCircle.x, blueCircle.y) < blueCircleSize/2) {
        blueCircleAttachedRight = true;
      }
      
      if (dist(blueCircle.x, blueCircle.y, redCircle.x, redCircle.y) < blueCircleSize/2 + 25) {
        setup();
        counter++;
        if (counter >= 5) {
          let nextPageBtn = document.getElementById("next-page-btn");
          nextPageBtn.classList.remove("hidden");
        }
        return;
      }
    }

    if (leftWrist) {
      fill(255, 255, 255);
      noStroke();
      ellipse(leftWrist.x, leftWrist.y, 10, 10);

      if (dist(leftWrist.x, leftWrist.y, blueCircle.x, blueCircle.y) < blueCircleSize/2) {
        blueCircleAttachedLeft = true;
      }
      
      if (dist(blueCircle.x, blueCircle.y, redCircle.x, redCircle.y) < blueCircleSize/2 + 25) {
        setup();
        counter++;
        if (counter >= 5) {
          let nextPageBtn = document.getElementById("next-page-btn");
          nextPageBtn.classList.remove("hidden");
        }
        return;
      }
    }

    fill(30,144,255);
    stroke(255);
    strokeWeight(2);
    ellipse(blueCircle.x, blueCircle.y, blueCircleSize, blueCircleSize);
    
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(2);
    ellipse(redCircle.x, redCircle.y, 50, 50);

    if (blueCircleAttachedRight) {
      blueCircle.x = (rightWrist ? rightWrist.x : leftWrist.x);
      blueCircle.y = (rightWrist ? rightWrist.y : leftWrist.y);
      detachDelay = 100;
    } else if (detachDelay > 0) {
      detachDelay -= deltaTime;
      if (detachDelay <= 0) {
        blueCircle.x = random(width);
        blueCircle.y = random(height);
        blueCircleAttachedRight = false;
      }
    }

    if (blueCircleAttachedLeft) {
      blueCircle.x = (leftWrist ? leftWrist.x : rightWrist.x);
      blueCircle.y = (leftWrist ? leftWrist.y : rightWrist.y);
      detachDelay = 100;
    } else if (detachDelay > 0) {
      detachDelay -= deltaTime;
      if (detachDelay <= 0) {
        blueCircle.x = random(width);
        blueCircle.y = random(height);
        blueCircleAttachedLeft = false;
      }
    }
  }
}

function resetcircle() {
  
  redCircle = createVector(random(width), random(height));

  poseNet.removeAllListeners();
  poses = [];
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", function (results) {
    poses = results;
  });
}





