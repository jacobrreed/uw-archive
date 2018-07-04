var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

document.body.addEventListener("click", function() {
    window.location = "./game.html";
});

//Music
var audio = new Audio(),
    i = 0;
var playlist = new Array('./music/menu.mp3');
audio.addEventListener('ended', function() {
    i = ++i < playlist.length ? i : 0;
    console.log(i)
    audio.src = playlist[i];
    audio.play();
}, true);
audio.volume = 0.1;
audio.loop = true;
audio.src = playlist[0];
audio.play();