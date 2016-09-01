(function subscribe($) {
    $(function activate() {
        $('#subscribe-modal').modal();         // Initialize modal

        $('#show-subscribe-button').click(function() { // Show modal on click
            $('#subscribe-modal').modal('show');
        });
    });
}($));

