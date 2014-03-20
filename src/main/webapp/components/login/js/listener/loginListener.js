define([], function() {

	Clazz.createPackage("com.components.login.js.listener");

	Clazz.com.components.login.js.listener.LoginListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		localStorageAPI : null,
		headerContent : null,
		footerContent : null,
		navigationContent : null,
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;

			if(self.navigationContent === null){
				require(["navigation/navigation"], function(){
					self.navigationContent = new Clazz.com.components.navigation.js.navigation();	
				});
			}	
		},
		
		doLogin : function() {
			try{
				var self = this, header = self.getRequestHeader();
				setTimeout(function(){
				  window.scrollTo(0, 0);
				}, 0);
				if(self.loginValidation()){
					//TODO: call login service here and call appendPlaceholder in the success function
					commonVariables.api.ajaxRequest(header, 
						function(response){
							if(response !== undefined && response !== null){
								console.info(response.authToken);
								commonVariables.authToken = response.authToken;
								commonVariables.api.localVal.setSession("jsessionid", response.authToken);
								commonVariables.api.localVal.setSession("userInfo", JSON.stringify(response));
								self.appendPlaceholder();
								self.renderNavigation();
								commonVariables.api.localVal.setSession("abc","");

							} else {
								//$('#login').removeAttr('disabled');
								$(".login_error_msg").css('color','white');
								$(".login_error_msg").text('Authentication Failed');
							}
						}, 
						function(serviceError){
							//service access failed
							//$('#login').removeAttr('disabled');
							$(".login_error_msg").css('color','white');
							$(".login_error_msg").text('Service Down');
						}
					);
				} else {
					//$('#login').removeAttr('disabled');
				}
			}catch(error){
				//Exception
				//$('#login').removeAttr('disabled');
			}
		},
		
		/***
		 * provides the request header
		 * @return: returns the contructed header
		 */
		getRequestHeader : function(action) {
			var header = {
				contentType: "application/json",
				requestMethod: "POST",
				dataType: "json",
				webserviceurl: commonVariables.webserviceurl + "j_spring_security_check?j_username="+$("#username").val().trim()+"&j_password="+$("#password").val().trim()
			};
			
			if(action === 'forgot') {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "login/forgot?emailId=" + projectRequestBody;
			}
			return header;
		},
		
		forgotPassword : function(header, callback) {
			var self = this;
			try {
				commonVariables.api.ajaxRequest(header,
					function(response) {
						if(response.responseCode === "phr110001") {
							callback(response);
						} else if(response.response !== null) {
							callback(response);
						}	
					},
					function(textStatus) {
					}
				);
			} catch(exception) {
			}
		},
		
		pageRefresh : function(contentObj){
			var self = this;
			self.appendPlaceholder();
			self.renderNavigation(contentObj);
		},
		
		loginValidation : function(){
			var self = this, bCheck = false;
			if(self.userNameValidation()){
				bCheck = self.passwordValidation();
			} else {
				bCheck = false;
			}
			return bCheck;
		},
				
		
		userNameValidation : function(){
			if ($("#username").val() === undefined || $("#username").val() === null || $.trim($("#username").val()) === ""){
				$("#username").attr('placeholder','Enter Email Id');
				$("#username").addClass("errormessage");
				return false;
			} else { 
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, flag = 0;
				if(!emailReg.test($("#username").val())) {
					flag = 1;
					$("#username").addClass('errormessage');
					$("#username").focus();
					$(".login_error_msg").css('color','white');
					$(".login_error_msg").text('Invalid Email Address');						
				}
				if(flag === 0) {
					$("#username").removeClass("errormessage");
					return true;
				} else
					return false;				
			}
		},
		
		passwordValidation : function(){
			if($("#password").val() === undefined || $("#password").val() === null || $.trim($("#password").val()) === ""){
				$("#password").attr('placeholder','Enter Password');
				$("#password").addClass("errormessage");
				return false;
			}
			else{
				$("#passwordDiv").removeClass("loginuser_error");
				return true;
			}
		},
		
		appendPlaceholder : function() {
			$(commonVariables.basePlaceholder).empty();
			$(commonVariables.basePlaceholder).append(commonVariables.headerPlaceholder);
			$(commonVariables.basePlaceholder).append(commonVariables.navigationPlaceholder);
			$(commonVariables.basePlaceholder).append(commonVariables.contentPlaceholder);
		},
		
		renderNavigation : function(contentObj) {
			var self = this;
			Clazz.navigationController.jQueryContainer = commonVariables.navigationPlaceholder;

			if(self.navigationContent === null){
				require(["navigation/navigation"], function(){
					self.navigationContent = new Clazz.com.components.navigation.js.navigation();
					self.loadNavigationPage(contentObj);
				});
			}else{ self.loadNavigationPage(contentObj); }
		},
		
		loadNavigationPage : function(contentObj){
			var self = this;
			self.navigationContent.currentContent = contentObj;
			Clazz.navigationController.push(self.navigationContent, false);	
		}
	});

	return Clazz.com.components.login.js.listener.LoginListener;
});