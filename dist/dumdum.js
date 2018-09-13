(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Observer"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Observer"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Observer);
    global.DumDum = mod.exports;
  }
})(this, function (exports, _Observer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Observer2 = _interopRequireDefault(_Observer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var DumDum = function () {

    /**
     * Set up DumDum
     * @param  {Object} routes An object of functions to execute
     * @return {Void}
     */
    function DumDum(routes, element) {
      _classCallCheck(this, DumDum);

      this.body = element || document.body; // cache the body element
      this.routes = routes; // store all the routes in a class property
      this.executedRoutes = []; // all executed routes will reside here
      this.createObserver(); // create the observer instance
      this.checkClasses(); // on load check for class changes
    }

    /**
     * Gets executed routes
     * @return {Array} An array of all routes that was executed
     */


    _createClass(DumDum, [{
      key: "getExecutedRoutes",
      value: function getExecutedRoutes() {
        return this.executedRoutes;
      }
    }, {
      key: "createObserver",
      value: function createObserver() {
        var _this = this;

        if ("MutationObserver" in window) {
          // create the instance
          this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              return _this.observeChange(mutation);
            });
          });

          // observe the element for attribute changes
          this.observer.observe(this.body, {
            attributes: true
          });
        } else {
          this.observer = new _Observer2.default(this.body, function (mutation) {
            return _this.observeChange(mutation);
          });
        }
      }
    }, {
      key: "observeChange",
      value: function observeChange(mutation) {
        if (mutation.attributeName === "class") {
          // we are only interested in changes to the class attribute
          this.checkClasses();
        }
      }
    }, {
      key: "checkClasses",
      value: function checkClasses() {
        var classes = this.createClassArray(); // a list of all classes
        if (classes.length > 0 && classes[0]) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var className = _step.value;

              this.maybeExecuteClassRoute(className); // try to execute a route
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }, {
      key: "createClassArray",
      value: function createClassArray() {
        var classes = this.body.classList.value.replace(/-/g, '_').split(/\s+/); // remove dashes and replace them with underscores so they can be object names
        classes.unshift('common'); // the common class is always in the queue
        return classes;
      }
    }, {
      key: "isRouteExecuted",
      value: function isRouteExecuted(className) {
        return this.executedRoutes.indexOf(className) > -1;
      }
    }, {
      key: "maybeExecuteClassRoute",
      value: function maybeExecuteClassRoute(className) {
        this.fireEvent('route:before', {
          route: className
        });
        if (this.routes[className] && !this.isRouteExecuted(className)) {
          this.executeRoute(className);
          this.fireEvent('route:after', {
            route: className
          });
          return true; // return true when we found a route and executed it
        }
        return false; // return false if nothing was valid
      }
    }, {
      key: "fireEvent",
      value: function fireEvent(event, payload) {
        this.body.dispatchEvent(new CustomEvent('dumdum:' + event, {
          detail: payload
        }));
      }
    }, {
      key: "executeRoute",
      value: function executeRoute(className) {
        try {
          // try to execute the route
          this.routes[className]();
          this.executedRoutes.push(className);
        } catch (e) {
          console.error('No such route found.'); // we'll assume no route by that className exists
        }
      }
    }]);

    return DumDum;
  }();

  exports.default = DumDum;
});
