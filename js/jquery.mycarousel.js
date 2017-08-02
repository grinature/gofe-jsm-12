/* jshint esversion: 6 */

'use strict';

/*
    Hiding logic by IIFE-function
*/

;( function($, undefined) {

    $.fn.myCarousel = function (options) {

    const defaults = {
        // Carousel component class naming ...
        carouselContainerName : 'jcarousel',

        // Carousel dimensions ...
        carouselWrapperWidth : '40rem',
        // carouselWrapperWidth : '70%',
        carouselWrapperHeight : '12rem',

        // Carousel Items ...
        visibleItemsQuantity : 4,
        itemRightMargin : '0.8rem',
        /* an actual item width which is equal for all carousel's items
            is calculated with relation to
                { carouselWrapperWidth, carouselWidth, visibleItemsQuantity, itemRightMargin }
        */

        carouselLeftNavigationControlName : 'Left',
        carouselRightNavigationControlName : 'Right',
    };


    let settings = $.extend( true, {}, defaults, options );

    const carouselCoreWrapperClassName = `wrapper-carousel`;
    const carouselCSSDynoParamClassName = 'jcarousel-core-params';
    const cssCoreRule = `
            .${carouselCSSDynoParamClassName} {
                --carousel-wrapper-width: ${settings.carouselWrapperWidth};
                --carousel-wrapper-height: ${settings.carouselWrapperHeight};
                --carousel-items-quantity: ${settings.visibleItemsQuantity};
                --carousel-item-margin-right: ${settings.itemRightMargin};
            }
        `;


    $( '<style>').text( cssCoreRule ).appendTo( $( 'head' ) );

    const carouselPrevControlClassName = 'jcarousel-prev';
    const carouselNextControlClassName = 'jcarousel-next';


    const $wrapperCarousel = $( '<div>' );
    $wrapperCarousel.addClass( `${carouselCoreWrapperClassName} ${carouselCSSDynoParamClassName}` );
    $wrapperCarousel.append( $( '<div>' ).addClass( `${carouselPrevControlClassName} jcarousel-switch` ).append( $( '<span>' ).addClass( 'switch-title' ).text( settings.carouselLeftNavigationControlName ) ) );
    $wrapperCarousel.append( $( '<div>' ).addClass( `${carouselNextControlClassName} jcarousel-switch` ).append( $( '<span>' ).addClass( 'switch-title' ).text( settings.carouselRightNavigationControlName ) ) );

    // We have to know the location of the 'jcarousel'-container before we wrap it !
    this.before( $wrapperCarousel );
    $wrapperCarousel.children().first().after( this );
    this.addClass( 'jcarousel-on' );

    // !!!! Heare we work only with one carousel children's list.
    let $carouselList = $( '.carousel__list', this ).first();

    /*  Get the farthest right position where a carousel's item can be.
        In fact, this is the right edge of the last list-item in the existing carousel's list !
    */
    // let carouselListRightPos = $carouselList.children().last().get(0).getBoundingClientRect().right;

    // let $carouselFirstItem = $carouselList.children().first();
    // let $carouselLastItem = $carouselList.children().last();
    // let carouselListRightPos = $carouselLastItem.get(0).offsetLeft + $carouselLastItem.get(0).offsetWidth;
    // let carouselLastItemLeftPos = $carouselLastItem.get(0).offsetLeft;

    let carouselListLength = $carouselList.children().length;
    // Here is the visible RIGHT Edge of the Carousel CONTAINER !
    let carouselLength = this.width();
    // Get the length, value of the 1st carousel's item RightMargin;
    let carouselItemMarginRight = parseFloat( getComputedStyle( $carouselList.children().first().get( 0 ) ).marginRight );
    // let carouselItemShift = ( carouselLength - carouselItemMarginRight ) / settings.visibleItemsQuantity;
    let carouselItemShift = (carouselLength - (settings.visibleItemsQuantity - 1) * carouselItemMarginRight ) / settings.visibleItemsQuantity + carouselItemMarginRight;
    // let carouselItemShift = Math.floor( (carouselLength - (settings.visibleItemsQuantity - 1) * carouselItemMarginRight ) / settings.visibleItemsQuantity + carouselItemMarginRight );

    const maxShifts = getQuantityOfShifts( carouselListLength, settings.visibleItemsQuantity );
    // the position of a Carousel Shift
    // let carouselLeft = 0;   // <Element>.leftPos
    // let carouselCursor = 1; // px
    let carouselItemCursor = 0; // <number>
    // let carouselCurrentItem = <number>

    const $controlPrev = $wrapperCarousel.find( `.${carouselPrevControlClassName}` );
    const $controlNext = $wrapperCarousel.find( `.${carouselNextControlClassName}` );

    $wrapperCarousel
            .on(
                'click.mycarousel',
                `.${carouselPrevControlClassName}, .${carouselNextControlClassName}`,
                null,
                carouselShift
            );

    function getQuantityOfShifts(carouselLength, visibleItemsQuantity ) {
        if( carouselLength <= visibleItemsQuantity) {
            // There is nothing to shift (no matter to the left or to the right)
            return 0;
        }

        const quotient = Math.floor( carouselLength / visibleItemsQuantity );
        const remainder = carouselLength % visibleItemsQuantity;

        let shifts = ( quotient - 1 ) * visibleItemsQuantity;

        shifts += remainder;

        return shifts;
    }

    function carouselShift(event) {
        const $switchControlTarget = $( event.target );

        if( $controlPrev.get( 0 ) === $switchControlTarget.get( 0 ) || $.contains( $controlPrev.get( 0 ), $switchControlTarget.get( 0 ) ) ) {
            // console.log( 'the carousel\'s Left was pressed ' );

            if( carouselItemCursor - 1 >= 0 ) {
                // Sliding of a Carousel through the Animation process ...
                $carouselList.animate(
                    {
                        left : `+=${carouselItemShift}`,
                    },
                    500
                );

                carouselItemCursor--;
            }

        } else if ( $controlNext.get( 0 ) === $switchControlTarget.get( 0 ) || $.contains( $controlNext.get( 0 ), $switchControlTarget.get( 0 ) ) ) {
            // console.log( 'the carousel\'s Right was pressed ' );

            if( carouselItemCursor + 1 <= maxShifts ) {

                // Sliding of a Carousel through the Animation process ...
                $carouselList.animate(
                    {
                        left : `-=${carouselItemShift}`,
                    },
                    500
                );

                carouselItemCursor++;
            }
        }

    }

    return this;
}; // eof $.fn.myCarousel ...

}(jQuery) );   // eof IIFE-function
