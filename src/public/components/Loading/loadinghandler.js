var $ = require('jquery');
var simpleBars = document.getElementById('SimpleBarRe');
require('jquery.transit')
var innt = setInterval(() => {
    if ($(".loading").css('opacity') == '0') {
        $("#SimpleBarRe").css('height','94vh')
        $(".loading").hide().transition({ x: '120px', opacity: 0 });
        $("#SimpleBarRe").css('overflow-y','auto')
        
        simpleBars
        clearInterval(innt);
    }
}, 100);

    innt
    $(".loading").transition({ x: '120px', opacity: 0 })
   

/*
setInterval(() => {
    console.clear()
}, 10000);

$(document).ready(function () {
    $.getJSON(process.env.AnimeGenzai_Servers, async function (json) {
        if (json.Server_Application.status == "maintenance") {
            $("main").hide().transition({x:'120px',opacity: 0})
            $(".loading").transition({x:'120px',opacity: 0})
            $('.menu-support-title').text('Server Status: ' + json.Server_Application.status)
        } else {
            $(".loading").transition({x:'120px',opacity: 0})
            $('.menu-support-title').text('Server Status: ' + json.Server_Application.status)
        }

    });
   innt
})
*/