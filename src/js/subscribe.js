$(window).load(function() {
    $('#subscribe-modal').modal();

    $('#show-subscribe').click(function() {
        console.log('hi')
        $('#subscribe-modal').modal('show');
    });

    $('#subscribe-form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/list/subscribe/news",
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

    $('#general-member-input').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/list/subscribe/news",
            dataType: 'json',
            data: getFormData($(this)),
            success: function() {
                $('#general-member-input').removeClass('error');
                $('#success>.message').removeClass('hidden');
                $('#general-member-input').form('clear');
                setTimeout(function() {
                    $('#success>.message').addClass('hidden');
                }, 3000);
            },
            error: function() {
                $('#general-member-input').removeClass('success');
                $('#error>.message').removeClass('hidden');
                setTimeout(function() {
                    $('#error>.message').addClass('hidden');
                }, 3000);
            }
        });
    });
});

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
