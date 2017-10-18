jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://new.turneo.ru/api/1/CountryInfo/GetCountrys/",
        dataType: 'json',
        success: function (data) {
            var value = 183;
            for (var key in data.records) {
                var item = data.records[key];
                //var html = "<option value='" + item.country_resort_id + "'>" + item.country_resort_name + "</option>";
                if (value == item.country_id) {
                    var html = "<option value='" + item.country_id + "' selected=1>" + item.country_name + "</option>";
                } else {
                    var html = "<option value='" + item.country_id + "'>" + item.country_name + "</option>";
                }
                jQuery("select[name=country]").append(html);
            }
            jQuery("select[name=country]").change();
        }
    });
    jQuery("select[name=country]").change(function () {
        var id = jQuery(this).val();
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "http://new.turneo.ru/api/1/CountryInfo_City/GetCity/",
            data: {id: id},
            success: function (data) {
                jQuery("#documentTable tbody").html("");
                for (var key in data.records) {
                    var item = data.records[key];
                    var html = "<option value='" + item.country_resort_id + "'>" + item.country_resort_name + "</option>";
                    jQuery("select[name=city]").append(html);
                }
            }
        });
    });
    jQuery(".showHotel").click(function () {
        var country = jQuery("select[name=country]").val();
        var city = jQuery("select[name=city]").val();
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "http://new.turneo.ru/api/1/Hotel/GetHotels/",
            data: {country: country, city: city},
            success: function (data) {
                jQuery("#documentTable tbody").html("");
                for (var key in data.records) {
                    var item = data.records[key];
                    var html = '<tr>\n\
                                <td>' + item.hotel_id + '</td>\n\
                                <td>' + item.hotel_name + '</td>\n\
                                <td><a href="hotel_show.html?id=' + item.hotel_id + '">Оценить</a></td>\n\
                            </tr>';
                    jQuery("#documentTable tbody").append(html);
                }
            }
        });
    });
});