var BASE_URL = 'http://exwd.csie.org:5678'
var lativ_URL = 'http://www.lativ.com.tw/';

var trash_num = 0;


$(function() {

    checkStatus();
    initializeTabSortable();

    getTabData(6);

    bindEvent();


});

function checkStatus() {

    console.log(document.cookie)


    $.ajax({
        url: BASE_URL + '/api/members/status/',
        xhrFields: {
            withCredentials: true
        },

        success: function(status){
            console.log(status);
        },
        error:function(e){
            console.log(e);
        }
    })


}

function bindEvent() {
    //
    // $(".store-tabs>.tab-indicator").on("click", function(event) {
    //     // console.log(event);
    // });

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
                    // console.log(data[i])
                    $.get(BASE_URL + '/api/items/' + data[i].serial_no, function(data) {
                        // console.log(data)

                        for (var i in data.styles) {

                            var name = data.name;
                            putItemIntoTab(data.styles[i], 'search_store', name);


                        }
                    });

                }
            });

            $('#middle-column .tab-pane.active.in').removeClass('active in')
            $('#middle-column .tab-indicator.active').removeClass('active')
            $('#tab11').addClass('active in')

        }
    });



}

function initializeTabSortable() {
    for (var i = 0; i <= 11; i++) {
        new Sortable(document.getElementById("tab" + i), {
            animation: 150, // ms, animation speed moving items when sorting, `0` — 
            group: "omega",
            scroll: true,
            onMove: function( /**Event*/ evt, /**Event*/ originalEvent) {
                // Example: http://jsbin.com/tuyafe/1/edit?js,output
                evt.dragged; // dragged HTMLElement
                evt.draggedRect; // TextRectangle {left, top, right и bottom}
                evt.related; // HTMLElement on which have guided
                evt.relatedRect; // TextRectangle
                originalEvent.clientY; // mouse position
                // return false; — for cancel
                // console.log($(evt.to).get(0).id)

                if ($(evt.to).get(0).id == 'trash-can') {
                    console.log('haha')
                }
            },
            onAdd: function( /**Event*/ evt) {
                var addedTab = $(evt.to)[0].id;
                if (addedTab.substr(3) < 6) {
                    var item = ($(evt.item).children('img')[0])
                    console.log(item)
                        // var saved_item = localStorage.getItem('saved_items');
                        // localStorage.setItem('saved_item',save)

                }
            }
        });
    }
    new Sortable(document.getElementById("trash-can"), {
        animation: 150, // ms, animation speed moving items when sorting, `0` — 
        group: "omega",
        onAdd: function( /**Event*/ evt) {
            console.log('add')
            $('#trash-can').empty();
            trash_num++;
            if (trash_num % 5 == 0) {
                console.log(123)
                $('#gif').show();
                setTimeout(function() {
                    $('#gif').hide();
                }, 3000);
            }
        },

        onEnd: function( /**Event*/ evt) {
            console.log(88)

            evt.oldIndex; // element's old index within parent
            evt.newIndex; // element's new index within parent
        },

    });
}

function getTabData(tabNum) {
    var category = '';
    switch (tabNum) {
        case 6:
            category = 'T恤%26POLO'
            break;

        case 7:
            category = '襯衫'

            break;

        case 8:
            category = '外套類'

            break;

        case 9:
            category = '褲裝%26裙裝'

            break;

        case 10:
            category = '家居服%26配件'
            break;

        default:
            break;
    }
    $('#tab' + tabNum).empty();
    $.get(BASE_URL + '/api/items/search?category=' + category, function(data_raw) {
        for (var i in data_raw) {

            // console.log(data[i])
            $.get(BASE_URL + '/api/items/' + data_raw[i].serial_no, function(data) {
                // console.log(data)

                for (var i in data.styles) {

                    var category = data_raw[i].category;
                    var name = data.name;
                    // console.log(data_raw[i])
                    // console.log(data.styles[i]);
                    putItemIntoTab(data.styles[i], category, name);


                }
            });


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
}



// 
function putItemIntoTab(item, category, name) {
    // console.log(item)
    var images = (item.image).split(",");

    // determine which tab, tab6 tab7 tab8 tab9
    var view = {
        id: item.id,
        name: name,
        src: images[0]
    };

    var output = Mustache.render(template_factory(1), view);

    //to which tag
    var tab;
    switch (category) {
        case 'T恤&POLO':
            tab = 6
            break;
        case '襯衫':
            tab = 7
            break;
        case '外套類':
            tab = 8
            break;
        case '褲裝&裙裝':
        case '褲裝':
        case '裙裝':
            tab = 9
            break;
        case '家居服&配件':
            tab = 10
            break;
        case 'search_store':
            tab = 11;
            break;
        case 'search_self':
            tab = 0;
            break;
        default:
            tab = 11
            break;
    }

    console.log(tab);
    $("#tab" + tab).append(output);

}






function putCombinationIntoPanel(mItems /*array*/ ) {
    var random = Math.floor(Math.random() * 100000);
    var s = '<div id="comb' + random + '" class="combination"><div class="no-fav"></div></div>'
    $('#combination-panel').append(s);
    //console.log(mItems);
    for (var i in mItems) {


        $.get(BASE_URL + '/api/items/details/' + mItems[i].id, function(item) {
            console.log(item);
            var view = {
                id: item.id,
                name: item.item.name,
                src: item.image
            };
            var output = Mustache.render(template_factory(2), view);
            $('#comb' + random).append(output);


        });

    }

}

// -------------------------------------------



function onItemClick(id) {
    $('#combination-panel').empty();
    showDetail(id);
    showRecommendation(id);
}

function showRecommendation(id) {


    // console.log(BASE_URL + '/api/item_combinations/search?item_id=' + id)

    $.get(BASE_URL + '/api/item_combinations/search?item_id=' + id, function(combinations) {
        // console.log(combinations)

        for (var i in combinations) {
            var items = combinations[i].details;
            putCombinationIntoPanel(items)
        }



        // console.log(item)
        // var images = (item.image).split(",");
        // $('#focus-item-img').attr("src", images[0]);
        // $('#focus-item-sample-container').empty();
        // for (var i = 1; i < images.length; i++) {
        //     $('#focus-item-sample-container').append(
        //         '<img class="focus-item-sample-img" src="' + images[i] + '">'
        //     )
        // }
        // $('#focus-item-sample-container')
        // $('#focus-item-title').html(item.name);
        // $('#focus-item-price>span:first-child').html("NT$ " + item.price);
        // $('#focus-item-buy-btn').click(function(event) {
        //     window.open('http://www.lativ.com.tw/')
        // });

    });

}

function showDetail(id) {

    $.get(BASE_URL + '/api/items/details/' + id, function(item) {
        // console.log(item)
        //
        var images = (item.image).split(",");
        $('#focus-item-img').attr("src", lativ_URL + item.image);
        $('#focus-item-sample-container').empty();
        // for (var i = 1; i < images.length; i++) {
        //     $('#focus-item-sample-container').append(
        //         '<img class="focus-item-sample-img" src="' + images[i] + '">'
        //     )
        // }
        $('#focus-item-sample-container')
        $('#focus-item-title').html(item.item.name);
        $('#focus-item-price>span:first-child').html("NT$ " + item.item.price);
        $('#focus-item-buy-btn').click(function(event) {
            window.open('http://www.lativ.com.tw/')
        });

        // 
        $('#current-item-container .item-img').attr("src", lativ_URL + item.image);
        $('#current-item-container .item-text').html(item.item.name);


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
