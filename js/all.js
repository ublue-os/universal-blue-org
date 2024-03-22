(function($){
    "use strict"; // Start of use strict    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
    $(window).on("load", function(){
        setTimeout(() => {
            $(window).trigger("scroll");
        }, "10");
        $(window).trigger("resize");
        init_parallax_scroll();  
    });    
    
    $(document).ready(function(){  
        $(window).trigger("resize");
        init_parallax();
        init_text_outline();
        init_btn_animation();          
        init_classic_menu();
        init_scroll_navigate();        
        init_lightbox();
        init_team();
        init_services_2();
        init_map();
        init_bg_video();        
        init_shortcodes();
        init_tooltips();        
        init_text_rotator();
        init_work_filter();
        init_masonry();       
        init_wow();
        Splitting();
        init_page_sliders();        
        init_parallax_mousemove();
        init_lazyload();        
        init_loader();
    });    
    
    $(window).resize(function(){        
        init_classic_menu_resize();
        init_split_section();
    });
    
   
   /* --------------------------------------------
     Page loader
     --------------------------------------------- */
    function init_loader(){
        var currentDate = new Date();
        $('#current-year').text(currentDate.getFullYear());
        $(".page-loader div").fadeOut();
        $(".page-loader").delay(250).fadeOut("slow");
    }
    
    
    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    } else {
        document.documentElement.className += " touch";
    }
    
    
    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */
    
    // Progress bars
    var progressBar = $(".progress-bar");
    progressBar.each(function(indx){
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });
    
    
    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */
    
    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");
    
    mobile_nav.attr("aria-expanded", "false");
    
    function init_classic_menu_resize(){
        
        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
        
        // Mobile menu style toggle
        if ($(window).width() <= 1024) {
            $(".main-nav").addClass("mobile-on");
            if (!($(".mobile-nav").hasClass("active"))) {
                desktop_nav.css("display", "none");
            }
        }
        else 
            if ($(window).width() > 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.css("display", "block");
            }
    }
    
    function init_classic_menu(){    
        
        // Transpaner menu
                
        if ($(".main-nav").hasClass("transparent")){
           $(".main-nav").addClass("js-transparent"); 
        } else if (!($(".main-nav").hasClass("dark"))){
           $(".main-nav").addClass("js-no-transparent-white");
        }
        
        $(window).scroll(function(){        
            
            if ($(window).scrollTop() > 0) {
                $(".js-transparent").removeClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo").addClass("small-height");
                $(".light-after-scroll").removeClass("dark");
                $(".main-nav").addClass("body-scrolled");
            }
            else if ($(window).scrollTop() === 0){
                $(".js-transparent").addClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo").removeClass("small-height");
                $(".light-after-scroll").addClass("dark");
                $(".main-nav").removeClass("body-scrolled");
            }
            
            
        });
        
        // Mobile menu toggle
        
        mobile_nav.click(function(){
                  
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
                $(this).attr("aria-expanded", "false");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
                $(this).attr("aria-expanded", "true");
                // Fix for responsive menu
                if ($(".main-nav").hasClass("not-top")){
                    $(window).scrollTo(".main-nav", "slow"); 
                }                
            }   
                     
        });
        
        $(document).on("click", function(event){            
            if ($(window).width() <= 1024) {
                var $trigger = $(".main-nav");
                if ($trigger !== event.target && !$trigger.has(event.target).length) {
                    desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                    mobile_nav.removeClass("active");
                    mobile_nav.attr("aria-expanded", "false");
                }
            }
        });
        
        mobile_nav.keydown(function(e){
            if (e.keyCode == 13 || e.keyCode == 32) {
                if (desktop_nav.hasClass("js-opened")) {
                    desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                    $(this).removeClass("active");
                    $(this).attr("aria-expanded", "false");
                }
                else {
                    desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                    $(this).addClass("active");
                    $(this).attr("aria-expanded", "true");
                    // Fix for responsive menu
                    if ($(".main-nav").hasClass("not-top")) {
                        $(window).scrollTo(".main-nav", "slow");
                    }
                }
            }        
        });
        
        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
                mobile_nav.attr("aria-expanded", "false");
            }
        });
        
        
        // Sub menu
        
        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;
        
        mnHasSub.attr({
            "role": "button",
            "aria-expanded": "false",
            "aria-haspopup": "true"
        });
        
        mnHasSub.click(function(){
        
            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    $(this).attr("aria-expanded", "false");
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                    });
                }
                else {
                    $(this).attr("aria-expanded", "true");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                
                return false;
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-has-sub:first")
                    .attr("aria-expanded", "true")
                    .addClass("js-opened");
                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-has-sub:first")
                    .attr("aria-expanded", "false")
                    .removeClass("js-opened");
                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        
        /* Keyboard navigation for main menu */
       
        mnHasSub.keydown(function(e){            
        
            if ($(".main-nav").hasClass("mobile-on")) {                
                if (e.keyCode == 13 || e.keyCode == 32) {                
                    mnThisLi = $(this).parent("li:first");
                    if (mnThisLi.hasClass("js-opened")) {
                        $(this).attr("aria-expanded", "false");
                        mnThisLi.find(".mn-sub:first").slideUp(function(){                            
                            mnThisLi.removeClass("js-opened");
                        });
                    }
                    else {
                        $(this).attr("aria-expanded", "true");
                        mnThisLi.addClass("js-opened");
                        mnThisLi.find(".mn-sub:first").slideDown();
                    }
                    
                    return false;
                }
            }
            
        });
        
        $(".inner-nav a").focus(function(){
            if (!($(".main-nav").hasClass("mobile-on")) && ($("html").hasClass("no-touch")) && (!($(this).parent("li").find(".mn-sub:first").is(":visible")))) {
                $(this).parent("li").parent().children().find(".mn-has-sub:first")
                    .attr("aria-expanded", "false")
                    .removeClass("js-opened");
                $(this).parent("li").parent().children().find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
        });
     
        $(".inner-nav a").first().keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (e.shiftKey && e.keyCode == 9) {
                    $(this).parent("li").find(".mn-has-sub:first")
                        .attr("aria-expanded", "false")
                        .removeClass("js-opened");
                    $(this).parent("li").find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
                }
            }
        });
        
        $(".mn-sub li:last a").keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (!e.shiftKey && e.keyCode == 9) {
                    $(this).parent("li").parent().parent().find(".mn-has-sub:first")
                        .attr("aria-expanded", "false")
                        .removeClass("js-opened");
                    $(this).parent("li").parent().stop(true, true).delay(100).fadeOut("fast");
                }
            }
        }); 

        $(document).keydown(function(e){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                if (e.keyCode == 27) {
                    if (mnHasSub.parent("li").find(".mn-sub:first li .mn-sub").is(":visible")){
                        mnHasSub.parent("li").find(".mn-sub:first li .mn-has-sub")
                            .attr("aria-expanded", "false")
                            .removeClass("js-opened");
                        mnHasSub.parent("li").find(".mn-sub:first li .mn-sub").stop(true, true).delay(100).fadeOut("fast");
                    } else{
                        mnHasSub.parent("li").find(".mn-has-sub:first")
                            .attr("aria-expanded", "false")
                            .removeClass("js-opened");
                        mnHasSub.parent("li").find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
                    }
                    
                }
            }
        });
         
        mnHasSub.on("click", function () { 
            if (!($(".main-nav").hasClass("mobile-on"))) {                
                if (!($(this).hasClass("js-opened"))){
                    $(this).addClass("js-opened");
                    $(this).attr("aria-expanded", "true");
                    $(this).parent("li").find(".mn-sub:first").fadeIn("fast");
                    return false;
                }
                else{
                    $(this).removeClass("js-opened");
                    $(this).attr("aria-expanded", "false");
                    $(this).parent("li").find(".mn-sub:first").fadeOut("fast");
                    return false;
                }                
            }            
        });
        
    }
    
    
    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)") === true || window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
        
        if (!(!!isReduced)) {
            $(".local-scroll").localScroll({
                target: "body",
                duration: 1500,
                offset: 0,
                easing: "easeInOutQuart",
                onAfter: function(anchor, settings){
                    anchor.focus();
                    if (anchor.is(":focus")) {
                        return !1;
                    }
                    else {
                        anchor.attr("tabindex", "-1");
                        anchor.focus()
                    }        
                }
            });
        } 
        
        var sections = $(".home-section:not(.scroll-nav-invisible), .page-section:not(.scroll-nav-invisible)");
        var menu_links = $(".scroll-nav li a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
            
            if($('.desktop-nav a.active').length > 0) {
                $('footer .local-scroll').addClass('scroll-visible');
            } else {
                $('footer .local-scroll').removeClass('scroll-visible');
            }

        });
        
    }
    
    
    /* ---------------------------------------------
     Lazyload
     --------------------------------------------- */
    
    function init_lazyload(){
    
        $(".img-lazy").lazyload({
            effect: "fadeIn",
            effectspeed: 1000,
            skip_invisible : false,
            threshold : 200
        });        
        $(".img-lazy-work").lazyload({
            effect: "fadeIn",
            effectspeed: 1000,
            skip_invisible : false,
            threshold : 200
        });
        
    }
    
    
    /* ---------------------------------------------
     Lightboxes
     --------------------------------------------- */
    
    function init_lightbox(){
    
        // Works Item Lightbox				
        $(".work-lightbox-link").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        	
        // Other Custom Lightbox
        $(".lightbox-gallery-1").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-2").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-3").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-4").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-5").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-6").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-7").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-8").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-9").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox-gallery-10").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        $(".lightbox").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });
        
    }
    
    
    /* -------------------------------------------
     Background Parallax
     --------------------------------------------- */
    
    function init_parallax(){
        
        setTimeout(() => {
            if ((mobileTest == false) && $("html").hasClass("no-touch")) {
                $(".parallax-1").each(function(){$(this).parallax("50%", 0.1);});
                $(".parallax-2").each(function(){$(this).parallax("50%", 0.2);});
                $(".parallax-3").each(function(){$(this).parallax("50%", 0.3);});
                $(".parallax-4").each(function(){$(this).parallax("50%", 0.4);});
                $(".parallax-5").each(function(){$(this).parallax("50%", 0.5);});
                $(".parallax-6").each(function(){$(this).parallax("50%", 0.6);});
                $(".parallax-7").each(function(){$(this).parallax("50%", 0.7);});
                $(".parallax-8").each(function(){$(this).parallax("50%", 0.8);});
                $(".parallax-9").each(function(){$(this).parallax("50%", 0.9);});
                $(".parallax-10").each(function(){$(this).parallax("50%", 0.1);});
            }
        }, "350");
        
        if ($(window).width() < 1024) {
            setTimeout(() => {
                $(".parallax-1").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-2").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-3").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-4").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-5").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-6").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-7").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-8").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-9").each(function(){$(this).parallax("50%", 0);});
                $(".parallax-10").each(function(){$(this).parallax("50%", 0);});
            }, "350");
        }

    }    
    
    
    /* -------------------------------------------
     Parallax on Mousemove
     --------------------------------------------- */
    
    function init_parallax_mousemove(){
        
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)") === true || window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;

        if (!(!!isReduced)) {
            if ($("html").hasClass("no-mobile")) {
            
                $(".parallax-mousemove-scene").on("mousemove", function(e){
                    var w = $(window).width();
                    var h = $(window).height();
                    var offsetX = 0.5 - (e.pageX - $(this).offset().left) / w;
                    var offsetY = 0.5 - (e.pageY - $(this).offset().top) / h;
                    $(this).find(".parallax-mousemove").each(function(i, el){
                        var offset = parseInt($(el).data('offset'));
                        var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";
                        $(el).css({
                            "transform": translate
                        });
                    });
                });
                $(".parallax-mousemove-scene").on("mousemove", function(e){
                    var offsetX = e.pageX - $(this).offset().left;
                    var offsetY = e.pageY - $(this).offset().top;
                    $(this).find(".parallax-mousemove-follow").each(function(i, el){
                        $(el).css({
                            "left": offsetX,
                            "top": offsetY
                        });                    
                    });
                    $(".parallax-mousemove-follow").each(function(i, el){
                        $(el).css({
                            "left": offsetX
                        });
                    });
                });
                $(".parallax-mousemove-scene").on("mouseenter", function(e){
                    $(this).find(".parallax-mousemove-follow").each(function(i, el){
                        setTimeout(() => {
                            $(el).css({
                                "transition": "all .27s var(--ease-out-short)",
                                "will-change": "transform"
                            });
                        }, "27");
                    });
                });
                $(".parallax-mousemove-scene").on("mouseout", function(e){
                    $(this).find(".parallax-mousemove-follow").each(function(i, el){
                        $(el).css({
                            "transition": "none"
                        });
                    });
                });
            
            }
        }
    }
    
    /* -------------------------------------------
     Parallax on Scroll
     --------------------------------------------- */
    
    function init_parallax_scroll(){
        
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)") === true || window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
        
        if (!(!!isReduced)) {        
        
            if ($("[data-rellax-y]").length) {            
                if (($(window).width() >= 1280) && (mobileTest == false)) {
                
                    var rellax_y = new Rellax("[data-rellax-y]", {
                        vertical: true,
                        horizontal: false
                    });
                    
                    $(window).scroll(function(){
                        $("[data-rellax-y]").filter(":in-viewport").each(function(){
                            if (!($(this).hasClass("js-in-viewport"))) {
                                $(this).addClass("js-in-viewport");
                                rellax_y.refresh();
                            }
                        });
                        $("[data-rellax-y]").not(":in-viewport").each(function(){
                            if ($(this).hasClass("js-in-viewport")) {
                                $(this).removeClass("js-in-viewport");
                            }
                        });
                    });
                    
                }                
            }
            
            if ($("[data-rellax-x]").length) {            
                if (($(window).width() >= 1280) && (mobileTest == false)) {
                
                    var rellax_x = new Rellax("[data-rellax-x]", {
                        horizontal: true
                    });
                    
                    $(window).scroll(function(){
                        $("[data-rellax-x]").filter(":in-viewport").each(function(){
                            if (!($(this).hasClass("js-in-viewport"))) {
                                $(this).addClass("js-in-viewport");
                                rellax_x.refresh();
                            }
                        });
                        $("[data-rellax-x]").not(":in-viewport").each(function(){
                            if ($(this).hasClass("js-in-viewport")) {
                                $(this).removeClass("js-in-viewport");
                            }
                        });
                    });
                    
                }                
            }
            
        }
    }

    
    /* -------------------------------------------
     Text Rotator
     --------------------------------------------- */
    
    function init_text_rotator(){
        
        $(".text-rotate").each(function(){            
            var text_rotator = $(this);
            var text_rotator_cont = text_rotator.html();
            text_rotator.attr("aria-hidden", "true");
            text_rotator.before("<span class='visually-hidden'>" + text_rotator_cont + "</span>");
            text_rotator.Morphext({
                animation: "fadeIn",
                separator: ",",
                speed: 4000
            });            
        });
        
    }
    
        
    
    /* ---------------------------------------------
     Tooltips (Bbootstrap plugin activation)
     --------------------------------------------- */
    
    function init_tooltips(){
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl){
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }
    
    
    /* ---------------------------------------------
     Team
     --------------------------------------------- */   
     
    function init_team(){
    
        $(".team-carousel").each(function(){
            $(this).css("--team-item-descr-height", $(this).find(".team-item-descr").height() + "px");
        });
        
        // Hover        
        $(".team-item").click(function(){
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });
        
        // Keayboar navigation for team section        
        $(".team-social-links > a").on("focus blur", function(){
             if (!($("html").hasClass("mobile"))) {
                 $(this).parent().parent().parent().parent().toggleClass("js-active");
             }       
        });        
   
    }
    
    
    /* ---------------------------------------------
     Services 2
     --------------------------------------------- */   
     
    function init_services_2(){
        $(".services-2-button").attr("aria-expanded", "false");
        $(".services-2-descr").attr("aria-hidden", "true");    
        $(".services-2-button").click(function(){
            if ($(this).hasClass("active")){              
                $(this).removeClass("active");
                $(this).attr("aria-expanded", "false");
                $(this).next(".services-2-descr").removeClass("js-visible");
                $(this).next(".services-2-descr").attr("aria-hidden", "true");
            } else{
                $(".services-2-button").removeClass("active");
                $(".services-2-button").attr("aria-expanded", "false");
                $(".services-2-button").next(".services-2-descr").removeClass("js-visible");
                $(".services-2-button").next(".services-2-descr").attr("aria-hidden", "true");
                $(this).addClass("active");
                $(this).attr("aria-expanded", "true");
                $(this).next(".services-2-descr").addClass("js-visible");
                $(this).next(".services-2-descr").removeAttr("aria-hidden");                
            }
        });
        $(".services-2-button").keydown(function(e){                       
            if (e.keyCode == 13 || e.keyCode == 32) {                
                if ($(this).hasClass("active")){              
                    $(this).removeClass("active");
                    $(this).attr("aria-expanded", "false");
                    $(this).next(".services-2-descr").removeClass("js-visible");
                    $(this).next(".services-2-descr").attr("aria-hidden", "true");
                } else{
                    $(".services-2-button").removeClass("active");
                    $(".services-2-button").attr("aria-expanded", "false");
                    $(".services-2-button").next(".services-2-descr").removeClass("js-visible");
                    $(".services-2-button").next(".services-2-descr").attr("aria-hidden", "true");
                    $(this).addClass("active");
                    $(this).attr("aria-expanded", "true");
                    $(this).next(".services-2-descr").addClass("js-visible");
                    $(this).next(".services-2-descr").removeAttr("aria-hidden");                
                }                
                return false;
            }          
        });
    }
    
    
    /* ---------------------------------------------
     Split Section
     --------------------------------------------- */   
     
    function init_split_section(){
        var split_column_padding = ( $(window).width() - $(".container").first().width()) / 2;
        $(".split-column-left").css("padding-left", split_column_padding + "px");
        $(".split-column-right").css("padding-right", split_column_padding + "px");
    }
    
    
    /* ---------------------------------------------
     Shortcodes
     --------------------------------------------- */
    
    function init_shortcodes(){
        
        // Accordion        
        $(".accordion").each(function(){
            var allPanels = $(this).children("dd").hide();
            var allTabs = $(this).children("dt").children("a");
            allTabs.attr("role", "button");
            $(this).children("dd").first().show();
            $(this).children("dt").children("a").first().addClass("active");
            $(this).children("dt").children("a").attr("aria-expanded", "false");
            $(this).children("dt").children("a").first().attr("aria-expanded", "true");
                        
            $(this).children("dt").children("a").click(function(){        
                var current = $(this).parent().next("dd");
                allTabs.removeClass("active");
                $(this).addClass("active");
                allTabs.attr("aria-expanded", "false");
                $(this).attr("aria-expanded", "true");
                allPanels.not(current).slideUp("easeInExpo");
                $(this).parent().next().slideDown("easeOutExpo");                
                return false;                
            });
            
         });      
         
         // Accordion style 1       
        $(".accordion-1").each(function(){
            var allPanels = $(this).children("dd").hide();
            var allTabs = $(this).children("dt").children("a");
            allTabs.attr("role", "button");
                        
            $(this).children("dt").children("a").click(function(){
                
                if ($(this).hasClass("active")) {
                    var current = $(this).parent().next("dd");
                    allTabs.removeClass("active");
                    allTabs.attr("aria-expanded", "false");
                    allPanels.slideUp("easeInExpo");
                    allPanels.removeClass("active");                
                    return false;
                } else{
                    var current = $(this).parent().next("dd");
                    allTabs.removeClass("active");
                    $(this).addClass("active");
                    allTabs.attr("aria-expanded", "false");
                    $(this).attr("aria-expanded", "true");
                    allPanels.not(current).slideUp("easeInExpo");
                    $(this).parent().next().slideDown("easeOutExpo");
                    allPanels.removeClass("active");
                    current.addClass("active");                
                    return false;
                }        
                            
            });
            
         });   
        
        // Toggle
        var allToggles = $(".toggle > dd").hide();
        var allTabs = $(".toggle > dt > a");
        allTabs.attr({
            "role": "button",
            "aria-expanded": "false"
            });
        
        $(".toggle > dt > a").click(function(){
        
            if ($(this).hasClass("active")) {            
                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");
                $(this).attr("aria-expanded", "false");                
            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).attr("aria-expanded", "true");
                $(this).parent().next().slideDown("easeOutExpo");
            }
            
            return false;
        });
        
        // Responsive video
        $(".video, .resp-media, .blog-media").fitVids();
        $(".work-full-media").fitVids(); 
        
        // Background Youtube Video
        $(document).ready(function(){
            $(".player").mb_YTPlayer();
        });
               
    }    
    
})(jQuery); // End of use strict


