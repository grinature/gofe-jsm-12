/* jshint esversion: 6 */
/* globals oLogger:true */
/* globals Handlebars:true */

'use strict';

/*
    Hiding logic by IIFE-function
*/

oLogger.logOff();

;( function($, undefined) {
// 'use strict';
// jQuery-based util-functions ...

/*  Method: Add(Bind) a node with its subtree to another one located either on the DOM-hierachy of the document or a new building tree
    Argument(s) :
        <$node2Add>  - a node to be added
        <$where2AddTo> - a node of a tree (or the DOM-hierachy) where to bind a node to
        <wayOfBinding> - ['append', 0, undefined, null] || ['first'] || ['before'] || [ 'after' ]
            where
                { 'append', and alternatives } => means AppendChild-mode, i.e. to become the last element of the <where2AddTo>
                { 'first' } => means Insert as the first child of <where2AddTo>
                { 'before' } => means InsertBefore-mode
                { 'after' } => means InsertBefore-mode with respect to nextSibling-element

*/
    function jqAddElement($node2Add, $where2AddTo, wayOfBinding = 'append') {
        oLogger.log('Start of <addElement> method');

        let $htmlElement = null;

        switch (wayOfBinding) {
            case 'append':
            case (0 || undefined || null):
                $where2AddTo.append( $node2Add );
                break;
            case 'first':
                $where2AddTo.prepend( $node2Add );
                break;
            case 'before':
                $where2AddTo.before( $node2Add );
                break;
            case 'after':
                $where2AddTo.after( $node2Add );
                break;
        }

        oLogger.log('End of <addElement> method');
        return $htmlElement;
    }

    function jqNewElement(tagName = null, id = null, className = null, text = null, elPropsObj = null) {
        oLogger.log('Start of <newElement> method');

        // an HTML-element to be created
        let $htmlEl = null;

        // Ideally, I have to parse thr string 'tagName'
        //  N.B. !!! I could create a method to parse the phrase with preliminary convertion an argument to String
        //if(tagName.trim().split(/\s+/,1)) {
        if( tagName ) {
            $htmlEl = $( `<${tagName}>` );

            if( id ) {
                $htmlEl.prop( 'id', id );
            }

            if( className ) {
                if( typeof( className ) === 'string' ) {
                    $htmlEl.addClass( className );
                } else if( Array.isArray(className) ) {
                    $htmlEl.addClass( className.join( ' ' ) );
                }

            }

            if( text ) {
//                let textNode = document.createTextNode(text);
                $htmlEl.text( text );
            }

            if( elPropsObj && typeof( elPropsObj ) === 'object' ) {
                for( const propName in elPropsObj ) {
                    // a more reliable variant ...
                    if( Object.prototype.hasOwnProperty.call( elPropsObj, propName ) ) {
                    // the standard method ...
                    // if( elPropsObj.hasOwnProperty( propName ) ) {
                        if( propName === 'dataset' && typeof( elPropsObj[ propName ] === 'object' ) ) {
                            // let datasetObj = elPropsObj[ propName ];
                            const datasetObj = elPropsObj[ propName ];
                            for( const datasetProperty in datasetObj ) {
                                if( Object.prototype.hasOwnProperty.call( datasetObj, datasetProperty ) ) {
                                    // $htmlEl.data( datasetProperty, datasetObj[ datasetProperty ] );
                                    $htmlEl.get( 0 ).dataset[ datasetProperty ] = datasetObj[ datasetProperty ];
                                }
                            }
                        } else {
                            $htmlEl.prop( propName, elPropsObj[ propName ] );
                        }

                    }
                }
            }

        } else {
            oLogger.log( 'A <tagName> argument is <empty> !!!' );
        }

        oLogger.log( 'End of <newElement> method' );
        return $htmlEl;
    }

    const carousel01 = {
        coreCarouselContainerClass : 'jcarousel',
        innerCarouselContainerClass : 'carousel__list',
        carouselItemClass : 'carousel__item',

        coreImageName : 'ursa-major',
        coreImageNamePrefix : '',
        imageExtension : 'jpeg',

        carouselItems : [
            // {
                //alt="<%= currentItem.imageItemDescription %>
                //imageItemDescription: 'a caption, 01'
            // },
            {
                caption: 'Caption 01',
            },
            {
                caption: 'Caption 02',
            },
            {
                caption: 'Caption 03',
            },
            {
                caption: 'Caption 04',
            },
            {
                caption: 'Caption 05',
            },
            {
                caption: 'Caption 06',
            },
            {
                caption: 'Caption 07',
            },
            {
                caption: 'Caption 08',
            },
            {
                caption: 'Caption 09',
            },
            {
                caption: 'Caption 10',
            },
            {
                caption: 'Caption 11',
            },
            {
                caption: 'Caption 12',
            },
            {
                caption: 'Caption 13',
            },
        ] ,
    };

    let templateFunc = null;

    function buildDOMfromLodashTemplate(carouselObj) {
        if ( !templateFunc ) {
            templateFunc  = _.template( $( '#carousel-lodash-template' ).text() );
        }

        const compiledMarkup = templateFunc( carouselObj );

        return compiledMarkup;
    }

    const constellationObj = {
        name : `Большая Медведица`,
        // name : `Больша́я Медве́дица`,
        nameLatin : 'Ursa Major',
        starMapImage : 'img/350px-Ursa_Major_constellation_map_ru_lite.png',
        // A hemisphere where a constellation is located
        hemisphereLocation: 'северное',
        resemblence : 'ковш с ручкой',
        ancientNames :
            [
                'Коромысло', 'Плуг', 'Лось', 'Повозка', 'Семь Мудрецов'
            ],
        capacityByStars : 7,
        starsDescription :
            [
                {
                    name : 'Дубхе',
                    arabianMeaning : 'медведь',
                    // By simple words, it is a star brightness as seen by an observer on Earth
                    apparentMagnitude : 1.81,
                },
                {
                    name : 'Мерак',
                    arabianMeaning : 'поясница',
                    apparentMagnitude : 2.34,
                },
                {
                    name : 'Фекда',
                    arabianMeaning : 'бедро',
                    apparentMagnitude : 2.41,
                },
                {
                    name : 'Мегрец',
                    arabianMeaning : 'начало хвоста',
                    apparentMagnitude : 3.32,
                },
                {
                    name : 'Алиот',
                    arabianMeaning : 'курдюк',
                    apparentMagnitude : 1.76,
                },
                {
                    name : 'Мицар',
                    arabianMeaning : 'набедренная повязка',
                    apparentMagnitude : 2.23,
                },
                {
                    name : 'Алькаид (Бенетнаш)',
                    arabianMeaning : 'предводитель плакальщиц',
                    apparentMagnitude : 1.86,
                },
            ],
        neighbourConstellations :
            [ 'Дракон', 'Жираф', 'Рысь', 'Малый Лев', 'Лев', 'Волосы Вероники', 'Гончие Псы', 'Волопас' ],
    };

    let handlebarTemplateObj = {
        templateId : 'constellation-handlebars-template',
        func : null,
    };
    function buildDOMfromHandlebarTemplate(hbTemplObj, hbDataObj) {
        if( !hbTemplObj.func ) {
            hbTemplObj.func = Handlebars.compile( $( `#${hbTemplObj.templateId}` ).text() );
        }

        const compiledMarkup = hbTemplObj.func( hbDataObj );

        return compiledMarkup;
    }

// jQuery-based DOMContentLoaded-event handling ...
$( function() {

    jqAddElement(
        buildDOMfromLodashTemplate( carousel01 ),
        $( '.header-core' ),
        'first'
    );

    // Setting up Our Carousel ...
    let $carousel = $( '.jcarousel' );
    $carousel.myCarousel({
        carouselWrapperWidth : '60rem',
        carouselWrapperHeight : '18rem',
        visibleItemsQuantity : 3,
        // itemRightMargin : '1.4rem',
        carouselLeftNavigationControlName : 'to the Left ',
        carouselRightNavigationControlName : 'to the Right',
    });

    jqAddElement(
        buildDOMfromHandlebarTemplate( handlebarTemplateObj, constellationObj ),
        $( '.constellation' ).first(),
        'first'
    );


} ); // eof DOMContentLoaded event handling

}(jQuery) );   // eof IIFE-function
