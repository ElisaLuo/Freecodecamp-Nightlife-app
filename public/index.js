$(document).ready(() => {
    $('.going').click(function () {
        $.ajax({
            type: "POST",
            url: '/auth/github',
            data: {
                barId: $(this).attr('id')
            },
            success: function (data) {

                if (data === 'done') {
                    location.reload();
                } else {
                    alert(data)
                }
            }
        });
    });

    $(' input[type="submit"]').click(function(){
        localStorage.lastSearch = $('input[type="text"]').val()
    });
});