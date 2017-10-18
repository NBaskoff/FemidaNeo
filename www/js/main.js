var user = null;
// get query arguments
var $_GET = parseURLParams(window.location.href);
jQuery(document).ready(function () {
    
    //Проверим юзера и если нету - на авторизацию.
    var path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];
    if (path != "auth.html" && path != "reg.html") {
        jQuery.ajax({
            type: "POST",
            url: "http://femidaneo.ru/api/1/User/GetUser/",
            //data: ({a : aaa, b : bbb}),
            dataType: 'text',
            success: function (data) {
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка, Попробуйте позже.");
                    alert(data);
                }
                if (pdata == null) {
                    $(".animate").click(function () {
                        document.location.href = 'auth.html';
                    });
                    $(".animate").animate({opacity: 0}, 2500, "linear", function () {
                        document.location.href = 'auth.html';
                    })
                } else {
                    user = pdata;
                    jQuery.ajax({
                        type: "POST",
                        url: "http://new.turneo.ru/api/1/Clients/Auth/",
                        data: {"user":user},
                        dataType: 'text',
                        success: function (data) {}
                    });                     
                    if (path == "index.html" || path == "") {
                        $(".animate").click(function () {
                            document.location.href = 'document.html';
                        });
                        $(".animate").animate({opacity: 0}, 2500, "linear", function () {
                            document.location.href = 'document.html';
                        })
                    }
                }
            }
        });
    }
    var mainMenuAuth = '\n\
                        <ul class="nav navbar-nav navbar-right" style="margin-right: -30px">\n\
                            <li><a href="auth.html">Авторизация</a></li>\n\
                            <li><a href="reg.html">Регистрация</a></li>\n\
                            <li><a href="#">Восстановление пароля</a></li>\n\
                        </ul>';
    jQuery("#mainMenuAuth").html(mainMenuAuth);
    var mainMenu = '\n\
                        <ul class="nav navbar-nav">\n\
                            <li><a href="document.html">Документы</a></li>\n\
                            <li><a href="var.html">Мои данные (Переменные)</a></li>\n\
                            <li><a href="tour.html">Туризм</a></li>\n\
                            <li><a href="country.html">Страны</a></li>\n\
                            <li><a href="hotel.html">Отели</a></li>\n\
                            <li><a href="feed.html">Обратная связь</a></li>\n\
                        </ul>\n\
                        <form class="navbar-form navbar-left" method="GET" role="search" action="document.html">\n\
                            <div class="form-group">\n\
                                <input type="text" name="nomer" class="form-control" placeholder="Введите ID PL* для поиска">\n\
                            </div>\n\
                            <button type="submit" class="btn btn-primary">Поиск</button>\n\
                        </form>\n\
                        <ul class="nav navbar-nav navbar-right" style="margin-right: -30px">\n\
                            <li><a href="exit.html">Выход</a></li>\n\
                        </ul>';
    jQuery("#mainMenu").html(mainMenu);

    //jQuery(".phoneMask").mask("+7 (999) 999-9999");

    jQuery("body").on("click", "a", function () {
        var text = jQuery(this).attr("question");
        if (text != undefined) {
            return confirm(text);
        } else {
            return true;
        }
    });
    jQuery("body").on("click", "button", function () {
        var text = jQuery(this).attr("question");
        if (text != undefined)
        {
            return confirm(text);
        } else
        {
            return true;
        }
    });
    jQuery(".contentPage").each(function () {
        var box = jQuery(this);
        var page = jQuery(this).attr("page");
        jQuery.ajax({
            type: "POST",
            url: "http://femidaneo.ru/api/1/Page/GetPage/",
            data: ({page: page}),
            success: function (data) {
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка, Попробуйте позже.");
                    alert(data);
                }
                jQuery(".contentPage_name").html(pdata.page_name);
                jQuery(".contentPage_body").html(pdata.page_body);
            }
        });
    });
});
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
            queryEnd = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
