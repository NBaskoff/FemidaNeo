jQuery(document).ready(function () {
    var find = null;
    if ($_GET != undefined) {
        var find = $_GET["nomer"][0];
    }    
    if (find != null && find != "") {
        jQuery(".findText").text(" | Поиск: "+find);
    }
    jQuery.ajax({
        type: "POST",
        url: "http://femidaneo.ru/api/1/DocumentPackages/GetDocuments/",
        data: ({find: find}),
        dataType: 'json',
        success: function (data) {
             for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var html = '<tr>\n\
                                <td>\n\
                                    <a href="document_html.html?id=' + item.document_packages_id + '">\n\
                                    ' + item.document_packages_id + '<br>\n\
                                    ' + item.document_packages_name + '<br>\n\
                                    ' + item.document_packages_pl_id + '<br></a>\n\
                                </td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);
             }            
        }
    });    
    
});