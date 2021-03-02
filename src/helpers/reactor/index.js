function Event(name){
  this.name = name;
  this.callbacks = [];
}

Event.prototype.registerCallback = function(callback){
  this.callbacks.push(callback);
}

Event.prototype.deleteCallback = function(callback){
  this.callbacks = this.callbacks.slice(this.callbacks.indexOf(callback), 1);
}

function Reactor(){
  this.events = {};
}

Reactor.prototype.registerEvent = function(eventName){
  const event = new Event(eventName);
  this.events[eventName] = event;
};

Reactor.prototype.dispatchEvent = function(eventName, eventArgs){
  this.events[eventName].callbacks.forEach(function(callback){
    callback(eventArgs);
  });
};

Reactor.prototype.addEventListener = function(eventName, callback){
  this.events[eventName].registerCallback(callback);
};

Reactor.prototype.removeEventListener = function(eventName, callback){
  this.events[eventName].deleteCallback(callback);
};

export default Reactor;
