define(["userProfile/listener/userProfileListener"], function() {
	Clazz.createPackage("com.components.userProfile.js");

	Clazz.com.components.userProfile.js.userProfile = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/userProfile/template/userProfile.tmp",
		name : commonVariables.userProfile,
		userProfileListener : null,
		whereToRender : null,
		validation : null,
		userProfile : null,
		hasError : false,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.userProfileListener === null ) {
				self.userProfileListener = new Clazz.com.components.userProfile.js.listener.userProfileListener();
			}
			self.registerEvents(self.userProfileListener);
		},
		
		registerEvents : function(userProfileListener) {
			var self = this;
		},
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */
		postRender : function(element) {
			var self=this;
			$("#page-leftbar").find('.act').each(function() {
				$(this).removeClass('act');
				$(this).find('span').each(function(){
				if ($(this).hasClass('arrow_open')) {
					$(this).removeClass('arrow_open');
					$(this).addClass('arrow_close');
				}
		
			});
		});
		$("#adminLi").hide();
			if($(window).width()<760 && !($(this).parent().hasClass('hasChild')))	{
				if($('body').hasClass('show-leftbar')) {
				$('body').removeClass('show-leftbar');
				$('.dummy_section').detach();
				}	
			}
		},
				
		validation : function() {
			var self = this;
			var firstnameobj = $("#userfirstname");
			var lastnameobj = $("#userlastname");
			var emailobj = $("#useremail");
			var passwordobj = $("#password");
			var confirmPwdobj = $("#confirmpwd");
			var oldconfirmPwdobj = $("#oldpassword");
			
			if(firstnameobj.val() === '') {
				firstnameobj.addClass('errormessage');
				firstnameobj.focus();
				firstnameobj.attr('placeholder','Enter First Name');
				firstnameobj.bind('keypress', function() {
					$(this).removeClass("errormessage");
					$(this).removeAttr("placeholder");
				});
				self.hasError = true;
			} else if(lastnameobj.val() === '') {
				lastnameobj.addClass('errormessage');
				lastnameobj.focus();
				lastnameobj.attr('placeholder','Enter Last Name');
				lastnameobj.bind('keypress', function() {
					$(this).removeClass("errormessage");
					$(this).removeAttr("placeholder");
				});
				self.hasError = true;
			} else if(emailobj.val() === '') {
					emailobj.addClass('errormessage');
					emailobj.focus();
					emailobj.attr('placeholder','Enter Email');
					emailobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
					self.hasError = true;	
			}  else if(oldconfirmPwdobj.val() === '') {
				oldconfirmPwdobj.addClass('errormessage');
				oldconfirmPwdobj.focus();
				oldconfirmPwdobj.attr('placeholder','Enter Password');
				oldconfirmPwdobj.bind('keypress', function() {
					$(this).removeClass("errormessage");
					$(this).removeAttr("placeholder");
				});
				self.hasError = true;
			} else if(passwordobj.val() === '') {
				passwordobj.addClass('errormessage');
				passwordobj.focus();
				passwordobj.attr('placeholder','Enter Password');
				passwordobj.bind('keypress', function() {
					$(this).removeClass("errormessage");
					$(this).removeAttr("placeholder");
				});
				self.hasError = true;
			} else if(confirmPwdobj.val() === '') {
				confirmPwdobj.addClass('errormessage');
				confirmPwdobj.focus();
				confirmPwdobj.attr('placeholder','Enter Confirm Password');
				confirmPwdobj.bind('keypress', function() {
					$(this).removeClass("errormessage");
					$(this).removeAttr("placeholder");
				});
				self.hasError = true;
			}  else if(passwordobj.val() !== '' && confirmPwdobj.val() !== '') {
				if(!(passwordobj.val() === confirmPwdobj.val())){
					confirmPwdobj.addClass('errormessage');
					confirmPwdobj.focus();
					//$("#confirmPwdError").html('Password did not Match');
					self.alertifyMessage("Password did not Match");	
					self.hasError = true;
				} else {
					self.hasError = false;
				}
			} else 
				self.hasError = false;
			
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(!emailReg.test(emailobj.val()) && self.hasError === false) {
				emailobj.addClass('errormessage');
				emailobj.focus();
				//$("#emailError").html('Invalid Email Address');
				self.alertifyMessage("Invalid Email Address");		
				emailobj.bind('keypress', function() {
					$(this).removeClass("errormessage");
					$(this).removeAttr("placeholder");
				});
				self.hasError = true;
			}	
			
			return self.hasError;
		},

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, height;			
			
			tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
			$('.create_table_div').css('height',tabheight + 'px'); 
			
			$(window).resize(function() {
				tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
				$('.create_table_div').css('height',tabheight + 'px'); 
			});	
			
			$("#usercreate").click(function() {
				$("#emailError").html('');
				$("#confirmPwdError").html('');
				var firstnameobj = $("#userfirstname");
				var lastnameobj = $("#userlastname");
				var emailobj = $("#useremail");
				var confirmPwdobj = $("#confirmpwd");
				firstName = firstnameobj.val();
				lastName = lastnameobj.val();
				email = emailobj.val();
				password = confirmPwdobj.val();
				if(!self.validation()) {
					console.info("enter");
					/*self.usersRequestBody.firstName = firstName;
					self.usersRequestBody.lastName = lastName;
					self.usersRequestBody.emailId = email;
					self.usersRequestBody.password = password;
					self.userListener.getUsersList(self.userListener.getActionHeader(self.usersRequestBody, "create"), function(response) {
						self.pageRefresh();
					});*/
				}	
			});		
						
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});

	return Clazz.com.components.userProfile.js.userProfile;
});