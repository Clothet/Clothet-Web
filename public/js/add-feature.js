// $('#focus-item-img').loupe({
//     width: 200, // width of magnifier
//     height: 150, // height of magnifier
//     loupe: 'loupe' // css class for magnifier
// });

// manifier end

function setMagnifier() {
    $('#focus-item-img')
        .wrap('<span style="display:inline-block"></span>')
        // .css('display', 'block')
        .parent()
        .zoom();
}


function unsetMagnifier() {
    $('#focus-item-img').trigger('zoom.destroy');
}
