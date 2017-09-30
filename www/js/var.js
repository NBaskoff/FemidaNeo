jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://femidaneo.ru/api/1/UserValues/GetValues/",
        //data: ({id: selectCatalog}),
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.values.length; i++) {
                var item = data.values[i];
                var value = data.valuesValue[item.user_values_id];
                if (value == undefined) {
                    value = "";
                }
                var html = '<tr>\n\
                                <td>' + item.user_values_name + '</td>\n\
                                <td><input class="valueTableInput" name="global_'+item.user_values_id+'" value="'+value+'"></td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);
             }            
        }
    });
    jQuery("#documentTable tbody").on("change", ".valueTableInput", function(){
        var name = jQuery(this).attr("name");
        var value = jQuery(this).val();
        jQuery.ajax({
            type: "POST",
            url: "http://femidaneo.ru/api/1/UserValues_Value/SetValue/",
            data: ({id: name, value:value}),
            dataType: 'json',
            success: function (data) {
                
            }
        });        
    });
});