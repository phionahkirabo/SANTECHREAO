/**
 * @package SpyroPress
 * @subpackage CharityPlus
 * @since 1.0.0
*/

jQuery(document).ready(function($) {
	"use strict";

	/* window */
	var window_width, window_height, scroll_top;

	/* admin bar */
	var adminbar = $('#wpadminbar');
	var adminbar_height = 0;

	/* header menu */
	var header = $('#cms-header'),
		header_height;
	var header_top = 0;

	/* scroll status */
	var scroll_status = '';

	/* Call Bootstrap Popover */
    $('[data-toggle="popover"]').popover();

	/**
	 * window load event.
	 * 
	 * Bind an event handler to the "load" JavaScript event.
	 * @author Chinh Duong Manh
	 */
	$(window).on('load', function() {
		/** current scroll */
		scroll_top = $(window).scrollTop();

		/** current window width */
		window_width = $(window).width();

		/** current window height */
		window_height = $(window).height();

		/* get admin bar height */
		adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0 ;
		/* Header */
		header_height = header.length   > 0 ?  header.outerHeight() : 0;
		/* get top header menu */
		header_top = header.length > 0 ? header.offset().top - adminbar_height : 0 ;
		/* Page Loading */
        cms_page_loading();

        /* Header OnTop */
		cms_header_ontop();
		/* Header Sticky */
		cms_header_sticky();
		/* Change PrettyPhoto gallery rel to data-rel, data-gal*/
        if(typeof $.prettyPhoto != 'undefined'){
            $("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'});
            $("a[data-rel^='prettyPhoto']").prettyPhoto({hook: 'data-rel'});
        }
        /* Load overlay style */
        cms_overlay();
        /* width / height for iframe/video/audio */
        cms_auto_video_width();
	});

	/**
	 * reload event.
	 * 
	 * Bind an event handler to the "navigate".
	 */
	window.onbeforeunload = function(){
		cms_page_loading(1);
	}
	
	/**
	 * resize event.
	 * 
	 * Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.
	 * @author Chinh Duong Manh
	 */
	$(window).on('resize', function(event, ui) {
		/** current window width */
		window_width = $(event.target).width();

		/** current window height */
		window_height = $(window).height();
		/* Header */
		header_height = header.length   > 0 ?  header.outerHeight() : 0;
		/* get admin bar height */
		adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0 ;
		/** current scroll */
		scroll_top = $(window).scrollTop();
		/* Header OnTop */
		//cms_header_ontop();
		/* Header Sticky */
		cms_header_sticky();

        /* Equal Height */ 
        $('[data-equal]').each(function(){
            var $this = $(this),
            target = $this.data('equal');
            $this.imagesLoaded(function(){
                $this.find(target).equalHeights();
            })
        });
	});
	
	/**
	 * scroll event.
	 * 
	 * Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.
	 * @author Chinh Duong Manh
	 */
	$(window).on('scroll', function() {
		/** current scroll */
		scroll_top = $(window).scrollTop();
        /* Header */
        header_height = header.length   > 0 ?  header.outerHeight() : 0;
		/* check sticky menu. */
		cms_header_sticky();
	});
	/**
     * Page Loading.
     */
    function cms_page_loading($load) {
        switch ($load) {
        case 1:
            $('#cms-loading').css('')
            break;
        default:
            $('#cms-loading').css({"height":"0","visibility":"hidden"})
            break;
        }
    }

    /** Header On Top
     * add TOP position for header on top
     * @author Chinh Duong Manh
     * @since 1.0.0
    */
    
    function cms_header_ontop(){
        var header_ontop = $('.header-ontop'),
            header_ontop_prev_height = $('#cms-header-top').outerHeight(),
        	header_ontop_next = $('#cms-page-title-wrapper'),
        	header_ontop_next_padding_top = parseInt(header_ontop_next.css('padding-top'));
        header_ontop.css('top', adminbar_height + header_ontop_prev_height);
        header_ontop.parent().find(header_ontop_next).css('padding-top', header_height + header_ontop_next_padding_top); /* Add padding for next section */
    }

	/** Sticky menu
     * Show or hide sticky menu.
     * @author Chinh Duong Manh
     * @since 1.0.0
     */
    function cms_header_sticky() {
        var header_sticky = $('.header-sticky'),
        	header_ontop  = $('.header-ontop'), 
            header_ontop_prev_height = $('#cms-header-top').outerHeight(),
        	header_slider = $('.cms-header-rev-slider').outerHeight();
        if (header.hasClass('sticky-on') && (header_height + header_slider + header_ontop_prev_height < scroll_top) && window_width > 1200) {
            header.addClass('header-sticky');
            header_sticky.css('top',adminbar_height);
        } else {
            header.removeClass('header-sticky');
            header_sticky.removeAttr('style');
        }

        /* Both Ontop & Sticky is ENABLE */
        if (header.hasClass('header-ontop-sticky') && (header_height + header_slider + header_ontop_prev_height < scroll_top) && window_width > 1200) {
            header.removeClass('header-ontop');
        } else if(header.hasClass('header-ontop-sticky')){
            header.removeClass('header-sticky').addClass('header-ontop');
            header_sticky.css('top', adminbar_height + header_ontop_prev_height);
        }     
    }
	
	/**
	 * Back to top
	 */
	$('body').on('click', '.ef3-back-to-top', function () {
		$('body, html').animate({scrollTop:0}, '1000');
	})

	/**
	 * One page
	 *
	 * @author Chinh Duong Manh
	 */
	if(typeof(one_page_options) != "undefined"){
		one_page_options.speed = parseInt(one_page_options.speed);
		$('#site-navigation').singlePageNav(one_page_options);
	}
	/**
    * header icon popup
    * 
    * @author Chinh Duong Manh
    * @since 1.0.0
    */
    var display;
    var no_display;
    $('body').on('click',function (e) {
        var target = $(e.target);
        if (target.parents('.cms-tools').length == 0 && !target.hasClass('cms-search')) {
            $('.cms-search,.cms-cart,.cms-tools').removeClass('open').slideUp();
        }
    });
    
    $('.cms-search,.cms-cart,.cms-tools, .mobile-nav').on('click', function (e) {
        e.stopPropagation();
    });

    $('.cms-header-popup [data-display]').on('click', function (e) {
        var container = $(this).parents('#cms-header');
        //$(this).parents().find('.mobile-nav').slideUp();
        e.stopPropagation();
        
        var _this = $(this);
        display = _this.attr('data-display');
        no_display = _this.attr('data-no-display');
        if ($(display, container).hasClass('open')) {
            $(display, container).removeClass('open').slideUp();
        } else {
            $(display, container).addClass('open').slideDown().css('display', 'block');
            $(no_display, container).removeClass('open').slideUp();
        }
    });
    
    $('.cms-header-popup .header-icon').on('click', function(){
        $('.popup .cms-searchform .s').focus();
    });

	/**
     * Edit the count on the categories widget
     * @author Chinh Duong Manh
     * @since 1.0.0
     * @param element parent
    */

    $.fn.extend({
        cmsReplaceCount: function(is_woo){
            this.each(function(){
                if (is_woo == true) {
                    $(this).find('span.count').each(function(){
                        var count =  $(this).text();
                        var appendTo = $(this).parent().find('> a');
                        $(this).appendTo(appendTo);
                    })  
                } else {
                    $(this).find(' > ul > li').each(function() {
                        var cms_li = $(this);
                        cms_li.removeClass('recentcomments');
                        var small = $(this).html().replace('</a>&nbsp;(','&nbsp;<span class="count">(').replace(')',')</span></a>').replace('</a> (','<span class="count">&nbsp;(');
                        cms_li.html(small);
                        $(this).find(' .children li').each(function() {
                            var sm = $(this).html().replace('</a>&nbsp;(','&nbsp;<span class="count">(').replace(')',')</span></a>').replace('</a> (','<span class="count">&nbsp;(');
                            $(this).html(sm);
                            $(this).find(' .children li').each(function() {
                             var s = $(this).html().replace('</a>&nbsp;(','&nbsp;<span class="count">(').replace(')',')</span></a>').replace('</a> (','<span class="count">&nbsp;(');
                             $(this).html(s);
                            })
                        })
                    });
                }
            })
        }
    });
    /* replace span.count to small */
    $('.widget_archive, .widget_categories').cmsReplaceCount(false);
    $('.product-categories, .widget_layered_nav').cmsReplaceCount(true);
    
    /* Add overlay effect
     * add class animated to use animate.css
    */
    function cms_overlay(){
        "use strict";
        $(".overlay-wrap").each(function(){
            var $this = $(this);
            var animation_in = $this.find('.overlay').data("animation-in"),
                animation_out = $this.find('.overlay').data("animation-out");
            $this.find('.overlay').removeClass(animation_in).removeClass(animation_out);
            $this.on('mouseenter',function(e){
                e.preventDefault();
                $(this).find('.overlay').addClass(animation_in).removeClass(animation_out);
            });
            $this.on('mouseleave',function(e){
                e.preventDefault();
                $(this).find('.overlay').removeClass(animation_in).addClass(animation_out);
            });
        });
    }
    /**
     * Auto width video iframe
     * 
     * Youtube, Vimeo, Iframe, Video, Audio.
     * @author Chinh Duong Manh
     */
    function cms_auto_video_width() {
        $('.entry-media iframe , .entry-media  video, .entry-media .wp-video-shortcode').each(function(){
            var v_width = $(this).parent().width();
            var v_height = Math.floor(v_width / (16/9));
            $(this).attr('height',v_height).css('height',v_height);
            $(this).attr('width',v_width).css('width',v_width);
        });
        $('.video-item').each(function(){
            var v_width = $(this).parent().width();
            var v_height = Math.floor(v_width / (16/9));
            $(this).css('height',v_height);
            $(this).css('width',v_width);
        });
        $('.entry-content iframe , .entry-content  video, .entry-content .wp-video-shortcode').each(function(){
            var v_width = $(this).parent().width();
            var v_height = Math.floor(v_width / (16/9));
            $(this).attr('height',v_height).css('height',v_height);
            $(this).attr('width',v_width).css('width',v_width);
        });
    }
    /* First/Last word */
    $.fn.useWord = function(options) {
        var settings = $.extend({
            word: "first"
        }, options);

        return this.each(function() {
            var text = this.innerHTML.trim().split(" ");

            switch (settings.word) {
                case "first": {
                    var first = text.shift();
                    this.innerHTML = ((text.length > 0 ? "<span class='useWord-first'>" + first + "</span> " : first) + text.join(" "));
                }
                break;
                case "last": {
                    var last = text.pop();
                    this.innerHTML = (text.join(" ") + (text.length > 0 ? " <span class='useWord-last'>" + last + "</span>" : last));
                }
                break;
            }
        });
    };
    $('.cms-page-title-text, .cms-heading1, .remaining').useWord();
    $('.cms-heading2').useWord({word: "last"});
    /**
     * Scroll page 
     * @author Chinh Duong Manh
    */
    $('body').on('click', '.cms-scroll, .woocommerce-review-link', function () {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({scrollTop: target.offset().top - header_height}, 750);
            return false;
        }
    });
    /*!
     * Equal Heights
     * @author Chinh Duong Manh
     * @since 1.0.0
     */
    (function($) {
        "use strict";
        $.fn.equalHeights = function(options) {
            "use strict";
            var maxHeight = 0,
            $this = $(this),
            equalHeightsFn = function() {
                var height = $(this).innerHeight();
                if ( height > maxHeight ) { maxHeight = height; }
            };
            options = options || {};

            $this.each(equalHeightsFn);

            if(options.wait) {
                var loop = setInterval(function() {
                    if(maxHeight > 0) {
                        clearInterval(loop);
                        return $this.css('height', maxHeight);
                    }
                    $this.each(equalHeightsFn);
                }, 100);
            } else {
                return $this.css('height', maxHeight);
            }
        };

        // auto-initialize plugin
        $('[data-equal]').each(function(){
            "use strict";
            var $this = $(this),
            target = $this.data('equal');
            $this.imagesLoaded(function(){
                $this.find(target).equalHeights();
            })
        });

    })(jQuery);
    /* Ajax Complete */
    jQuery(document).ajaxComplete(function(event, xhr, settings){
        /* width / height for iframe/video/audio */
        cms_auto_video_width();
        /* Equal Height */ 
        if(settings.url.indexOf('paged=') > -1 || settings.url.indexOf('/page/') > -1){
            $('[data-equal]').each(function(){
                var $this = $(this),
                target = $this.data('equal');
                $this.imagesLoaded(function(){
                    $this.find(target).equalHeights();
                })
            });
        }
        /* Boostrap Popover */
        $('[data-toggle="popover"]').popover();
        /* Change PrettyPhoto gallery rel to data-rel, data-gal*/
        if(typeof $.prettyPhoto != 'undefined'){
            $("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'});
            $("a[data-rel^='prettyPhoto']").prettyPhoto({hook: 'data-rel'});
        }
        if(typeof(zodonations_move_form) == 'function'){
            zodonations_move_form();
        }
    });
    var spcharityplus_refill_max_request = 10;
    jQuery( document ).ajaxComplete(function() {
        if(spcharityplus_refill_max_request<0)
            return;
        spcharityplus_refill_max_request --;
        spcharityplus_refill_custom_media_link();
    });
});

function  spcharityplus_refill_custom_media_link()
{
    var sources = [];
    jQuery('a[data-trigger="spcharityplus_custom_media_link"]').each(function () {
       sources.push(jQuery(this).attr('href'));
    });
    if(sources.length <1 )
        return;
    jQuery.post({
        url:ajaxurl,
        data:{
            action:'spcharityplus_get_custom_media_link',
            targets:sources
        },
        dataType: 'JSON'
    }).success(function (response) {
        response.forEach(function (value,index) {
            jQuery('a[data-trigger="spcharityplus_custom_media_link"][href="'+value.old+'"]').each(function () {
                jQuery(this).removeAttr('data-trigger');
                jQuery(this).attr('href',value.new);
            })
        });
    });
}