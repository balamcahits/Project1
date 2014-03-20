define([ "roles/roles"], function(Roles) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function () {
			module("roles.js");
			var roles = new Roles(), self = this;
			asyncTest("roles UI Test", function() {
				$("#adminLi > li > a#roles").click();
				setTimeout(function() {
					start();
					var out = $('.right_content:last').find('.bread_crumb').children().eq(1).text();
					equal(' Roles', out, "roles Page Rendered successfully");
					require(["groupsTest"], function(groupsTest){
						console.info(groupsTest);
						groupsTest.runTests();
					});
				}, 4000);
			});
		}
	};
});
