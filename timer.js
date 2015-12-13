var EventEmitter = require('events');

module.exports = Timer;

function Timer (maxTime) {

  EventEmitter.call(this);

  var self = this;
  var i = 0;
  var max = maxTime || 10;

  var startTick;
  var startTime;

  this.start = function() {
    startTime = Date.now();
    startTick = setInterval(function () {
      self.emit('tick', { interval: i++, maxTime: max});
    }, 1000);
    self.emit('start', { startTime: Date.now() });

  };

  this.stop = function() {
    self.emit('stop', { interval: i, startTick: startTick, endTime: Date.now() });
    self.emit('complete', { endTime: Date.now(), startTime: startTime });
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

