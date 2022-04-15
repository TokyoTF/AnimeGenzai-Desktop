var $ = require('jquery');
var VolumeCounter = 0
$("#music").ready(function () {
    $("#music")[0].play()
    summer()
})


function summer() {
   var fadevolume = setInterval(() => {
       $("#music")[0].volume = VolumeCounter;
        if (VolumeCounter = 5) {
            clearInterval(fadevolume);
        }
    VolumeCounter += 1
}, 300);
    return 
}