/* ---------------------------------------------
 Sliders
 --------------------------------------------- */

function init_page_sliders(){
    (function($){
        "use strict";
        
        function owl_keynav(el){            
            el.attr({
                "role": "region",
                "aria-roledescription": "carousel"
            });         
            el.find(".owl-prev, .owl-next").attr({
                "role": "button",
                "tabindex": "0"
            });
            if (el.hasClass("autoplay")){                
                el.prepend("<button class='owl-pause-button visually-hidden sr-only'>Stop Sliding</button>");
                el.on("click", ".owl-pause-button", function(){
                    if ($(this).hasClass("owl-pause-button-paused")) {
                        $(this).removeClass("owl-pause-button-paused");
                        $(this).html("Stop Sliding");
                        var this_owl = el.data("owlCarousel");
                        this_owl.play();                       
                    } else {                    
                        $(this).addClass("owl-pause-button-paused");
                        $(this).html("Start Sliding");
                        var this_owl = el.data("owlCarousel");
                        this_owl.stop();
                    }     
                });                     
            }  
            el.prepend(el.find(".owl-controls"));     
            el.on("click", ".owl-page, .owl-prev, .owl-next", function(e){
                el.find(".owl-pause-button").addClass("owl-pause-button-paused");
                el.find(".owl-pause-button").html("Start Sliding");
                var this_owl = el.data("owlCarousel");
                this_owl.stop();
            });   
            el.on("keydown", ".owl-page, .owl-prev, .owl-next", function(e){
                if (e.keyCode == 13 || e.keyCode == 32) {
                    el.find(".owl-pause-button").addClass("owl-pause-button-paused");
                    el.find(".owl-pause-button").html("Start Sliding");
                    var this_owl = el.data("owlCarousel");
                    this_owl.stop();
                }
            });          
            el.on("keydown", ".owl-prev", function(e){
                if (e.keyCode == 13 || e.keyCode == 32) {
                    var this_owl = el.data("owlCarousel");
                    this_owl.prev();
                    return false;                    
                }
            });
            el.on("keydown", ".owl-next", function(e){
                if (e.keyCode == 13 || e.keyCode == 32) {
                    var this_owl = el.data("owlCarousel");
                    this_owl.next();
                    return false;                   
                }
            });                     
        }
        
        function owl_update(el){       
            el.find(".owl-item").attr({
                "aria-hidden": "true"
            });
            el.find(".owl-item.active").removeAttr("aria-hidden");
            el.find(".owl-item a, .owl-item button, .owl-item input").attr({
                "tabindex": "-1"
            });
            el.find(".owl-item.active a, .owl-item.active button, .owl-item.active input").attr({
                "tabindex": "0"
            });            
        }
        
       
        // Fullwidth slider
        $(".fullwidth-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.005,28.500 L27.000,54.494 L24.000,56.994 L0.005,28.500 L24.000,0.006 L27.000,2.506 L5.005,28.500 Z"/></svg>', '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.995,28.500 L-0.000,54.494 L3.000,56.994 L26.995,28.500 L3.000,0.006 L-0.000,2.506 L21.995,28.500 Z"/></svg>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });

        $.fn.randomize = function(selector){
          var $elems = selector ? $(this).find(selector) : $(this).children(),
          $parents = $elems.parent();

          $parents.each(function(){
            $(this).children(selector).sort(function(){
                return Math.round(Math.random()) - 0.5;
            }).detach().appendTo(this);
          });

          return this;
        };
        
        // Fullwidth slider fade
        $(".fullwidth-slider-fade").addClass("autoplay");
        $(".fullwidth-slider-fade").owlCarousel({
            autoPlay: 7000,
            transitionStyle: "fade",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.005,28.500 L27.000,54.494 L24.000,56.994 L0.005,28.500 L24.000,0.006 L27.000,2.506 L5.005,28.500 Z"/></svg>', '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.995,28.500 L-0.000,54.494 L3.000,56.994 L26.995,28.500 L3.000,0.006 L-0.000,2.506 L21.995,28.500 Z"/></svg>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Text slider
        $(".text-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.005,28.500 L27.000,54.494 L24.000,56.994 L0.005,28.500 L24.000,0.006 L27.000,2.506 L5.005,28.500 Z"/></svg>', '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.995,28.500 L-0.000,54.494 L3.000,56.994 L26.995,28.500 L3.000,0.006 L-0.000,2.506 L21.995,28.500 Z"/></svg>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Testimonials slider 1
        $(".testimonials-slider-1").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            pagination: false,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><i class="mi-arrow-left" aria-hidden="true"></i>', '<span class="visually-hidden">Next Slide</span><i class="mi-arrow-right" aria-hidden="true"></i>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Testimonials slider 2
        $(".testimonials-slider-2").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            pagination: false,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><i class="mi-arrow-left" aria-hidden="true"></i>', '<span class="visually-hidden">Next Slide</span><i class="mi-arrow-right" aria-hidden="true"></i>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Testimonials slider 3
        $(".testimonials-slider-3").owlCarousel({
            slideSpeed: 700,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [1024, 2],
            itemsTabletSmall: [767, 1],
            itemsMobile: [480, 1],
            navigation: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><i class="mi-arrow-left" aria-hidden="true"></i>', '<span class="visually-hidden">Next Slide</span><i class="mi-arrow-right" aria-hidden="true"></i>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Fullwidth gallery
        $(".fullwidth-gallery").addClass("autoplay");
        $(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false,
            lazyLoad: true,
            addClassActive : true,
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Item carousel
        $(".item-carousel").addClass("autoplay");
        $(".item-carousel").owlCarousel({
            autoPlay: 3500,
            slideSpeed: 500,
            stopOnHover: false,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [575, 2],
            itemsMobile: [480, 1],
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.005,28.500 L27.000,54.494 L24.000,56.994 L0.005,28.500 L24.000,0.006 L27.000,2.506 L5.005,28.500 Z"/></svg>', '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.995,28.500 L-0.000,54.494 L3.000,56.994 L26.995,28.500 L3.000,0.006 L-0.000,2.506 L21.995,28.500 Z"/></svg>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Small item carousel
        $(".small-item-carousel").addClass("autoplay");
        $(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: true,
            items: 6,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='visually-hidden'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='visually-hidden'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Single carousel
        $(".single-carousel").owlCarousel({
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ["<span class='visually-hidden'>Previous Slide</span><i class='fa fa-angle-left' aria-hidden='true'></i>", "<span class='visually-hidden'>Next Slide</span><i class='fa fa-angle-right' aria-hidden='true'></i>"],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Content Slider
        $(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.005,28.500 L27.000,54.494 L24.000,56.994 L0.005,28.500 L24.000,0.006 L27.000,2.506 L5.005,28.500 Z"/></svg>', '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.995,28.500 L-0.000,54.494 L3.000,56.994 L26.995,28.500 L3.000,0.006 L-0.000,2.506 L21.995,28.500 Z"/></svg>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Work slider
        $(".work-full-slider").owlCarousel({
            slideSpeed : 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            lazyLoad: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.005,28.500 L27.000,54.494 L24.000,56.994 L0.005,28.500 L24.000,0.006 L27.000,2.506 L5.005,28.500 Z"/></svg>', '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="57px" viewBox="0 0 27 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.995,28.500 L-0.000,54.494 L3.000,56.994 L26.995,28.500 L3.000,0.006 L-0.000,2.506 L21.995,28.500 Z"/></svg>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Team carousel
        $(".team-carousel").owlCarousel({
            slideSpeed: 375,
            items: 2,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [1199, 2],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            navigation: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><i class="mi-arrow-left" aria-hidden="true"></i>', '<span class="visually-hidden">Next Slide</span><i class="mi-arrow-right" aria-hidden="true"></i>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        // Portfolio 4 carousel
        $(".portfolio-4-carousel").owlCarousel({
            slideSpeed: 700,
            items: 2,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [1199, 2],
            itemsTabletSmall: [767, 1],
            itemsMobile: [480, 1],
            navigation: true,
            addClassActive : true,
            navigationText: ['<span class="visually-hidden">Previous Slide</span><i class="mi-arrow-left" aria-hidden="true"></i>', '<span class="visually-hidden">Next Slide</span><i class="mi-arrow-right" aria-hidden="true"></i>'],
            afterInit: owl_keynav,
            afterAction: owl_update
        });
        
        var slider_strong_arrow_left = '<span class="visually-hidden">Previous Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="13px" viewBox="0 0 18 13" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M17.995,6.998 L3.591,6.998 C5.630,8.221 7.000,10.447 7.000,12.998 L6.000,12.998 C6.000,9.684 3.313,6.998 -0.001,6.998 L-0.015,6.998 L-0.015,5.998 L-0.001,5.998 C3.313,5.998 6.000,3.312 6.000,-0.002 L7.000,-0.002 C7.000,2.549 5.630,4.775 3.591,5.998 L17.995,5.998 L17.995,6.998 Z"/></svg>';
        var slider_strong_arrow_right = '<span class="visually-hidden">Next Slide</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="13px" viewBox="0 0 18 13" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd"  d="M18.000,6.998 C14.687,6.998 12.000,9.684 12.000,12.998 L11.000,12.998 C11.000,10.447 12.370,8.221 14.409,6.998 L0.005,6.998 L0.005,5.998 L14.409,5.998 C12.370,4.775 11.000,2.549 11.000,-0.002 L12.000,-0.002 C12.000,3.312 14.687,5.998 18.000,5.998 L18.015,5.998 L18.015,6.998 L18.000,6.998 Z"/></svg>';
        $(".slider-strong").each(function(){
            $(this).find(".owl-prev").html(slider_strong_arrow_left);
            $(this).find(".owl-next").html(slider_strong_arrow_right);
        });
        
        var slider_bold_arrow_left = '<span class="visually-hidden">Previous Slide</span><svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="24px" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M0.922,12.939 L0.922,12.939 L11.885,24.010 L12.800,23.077 L2.482,12.665 L32.006,12.665 L32.006,11.344 L2.483,11.344 L12.800,0.933 L11.885,-0.001 L0.008,12.005 L0.922,12.939 Z"/></svg>';
        var slider_bold_arrow_right = '<span class="visually-hidden">Next Slide</span><svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="24px" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M31.078,12.939 L31.078,12.939 L20.115,24.010 L19.200,23.077 L29.518,12.665 L-0.006,12.665 L-0.006,11.344 L29.517,11.344 L19.200,0.933 L20.115,-0.001 L31.992,12.005 L31.078,12.939 Z"/></svg>';
        $(".slider-bold").each(function(){
            $(this).find(".owl-prev").html(slider_bold_arrow_left);
            $(this).find(".owl-next").html(slider_bold_arrow_right);
        });
        
    })(jQuery);
};


/* ---------------------------------------------
 Portfolio section
 --------------------------------------------- */

// Projects filtering

var fselector = 0;
var work_grid = $("#work-grid, #isotope");

function init_work_filter(){
    (function($){
        "use strict";
        var isotope_mode;
        if (work_grid.hasClass("masonry")) {
            isotope_mode = "masonry";
        }
        else {
            isotope_mode = "fitRows"
        }
        
        $(".filter").click(function(){
            $(".filter").removeClass("active").attr("aria-pressed", "false");
            $(this).addClass("active").attr("aria-pressed", "true");
            fselector = $(this).attr("data-filter");
            var transition_duration = "0.25s";
            if (($("body").hasClass("appear-animate")) && (!($("html").hasClass("mobile")) && (work_grid.find(".wow-p").length))) {
                transition_duration = 0;
            }
            work_grid.imagesLoaded(function(){                
                work_grid.isotope({
                    itemSelector: ".mix",
                    layoutMode: isotope_mode,
                    filter: fselector,
                    transitionDuration: transition_duration
                });
            });
            
            var wow_p = new WOW({
                boxClass: "wow-p",
                animateClass: "animated",
                offset: 100,
                mobile: false,
                live: true,
                callback: function(box){
                    setInterval(function(){
                        $(box).removeClass("no-animate");
                    }, 1500);
                    $(box).removeClass("animated");
                    $(box).addClass("animated");
                }
            });             
            if ($("body").hasClass("appear-animate")) {
                wow_p.init();
            } 
            
            return false;
        });
        
        if (window.location.hash) {
            $(".filter").each(function(){
                if ($(this).attr("data-filter") == "." + window.location.hash.replace("#", "")) {
                    $(this).trigger("click");
                    if ($("#portfolio").length) {
                        $("html, body").animate({
                            scrollTop: $("#portfolio").offset().top
                        });
                    }
                    
                }
            });
        }
        
        work_grid.imagesLoaded(function(){
            work_grid.isotope({
                itemSelector: ".mix",
                layoutMode: isotope_mode,
                filter: fselector
            });
        });
        
        // Lazy loading plus isotope filter
        
        $(".img-lazy-work").on("load", function(){
            masonry_update();
        });
        function masonry_update(){
            work_grid.imagesLoaded(function(){
                work_grid.isotope({
                    itemSelector: ".mix",
                    layoutMode: isotope_mode,
                    filter: fselector
                });
            });
        }
        work_grid.on("arrangeComplete", function(){
            $(window).trigger("scroll");
        });
        
        // Window resize when filter enabled fix
        
        $(window).resize(function(){ 
            setTimeout(() => {
                masonry_update();
            }, "700");
        });
        
    })(jQuery);
}


/* ---------------------------------------------
 Google map
 --------------------------------------------- */

function init_map(){
    (function($){
        
        $(".map-section").click(function(){
            $(this).toggleClass("js-active");
            $(this).find(".mt-open").toggle();
            $(this).find(".mt-close").toggle();
            return false;
        });

    })(jQuery);
}


/* ---------------------------------------------
 HTML5 background video
 --------------------------------------------- */

function init_bg_video(){
    (function($){
        
        $(".bg-video-button-muted").click(function(){
            if ($(this).prevAll(".bg-video-wrapper").find(".bg-video").prop('muted')) {
                $(this).prevAll(".bg-video-wrapper").find(".bg-video").prop('muted', false);
                $(this).html('<i class="mi-volume-up"></i> <span class="visually-hidden">Volume Off</span>');
            }
            else {
                $(this).prevAll(".bg-video-wrapper").find(".bg-video").prop('muted', true);
                $(this).html('<i class="mi-volume-off"></i> <span class="visually-hidden">Volume On</span>');
            }
            
            return false;
        });
        
        $(".bg-video-button-pause").each(function(){
            setTimeout(() => {
               if ($(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].paused) {
                   $(this).html('<i class="mi-play"></i> <span class="visually-hidden">Play</span>');
                } 
            }, "1000");            
            setTimeout(() => {
               if (!($(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].paused)) {
                   $(this).html('<i class="mi-pause"></i> <span class="visually-hidden">Pause</span>');
                } 
            }, "1500");
            setTimeout(() => {
               if (!($(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].paused)) {
                   $(this).html('<i class="mi-pause"></i> <span class="visually-hidden">Pause</span>');
                } 
            }, "2750");
            setTimeout(() => {
               if (!($(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].paused)) {
                   $(this).html('<i class="mi-pause"></i> <span class="visually-hidden">Pause</span>');
                } 
            }, "5000");
        });
       
        $(".bg-video-button-pause").click(function(){
            if ($(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].paused) {
                $(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].play();
                $(this).html('<i class="mi-pause"></i> <span class="visually-hidden">Pause</span>');
            }
            else {
                $(this).prevAll(".bg-video-wrapper").find(".bg-video")[0].pause();
                $(this).html('<i class="mi-play"></i> <span class="visually-hidden">Play</span>');
            }
           
            return false;
        });

    })(jQuery);
}


/* ---------------------------------------------
 WOW animations
 --------------------------------------------- */

function init_wow(){
    (function($){
        
        setTimeout(() => {
            
           /* Wow init */
           
            if ($("body").hasClass("appear-animate")) {
                $(".wow").addClass("no-animate");
            }
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: false, 
                live: true,
                callback: function(box){                
                    setInterval(function(){ $(box).removeClass("no-animate"); }, 1500);
                }
            });
            
            if ($("body").hasClass("appear-animate")){
               wow.init();            
            } else{
                $(".wow").css("opacity", "1");
            }
            
            /* Wow for portfolio init */
           
            if ($("body").hasClass("appear-animate")) {
                $(".wow-p").addClass("no-animate");
            }
            var wow_p = new WOW({
                boxClass: 'wow-p',
                animateClass: 'animated',
                offset: 100,
                mobile: false, 
                live: true,
                callback: function(box){                
                    setInterval(function(){ $(box).removeClass("no-animate"); }, 1500);
                }
            });
            
            if ($("body").hasClass("appear-animate")){
               wow_p.init();            
            } else{
                $(".wow-p").css("opacity", "1");
            }
            
            /* Wow for menu bar init */
            
            if (($("body").hasClass("appear-animate")) && ($(window).width() >= 1024) && ($("html").hasClass("no-mobile"))){
               $(".wow-menubar").addClass("no-animate").addClass("fadeInDown").addClass("animated");  
               setInterval(function(){ $(".wow-menubar").removeClass("no-animate"); }, 1500);         
            } else{
                $(".wow-menubar").css("opacity", "1");
            }                        
        
        }, "100"); 
        
        /* Splitting JS accessibility fix */
           
        $("[data-splitting='chars']").each(function(){
            var splitting_chars = $(this);
            var splitting_chars_cont = splitting_chars.html();
            splitting_chars.attr("aria-hidden", "true");
            splitting_chars.before("<span class='visually-hidden user-select-none'>" + splitting_chars_cont + "</span>");
        });
        
    })(jQuery);
}


/* ---------------------------------------------
 Text outline effect accessibility fix
 --------------------------------------------- */

function init_text_outline(){
    (function($){    
    
        $(".text-outline").each(function(){
            var text_outline = $(this);
            var text_outline_cont = text_outline.html();
            text_outline.before("<span class='text-outline-2' aria-hidden='true'>" + text_outline_cont + "</span>");
            text_outline.before("<span class='text-outline-1' aria-hidden='true'>" + text_outline_cont + "</span>");
        });
        
    })(jQuery);
}


/* ---------------------------------------------
 Buttons and links animation helper
 --------------------------------------------- */

function init_btn_animation(){
    (function($){    
    
        $("[data-btn-animate=y]").each(function(){
            var btn_animate_y = $(this);
            var btn_animate_y_cont = btn_animate_y.html();
            btn_animate_y.html('<span class="btn-animate-y"><span class="btn-animate-y-1">' + btn_animate_y_cont + '</span><span class="btn-animate-y-2" aria-hidden="true">' + btn_animate_y_cont + '</span></span>');
        });
        
        $("[data-btn-animate=ellipse]").each(function(){
            var btn_animate_ellipse = $(this);
            var btn_animate_ellipse_cont = btn_animate_ellipse.html();
            btn_animate_ellipse.html('<span class="btn-ellipse-inner"><span class="btn-ellipse-unhovered">' + btn_animate_ellipse_cont + '</span><span class="btn-ellipse-hovered" aria-hidden="true">' + btn_animate_ellipse_cont + '</span></span>');
        });
        
        $("[data-link-animate=y]").each(function(){
            var link_animate_y = $(this);
            var link_animate_y_cont = link_animate_y.html();
            link_animate_y.html('<span class="link-strong link-strong-unhovered">' + link_animate_y_cont + '</span><span class="link-strong link-strong-hovered" aria-hidden="true">' + link_animate_y_cont + '</span></span>');
        });
        
    })(jQuery);
}


/* ---------------------------------------------
 Masonry
 --------------------------------------------- */

function init_masonry(){
    (function($){    
    
        $(".masonry").imagesLoaded(function(){
            $(".masonry").masonry();
        });
        
    })(jQuery);
}


/* ---------------------------------------------
 Polyfill for :focus-visible     
 --------------------------------------------- */

/**
 * https://github.com/WICG/focus-visible
 */
function init() {
  var hadKeyboardEvent = true;
  var hadFocusVisibleRecently = false;
  var hadFocusVisibleRecentlyTimeout = null;

  var inputTypesWhitelist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  };

  /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document, body, and non-interactive SVG.
   * @param {Element} el
   */
  function isValidFocusTarget(el) {
    if (
      el &&
      el !== document &&
      el.nodeName !== 'HTML' &&
      el.nodeName !== 'BODY' &&
      'classList' in el &&
      'contains' in el.classList
    ) {
      return true;
    }
    return false;
  }

  /**
   * Computes whether the given element should automatically trigger the
   * `focus-visible` class being added, i.e. whether it should always match
   * `:focus-visible` when focused.
   * @param {Element} el
   * @return {boolean}
   */
  function focusTriggersKeyboardModality(el) {
    var type = el.type;
    var tagName = el.tagName;

    if (tagName == 'INPUT' && inputTypesWhitelist[type] && !el.readOnly) {
      return true;
    }

    if (tagName == 'TEXTAREA' && !el.readOnly) {
      return true;
    }

    if (el.isContentEditable) {
      return true;
    }

    return false;
  }

  /**
   * Add the `focus-visible` class to the given element if it was not added by
   * the author.
   * @param {Element} el
   */
  function addFocusVisibleClass(el) {
    if (el.classList.contains('focus-visible')) {
      return;
    }
    el.classList.add('focus-visible');
    el.setAttribute('data-focus-visible-added', '');
  }

  /**
   * Remove the `focus-visible` class from the given element if it was not
   * originally added by the author.
   * @param {Element} el
   */
  function removeFocusVisibleClass(el) {
    if (!el.hasAttribute('data-focus-visible-added')) {
      return;
    }
    el.classList.remove('focus-visible');
    el.removeAttribute('data-focus-visible-added');
  }

  /**
   * Treat `keydown` as a signal that the user is in keyboard modality.
   * Apply `focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardEvent`.
   * @param {Event} e
   */
  function onKeyDown(e) {
    if (isValidFocusTarget(document.activeElement)) {
      addFocusVisibleClass(document.activeElement);
    }

    hadKeyboardEvent = true;
  }

  /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   * @param {Event} e
   */
  function onPointerDown(e) {
    hadKeyboardEvent = false;
  }

  /**
   * On `focus`, add the `focus-visible` class to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */
  function onFocus(e) {
    // Prevent IE from focusing the document or HTML element.
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
      addFocusVisibleClass(e.target);
    }
  }

  /**
   * On `blur`, remove the `focus-visible` class from the target.
   * @param {Event} e
   */
  function onBlur(e) {
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (
      e.target.classList.contains('focus-visible') ||
      e.target.hasAttribute('data-focus-visible-added')
    ) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
        hadFocusVisibleRecently = false;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      }, 100);
      removeFocusVisibleClass(e.target);
    }
  }

  /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had .focus-visible.
   * @param {Event} e
   */
  function onVisibilityChange(e) {
    if (document.visibilityState == 'hidden') {
      // If the tab becomes active again, the browser will handle calling focus
      // on the element (Safari actually calls it twice).
      // If this tab change caused a blur on an element with focus-visible,
      // re-apply the class when the user switches back to the tab.
      if (hadFocusVisibleRecently) {
        hadKeyboardEvent = true;
      }
      addInitialPointerMoveListeners();
    }
  }

  /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */
  function addInitialPointerMoveListeners() {
    document.addEventListener('mousemove', onInitialPointerMove);
    document.addEventListener('mousedown', onInitialPointerMove);
    document.addEventListener('mouseup', onInitialPointerMove);
    document.addEventListener('pointermove', onInitialPointerMove);
    document.addEventListener('pointerdown', onInitialPointerMove);
    document.addEventListener('pointerup', onInitialPointerMove);
    document.addEventListener('touchmove', onInitialPointerMove);
    document.addEventListener('touchstart', onInitialPointerMove);
    document.addEventListener('touchend', onInitialPointerMove);
  }

  function removeInitialPointerMoveListeners() {
    document.removeEventListener('mousemove', onInitialPointerMove);
    document.removeEventListener('mousedown', onInitialPointerMove);
    document.removeEventListener('mouseup', onInitialPointerMove);
    document.removeEventListener('pointermove', onInitialPointerMove);
    document.removeEventListener('pointerdown', onInitialPointerMove);
    document.removeEventListener('pointerup', onInitialPointerMove);
    document.removeEventListener('touchmove', onInitialPointerMove);
    document.removeEventListener('touchstart', onInitialPointerMove);
    document.removeEventListener('touchend', onInitialPointerMove);
  }

  /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   * This accounts for situations where focus enters the page from the URL bar.
   * @param {Event} e
   */
  function onInitialPointerMove(e) {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
    if (e.target.nodeName.toLowerCase() === 'html') {
      return;
    }

    hadKeyboardEvent = false;
    removeInitialPointerMoveListeners();
  }

  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointerDown, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('touchstart', onPointerDown, true);
  document.addEventListener('focus', onFocus, true);
  document.addEventListener('blur', onBlur, true);
  document.addEventListener('visibilitychange', onVisibilityChange, true);
  addInitialPointerMoveListeners();

  document.body.classList.add('js-focus-visible');
}

/**
 * Subscription when the DOM is ready
 * @param {Function} callback
 */
function onDOMReady(callback) {
  var loaded;

  /**
   * Callback wrapper for check loaded state
   */
  function load() {
    if (!loaded) {
      loaded = true;

      callback();
    }
  }

  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    callback();
  } else {
    loaded = false;
    document.addEventListener('DOMContentLoaded', load, false);
    window.addEventListener('load', load, false);
  }
}

if (typeof document !== 'undefined') {
  onDOMReady(init);
}


/* ---------------------------------------------
 Adding aria-hidden to icons
 --------------------------------------------- */

$(window).on("load", function(){
    (function(){
        let getIcons = document.querySelectorAll('i[class^="mi-"], i[class^="icon-"], i[class^="fa-"]');
        getIcons.forEach(function(iconEach)
        {
            let getIconAttr = iconEach.getAttribute('aria-hidden');
            if (!getIconAttr)
            {
                iconEach.setAttribute('aria-hidden','true');
            }
        });
    })();
});


/* ---------------------------------------------
 Cookies banner
 --------------------------------------------- */

$(document).ready(function(){
    (function(){
        $("#cookie-banner").css("display", "none");        
        if (window.localStorage.getItem("accept_cookies") === null) {
            $("#cookie-banner").css("display", "block");
        }        
        $("#cookie-ok-button").click(function(){
            $("#cookie-banner").hide();
            window.localStorage.setItem("accept_cookies", true);
        });
    })();
});