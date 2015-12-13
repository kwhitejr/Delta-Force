var EventEmitter = require('events');

module.exports = Timer;

function Timer () {

  EventEmitter.call(this);

  var self = this;
  var i = 0;

  var startTick;

  this.start = function() {
    startTick = setInterval(function () {
      self.emit('tick', { interval: i++ });
    }, 1000);
    self.emit('start');
  };

  this.stop = function() {
    self.emit('stop');
    clearInterval(startTick);
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

