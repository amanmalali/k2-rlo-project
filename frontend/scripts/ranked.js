const start_btn = document.getElementById("start-ranked-btn");
var time = "00:00:000s";
var track = false;
$('#game-front-container').hide();
function rankedInit(){
    if (track) {
        $('#start-ranked-btn').text("Start Ranked");
        $('#game-front-container').hide();
        track = false;
        time = "00:00:000s";
    } else {
        $('#start-ranked-btn').text("End Ranked");
        $('#game-front-container').show();
        track = true;
        $('#timer-text').text(time);
    }
}

function timer() {
    if (track) {
        time = time.replace('s', '');
        time = time.split(':', 3);
        m = parseInt(time[0]);
        s = parseInt(time[1]);
        ms = parseInt(time[2]);
        t = ms + 1000*s + 1000*60*m + 50;
        console.log(t)
        ms = (t % 1000).toString();
        s = (((t - ms) % (60*1000))/1000).toString();
        m = (((t - s*1000 - ms) % (60*60*1000))/(60*1000)).toString();
        for (let i = 0; i < 4 - ms.length; i++) {
            ms = "0" + ms
        }
        for (let i = 0; i < 2 - s.length; i++) {
            s = "0" + s
        }
        for (let i = 0; i < 2 - m.length; i++) {
            m = "0" + m
        }
        time = m + ':' + s + ':' + ms + 's';
        $("#timer-text").text(time);
    };
}

$(function(){
    setInterval(timer, 50);
});

start_btn.addEventListener('click', rankedInit);