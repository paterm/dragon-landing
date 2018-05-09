$(document).ready(() => {
    $(window).bind('scroll', function(){
        parallaxScroll();
    });

    const parallaxScroll = () => {
        const scroll = $(window).scrollTop();
        const $dealsBlock = $('.s-deals');
        const dealsOffsetTop = $dealsBlock.offset().top;

        $dealsBlock.css({backgroundPositionY: `${0 - (dealsOffsetTop - scroll) * .25}px`});

        const $thingsScroll = $('.s-things__decorate-item.scrolled');
        const thingsTop = $thingsScroll.offset().top;

        console.log(thingsTop - scroll);
        $($thingsScroll[0]).css({left: `${(thingsTop - scroll) * .15}px`});
        $($thingsScroll[1]).css({left: `${(thingsTop - scroll + 600) * .3}px`})
    };
});