define(["login/login"], function(Login) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function (configData) {
			module("login.js");
			var login = new Login(), self = this;
			
			asyncTest("Login UI Test", function() {
				$("#custom").append(commonVariables.basePlaceholder);
				$("#custom").append(commonVariables.headerPlaceholder);
				$("#custom").append(commonVariables.navigationPlaceholder);
				$("#fixture").append(commonVariables.contentPlaceholder);

				var output;
				Clazz.config = configData;
				Clazz.navigationController = new Clazz.NavigationController({
					mainContainer : "basepage\\:widget",
					transitionType : Clazz.config.navigation.transitionType,
					isNative : Clazz.config.navigation.isNative
				});

				login.loadPage();
				setTimeout(function() {
					start();
					output = $(commonVariables.basePlaceholder).find(".login_user").parent().attr('class');
					equal("login_form", output, "Login Rendered Successfully");
					self.loginUserNameValidationTest();
				}, 1000);
			});
		},
		
		loginUserNameValidationTest : function() {
			var self=this;
			asyncTest("Login Username Validation Test", function() {
				$("input#username").val('');
				$('input#password').val('');
				$('#login').click();
				setTimeout(function() {
					start();
					var out = $("#username").attr('placeholder');
					equal('Enter Username', out, "Login Username Validation Tested");
					self.loginPasswordValidationTest();
				},1000);
			});
		},
		
		loginPasswordValidationTest : function() {
			var self=this;
			asyncTest("Login Password Validation Test", function() {
				$("input#username").val('a');
				$("input#password").val('');
				$('#login').click();
				setTimeout(function() {
					start();
					var out = $("#password").attr('placeholder');
					equal('Enter Password', out, "Login Password Validation Tested");
					self.loginClick();
				},1000);
			});
		},
		
		loginClick : function() {
			asyncTest("Login Click Test", function() {
				$("#username").val('abcd');
				$("#password").val('abcd');
				$('#login').click();
				setTimeout(function() {
					start();
					var out = $("#myTabContent").find('#ios').attr('class');
					equal('tab-pane fade active in', out, "Login Click success");
					require(["navigationTest"], function(navigationTest){
						navigationTest.runTests();
					});
				},2500);
			});	
		}
	};
});
