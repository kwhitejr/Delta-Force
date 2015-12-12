var EventEmitter = require('events');

function Timer () {

  EventEmitter.call(this);

  var self = this;

  setInterval(function () {
    self.emit('tick');
  }, 1000);
}

Timer.prototype = new Object(EventEmitter.prototype, {
  constructor: {
    value: EventEmitter,
    configurable: true,
    enumerable: true,
    writable: true
  }
});

var myTimer = new Timer();
myTimer.addListener('tick', function() {
  process.stdout.write('TICK \n');
});