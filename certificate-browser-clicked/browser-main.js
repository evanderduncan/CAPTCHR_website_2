window.onload = function() {
    const form = document.getElementById('theform');
    console.log('Form:', form);
    const input = document.getElementById('google-search');
    const submit = document.getElementById('search');
    const error = document.getElementById('error');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submit behavior
      console.log('Form submitted');
      
      if (input.value.includes('captchr') || input.value.includes('CAPTCHR')) {
        console.log('Redirecting to ../browser-searched/browser-searched.html'); // Log a message to the console
        window.location.href = '../certificate-browser-searched/browser-searched.html'; // Redirect to the specified URL
      } else {
        console.log('Input does not contain captchr or CAPTCHR'); // Log a message to the console
        error.classList.remove('hidden');
        
      }
    });
  };

  