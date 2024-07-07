

$(document).ready(function () {
    $('#login-google').click(function (e) {
        e.preventDefault();

        $.ajax({
            url: '../../back-end/php/callback-log.php',
            type: 'GET',
            success: function(response) {
                var data = JSON.parse(response);
                window.location.href = data.redirectUrl;
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });

    });
});