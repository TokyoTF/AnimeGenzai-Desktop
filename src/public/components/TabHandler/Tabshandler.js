var $ = require('jquery');
$(".Anime-obj-season-item").on('click', function () {
    $(".Anime-obj-season").children().removeClass('activetab')
    $(this).addClass('activetab')
    $(".Anime-obj-episodes").scrollTop(-0)
    $.get("/se/" + $(this).data('cont') + "/" + $(this).data('id'), function (data) {
        $(".Anime-obj-episodes").html('')
        data.AnimeEpisodes.map(r => {
            $(".Anime-obj-episodes").append(`
            <a href="/anime/${r.content_id}/${r.season_id}/${r.id}/${r.name}">
           <div class="Anime-obj-episodes-item">
                <p>Episodio ${r.name}.</p>
                <div class="Anime-obj-episodes-item-mf">
                       <p>${r.description}</p>
                   </div>
                   <div class="Anime-obj-separator"></div>
           </div>
           </a>
            `)
        })
        $(".Anime-obj-episodes-item").transition({ opacity: 1 })
        $(".Anime-obj-se-container").scrollTop();
    })
})

$(window).ready(async function () {
    await Render()
})

function Render() {
    $.get("/se/" + $(".Anime-obj-season-item").first().data('cont') + "/" + $(".Anime-obj-season-item").first().data('id'), function (data) {
        $(".Anime-obj-season-item").first().addClass('activetab')
        
        $(".Anime-obj-episodes").html('')
        data.AnimeEpisodes.map(r => {
            if (r.id == $("#present").data('ep')) {
               
                $(".Anime-obj-episodes").append(`
            <a href="/anime/${r.content_id}/${r.season_id}/${r.id}/${r.name}">
            <div class="Anime-obj-episodes-item activetab">
                 <p>Episodio ${r.name}.</p>
                 <div class="Anime-obj-episodes-item-mf">
                        <p>${r.description}</p>
                    </div>
                    <div class="Anime-obj-separator"></div>
            </div>
            </a>
            `)
            } else {
                $(".Anime-obj-episodes").append(`
            <a href="/anime/${r.content_id}/${r.season_id}/${r.id}/${r.name}">
            <div class="Anime-obj-episodes-item">
                 <p>Episodio ${r.name}.</p>
                 <div class="Anime-obj-episodes-item-mf">
                        <p>${r.description}</p>
                    </div>
                    <div class="Anime-obj-separator"></div>
            </div>
            </a>
            `)
            }


        })

        $(".Anime-obj-episodes-item").transition({ opacity: "100%" })
        $(".Anime-obj-se-container").scrollTop();
    })
}

