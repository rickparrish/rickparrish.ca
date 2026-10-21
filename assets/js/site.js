if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style")
    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:auto!important}"
        )
    )
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}



var ThemeNames = ['Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti'];
var SelectedThemeUrlTemplate = '/assets/css/bootstrap_{ThemeName}.min.css';

$(document).ready(function () {
    // If user selected a theme, load it
    if ($.cookie("Bootstrap3_SelectedTheme")) {
        if (ThemeNames.indexOf($.cookie("Bootstrap3_SelectedTheme")) >= 0) {
            var SelectedThemeUrl = SelectedThemeUrlTemplate.replace('{ThemeName}', $.cookie("Bootstrap3_SelectedTheme"));
            $("link.SelectedTheme").attr("href", SelectedThemeUrl);
            HighlightTheme(SelectedThemeUrl);
        }
    }

    // If user selected a navbar inversion, load it
    if ($.cookie("Bootstrap3_InvertNavigationBar")) {
        if ($.cookie("Bootstrap3_InvertNavigationBar") === "true") {
        $('#chkInvertNavigationBar').attr('checked', 'checked');
            SetInvert(true);
        } else {
        $('#chkInvertNavigationBar').removeAttr('checked');
            SetInvert(false);
        }
    }

    // User is selecting a new theme
    $("#ThemesMenu li a").click(function () {
        $("link.SelectedTheme").attr("href", $(this).attr('rel'));
        $.cookie("Bootstrap3_SelectedTheme", $(this).data('themename'), {expires: 3650, path: '/' });
        HighlightTheme($.cookie("Bootstrap3_SelectedTheme"));
        return false;
    });

    // User is selecting a new navbar inversion
    $("#chkInvertNavigationBar").change(function () {
        if (this.checked) {
        $.cookie("Bootstrap3_InvertNavigationBar", "true", { expires: 3650, path: '/' });
            SetInvert(true);
        } else {
        $.cookie("Bootstrap3_InvertNavigationBar", "false", { expires: 3650, path: '/' });
            SetInvert(false);
        }
    });

    // Prevent the menu from disappearing when selecting a navbar inversion
    $('.dropdown-menu input, .dropdown-menu label').click(function (e) {
        e.stopPropagation();
    });

    // Allow sub menus
    // From http://stackoverflow.com/a/19076934/342378
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
        // Avoid following the href location when clicking
        event.preventDefault();
        // Avoid having the menu to close when clicking
        event.stopPropagation();
        // Store old class
        var OldClass = $(this).parent().attr("class");
        // Close all menus
        $('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
        // Restore old class
        $(this).parent().attr("class", OldClass);
        // Toggle the class to show or hide it
        $(this).parent().toggleClass('open');

        var menu = $(this).parent().find("ul");
        var menupos = $(menu).offset();

        var newpos;
        if (menupos.left + menu.width() > $(window).width()) {
            newpos = -$(menu).width();
            menu.css({left: newpos });
        } else {
            newpos = $(this).parent().width();
            menu.css({left: newpos });
        }
    });

    // Highlight parent menu item as active if a child is active
    $('.navbar-nav > li').each(function () {
        var parentLI = $(this);
        if (parentLI.find('li[class="active"]').length > 0) {
            parentLI.addClass('active');
        }
    });
});

function HighlightTheme(url) {
    $("#ThemesMenu li.current").attr("class", "");
    $("#ThemesMenu li a[rel='" + url + "']").parent().attr("class", "current active");
}

function SetInvert(invert) {
    if (invert) {
        $("#NavBar").removeClass("navbar-default").addClass("navbar-inverse");
    } else {
        $("#NavBar").addClass("navbar-default").removeClass("navbar-inverse");
    }
}
