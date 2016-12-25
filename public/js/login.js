$('.form').find('input, textarea').on('keyup blur focus', function(e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.form .tab a').on('click', function(e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.form .tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});
// 
var BASE_URL = 'http://exwd.csie.org:5678';

function signup() {

    var name = $('#signup-name').val();
    var email = $('#signup-email').val();
    var password = $('#signup-password').val();


    $.ajax({
        type: 'POST',
        url: BASE_URL + '/api/members/signup',
        data: JSON.stringify({
            'username': email,
            'password': password,
            'name': name
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            if (result['success'] == true) {
                $('#login-panel').fadeOut(600);
                $('#alert-success-text').html('註冊成功')
                $('#alert-success').show();
                $('#alert-success').fadeOut(6000);
            }
        },
        error: function(e) {
            $('#alert-fail-text').html('註冊失敗, Email 已被使用')
            $('#alert-fail').show();
            $('#alert-fail').fadeOut(6000);

        }
    });


    return false;
}

function login() {
    var email = $('#signin-email').val();
    var password = $('#signin-password').val();

    $.ajax({
        type: 'POST',
        url: BASE_URL + '/api/members/login',
        data: JSON.stringify({
            'username': email,
            'password': password
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            if (result['isLogin'] == true) {
                $('#login-panel').fadeOut(600);
                $('#alert-success-text').html('登入成功')
                $('#alert-success').show();
                $('#alert-success').fadeOut(6000);

                console.log(result['user'])
                $('#user-name').html(result['user']['name']);
                changeToUserHeader();




            }
        },
        error: function(e) {
            // console.log(e['responseText']);
            // console.log(JSON.parse(e['responseText'])['msg'])
            $('#alert-fail-text').html(JSON.parse(e['responseText'])['msg'])
            $('#alert-fail').show();
            $('#alert-fail').fadeOut(6000);

        }
    });

    return false;
}

function changeToUserHeader() {
    $('#guest-header').hide();
    $('#user-header').show();
}

function changeToGuestHeader() {
    $('#user-header').hide();
    $('#guest-header').show();
}


function showLoginPanel() {
    $('#login-panel').fadeIn(300);
}

function hideLoginPanel() {
    $('#login-panel').fadeOut(300);
}
