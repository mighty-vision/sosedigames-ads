import './../styles/index.scss';


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
  return function() {
    var context = this;
    var args = arguments;
    if (!inThrottle) {
      func.apply(context, args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

var ad = document.querySelector('.notAd');
var adWidth = 240;
var adHeight = 400;
var interXPos = 0.001;
var interYPos = 0.001;

// Parallax
var translateLayers = {
  setListeners : function() {
    ad.addEventListener('mouseover', function(e) {
      interXPos = e.clientX + 0.001;
      interYPos = e.clientY + 0.001;
    })

    ad.addEventListener('mousemove', throttle(function(e) {
      var x = e.clientX;
      var y = e.clientY;
      translateLayers.translate(x, y);
    }, 60));

    ad.addEventListener('mouseout', function(e) {
      setTimeout(function() {
        setVar(ad, 'xMove', 0);
        setVar(ad, 'yMove', 0);

        interXPos = 0.001;
        interYPos = 0.001;
      }, 150);
    });

  },

  translate(x, y) {
    var xCssVar = (interXPos - x) / adWidth;
    var yCssVar = (interYPos - y) / adHeight;

    setVar(ad, 'xMove', xCssVar);
    setVar(ad, 'yMove', yCssVar);
  },

  init : function() {
    translateLayers.setListeners();
  }
}

translateLayers.init();

//*** Dev. Comment for production build ***//
<<<<<<< HEAD
// var paused = false;

// document.addEventListener('click', () => {
//   paused = !paused;

//   if(paused) {
//     document.body.classList.add('totalPause');
//   } else {
//     document.body.classList.remove('totalPause');
//   }
// });
=======
var paused = false;

document.addEventListener('click', () => {
  paused = !paused;

  if(paused) {
    document.body.classList.add('totalPause');
  } else {
    document.body.classList.remove('totalPause');
  }
});
>>>>>>> 05c33331000d83edc013fe8ef8feb5210682af82
