define(["framework/widgetWithTemplate", "login/listener/loginListener"], function() {
	Clazz.createPackage("com.components.login.js");

	Clazz.com.components.login.js.Login = Clazz.extend(Clazz.WidgetWithTemplate, {
		onLoginEvent : null,
		loginListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/login/template/login.tmp",
		configUrl: "components/login/config/config.json",
		name : commonVariables.login,
		localConfig: null,

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			
			if(self.onLoginEvent === null){
				self.onLoginEvent = new signals.Signal();
			}
			if(self.loginListener === null){
				self.loginListener = new Clazz.com.components.login.js.listener.LoginListener();
			}	
		},

		/***
		 * Called in once the login is success
		 *
		 */
		loadPage : function(){
			$(commonVariables.basePlaceholder).empty();
			Clazz.navigationController.jQueryContainer = commonVariables.basePlaceholder;
			this.onLoginEvent.add(this.loginListener.doLogin, this.loginListener);
			Clazz.navigationController.push(this);
		},
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */
		postRender : function(element) {	
			var self = this;
			$('.outer_div').css('margin-top', ($(window).height() - $('.outer_div').outerHeight())/2);
			$(window).resize (function () {
				$('.outer_div').css('margin-top', ($(window).height() - $('.outer_div').outerHeight())/2);
			});
		},

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self = this;
			
			$('.switch_yes_no').css('background', 'url("themes/images/on_off_switch.png")');
			$('.on_off').css('display','none');
			 
				 $("input[name=on_off]").click(function() {
				  var button = $(this).val();
					
					if(button == 'no'){ $(this).closest('fieldset').css('background-position', 'right'); }
					if(button == 'yes'){ $(this).closest('fieldset').css('background-position', 'left'); }	 
		   });
   
			//Login btn click Event
			$('#login').click(function(){
				$('#login').focus();
				//$('#login').attr('disabled', '');
				self.onLoginEvent.dispatch();
			});
			
			$(".forgot_password>a").click(function() {
				$('.user_data').show();
				if($("#email_forgot").hasClass("errormessage"))
					$("#email_forgot").removeClass("errormessage");
			});
			
			$("#forgot_pswd_submit").click(function() {
				if ($("#email_forgot").val() === "") {
					$("#email_forgot").addClass("errormessage");
					$("#email_forgot").focus();
				} else if($("#email_forgot").val() !== '') {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if(!emailReg.test($("#email_forgot").val())) {
						$("#email_forgot").addClass('errormessage');
						$("#email_forgot").focus();
						$(".forgot_alert").html('Invalid Email Address');
						$("#email_forgot").bind('keypress', function() {
							$(this).removeClass("errormessage");
							$(this).removeAttr("placeholder");
							$(".forgot_alert").html('');
						});					
					} else {
						self.loginListener.forgotPassword(self.loginListener.getRequestHeader($("#email_forgot").val(),"forgot"), function(response) {
							console.info(response.response);
							console.info(response.responseCode);
							if(response.response === null) {
								$(".forgot_alert").html('Invalid User');
							} else {
								$(".forgot_alert").html('Email sent successfully');
								setTimeout(function() {
									$('.user_data').hide();
								},3000);
							}
						});   
					}
				}	
			});
			
			$("#email_forgot").bind('keypress', function() {
				if($(this).hasClass("errormessage"))
					$(this).removeClass("errormessage");
			});
			
			$("#forgot_pswd_cancel").click(function() {
				$('.user_data').hide();
				$(".forgot_alert").html('');
				$("#email_forgot").val("");
			});
			
			$("#username").bind('keypress', function() {
				if($(this).hasClass("errormessage"))
					$(this).removeClass("errormessage");
			});
			
			$("#password").bind('keypress', function(e) {
				if($(this).hasClass("errormessage"))
					$(this).removeClass("errormessage");
				if(e.which === 32)
					e.preventDefault();
			});
						
			
			//Enter Key Press Event
			document.onkeydown = function(evt) {
				evt = evt || window.event;
				if (evt.keyCode === 13) {
					$('#login').focus();
					//$('#login').attr('disabled', '');
					self.onLoginEvent.dispatch();
				}
			};
			
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
			
			
		}
	});

	return Clazz.com.components.login.js.Login;
});