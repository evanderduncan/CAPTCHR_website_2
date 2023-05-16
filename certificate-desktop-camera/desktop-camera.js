document.addEventListener('DOMContentLoaded', () => {

    const video = document.getElementById('video');
    const flashButton = document.getElementById('flash-button');
  
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`Error accessing user's camera: ${err}`);
      });
  
    flashButton.addEventListener('click', () => {
      video.classList.add('flash');
      setTimeout(() => {
        video.classList.remove('flash');
      }, 300);
    });
  
  });

  let video;
  let poseNet;
  let poses = [];
  
  function setup() {
    createCanvas(800, 800);
    video = createCapture(VIDEO);
    video.size(width, height);
    
    video.hide();
  
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", function (results) {
      poses = results;
    });
  }
  
  function modelReady() {
    console.log("Model loaded!");
  }
  
  function draw() {
    clear();
    background(0,0,0,0);
    
    
    
    if (poses.length > 0) {
      let pose = poses[0].pose;
      let nose = pose.keypoints[0];
      let rightEye = pose.keypoints[2];
      let leftEye = pose.keypoints[1];
      let distance = dist(rightEye.position.x, rightEye.position.y, leftEye.position.x, leftEye.position.y);
      let rectWidth = distance * 5;
      let rectHeight = distance * 5;
      let rectX = nose.position.x - rectWidth / 1.4;
      let rectY = nose.position.y  - rectHeight / 0.9;
      strokeWeight(2);
      stroke(255);
      noFill();
      rect(rectX, rectY, rectWidth, rectHeight);
    }
  }


  function display_ct7() {
    var x = new Date()
    var ampm = x.getHours( ) >= 12 ? ' PM' : ' AM';
    hours = x.getHours( ) % 12;
    hours = hours ? hours : 12;
    hours=hours.toString().length==1? 0+hours.toString() : hours;
    
    var minutes=x.getMinutes().toString()
    minutes=minutes.length==1 ? 0+minutes : minutes;
    
    var seconds=x.getSeconds().toString()
    seconds=seconds.length==1 ? 0+seconds : seconds;
    
    var month=(x.getMonth() +1).toString();
    month=month.length==1 ? 0+month : month;
    
    var dt=x.getDate().toString();
    dt=dt.length==1 ? 0+dt : dt;
    
    var x1=month + "/" + dt + "/" + x.getFullYear(); 
    x1 = x1 + " - " +  hours + ":" +  minutes + ":" +  seconds + " " + ampm;
    document.getElementById('ct7').innerHTML = x1;
    display_c7();
     }
     function display_c7(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('display_ct7()',refresh)
    }
    display_c7()