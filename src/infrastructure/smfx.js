/**
 * Created by smartface on 10/20/16.
 */
 
const Rx = require("../index").rx;
const Page = ["onControlRemoved", "onControlAdded", "onKeyPressed", "onClose", "onShow", "onOrientationChanged"];
var _observable = Rx.Observable;

const SMFx = function (observable) {
  _observable = observable || _observable;
};

SMFx.map = function (f) {
  return _observable.map(f).shareReplay(1);
};

SMFx.fromCallback = function (callback) {
  var c = Rx.Observable
    .create(function (observer) {
      callback = function (e) {
        observer.onNext(e);
      };

      return function () {
        callback = null;
      };
    });
  return c.shareReplay(1);
};

SMFx.subscribe = function (f, error, complete) {
  return _observable.subscribe(f, error, complete);
};

SMFx.of = function () {
  return new SMFx(_observable);
};

module.exports = SMFx;