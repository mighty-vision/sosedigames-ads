var adBox = document.querySelectorAll('.adBox');

function pauseAll() {
  for(var i = 0; i < adBox.length; i++) {
    adBox[i].addEventListener('click', (e) => {
      var curentAd = adBox[i].firstElementChild.contentWindow.document.body;
      adBox[i].classList.remove('played');
      curentAd[i].classList.add('totalPause');
    });
  }
}

for(var i = 0; i < adBox.length; i++) {
  adBox[i].addEventListener('click', (e) => {
    pauseAll();

    var currentAdBox = e.currentTarget;

    var curentAd = e.currentTarget.firstElementChild.contentWindow.document.body;

    if(e.target.classList.contains('play')) {
      curentAd.classList.remove('totalPause');
      currentAdBox.classList.add('played');
    }

    if(e.target.classList.contains('pause')) {
      curentAd.classList.add('totalPause');
      currentAdBox.classList.remove('played');
    }

    if(e.target.classList.contains('reset')) {
      currentAdBox.classList.add('resetAnim');

      setTimeout( () => {
        currentAdBox.classList.remove('resetAnim');
      }, 200);
    }

  });
}

GitHubActivity.feed({
  username: "mighty-vision",
  repository: "sosedigames-ads",
  selector: "#feed",
  limit: 100
});