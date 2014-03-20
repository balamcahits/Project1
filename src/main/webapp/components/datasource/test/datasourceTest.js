define([ "dataSource/dataSource"], function(DataSource) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function () {
			module("dataSource.js");
			var dataSource = new DataSource(), self = this;
			asyncTest("dataSource UI Test", function() {				
					
				$("#adminLi > li > a#data_source").click();
				setTimeout(function() {
					start();
					var out = $(".breadcrumb_div").attr('class');
					equal('breadcrumb_div', out, "dataSource Page Rendered successfully");
					self.datasourcecreaterender();					
				},4000);		
			});
		},
		
		datasourcecreaterender : function() {
			var self = this;
			asyncTest("dataSourceCreate UI Test", function() {				
				console.info($("#datasrccreate"));
				$("#datasrccreate").click();
				setTimeout(function() {
					start();
					var out = $("#datasrcname").attr('id');
					equal('datasrcname', out, "dataSourceCreate Page Rendered successfully");
					 require(["tagsTest"], function(tagsTest){
						console.info(tagsTest);
						tagsTest.runTests();
					}); 
				},4000);		
			});
		}
		
	};
});
