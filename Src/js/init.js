// scroll spy
$(function () {

    function triggerSectionShown(section) {

        var $section = $(section);
        $section.trigger('section:shown', [$section]);
    }

    // For more info: https://github.com/twbs/bootstrap/issues/20086
    $(window).on('activate.bs.scrollspy', function (e, obj) {

        triggerSectionShown(obj.relatedTarget);
    });

    var scrollspy = $('body').scrollspy({
        target: '#nav',
        offset: 300
    }).data('bs.scrollspy');
});

$(document).on('click', 'a', function (e) {

    var $this = $(this),
        href = $this.attr('href'),
        startsWithSharp = href && href[0] === '#',
        $target = startsWithSharp && $(href);

    // do not allow append sharps to url
    if (startsWithSharp) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    if ($target && $target.length) {

        var targetTop = Math.ceil($target.offset().top),
            headerHeight = Math.ceil($('.top-header').outerHeight()),
            topOffset = Math.ceil($('#nav').outerHeight()),
            scrollTopValue = targetTop - topOffset;

        if (scrollTopValue <= headerHeight) {
            scrollTopValue = 0;
        }

        $('html, body').animate({
            scrollTop: scrollTopValue
        });
    }
});

(function () {

    function adjustNavPosition() {

        var $window = $(window),
            scrollTop = $window.scrollTop(),
            $nav = $('#nav'),
            $main = $('main'),
            offsetTop = Math.ceil($('.top-header').outerHeight()),
            paddingTop = Math.ceil($nav.outerHeight());

        if (scrollTop > offsetTop) {
            $nav.addClass('fixed-top');
            $main.css('paddingTop', paddingTop);
        } else {
            $nav.removeClass('fixed-top');
            $main.css('paddingTop', 0);
        }
    }

    $(window).on('scroll resize', adjustNavPosition);
    $(adjustNavPosition);

    // lazy loading images
    var lazy = new LazyLoad();

})();

// initialize sections
$(document).one('section:shown', '#contacts', function (e, $section) {

    var $map = $section.find('#map'),
        script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=abcd046a-721b-4321-acfb-ea5071138cde&lang=ru_RU&onload=mapInit';
    $map.append(script);

    window['mapInit'] = function () {

        var myMap = new ymaps.Map("map", {
            center: [44.942766, 34.077533],
            // 0-19.
            zoom: 18,
            behaviors: ['multiTouch', 'dblClickZoom']
        });

        var shopPlacemark = new ymaps.Placemark([44.943256, 34.077312], {
            iconContent: '<span style=""> Ждем Вас! </span>'
        }, {
            preset: 'islands#darkGreenStretchyIcon'
        });

        myMap.geoObjects.add(shopPlacemark);
    };
});