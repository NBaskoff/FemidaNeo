jQuery(document).ready(function () {

    //Для начала получим рубрики
    if ($_GET == undefined) {
        var selectCountry = 0;
    } else {
        var selectCountry = $_GET["id"][0];
    }

    jQuery.ajax({
        type: "POST",
        url: "http://new.turneo.ru/api/1/CountryInfo/GetCountry/",
        data: ({id: selectCountry}),
        dataType: 'json',
        success: function (data) {
            for (var key in data.record) {
                var item = data.record[key];
                jQuery("."+key).html(item);
            }
            jQuery(".countryHtml").html(data.html);
        }
    });
});