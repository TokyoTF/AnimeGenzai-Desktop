var $ = require('jquery');
var { CreateNotification } = notificationCT  // eslint-disable-line
require('multiple-select')

if ($(".notification-item").length) {
    notificationD
    var notificationD = setInterval(() => {
        if ($(".notification-item").css('opacity') == '0') {
            $('.notification-item').remove()
            clearInterval(notificationD);
        }
    }, 200);


} else {
    $(".notification-container").append(CreateNotification("Recuerda hacer varios clicks para reproducir el video debido al blockeo de anuncio", "warning", "warning"))
    $(".notification-item").transition({ y: "-10px", opacity: 1 })
    setTimeout(() => {
        $('.notification-item').transition({ y: "15px", opacity: 0 })
        var sada = setInterval(() => {
            if ($('.notification-item').css('opacity') == "0")
                clearInterval(sada)
            $(".notification-item").hide()
        }, 200);
    }, 7500)

}
$(function () {
    $("select").multipleSelect({
        width: 150,
        onClick: function (view) {
            $("#iframe").attr("src", view.data.iframe)
        },
    })
    $("select").ready(function () {

        if ($("select").multipleSelect("getSelects", "text")[0] == "GenPlayer") {
            var Ulrs = $("select > option").data('iframe')
            if (Ulrs.includes(".mp4")) {

                $(".Episode-player").html("");
                $(".Episode-player").append(`
            <video id="player" playsinline controls preload="meta" data-plyr-config='{ "toggleInvert": false,"invertTime": false}' data-poster="/assets/img/player-ads_8.webp" >
                <source src="${$("select > option").data('iframe')}" type="video/mp4"/>
            </video>
            `);
                const player = new Plyr(document.getElementById('player')); // eslint-disable-line

            } else {
                $("#iframe").attr("src", $("select > option").data('iframe'))
            }

        } else {
            $("#iframe").attr("src", $("select > option").data('iframe'))
        }

    })

});

$(".Episode-Shared-title").click(function () {
    if ($(".Episode-Shared-content").css("display") == "none") {
        $(".Episode-Shared-content").css("display", "flex")
        $(".Episode-Shared-content").transition({ y: "0px", opacity: 1 })
    } else {
        $(".Episode-Shared-content").transition({ y: "15px", opacity: 0 })
        var sada = setInterval(() => {
            if ($('.Episode-Shared-content').css('opacity') == "0")
                clearInterval(sada)
            $(".Episode-Shared-content").hide()
        }, 200);
    }
})


$(".AnimeGenzai-hp-button").on("mouseenter", function () {
    $(".AnimeGenzai-hp-wow").transition({ bottom:"0px" })
})
$(".AnimeGenzai-hp-button").on("mouseleave", function () {
    $(".AnimeGenzai-hp-wow").transition({ bottom:"-165px" })
})