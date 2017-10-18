jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://new.turneo.ru/api/1/CountryInfo/GetCountrys/",
        dataType: 'json',
        success: function (data) {
            for (var key in data.records) {
                var item = data.records[key];
                var html = '<tr>\n\
                                <td>' + item.country_id + '</td>\n\
                                <td>' + item.country_name + '</td>\n\
                                <td><a href="country_show.html?id='+item.country_id+'">Подробнее</a></td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);     
            }
        }
    });
});