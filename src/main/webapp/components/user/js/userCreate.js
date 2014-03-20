define(["framework/widgetWithTemplate", "user/listener/userListener"], function() {
	Clazz.createPackage("com.components.user.js");

	Clazz.com.components.user.js.userCreate = Clazz.extend(Clazz.WidgetWithTemplate, {
		userListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/user/template/userCreate.tmp",
		configUrl: "components/user/config/config.json",
		name : commonVariables.user,
		user : null,
		usersRequestBody : {},
		userdata : {},
		hasError : false,

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.userListener === null){
				self.userListener = new Clazz.com.components.user.js.listener.userListener();
			}	
		},

		postRender : function(element) {
			var self=this;
			self.userListener.getUsersList(self.userListener.getActionHeader('', "roles"), function(response) {
				if(response !== null){
					$.each(response, function(index, value){
						$("#Roles").append('<option value="'+ value.id +'">'+ value.name +'</option>');
					});
				}
			}); 
		},
		
		pageRefresh : function() {
			var self = this;
			commonVariables.navListener.getMyObj('user', function(retVal) {
				self.user = retVal;							
				Clazz.navigationController.push(self.user, commonVariables.animation);
			});
		},
		
		validation : function() {
			var self = this;
			var firstnameobj = $("#userfirstname");
			var lastnameobj = $("#userlastname");
			var emailobj = $("#useremail");
			var passwordobj = $("#password");
			var confirmPwdobj = $("#confirmpwd");
			
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
			} else if(emailobj.val() !== '') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test(emailobj.val())) {
					emailobj.addClass('errormessage');
					emailobj.focus();
					$("#emailError").html('Invalid Email Address');
					emailobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
					self.hasError = true;
				} else {
					self.hasError = false;
				}
			} else if(passwordobj.val() !== '' && confirmPwdobj.val() !== '') {
				if(!(passwordobj.val() === confirmPwdobj.val())){
					confirmPwdobj.addClass('errormessage');
					confirmPwdobj.focus();
					$("#confirmpwdError").html('Password did not Match');
					self.hasError = true;
				} else {
					self.hasError = false;
				}
			} 
			
			return self.hasError;
		},

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, tabheight, firstName, lastName, email, userID;
			
			tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
			$('.create_table_div').css('height',tabheight + 'px'); 
			
			$(window).resize(function() {
				tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
				$('.create_table_div').css('height',tabheight + 'px'); 
			});	
			
			$("#cancel_user").click(function() {
				commonVariables.navListener.getMyObj('user', function(retVal) {
					self.user = retVal;							
					Clazz.navigationController.push(self.user, commonVariables.animation);
				});
			});
			
			$("#usercreate").click(function() {
				var firstnameobj = $("#userfirstname");
				var lastnameobj = $("#userlastname");
				var emailobj = $("#useremail");
				var confirmPwdobj = $("#confirmpwd");
				firstName = firstnameobj.val();
				lastName = lastnameobj.val();
				email = emailobj.val();
				password = confirmPwdobj.val();
				if(!self.validation()) {
					self.usersRequestBody.firstName = firstName;
					self.usersRequestBody.lastName = lastName;
					self.usersRequestBody.emailId = email;
					self.usersRequestBody.password = password;
					self.usersRequestBody.roles = $("#assigned").val();
					self.userListener.getUsersList(self.userListener.getActionHeader(self.usersRequestBody, "create"), function(response) {
						self.pageRefresh();
					});
				}	
			});		
			
			$('#btnRight').click(function(e) {
				var selectedOpts = $('#Roles option:selected');
				if (selectedOpts.length == 0) {
					alert("Nothing to move.");
					e.preventDefault();
				}

				$('#assigned').append($(selectedOpts).clone());
				$(selectedOpts).remove();
				e.preventDefault();
			});

			$('#btnLeft').click(function(e) {
				var selectedOpts = $('#assigned option:selected');
				if (selectedOpts.length == 0) {
					e.preventDefault();
				}

				$('#Roles').append($(selectedOpts).clone());
				$(selectedOpts).remove();
				e.preventDefault();
			});
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});	

	return Clazz.com.components.user.js.userCreate;
});