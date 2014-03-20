define(["navigation/listener/navigationListener"], function() {
	
	Clazz.createPackage("com.components.navigation.js");

	Clazz.com.components.navigation.js.navigation = Clazz.extend(Clazz.WidgetWithTemplate, {
		navigationEvent : null,
		navigationHeader : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/navigation/template/navigation.tmp",
		configUrl: "components/navigation/config/config.json",
		name : window.commonVariables.navigation,
		navigationListener : null,
		onMytabEvent : null,
		currentContent : null,
	
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig){
			var self = this;
			
			if(self.navigationListener === null){
				commonVariables.navListener = new Clazz.com.components.navigation.js.listener.navigationListener();
				self.navigationListener = commonVariables.navListener;
			}

			if(self.onMytabEvent === null){
				self.onMytabEvent = new signals.Signal();
			}
			self.onMytabEvent.add(self.navigationListener.onMytabEvent, self.navigationListener);
		},

		/***
		 * Called in once the navigation is success
		 *
		 */
		loadPage : function(){
			if(self.navigationListener === null){
				commonVariables.navListener = new Clazz.com.components.navigation.js.listener.navigationListener();
				self.navigationListener = commonVariables.navListener;
			}
		},
		
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */
		postRender : function(element) {	
			var self = this;
			self.navigationListener.landingPage(self.currentContent);
		},

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self = this;
			
			Clazz.navigationController.mainContainer = commonVariables.contentPlaceholder;
			
			$(document).click(function(e) {
				if(!($(e.target).hasClass('daterangepicker') || $(e.target).parents().hasClass('daterangepicker'))) {
					$('.daterangepicker').hide();
				}
			});
			
			$('#sidebar li > a').unbind('click');
			$('#sidebar li > a').click(function(){
				if($(this).parent().attr('id') !== 'search') {
					var selfin = $(this), id = $(this).attr('name');
					// Testing the condition for child element
					if(!selfin.parent().parent().prev().children('span:last').hasClass('arrow_open')){
						// Resetting all the arrows to close
						$('.hasChild').each(function(){
							var element = $(this).find('a:first');
							if(element.children('span:last').hasClass('arrow_open')){
								element.children('span:last').addClass('arrow_close').removeClass('arrow_open');
							}
						});

						// For opening itself
						if(selfin.children('span:last').hasClass('arrow_close')){
							selfin.children('span:last').addClass('arrow_open').removeClass('arrow_close');
						}		

						// For closing itself
						if (selfin.parent().hasClass('open')) {
							if(selfin.children('span:last').hasClass('arrow_open')){
								selfin.children('span:last').addClass('arrow_close').removeClass('arrow_open');
							}							   
						}

					}
					
					/* Sidebar active li fix */
					if (!(selfin.parents().hasClass('hasChild') && !selfin.parent().hasClass('hasChild'))) {
						$('#sidebar li > a').removeClass('act');
					}

					if (selfin.parents().hasClass('hasChild') && !selfin.parent().hasClass('hasChild')) {
						$('.hasChild li > a').removeClass('act');
					}
					
					$(this).addClass('act');
					self.onMytabEvent.dispatch(id);
				}
				if($(window).width()<760 && !($(this).parent().hasClass('hasChild')))	{
					if($('body').hasClass('show-leftbar')) {
						$('body').removeClass('show-leftbar');
						$('.dummy_section').detach();
					}	
				}				
			});
			var dat, data;
			$(window).resize(function() {
				var width = $(window).width();
				if(width < 1024 && width >= 760) {
				dat = 1;	
				$('body').addClass('collapse-leftbar').removeClass('show-leftbar');
					if(data === 1) {
							var count = $('.dashboard_view').length;
							if(count == 1){
								$('.dashboard_view').css('width','98%');
							} else if (count >= 2) {
								$('.dashboard_view').css('width','48%');
							}
							data = 0;
					}
				}else if(width > 1024) {
					if(dat ===1) {
						$('body').addClass('show-leftbar');
						if($('body').hasClass('collapse-leftbar'))
						$('body').removeClass('collapse-leftbar');
						dat = 0;
					}
					if(data === 1) {
						var count = $('.dashboard_view').length;
						if(count == 1){
							$('.dashboard_view').css('width','98%');
						} else if (count >= 2) {
							$('.dashboard_view').css('width','48%');
						}
						data = 0;
					}
				}
				if($(window).width() < 760) {
					dat = 1;
					data = 1;
					var bodyElement = $('body');
					if(bodyElement.hasClass('collapse-leftbar')){
						bodyElement.removeClass('collapse-leftbar');	
					}
					$('.dashboard_view').css('width', '93%');
				}
				var tabheight =  $(window).height() - ($(".page_heading").height() + $(".header_section").height());
				$('.tab-content').css('height',tabheight + 'px');
			});	
		}
	});

	return Clazz.com.components.navigation.js.navigation;
});
