//tab behavior
function openTab1(evt, cityName) {
    console.log(evt)
        // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openTab2(evt, cityName) {
    console.log(evt)
        // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
///////////////---------------------------


function showRecommendation(id){
    $("#recommend-panel").empty();

    // check all combinations
    for(var i in recommendations){
        if( recommendations[i].indexOf(id)> -1 ){
            putCombinationIntoPanel(recommendations[i]);
        }
    }
}

function putCombinationIntoPanel(mItems /*array*/){

    var s  = '';
    for(var id in mItems){
        var item = items[mItems[id]];
        s +=
        '<div class="item-container" onclick=showDetail(\''+ item.id + '\') data-id="' + item.id + '">'+
            '<img class="item-img" src="' + item.img + '" tabIndex="0" />' +
            '<div class="item-text">' + item.name + '</div>' +
        '</div>'
    }

    // put one combination into panel
    $("#recommend-panel").append(
        '<div class="combination">'+
            s+
            '<img data-full=0 class="favorite-icon" src="./img/empty-heart.png" onclick=toggleHeart(this) />'+
        '</div>'
    );
}

// -------------------------------------------



function putItemIntoTab(item) {
    $("#tab" + item.tab).append(
        '<div onclick=onItemClick("' + item.id + '") class="item-container" data-id="' + item.id + '">' +
        '<img class="item-img" src="' + item.img + '" tabIndex="0" />' +
        '<div class="item-text">' + item.name + '</div>' +
        '</div>'
    );
}




function onItemClick(id){
    showDetail(id);
    showRecommendation(id);
}

function showDetail(id) {
    var item = items[id];
    console.log(id)
    $('#detail-img').attr("src", item.img);
    $('#title').html(item.name);
    $('#store').html(item.store);
    $('#price').html(item.price);
    $('#note').html(item.note);
}



function toggleHeart(html) {
    var jHtml = $(html)
    if($(html).attr('data-full')=="0"){
        $(html).attr('data-full',"1");
        $(html).attr('src','./img/full-heart.png');
    }else{
        $(html).attr('data-full',"0");
        $(html).attr('src','./img/empty-heart.png');
    }
}



var items = {
    '1': {
        id: '1',
        name: '口袋來貘Tee',
        store: 'Lativ',
        price: '$249',
        note: 'onSale',
        img: './img/2870801_220.jpg',
        tab: 1
    },
    '2': {
        id: '2',
        name: '奧樂星GTee',
        store: 'Lativ',
        price: '$199',
        note: 'onSale',
        img: './img/2604401_220.jpg',
        tab: 1
    },
    '3': {
        id: '3',
        name: '布魯克林大橋Tee',
        store: 'Lativ',
        price: '$199',
        note: 'onSale',
        img: './img/2602301_220.jpg',
        tab: 1
    },
    '4': {
        id: '4',
        name: '尋找天堂拉克蘭T',
        store: 'Lativ',
        price: '$249',
        note: 'onSale',
        img: './img/2585101_500.jpg',
        tab: 1
    },
    '5': {
        id: '5',
        name: '法蘭絨格紋襯衫',
        store: 'Lativ',
        price: '$332',
        note: 'onSale',
        img: './img/2837119_220.jpg',
        tab: 2
    },
    '6': {
        id: '6',
        name: '法蘭絨印花襯衫',
        store: 'Lativ',
        price: '$399',
        note: 'onSale',
        img: './img/2837202_500.jpg',
        tab: 2
    },
    '7': {
        id: '7',
        name: '棉質針織外套',
        store: 'Lativ',
        price: '$399',
        note: 'onSale',
        img: './img/2621204_220.jpg',
        tab: 2
    },
    '8': {
        id: '8',
        name: 'Fleece連帽外套',
        store: 'Lativ',
        price: '$417',
        note: 'onSale',
        img: './img/2800401_220.jpg',
        tab: 3
    },
    '9': {
        id: '9',
        name: 'Fleece立領外套',
        store: 'Lativ',
        price: '$332',
        note: 'onSale',
        img: './img/2800212_220.jpg',
        tab: 3
    },
    '10': {
        id: '10',
        name: '極暖立領羽絨背心',
        store: 'Lativ',
        price: '$1097',
        note: 'onSale',
        img: './img/2812703_220.jpg',
        tab: 3
    },
    '11': {
        id: '11',
        name: '特彈 Slim Fit 窄管牛仔褲',
        store: 'Lativ',
        price: '$690',
        note: '',
        img: './img/2834401_220.jpg',
        tab: 4
    },
    '12': {
        id: '12',
        name: 'Slim Fit 多色牛仔褲',
        store: 'Lativ',
        price: '$587',
        note: '',
        img: './img/2834308_220.jpg',
        tab: 4
    },
    '13': {
        id: '13',
        name: '經典直筒牛仔褲',
        store: 'Lativ',
        price: '$490',
        note: '',
        img: './img/2510102_220.jpg',
        tab: 4
    },
    '14': {
        id: '14',
        name: '純棉高統帆布休閒鞋',
        store: 'Lativ',
        price: '$339',
        note: '',
        img: './img/2038006_220.jpg',
        tab: 5
    },
    '15': {
        id: '15',
        name: '純棉經典帆布休閒鞋',
        store: 'Lativ',
        price: '$350',
        note: '',
        img: './img/1646804_220.jpg',
        tab: 5
    },
    '16': {
        id: '16',
        name: '針織圍巾',
        store: 'Lativ',
        price: '$332',
        note: '',
        img: './img/2842402_220.jpg',
        tab: 5
    },

}

var recommendations = [
    ['1','16','15','13'],
    ['2','16','15','12'],
    ['3','10','8','12'],
    ['4','5','12','14'],
    ['6','7','12','14'],
    ['8','16','12','14'],
    ['9','10','12','14'],
    ['9','10','11','14'],
    ['1','11','15','16']
]

$(function() {
    //initialize put all the items into tab content
    for (var i in items) {
        putItemIntoTab(items[i]);
    }

    //make  items in tabs sortable and dragable
    for (var i = 1; i <= 10; i++) {
        Sortable.create(document.getElementById("tab" + i), {
            animation: 150, // ms, animation speed moving items when sorting, `0` — 
            group: "omega",
            onUpdate: function(evt /**Event*/ ) {
                var item = evt.item; // the current dragged HTMLElement
            }
        });
    }

});


