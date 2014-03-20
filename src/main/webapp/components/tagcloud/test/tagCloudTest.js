define([ "ratingTrend/ratingTrend"], function(RatingTrend) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function (configData) {
			module("ratingTrend.js");
			var ratingTrend = new RatingTrend(), self = this;
			asyncTest("RatingTrend UI Test", function() {
				$("#sidebar li > a#ratingTrend").click();	
				setTimeout(function() {
					start();
					var out = $(".breadcrumb_div").attr('class');
					equal('breadcrumb_div', out, "ratingTrend Page Rendered successfully");
					require(["dataSourceTest"], function(dataSourceTest){
						dataSourceTest.runTests();
					});
				}, 4000);
			});
		}
	};
});
