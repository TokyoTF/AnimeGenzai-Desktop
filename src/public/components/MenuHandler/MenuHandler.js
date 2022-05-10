var $ = require('jquery');
require('jquery.transit');
require('slick-carousel');
//var imagesLoaded = require('imagesloaded');
const { ipcRenderer } = require('electron');

// query menu
$(".type-close").on('click', function () {
    Window_close()
})
$(".type-maximize").on('click', function () {
    Window_maximize()
})
$(".type-minimize").on('click', function () {
    Window_minimize()
})

$(window).on('resize', function () {
    //ipcRenderer.send('resize', 1250, 650)
})

// Menu Handler
function Window_close() {
    ipcRenderer.send('window_close')
}
function Window_maximize() {
    ipcRenderer.send('window_maximize')
}

function Window_minimize() {
    ipcRenderer.send('window_minimize')
}

$("#search-page").on('click', function () {
    $(".shadow-search").show().transition({ opacity: 1 })
    $(".search-container").show();
    $(".search-container").transition({ opacity: 1 })
    $("#search-text").focus()
});
//Controller menu 
/*var tabmenu = async () => {
    var tabmenu = await ipcRenderer.invoke('getStoreValue', 'tab-menu');
    return tabmenu
}
var settabmenu = async (r) => {
    await ipcRenderer.invoke('setStoreValue', 'tab-menu', r);
}
$(document).ready(function () {
        checkTabMenu()
        $(".container-main").css("margin-left", "166px");
        $(".menu-left-item p").css("display", "block");
        $(".menu-left-item p").css("opacity", "1");
        $(".menu-left-item").css("justify-content", "left");
        $(".menu-left-title").css("opacity", "1");
        $(".menu-left-item svg").css("height", "15px");
        $(".menu-left-title").css("display", "block");
        $(".menu-left-item svg").css("padding", "5px");
        $(".menu-left-item svg").css("width", "15px");
        $(".menu-left-container").css("width", "120px");
});
function loadTabMenu() {
    if ( tabmenu() == 'true') {
        $(".container-main").css("margin-left", "166px");
        $(".menu-left-item p").css("display", "block");
        $(".menu-left-item p").css("opacity", "1");
        $(".menu-left-item").css("justify-content", "left");
        $(".menu-left-title").css("opacity", "1");
        $(".menu-left-item svg").css("height", "15px");
        $(".menu-left-title").css("display", "block");
        $(".menu-left-item svg").css("padding", "5px");
        $(".menu-left-item svg").css("width", "15px");
        $(".menu-left-container").css("width", "120px"); 
        $("#SlideTypeA").data("act", "active")
    }
    if (tabmenu() == 'false') {
        $(".menu-left-container").css("width", "30px");
        $(".menu-left-item p").css("opacity", "0");
        $(".menu-left-item").css("justify-content", "center");
        $(".menu-left-item svg").css("height", "30px");
        $(".menu-left-item svg").css("padding", "0px");
        $(".menu-left-title").css("opacity", "0");
        $(".menu-left-title").css("display", "none");
        $(".container-main").css("margin-left", "69px");
        $(".menu-left-item svg").css("width", "20px");
        $(".menu-left-item p").css("display", "none");
        $(".control-versions").css("display", "none");
        $("#SlideTypeA").data("act", "inactive")
    }
}
function checkTabMenu() {
    if (tabmenu() == 'true') {
        $(".container-main").css("margin-left", "166px");
        $(".menu-left-item p").css("display", "block");
        $(".menu-left-item p").css("opacity", "1");
        $(".menu-left-item").css("justify-content", "left");
        $(".menu-left-title").css("opacity", "1");
        $(".menu-left-item svg").css("height", "15px");
        $(".menu-left-title").css("display", "block");
        $(".menu-left-item svg").css("padding", "5px");
        $(".menu-left-item svg").css("width", "15px");
        $(".menu-left-container").css("width", "120px");
        $("#SlideTypeA").data("act", "active")
    }
    if (tabmenu() == 'false') {
        $(".menu-left-container").css("width", "30px");
        $(".menu-left-item p").css("opacity", "0");
        $(".menu-left-item").css("justify-content", "center");
        $(".menu-left-item svg").css("height", "30px");
        $(".menu-left-item svg").css("padding", "0px");
        $(".menu-left-title").css("opacity", "0");
        $(".menu-left-title").css("display", "none");
        $(".container-main").css("margin-left", "69px");
        $(".menu-left-item svg").css("width", "20px");
        $(".menu-left-item p").css("display", "none");
        $(".control-versions").css("display", "none");
        $("#SlideTypeA").data("act", "inactive")
    }
}
*/

