jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://new.turneo.ru/api/1/Clients/GetTourists/",
        dataType: 'json',
        success: function (data) {
            for (var key in data.records) {
                var item = data.records[key];
                var html = '<tr>\n\
                                <td><input type="checkbox" name="tourists[]" class="clientsCheck" value="'+item.clients_id+'"></td>\n\
                                <td>' + item.clients_fio + '</td>\n\
                                <td>' + item.clients_phone + '</td>\n\
                                <td><a href="tour_edit.html?id='+item.clients_id+'">Редактировать</a></td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);     
            }
        }
    });
    
    jQuery("input[name=start]").mask("99.99.9999");
    
    jQuery.ajax({
        type: "POST",
        url: "http://new.turneo.ru/api/1/Bid/GetCountries/",
        dataType: 'json',
        success: function (data) {
            var defaultCountry = 174;
            for (var key in data.countries) {
                var item = data.countries[key];
                if (item.country_name != "") {
                    if (item.country_id == defaultCountry) {
                        var html = '<option selected=1 value="'+item.country_id+'">'+item.country_name+'</option>';
                    } else {
                        var html = '<option value="'+item.country_id+'">'+item.country_name+'</option>';
                    }
                }
                jQuery("select[name=country]").append(html);     
            }
            jQuery("select[name=country]").change();
        }
    });    
    
    jQuery("select[name=country]").change(function(){
        jQuery("select[name=city]").html("");
        var country = jQuery("select[name=country]").val();
        jQuery.ajax({
            type: "POST",
            url: "http://new.turneo.ru/api/1/Bid/GetCity/",
            dataType: 'json',
            data: {country:country},
            success: function (data) {
                var html = '<option value="">Любой</option>';
                jQuery("select[name=city]").append(html);     
                for (var key in data.citys) {
                    var item = data.citys[key];
                    if (item.country_resort_name != "") {
                        var html = '<option value="'+item.country_resort_id+'">'+item.country_resort_name+'</option>';                    }
                    jQuery("select[name=city]").append(html);     
                }
            }
        });        
    });
    
     
});