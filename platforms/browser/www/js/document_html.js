jQuery(document).ready(function () {
    //Для начала получим рубрики
    if ($_GET == undefined) {
        var selectDocument = 0;
    } else {
        var selectDocument = $_GET["id"][0];
    }

    jQuery.ajax({
        type: "POST",
        url: "http://femidaneo.ru/api/1/DocumentPackages/GetDocument/",
        data: ({id: selectDocument}),
        dataType: 'json',
        success: function (data) {
            jQuery(".documentName").html(data.name);
            for (var i = 0; i < data.globalValues.length; i++) {
                var item = data.globalValues[i];
                if (item.value == undefined) {
                    item.value = "";
                }
                var html = '<tr>\n\
                                <td>' + item.user_values_name + '</td>\n\
                                <td><input class="valueTableInput" name="global_' + item.user_values_id + '" value="' + item.value + '"></td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);
            }
            for (var i = 0; i < data.localValues.length; i++) {
                var item = data.localValues[i];
                if (item.value == undefined) {
                    item.value = "";
                }
                var html = '<tr>\n\
                                <td>' + item.document_packages_values_name + '</td>\n\
                                <td><input class="valueTableInput" name="local_' + item.document_packages_values_id + '" value="' + item.value + '"></td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);
            }
            for (var i = 0; i < data.documents.length; i++) {
                var item = data.documents[i];
                jQuery(".docList").append(item.document_packages_documents_name + "<br>");
            }

            var exurl = 'http://femidaneo.ru/api/1/DocumentPackages/DownloadDocument/' + selectDocument + '/' + user.user_id + '/';
            var onlick = '';
            /*var url = '<a class="getLink" href="#" onclick="">\n\
             <div class="btn btn-primary" style="margin-bottom: 15px;">Посмотреть / Скачать</div>\n\
             </a>\n\
             <a class="getOwner" href="document.html?id=' + data.document_items_owner + '">\n\
             <div class="btn btn-primary" style="margin-bottom: 15px;">Вернуться назад</div>\n\
             </a>\n\
             <div class="clear"></div>\n\
             <div class="iframeShow">\n\
             <iframe width="100%" height="560px" src="http://tele1000.ru/document/showHtml/' + data.document_items_id + '?user=' + user.user_id + '"></iframe>\n\
             </div>';*/
            jQuery(".documentDounload").click(function(){
                window.open(exurl, '_system');
            });
        }
    });
    jQuery("#documentTable tbody").on("change", ".valueTableInput", function () {
        var name = jQuery(this).attr("name");
        var value = jQuery(this).val();
        jQuery.ajax({
            type: "POST",
            url: "http://femidaneo.ru/api/1/UserValues_Value/SetValue/",
            data: ({id: name, value: value}),
            dataType: 'json',
            success: function (data) {

            }
        });
    });


});