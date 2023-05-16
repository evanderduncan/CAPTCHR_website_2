function display_ct7() {
    var x = new Date()
    
    hours = x.getHours();
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
    
    var x1= dt+ "/" + month + "/2024"; 
    x1 = x1 + " - " +  hours + ":" +  minutes + ":" +  seconds;
    document.getElementById('ct7').innerHTML = x1;
    display_c7();
     }
     
     function display_c7(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('display_ct7()',refresh)
    }
    display_c7()

    