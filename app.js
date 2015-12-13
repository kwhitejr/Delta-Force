var Timer = require('./timer');
var myTimer = new Timer();

myTimer.addListener('tick', function(event) {
  process.stdout.write('TICK \n');
  if (event.interval === event.maxTime-1) {
    myTimer.stop();
  }
});

myTimer.addListener('start', function(event) {
  console.log({StartTime: event.startTime});
});

myTimer.addListener('stop', function(event) {
  console.log("Timer was stopped.");
  console.log({EndTime: event.endTime, ticks: event.interval});
  clearInterval(event.startTick);
});

myTimer.addListener('complete', function(event) {
  console.log("Timer is complete.");
  console.log("Total Time: ");
  console.log(event.endTime - event.startTime)

});

myTimer.start();

// setTimeout(myTimer.stop, 3000);

