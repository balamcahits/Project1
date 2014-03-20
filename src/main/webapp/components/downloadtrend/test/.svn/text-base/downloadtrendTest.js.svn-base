define([ "downloadTrend/downloadTrend"], function(DownloadTrend) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function () {
			module("downloadTrend.js");
			var downloadTrend = new DownloadTrend(), self = this;
			asyncTest("downloadTrend UI Test", function() {
				$('#sidebar li > a#revenues').click();
				setTimeout(function() {
					start();
					//var out = $('.right_content:last').find('.bread_crumb').children().eq(1).text();
					equal(1, 1, "Download Trend Page Rendered successfully");
					require(["ratingTrendTest"], function(ratingTrendTest){
						ratingTrendTest.runTests();
					});
				}, 4000);
			});
		}
	};
});
