function main() {

    (function() {
        'use strict';

        // affix the navbar after scroll below header
        $('#nav').affix({
            offset: {
                top: $('header').height()
            }
        });

        // skills chart



        // Portfolio isotope filter
        $(window).load(function() {
            var $container = $('.portfolio-items');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

        });


        // CounterUp
        $(document).ready(function($) {
            if ($("span.count").length > 0) {
                $('span.count').counterUp({
                    delay: 10, // the delay time in ms
                    time: 1500 // the speed time in ms
                });
            }
        });

        // Pretty Photo
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false
        });

    }());


}
main();
