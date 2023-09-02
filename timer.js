var counter = 59;

var interval = setInterval(function() {
  counter--;
  // Display 'counter' wherever you want to display it.
  if (counter <= 0) {
    clearInterval(interval);
    window.location.href="GameLoss.html";
   // document.getElementById('timer').innerhtml=("<h3>Count down complete</h3>");
    return;
  } 
  else
  {
    document.getElementById('time').innerHTML="00:"+(counter);
    console.log("Timer --> " + counter);
  }
}, 1000);
function ResetTimer()
{
    counter=60;

}