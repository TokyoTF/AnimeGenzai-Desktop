var $ = require('jquery');
var { CreateNotification } = notificationCT

$("#search-form").keyup(function () {
    if ($("#search-text").val().length > 1) {

                handlerO()
        } else {
            $(".list-search").hide()
            $(".list-search").css("opacity", "0%")
            $(".list-search").html('');
            $(".list-search").css("opacity", "0%")
            if ($(".notification-item").length) {
                notificationD
                var notificationD = setInterval(() => {
                    if ($(".notification-item").css('opacity') == '0') {
                        $('.notification-item').remove()
                        clearInterval(notificationD);
                    }
                }, 200);


            } else {
                $(".notification-container").append(CreateNotification("tienes que poner 2 palabras como minimo para buscar", "information", "information"))
                $(".notification-item").transition({ y: "-10px", opacity: 1 })
                setTimeout(() => {
                    $('.notification-item').transition({ y: "15px", opacity: 0 })
                }, 4000)
            }
        }

});



function handlerO() {
    $.post("/search/" + $("#search-text").val(), function (data) {
        $(".list-search").html('');
        data.search.map(r => {
            
            if (r.type == "serie") {
                $(".list-search").append(`
                <a href="/anime/${r.id}">
        <li class="list-search-item">
        <div class="list-search-image">
            <img src="https://animegenzai.xyz/public/upload/cover/${r.image}">
        </div>
        <div class="list-search-title">
        <p class="list-search-sub-title">Serie</p>
        <p>${r.title}</p>
        </div>
        </li>
        </a>
        `);
            }
            if (r.type == "movie") {
                $(".list-search").append(`
                <a href="/movie/${r.id}">
        <li class="list-search-item">
        <div class="list-search-image">
            <img src="https://animegenzai.xyz/public/upload/cover/${r.image}">
        </div>
        <div class="list-search-title">
        <p class="list-search-sub-title">Pelicula</p>
        <p>${r.title}</p>
        </div>
        </li>
        </a>
        `);
            }


        });
        $(".shadow-search").show().transition({ opacity: 1 });
        $(".list-search").show().transition({ opacity: 1 });
    })
}
$(document).ready(function () {
    $(".search-container").hide()
    
})
$(".shadow-search").on('click', function () {
    
    $(".search-container").transition({ opacity: 0 });
    $(".list-search").hide().transition({ opacity: 0 });
    $(".shadow-search").hide().transition({ opacity: 0 })
    $(".search-container").hide().transition({ opacity: 0 });
    $("#search-text").val("")
})
