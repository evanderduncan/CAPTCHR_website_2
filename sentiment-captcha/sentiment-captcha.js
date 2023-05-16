let sentiment;
let canvas;
let phrase;
let correctCounter = 0;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("captcha");
  sentiment = ml5.sentiment("movieReviews", modelLoaded);
  
  // Add event listeners to HTML buttons
  document.getElementById("positivebtn").onclick = () => checkSentiment("positive");
  document.getElementById("negativebtn").onclick = () => checkSentiment("negative");
  document.getElementById("continuebtn").onclick = () => window.location.href = "../phrase-matcher/phrase-matcher.html";
}

function modelLoaded() {
  console.log("Model Loaded!");
  generatePhrase();
  drawCaptcha();
}

function generatePhrase() {
  const phrases = [   "I love this product",    
                      "This movie was terrible",    
                      "The restaurant had great food but terrible service",        
                      "The book was excellent, I couldn't put it down",    
                      "I'm not a fan of this song",    
                      "I'm really impressed with the new software update",    
                      "The traffic this morning was unbearable",    
                      "I feel fantastic after my workout",    
                      "The customer service was incredibly helpful"  ];
  phrase = random(phrases);
}

function drawCaptcha() {
  background(255);
  textAlign(CENTER);
  textSize(22);
  text(phrase, width/2, height/2.5);
  textSize(18);
  text("Is this sentence positive or negative?", width/2, height/5);
  
  textSize(16);
  textAlign(CENTER);
  text("Correct: " + correctCounter + "/" + 5, width/2, 300);
  
  if (correctCounter === 5) {
    document.getElementById("continuebtn").style.display = "block";
    }
}

function checkSentiment(label) {
  const result = sentiment.predict(phrase);
  const sentimentScore = result.score;
  const correctLabel = sentimentScore > 0.5 ? "positive" : "negative";
  console.log("Sentiment score: " + sentimentScore);
  console.log("Correct label: " + correctLabel);
  console.log("User label: " + label);
  if (label === correctLabel) {
    console.log("Correct");
    correctCounter++;
  } else {
    console.log("Wrong");
  }
  generatePhrase();
  drawCaptcha();
}

  function showMessage(message, color) {
  const messageElem = createP(message);
  messageElem.style("color", color);
  messageElem.parent("captcha");
}
