function template_factory(name) {

    var item_container =
        "<div data-item_id={{id}} onclick='onItemClick({{id}})' class='item-container'>" +
        "<img class='item-img' src='http://www.lativ.com.tw/{{{src}}}'>" +
        "<div class='item-text'>{{name}}</div>" +
        "</div>";


    var item_container_no_click =
        "<div onclick='showDetail({{id}})' class='item-container'>" +
        "<img class='item-img' src='http://www.lativ.com.tw/{{{src}}}'>" +
        "<div class='item-text'>{{name}}</div>" +
        "</div>"



    switch (name) {
        case 1:
            return item_container;
            break;

        case 2:
            return item_container_no_click;
            break;

        default:
            break;
    }

}
