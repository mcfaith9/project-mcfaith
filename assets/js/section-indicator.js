(function($) {
	
	var win = $(window),
			doc = $(document);
	
	var useVelocity = $.fn.velocity;

	$.fn.sectionIndicators = function (options) {

		var settings = $.extend({
			animDuration: 400,
			animEasing: "swing",
			containerId: "section-indicators",
			parentContainer: "body",
			indicatorClass: "section-indicator",
			currentIndicatorClass: "current",
			indicatorIcon: "fa-circle-o",
			indicatorIconActive: "fa-circle",
			indicatorIconHover: "fa-dot-circle-o",
			nextSectionClass: "next-section",
			nextSectionIcon: "fa-angle-down",
			prevSectionClass: "prev-section",
			prevSectionIcon: "fa-angle-up",
			spanClass: "",
		}, options);

		var sections = $(this);

		function sectionInViewport(section) {

			if (!section.length) {
				return false;
			}

			var scrollTop = win.scrollTop(),
					sectionHeight = section.outerHeight(),
					sectionPos = section.offset().top;

			return scrollTop >= sectionPos - win.height() / 2 && scrollTop < sectionPos + sectionHeight - win.height() / 2;
		}

		$(settings.parentContainer).append("<div id=\""+settings.containerId+"\"></div>");

		var indicatorContainer = $("#"+settings.containerId);

		sections.each(function(i) {
			var sectionName = $(this).data("section-name") ? $(this).data("section-name") : "Section "+(i+1);
			indicatorContainer.append("<a href=\"#\" class=\""+settings.indicatorClass+" fa "+settings.indicatorIcon+"\"><span class=\""+settings.spanClass+"\">"+sectionName+"</span></a>")
		});

		indicatorContainer.append("<a href=\"#\" class=\"fa "+settings.nextSectionIcon+" "+settings.nextSectionClass+"\"></a>").prepend("<a href=\"#\" class=\"fa "+settings.prevSectionIcon+" "+settings.prevSectionClass+"\"></a>");

		var prevNav = $("."+settings.prevSectionClass);
		var nextNav = $("."+settings.nextSectionClass);

		sectionIndicators = $("."+settings.indicatorClass);

		var currSection = -1;
		
		var scrollingToCurr = false,
				hasIndicated = false;

		win.scroll(function() {
			
			hasIndicated = false;
			
			sections.each(function (i) {

				if (!hasIndicated && sectionInViewport($(this)) && !sectionInViewport(sections.eq(i+1))) {
					
					sectionIndicators.eq(i).addClass(settings.currentIndicatorClass+" "+settings.indicatorIconActive).removeClass(settings.indicatorIcon);

					currSection = i;
					hasIndicated = true;
										
				} else {
					
					sectionIndicators.eq(i).removeClass(settings.currentIndicatorClass+" "+settings.indicatorIconActive).addClass(settings.indicatorIcon);
					
				}

			});
			
			// If scrolled before first section or scrolled past last
			if (!hasIndicated) {
				if (win.scrollTop() < sections.eq(0).offset().top) {
					currSection = -1;
				} else {
					currSection = sections.length;
				}
			}

		});

		sectionIndicators.click(function(e) {

			e.preventDefault();

			var indicatorIndex = $("."+settings.indicatorClass).index($(this));
			
			if (useVelocity) {
				
				$("html").velocity("scroll", {offset: sections.eq(indicatorIndex).offset().top, duration: settings.animDuration, easing: settings.animEasing, mobileHA: false});
				
			} else {
				
				$("html, body").animate({scrollTop: sections.eq(indicatorIndex).offset().top}, settings.animDuration, settings.animEasing);
				
			}
			
			$(this).removeClass(settings.indicatorIconHover).addClass(settings.indicatorIcon);

		}).mouseover(function() {
			$(this).addClass(settings.indicatorIconHover).removeClass(settings.indicatorIcon);
		}).mouseleave(function() {
			
			if (!$(this).hasClass(settings.currentIndicatorClass) && !scrollingToCurr) {
				$(this).removeClass(settings.indicatorIconActive+" "+settings.indicatorIconHover).addClass(settings.indicatorIcon);
			} else {
				$(this).removeClass(settings.indicatorIconHover).addClass(settings.indicatorIcon);
			}
			
		});

		nextNav.click(function(e) {

			e.preventDefault();

			if (currSection == sections.length - 1) {
				
				scrollingToCurr = true;
				
				if (useVelocity) {
					
					$("html").velocity("scroll", {offset: doc.height() - win.height(), duration: settings.animDuration, easing: settings.animEasing, mobileHA: false}, function() {
						currSection = sections.length;
						scrollingToCurr = false;
					});
					
				} else {
					
					$("html, body").animate({scrollTop: doc.height() - win.height()}, settings.animDuration, settings.animEasing, function() {
						currSection = sections.length;
						scrollingToCurr = false;
					});
					
				}
				
			} else if (currSection < sections.length - 1) {
				
				if (useVelocity) {
					
					$("html").velocity("scroll", {offset: sections.eq(currSection + 1).offset().top, duration: settings.animDuration, easing: settings.animEasing, mobileHA: false});
					
				} else {
					
					$("html, body").animate({scrollTop: sections.eq(currSection + 1).offset().top}, settings.animDuration, settings.animEasing);
					
				}
				
			}

		});

		prevNav.click(function(e) {

			e.preventDefault();

			if (currSection == 0) {
				
				scrollingToCurr = true;
				
				if (useVelocity) {
					
					$("html").velocity("scroll", {offset: 0, duration: settings.animDuration, easing: settings.animEasing, mobileHA: false}, function() {
						currSection = -1;
						scrollingToCurr = false;
					});
					
				} else {
					
					$("html, body").animate({scrollTop: 0}, settings.animDuration, settings.animEasing, function() {
						currSection = -1;
						scrollingToCurr = false;
					});
					
				}
				
			} else if (currSection > 0) {
				
				if (useVelocity) {
					
					$("html").velocity("scroll", {offset: sections.eq(currSection - 1).offset().top, duration: settings.animDuration, easing: settings.animEasing, mobileHA: false});
					
				} else {
					
					$("html, body").animate({scrollTop: sections.eq(currSection - 1).offset().top}, settings.animDuration, settings.animEasing);
					
				}
			}

		});
	
		win.scroll();
		
	}

	$(".container-fluid").sectionIndicators();

}(jQuery));