(function() {
    $(function() {
        $('#culture-video').embed({
            source: 'youtube',
            url: 'https://www.youtube.com/embed/-MVcuOELEZY',
            placeholder: 'assets/logos/epic_full.png'
        });

        $('#general-member-form').submit(function(event) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/list/subscribe/news",
                dataType: 'json',
                data: getFormData($(this)),
                success: displaySuccess,
                error: displayError
            });

            function displaySuccess() {
                $('#general-member-form').removeClass('error');
                $('#success>.message').removeClass('hidden');
                $('#general-member-form').form('clear');
                setTimeout(function() {
                    $('#success>.message').addClass('hidden');
                }, 3000);
            }

            function displayError() {
                $('#general-member-form').removeClass('success');
                $('#error>.message').removeClass('hidden');
                setTimeout(function() {
                    $('#error>.message').addClass('hidden');
                }, 3000);
            }
        });

        $('#general-member-form button').popup({
            popup: '#general-member-popup',
            position: 'top right'
        });
    });
}());
