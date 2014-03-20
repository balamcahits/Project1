define([ "groups/groups"], function(Groups) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function (configData) {
			module("groups.js");
			var groups = new Groups(), self = this;
			asyncTest("groups UI Test", function() {
				$("#adminLi > li > a#groups").click();
				setTimeout(function() {
					start();
					var out = $('.breadcrumb_div').attr('class');
					equal('breadcrumb_div', out, "groups Page Rendered successfully");
				}, 1500);
			});
		}
	};
});
