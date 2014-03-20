define(["framework/widgetWithTemplate", "user/listener/userListener"], function() {
	Clazz.createPackage("com.components.user.js");

	Clazz.com.components.user.js.userEdit = Clazz.extend(Clazz.WidgetWithTemplate, {
		userListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/user/template/userEdit.tmp",
		configUrl: "components/user/config/config.json",
		name : commonVariables.user,
		user : null,
		usersRequestBody : {},

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.userListener === null){
				self.userListener = new Clazz.com.components.user.js.listener.userListener();
			}	
		},
		
		preRender: function(whereToRender, renderFunction){
			var self = this, editData = {};
			self.userListener.getUsersList(self.userListener.getActionHeader('', "edit"), function(response) {
				editData.data = response.response;
				renderFunction(editData, whereToRender);
			});   								 
		}, 

		postRender : function(element) {
		},
		

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self = this;
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
			
			$("#userupdate").click(function(){
				var firstnameobj = $("#userfirstname");
				var lastnameobj = $("#userlastname");
				var emailobj = $("#useremail");
				var useridobj = $("#userid");
				
				if(firstnameobj.val() === '') {
					firstnameobj.addClass('errormessage');
					firstnameobj.focus();
					firstnameobj.attr('placeholder','Enter First Name');
					firstnameobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if(lastnameobj.val() === '') {
					lastnameobj.addClass('errormessage');
					lastnameobj.focus();
					lastnameobj.attr('placeholder','Enter Last Name');
					lastnameobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if(emailobj.val() === '') {
					emailobj.addClass('errormessage');
					emailobj.focus();
					emailobj.attr('placeholder','Enter Email');
					emailobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if(useridobj.val() === '') {
					useridobj.addClass('errormessage');
					useridobj.focus();
					useridobj.attr('placeholder','Enter UserId');
					useridobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else {
					firstName = $("#userfirstname").val();
					lastName = $("#userlastname").val();
					email = $("#useremail").val();
					userID = $("#userid").val();
					self.usersRequestBody.firstName = firstName;
					self.usersRequestBody.lastName = lastName;
					self.usersRequestBody.emailId = email;
					//self.usersRequestBody.userID = userID;
					self.userListener.getUsersList(self.userListener.getActionHeader(self.usersRequestBody, "create"), function(response) {
						commonVariables.navListener.getMyObj('user', function(retVal) {
							self.user = retVal;							
							Clazz.navigationController.push(self.user, commonVariables.animation);
						});
					});
				}
			});
		}
	});	

	return Clazz.com.components.user.js.userEdit;
});