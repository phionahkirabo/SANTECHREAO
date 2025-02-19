/**
 * @package SpyroPress
 * @subpackage CharityPlus
 * @since 1.0.0
*/

jQuery(document).ready(function($) {
    "use strict";
    var window_width,
        $menu = $('div.cms-main-navigation');
    $menu.find('ul.children').addClass('sub-menu');
    $(window).on('load', function() {
        window_width = $(window).width();
        if(window_width >= '1200'){
            $menu.find('ul.sub-menu > li').each(function(){
                var $submenu = $(this).find('>ul');
                if($submenu.length == 1){
                    if($submenu.offset().left + $submenu.width() > $(window).width()){
                        $submenu.addClass('back');
                    } else if($submenu.offset().left < 0){
                        $submenu.addClass('back');
                    }
                }
                $(this).on('hover',function(){
                    $submenu.addClass('open');
                }, function(){
                    $submenu.removeClass('open');
                });
            });
        } else {
            $menu.addClass('mobile-nav');
        }
    });
    $(window).on('resize', function(event, ui) {
       window_width = $(event.target).width();
       if(window_width >= '1200'){
            $menu.find('ul.sub-menu > li').each(function(){
                var $submenu = $(this).find('>ul');
                if($submenu.length == 1){
                    if($submenu.offset().left + $submenu.width() > $(window).width()){
                        $submenu.addClass('back');
                    } else if($submenu.offset().left < 0){
                        $submenu.addClass('back');
                    } else {
                        $submenu.removeClass('back');
                    }
                }
            });
            $menu.removeClass('mobile-nav').removeAttr('style');
        } else {
            $menu.find('ul.sub-menu > li').each(function(){
                var $submenu = $(this).find('>ul');
                $submenu.removeClass('back');
            })
            $menu.addClass('mobile-nav');
        }
    });

      
    /* Menu drop down*/
    $('.cms-main-navigation li.menu-item-has-children > a, .cms-main-navigation li.page_item_has_children > a').after('<span class="cms-menu-toggle"><i class="fa fa-angle-right"></i></span>');
    $('.cms-menu-toggle').live('click', function(){
        $(this).next().toggleClass('open');
        var icon = $(this).find('.fa');
        if(!icon.hasClass('fa-angle-down')){
            icon.addClass('fa-angle-down').removeClass('fa-angle-right');
        } else {
            icon.removeClass('fa-angle-down').addClass('fa-angle-right');
        }
    });
});
