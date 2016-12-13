var BASE_URL = 'http://exwd.csie.org:5678'

$(function() {

    initializeTabSortable();
    //detect tab

    //default data
    $.get(BASE_URL + '/api/items/search?category=褲裝', function(data) {
        for (var i in data) {
            // console.log(data[i]);
            putItemIntoTab(data[i]);
        }
    });

    bindEvent();


});

function bindEvent() {
    //
    $(".store-tabs>.tab-indicator").on("click", function(event) {
        console.log(event);
    });

    $('#search-self-item').keyup(function(event) {
        if (event.keyCode == 13) {
            console.log(111)
        }
    });

    $('#search-store-item').keyup(function(event) {
        if (event.keyCode == 13) {
            $('#tab11').empty();
            $.get(BASE_URL + '/api/items/search?name=' + $('#search-store-item').val(), function(data) {
                for (var i in data) {
                    putItemIntoTab(data[i], 11);
                }
            });

            $('#middle-column .tab-pane.active.in').removeClass('active in')
            $('#middle-column .tab-indicator.active').removeClass('active')
            $('#tab11').addClass('active in')

        }
    });

    // $('.item-container').on("click", function(event) {
    //     console.log(event);
    // });


}

function initializeTabSortable() {
    for (var i = 0; i <= 11; i++) {
        Sortable.create(document.getElementById("tab" + i), {
            animation: 150, // ms, animation speed moving items when sorting, `0` — 
            group: "omega"
            // onUpdate: function(evt /**Event*/ ) {
            //     var item = evt.item; // the current dragged HTMLElement
            //     console.log(item)
            // }
        });
    }
    Sortable.create(document.getElementById("trash-can"), {
        animation: 150, // ms, animation speed moving items when sorting, `0` — 
        group: "omega"
        // onUpdate: function(evt /**Event*/ ) {
        //     var item = evt.item; // the current dragged HTMLElement
        //     console.log(evt)
        // },
        // onEnd: function( *Event evt) {
        //     console.log(evt)

        //     evt.oldIndex; // element's old index within parent
        //     evt.newIndex; // element's new index within parent
        // },
    });
}

function getTabData(tabNum) {
    var category = '';
    switch (tabNum) {
        case 6:

            break;

        case 7:

            break;

        case 8:

            break;

        case 9:

            break;

        case 10:

            break;

        default:
            break;
    }
    $.get(BASE_URL + '/api/items/search?category=' + category, function(data) {
        for (var i in data) {
            // console.log(data[i]);
            putItemIntoTab(data[i]);
        }
    });
}



function changeMiddleColume(page) {
    var a = $("#slide-store");
    var b = $("#slide-combination");
    var c = $("#slide-bookmark");
    a.fadeOut(200);
    b.fadeOut(200);
    c.fadeOut(200);
    if (page == 'store') {
        a.fadeIn(200);
    } else if (page == 'combination') {
        b.fadeIn(200);
    } else {
        c.fadeIn(200);
    }
    console.log(page)
}



// 
function putItemIntoTab(item, assignedTab) {
    // console.log(item)
    var images = (item.image).split(",");

    // determine which tab, tab6 tab7 tab8 tab9
    var view = {
        serial_no: item.serial_no,
        name: item.name,
        src: images[0]
    };

    var output = Mustache.render(
        "<div onclick='onItemClick({{serial_no}})' class='item-container'>" +
        "<img class='item-img' src='{{{src}}}'>" +
        "<div class='item-text'>{{name}}</div>" +
        "</div>", view);

    //to which tag
    var tab;
    switch (item.category) {
        case '褲裝':
        case '裙裝':
            tab = 9
            break;
        default:
            tab = 10
    }
    if (assignedTab) {
        tab = assignedTab;
    }
    console.log(tab)
    $("#tab" + tab).append(output);

}




function showRecommendation(id) {
    // $("#recommend-panel").empty();

    // // check all combinations
    // for (var i in recommendations) {
    //     if (recommendations[i].indexOf(id) > -1) {
    //         putCombinationIntoPanel(recommendations[i]);
    //     }
    // }
}

function putCombinationIntoPanel(mItems /*array*/ ) {

    var s = '';
    for (var id in mItems) {
        var item = items[mItems[id]];
        s +=
            '<div class="item-container" onclick=showDetail(\'' + item.id + '\') data-id="' + item.id + '">' +
            '<img class="item-img" src="' + item.img + '" />' +
            '<div class="item-text">' + item.name + '</div>' +
            '</div>'
    }

    // put one combination into panel
    $("#recommend-panel").append(
        '<div class="combination">' +
        s +
        '<img data-full=0 class="favorite-icon" src="./img/empty-heart.png" onclick=toggleHeart(this) />' +
        '</div>'
    );
}

// -------------------------------------------



function onItemClick(id) {
    showDetail(id);
    // showRecommendation(id);
    // initializeTabSortable();
}

function showDetail(id) {

    $.get(BASE_URL + '/api/items/' + id, function(item) {
        console.log(item)
        var images = (item.image).split(",");
        $('#focus-item-img').attr("src", images[0]);
        $('#focus-item-sample-container').empty();
        for (var i = 1; i < images.length; i++) {
            $('#focus-item-sample-container').append(
                '<img class="focus-item-sample-img" src="' + images[i] + '">'
            )
        }
        $('#focus-item-sample-container')
        $('#focus-item-title').html(item.name);
        $('#focus-item-price>span:first-child').html("NT$ " + item.price);
        $('#focus-item-buy-btn').click(function(event) {
            window.open('http://www.lativ.com.tw/')
        });

    });


    // $('#store').html(item.store);
    // $('#price').html(item.price);
    // $('#note').html(item.note);
}


function toggleHeart(html) {
    var jHtml = $(html)
    if ($(html).attr('data-full') == "0") {
        $(html).attr('data-full', "1");
        $(html).attr('src', './img/full-heart.png');
    } else {
        $(html).attr('data-full', "0");
        $(html).attr('src', './img/empty-heart.png');
    }
}



var recommendations = [
    ['1', '16', '15', '13'],
    ['2', '16', '15', '12'],
    ['3', '10', '8', '12'],
    ['4', '5', '12', '14'],
    ['6', '7', '12', '14'],
    ['8', '16', '12', '14'],
    ['9', '10', '12', '14'],
    ['9', '10', '11', '14'],
    ['1', '11', '15', '16']
]
