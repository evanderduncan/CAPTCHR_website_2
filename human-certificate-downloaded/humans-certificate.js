var datetime = new Date();
console.log(datetime);
document.getElementById("time").textContent = datetime; //it will print on html page

function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
    setInterval(refreshTime, 1000);


    var form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
      event.praeventDefault(); // prevent form from submitting normally
      
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var subject = document.getElementById("subject").value;
      var message = document.getElementById("message").value;
      
      if (!name || !email || !subject || !message) {
        alert("Please fill out all required fields.");
        return;
      }
      
      // send form data to server-side script
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "sendmail.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          alert("Thanks for contacting us! We'll get back to you soon.");
          form.reset();
        }
      };
      xhr.send("name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&subject=" + encodeURIComponent(subject) + "&message=" + encodeURIComponent(message));
    });
    