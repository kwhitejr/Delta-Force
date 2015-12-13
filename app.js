var Timer = require('./timer');
var myTimer = new Timer();

myTimer.addListener('tick', function() {
  process.stdout.write('TICK \n');
});

myTimer.addListener('start', function() {
  console.log( {startTime: Date.now()} );
});

myTimer.addListener('stop', function() {

  console.log( {endTime: Date.now()} );
});

myTimer.start();

setTimeout(myTimer.stop, 3000);