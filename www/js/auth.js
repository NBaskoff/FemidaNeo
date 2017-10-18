jQuery(document).ready(function () {
    jQuery("input[name=email]").val(window.localStorage.getItem("login"));
    jQuery("input[name=pass]").val(window.localStorage.getItem("pass"));
    jQuery(".btnAuth").click(function(){
        if (jQuery("input[name=save]").prop("checked")) {
            window.localStorage.setItem("login", jQuery("input[name=email]").val());
            window.localStorage.setItem("pass", jQuery("input[name=pass]").val());
        } else {
            window.localStorage.setItem("login", "");
            window.localStorage.setItem("pass", "");
        }
    });
    
    jQuery("form", ".formAjaxAuth").submit(function () {
        var box = jQuery(this).parent(".formAjaxAuth");
        var  url="http://femidaneo.ru/api/1/User/Auth/";
        var options = {
            url: url,
            type: "POST",
            dataType: "text",
            beforeSubmit: function (data) {
                jQuery(".has-error", box).removeClass("has-error");
                jQuery(".error__text", box).text("");
                jQuery(".load__box", box).css("display", "block");
            },
            success: function (data) {
                jQuery(".load__box", box).css("display", "none");
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка, Попробуйте позже.");
                    alert(data);
                }
                if (pdata.error !== null && pdata.error !== undefined) {
                    for (var key in pdata.error) {
                        var val = pdata.error[key];
                        jQuery(".error__" + key + "", box).text(val);
                        var el = jQuery("*[name=" + key + "]", box);
                        jQuery(el).parents(".form-group").eq(0).addClass("has-error");
                    }
                } else {
                    jQuery(box).addClass("contentBody").html(pdata.text);
                }
            }
        };
        jQuery(this).ajaxSubmit(options);
        return false;
    });    
    
    
   
    
    
    
    
});