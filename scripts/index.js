var adBox = document.querySelectorAll('.adBox');

for(var i = 0; i < adBox.length; i++) {
  var curentAd = addBox[i].firstElementChild.contentWindow.document.body;

  curentAd.classList.add('totalPause');
}

for(var i = 0; i < adBox.length; i++) {
  adBox[i].addEventListener('click', (e) => {
    var curentAd = e.currentTarget.firstElementChild.contentWindow.document.body;

    if(e.target.classList.contains('play')) {
      curentAd.classList.remove('totalPause');
    }

    if(e.target.classList.contains('pause')) {
      curentAd.classList.add('totalPause');
    }
  });
}

GitHubActivity.feed({
  username: "mighty-vision",
  repository: "sosedigames-ads",
  selector: "#feed",
  limit: 100
});