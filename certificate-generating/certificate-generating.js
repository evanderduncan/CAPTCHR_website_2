document.addEventListener('DOMContentLoaded', () => {
    let container = document.querySelector(".container");
    let bar = document.querySelector(".output");
    let fill = document.querySelector(".fill");
    let button = document.querySelector("button");
    let linkButton = document.querySelector(".link-button");
  
    button.addEventListener('click',()=>{
        var a = 0;
        var run = setInterval(frames, 50);
        
        function frames(){
            a = a + 1;
            if(a==101){
                
                clearInterval(run);
                container.style.display = "block";
                bar.style.display = "block";
                linkButton.style.display="inline-block";

            }
            else{
                var counter = document.querySelector(".counter");
                counter.textContent = a + "%";
                fill.style.width = a + "%";
            }
        }
    })
  });
  