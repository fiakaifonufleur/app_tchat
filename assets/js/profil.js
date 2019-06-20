$( document ).ready(function() {
    $('a#linkAvatar').click(function() {
        $('#inputFile').click().change(function () {
            $("#formUploadFile").submit();
        });

    });
});