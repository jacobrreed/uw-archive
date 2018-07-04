window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var socket = io.connect("http://24.16.255.56:8888");

socket.on("connect", function() {
    console.log("Socket Connected");
})

socket.on("disconnect", function() {
    console.log("Socket Disconnected");
})

socket.on("reconnect", function() {
    console.log("Socket Reconnected");
})

socket.on("load", function(data) {
    console.log("Load Triggered");
    afterStep(data);
});



var forest = {
    X: 350,
    Y: 350,
    treeChance: 0.01, //tree repopulate chance
    treeChance2: 0.01, //tree repopulate chance 2
    burnChance: 0.001, //Burn chance
    t: [],
    colors: ['#000000', '#25f68b', '#f17400']
};

//Init tree spawn
for (var i = 0; i < forest.Y; i++) {
    forest.t[i] = [];
    for (var j = 0; j < forest.Y; j++) {
        forest.t[i][j] = Math.random() < forest.treeChance ? 1 : 0;
    }
}

//Step tick
function step(forest) {
    var temp = [];
    for (i = 0; i < forest.Y; i++) {
        temp[i] = forest.t[i].slice(0);
    }

    for (i = 0; i < forest.Y; i++) {
        for (j = 0; j < forest.Y; j++) {
            if (temp[i][j] === 0) {
                forest.t[i][j] = Math.random() < forest.treeChance2 ? 1 : 0;
            } else if (temp[i][j] === 1) {
                if (((i > 0) && (2 == temp[i - 1][j])) ||
                    ((i < forest.Y - 1) && (2 == temp[i + 1][j])) ||
                    ((j > 0) && (2 == temp[i][j - 1])) ||
                    ((j < forest.X - 1) && (2 == temp[i][j + 1]))) {
                    forest.t[i][j] = 2;
                } else {
                    forest.t[i][j] = Math.random() < forest.burnChance ? 2 : 1; //generate random number and compare against burn chance
                }
            } else if (temp[i][j] === 2) {
                //Create empty cell if burnt
                forest.t[i][j] = 0;
            }
        }
    }

    socket.emit("save", {
        studentname: "Jacob Reed",
        statename: "treeState",
        data: forest
    });

    socket.emit("load", {
        studentname: "Jacob Reed",
        statename: "treeState"
    });
}

//After loop function
function afterStep(forest) {
    var scale = 1;
    var canvas = document.getElementById('game');
    var c = canvas.getContext('2d');
    console.log(forest);
    for (i = 0; i < forest.data.X; i++) {
        for (j = 0; j < forest.data.Y; j++) {
            c.fillStyle = forest.data.colors[forest.data.t[i][j]];
            c.fillRect(scale * j, scale * i, scale * j + 9, scale * i + 9);
        }
    }
}

function start() {
    (function gameLoop() {
        this.step(forest);
        requestAnimFrame(gameLoop, this.ctx);
    })();
}

start();