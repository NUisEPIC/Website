(function() {
    $(function() {
        $('#subscribe-modal').modal();

        $('#show-subscribe').click(function() {
            console.log('hi')
            $('#subscribe-modal').modal('show');
        });

        $('#subscribe-form').on('submit', function(event) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/mail/subscribe",
                dataType: 'json',
                data: getFormData($(this)),
                success: function() {
                    $('#subscribe-modal').modal('hide');
                    $('#success>.message').removeClass('hidden');
                    setTimeout(function() {
                        $('#success>.message').addClass('hidden');
                    }, 3000);
                },
                error: function() {
                    $('#subscribe-modal').modal('hide');
                    $('#error>.message').removeClass('hidden');
                    setTimeout(function() {
                        $('#error>.message').addClass('hidden');
                    }, 3000);
                }
            });
        });
    });
}());