$("#SlideTypeA").click(function () {

    if ($("#SlideTypeA").data("act") == "active") {
        $(".container-main").css("margin-left", "166px");
        $(".menu-left-item p").css("display", "block");
        $(".menu-left-item p").css("opacity", "1");
        $(".menu-left-item").css("justify-content", "left");
        $(".menu-left-title").css("opacity", "1");
        $(".menu-left-item svg").css("height", "15px");
        $(".menu-left-title").css("display", "block");
        $(".menu-left-item svg").css("padding", "5px");
        $(".menu-left-item svg").css("width", "15px");
        $(".menu-left-container").css("width", "120px");
        $("#SlideTypeA").data("act", "inactive")
    } else {
        if ($("#SlideTypeA").data("act") == "inactive") {
            $(".menu-left-container").css("width", "30px");
            $(".menu-left-item p").css("opacity", "0");
            $(".menu-left-item").css("justify-content", "center");
            $(".menu-left-item svg").css("height", "30px");
            $(".menu-left-item svg").css("padding", "0px");
            $(".menu-left-title").css("opacity", "0");
            $(".menu-left-title").css("display", "none");
            $(".container-main").css("margin-left", "69px");
            $(".menu-left-item svg").css("width", "20px");
            $(".menu-left-item p").css("display", "none");
            $(".control-versions").css("display", "none");
            $("#SlideTypeA").data("act", "active")
        }
    }



});


$("#reload-page").click(function () {
    location.reload();
});

$("#last-page").click(function () {
    window.history.go(-1)
});


$("#next-page").click(function () {
    window.history.go(1)
});

$("div").attr("tabindex", "-1");
$("a").attr("tabindex", "-1");
$("button").attr("tabindex", "-1");
$("input").attr("tabindex", "-1");
/*document.querySelector("#title-iris").textContent = document.querySelector("title").text*/
$(document).ready(function () {
    setTimeout(function () {
        $("a").attr("tabindex", "-1");
    }, 1000);

})
window.addEventListener('keyup', function (event) {
    if (event.getModifierState('CapsLock')) {
        event.preventDefault()

    }
});


$('input').on('keydown', function (e) {
    if (e.keyCode == 9) {
        $(this).focus();
        e.preventDefault();
    }
});

$('#SliderCra').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    draggable: false,
    fade: true,
    touchMove: false,
    infinite: true,
    dots: true,
    adaptiveHeight: true,
    nextArrow: '<div class="slick-next Slider-Next"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></div>',
    prevArrow: '<div class="slick-next Slider-prev"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></div>',
    arrows: true,
    autoplaySpeed: 6500,
});

$('.Slider-type-a').slick({
    lazyLoad: 'ondemand',
    infinite: false,
    touchMove: false,
    slidesToShow: 7,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ],
    speed: 300,
    arrows: true,
    prevArrow: '<div class="Prev-anime"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="arrow-left"><rect width="24" height="24" opacity="0"/><path d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26 1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59 2.23 2.23 0 0 1-.91.2z"/></g></g></svg></div>',
    nextArrow: '<div class="Next-anime"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="arrow-right"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46z"/></g></g></svg></div>',
    variableWidth: true,
    slidesToScroll: 2
});


$(".Story-item").mouseenter(function () {
    $(this).css("width", "150px")
});
$(".Story-item").mouseleave(function () {
    $(this).css("width", "60px")
});

//Popper.createPopper($(".Anime-item")[0], $(".xd")[0], {
//    placement: 'right',
//  });

var state = location.href
var path = document.location.pathname;
if (path === "/" || state.includes("anime") || state.includes("movie")) {
    $(".mn-inicio").css('border-bottom', '2px solid rgb(200 202 63)')
}
if (state.includes("tv-lives") || state.includes("tv-live")) {
    $(".mn-tvlives").css('border-bottom', '2px solid rgb(200 202 63)')
}
if (state.includes("categories") || state.includes("category")) {
    $(".mn-cat").css('border-bottom', '2px solid rgb(200 202 63)')
}


//tab little
if (state.includes("profile")) {
    $(".profile-header-info").on("click", ".tab", function (event) {
        event.preventDefault();

        $(".tab").removeClass("active");
        $(this).hasClass("active")
        $(".profile-middle-info").removeClass("show");
        $(this).addClass("active");
        $($(this).attr('href')).addClass("show").transition({"opacity":1});  
    });
    $(document).ready(function () {
        document.querySelectorAll(".little-bar")[0].setAttribute("style", "opacity: 1");
    })

    $(".profile-header-info").on("click", ".profile-header-info-item", function (event) {
        event.preventDefault();
        $(".little-bar").css('opacity', '0')
        $(this).children(".little-bar").css('opacity', '1')
    });
}
