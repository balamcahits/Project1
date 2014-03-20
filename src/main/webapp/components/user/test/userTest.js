define([ "user/user"], function(User) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function (configData) {
			module("user.js");
			var user = new User(), self = this;
			asyncTest("user UI Test", function() {
				$("#adminLi > li > a#user").click();
				setTimeout(function() {
					start();
					var out = $('.right_content:last').find('.bread_crumb').children().eq(1).text();
					equal(' Users', out, "user Page Rendered successfully");
					require(["rolesTest"], function(rolesTest){
						console.info(rolesTest);
						rolesTest.runTests();
					});
				}, 4000);
			});
		}
	};
});
