define(["navigation/navigation"], function() {

	return { 
		runTests: function (configData) {
			var self = this;
			module("navigation.js");
			
			asyncTest("Test - Navigation design", function() {
				setTimeout(function() {
					start();
					var length = $("#sidebar").attr('id');
					equal('sidebar', length, "Navigation Successfully Rendered");
					self.clickFunction();
				}, 1500);
			});			
		},
		
		clickFunction : function() {
			var self = this;
			asyncTest("Test - Navigation Sidebar click", function() {
				$('#sidebar li > a#dashboard').click();
				setTimeout(function() {
					start();	
					var output = $('#dashboard').attr('class');	
					equal('act', output, "Sidebar click working successfully");		
					require(["headerTest"], function(headerTest){
						headerTest.runTests();
					});
				}, 1500);
			});
		}
	};
});
