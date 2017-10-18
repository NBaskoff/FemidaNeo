jQuery(document).ready(function () {
    var id = null;
    if ($_GET != undefined) {
        var id = $_GET["id"][0];
    }
    
    
    jQuery("*[name=clients_id]").val(id);
    jQuery.ajax({
        type: "POST",
        url: "http://new.turneo.ru/api/1/Clients/GetValues/",
        data: ({id: id}),
        dataType: 'json',
        success: function (data) {
            for (var key in data.fields) {
                var item = data.fields[key];
                var html = '<tr>\n\
                                <td>' + item.name + '</td>\n\
                                <td><input id="value' + key + '" class="valueTableInput" name="value[' + key + ']" value="' + item.value + '"></td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);
                if (item.mask != undefined) {
                    jQuery("#value" + key).mask(item.mask);
                }
            }
        }
    });
    /*jQuery("#documentTable tbody").on("change", ".valueTableInput", function(){
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
     });*/
    
    
    jQuery(".saveList").click(function(){
        jQuery("*[name=type]").val("list");
        jQuery("#toutistForm").submit();
    });
    jQuery(".saveAdd").click(function(){
        jQuery("*[name=type]").val("add");
        jQuery("#toutistForm").submit();
    });    
});