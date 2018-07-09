// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({51:[function(require,module,exports) {

},{}],33:[function(require,module,exports) {
'use strict';

require('./../styles/index.scss');

//*** Detect browser and version ***//
function detectVersion() {
  // From https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
  navigator.browserVersion = function () {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appVersion];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join('');
  }();

  document.body.setAttribute('data-browser', navigator.browserVersion.replace(/\d+/g, '').toLowerCase().trim());
  document.body.setAttribute('data-version', navigator.browserVersion.replace(/\D/g, '').trim());
}
detectVersion();

// Utils
function setVar(element, varName, value) {
  var name = '--' + varName;
  return element.style.setProperty(name, value);;
}

// From https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
function throttle(func, limit) {
  var inThrottle;
  var lastFunc;
  var lastRan;
  return function () {
    var context = this;
    var args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

var ad = document.querySelector('.notAd');
var adWidth = 240;
var adHeight = 400;
var interXPos = 0.001;
var interYPos = 0.001;

// Parallax
var translateLayers = {
  setListeners: function setListeners() {
    ad.addEventListener('mouseover', function (e) {
      interXPos = e.clientX + 0.001;
      interYPos = e.clientY + 0.001;
    });

    ad.addEventListener('mousemove', throttle(function (e) {
      var x = e.clientX;
      var y = e.clientY;
      translateLayers.translate(x, y);
    }, 60));

    ad.addEventListener('mouseout', function (e) {
      setTimeout(function () {
        setVar(ad, 'xMove', 0);
        setVar(ad, 'yMove', 0);

        interXPos = 0.001;
        interYPos = 0.001;
      }, 150);
    });
  },

  translate: function translate(x, y) {
    var xCssVar = (interXPos - x) / adWidth;
    var yCssVar = (interYPos - y) / adHeight;

    setVar(ad, 'xMove', xCssVar);
    setVar(ad, 'yMove', yCssVar);
  },


  init: function init() {
    translateLayers.setListeners();
  }

  //*** Conditional initialization ***//
};var userBrowser = document.body.getAttribute('data-browser');
var userBrowserVersion = parseInt(document.body.getAttribute('data-version'), 10);

if (userBrowser !== 'firefox' && userBrowser !== 'ie' && userBrowser !== 'msie' && userBrowser !== 'edge' || userBrowser !== 'chrome' && userBrowserVersion < 49 || userBrowser !== 'safari' && userBrowserVersion < 9 || userBrowser !== 'opera' && userBrowserVersion < 36) {
  translateLayers.init();
}

//*** Dev. Comment for production build ***//
// var paused = false;

// document.addEventListener('click', () => {
//   paused = !paused;

//   if(paused) {
//     document.body.classList.add('totalPause');
//   } else {
//     document.body.classList.remove('totalPause');
//   }
// });
},{"./../styles/index.scss":51}]},{},[33], null)
//# sourceMappingURL=scripts.35a583e0.map