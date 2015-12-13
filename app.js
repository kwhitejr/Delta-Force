var Timer = require('./timer');
var myTimer = new Timer();

myTimer.addListener('tick', function(event) {
  process.stdout.write('TICK ' + event.interval + '\n');
  if (event.interval === event.maxTime-1) {
    myTimer.complete();
  }
  if (event.lagTime >= event.maxDev) {
    myTimer.lag();
  }
});

myTimer.addListener('start', function(event) {
  console.log({StartTime: event.startTime});
});

myTimer.addListener('stop', function(event) {
  console.log("Timer was stopped.");
  console.log({EndTime: event.endTime, ticks: event.interval});
});

myTimer.addListener('complete', function(event) {
  myTimer.stop();
  console.log("Stop Time: ", event.endTime);
  console.log("Total Time: ", event.endTime - event.startTime);
  console.log("Total Lag: ", event.lagTime);
});

myTimer.addListener('lag', function(event) {
  console.log({Lagging: event.lagTime});
});

myTimer.start();

// setTimeout(myTimer.stop, 3000);

