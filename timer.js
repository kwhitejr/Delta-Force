var EventEmitter = require('events');

module.exports = Timer;

function Timer (maxTime, maxDeviation) {

  EventEmitter.call(this);

  var self = this;
  var i = 0;
  var max = maxTime || 20;
  var maxDev = maxDeviation || 20;

  var startTick;
  var startTime;
  var tickTime;
  var lagTime;

  this.start = function() {
    startTime = Date.now();
    startTick = setInterval(function () {
      tickTime = Date.now();
      lagTime = (tickTime - startTime) % 1000;
      self.emit('tick', { interval: i++, maxTime: max, tickTime: (tickTime - startTime), lagTime: lagTime, maxDev: maxDev });
    }, 1000);
    self.emit('start', { startTime: startTime });

  };

  this.stop = function() {
    self.emit('stop', { interval: i, startTick: startTick, endTime: Date.now(), lagTime: lagTime });
    clearInterval(startTick);

  };

  this.complete = function() {
    self.emit('complete', { endTime: Date.now(), startTime: startTime });
  };

  this.lag = function() {
    self.emit('lag', {lagTime: lagTime});
  };
}

Timer.prototype = new Object(EventEmitter.prototype, {
  constructor: {
    value: EventEmitter,
    configurable: true,
    enumerable: true,
    writable: true
  }
});

// alternate for node: util.inherits(Timer, EventEmitter);

