jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://femidaneo.ru/api/1/User/Exit/",
        dataType: 'json',
        success: function (data) {
            document.location.href='auth.html';
        }
    });
});