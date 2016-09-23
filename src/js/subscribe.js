$(document).ready(function() {
    $('#subscribe-modal').modal();         // Initialize modal

    $('#show-subscribe').click(function() {
        $('#subscribe-modal').modal('show');
    });

    $('#subscribe-form').on('submit', function(event) {
        event.preventDefault();
        console.log(getFormData($(this)))
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/list/subscribe/news",
            dataType: 'json',
            data: getFormData($(this)),
            success: function() {
                $('#subscribe-modal').modal('hide')
            },
            error: function() {
                $('#subscribe-modal').modal('hide')
            }
        })
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
