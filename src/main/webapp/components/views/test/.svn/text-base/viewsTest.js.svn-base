define([ "views/views"], function(Views) {
	/**
	 * Test that the setMainContent method sets the text in the MyCart-widget
	 */
	return { 
		runTests : function (configData) {
			module("views.js");
			var self = this;
			$(commonVariables.contentPlaceholder).empty();
			asyncTest("Views UI Test", function() {
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"dashboard;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"5305c3cebfacb0ca2e1601b8","name":"z","dataSourceTypeId":"1234","dataSourceId":"52fdde3cbfac098f07ad123a","dashBoardTypeId":"52e6682124045e150c5e2a8e","ownerId":"admin","queryId":"52fccaa59cc0df1d84fddfec","autorefresh":"false","starttime":"","endtime":"","properties":{"type":["piechart"],"xaxis":[null],"yaxis":[null]},"colorcodes":null}],"responseStatus":200,"responseCode":"phr600001","exception":null,"message":null});
				   }
				});
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"datasource/52fdde3cbfac098f07ad123a;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":null,"responseStatus":204,"responseCode":"phr210002","exception":null,"message":null});
				   }
				});
				
				$("#adminLi > li > a#views").click();
				setTimeout(function() {
					start();
					var out = $('.breadcrumb_div').attr('class');
					equal('breadcrumb_div', out, "Views Page Rendered successfully");
					self.viewscreatepageuitest();
				}, 1500);
			});
		}, 
		
		viewscreatepageuitest : function(){
			var self=this;
			asyncTest("Views Create Page UI Test", function() {
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"datasourcetype;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"1234","name":"ITUNES","taskletClassName":"com.photon.phresco.app.store.batch.job.ITunesTasklet","url":"http://itunes.apple.com/rss/customerreviews/id=%s/xml"},{"id":"123456","name":"Play Store","taskletClassName":"com.photon.phresco.app.store.batch.job.PlaystoreTasklet","url":"https://play.google.com/store/apps/details?id=%s"},{"id":"12344","name":"Windows","taskletClassName":"com.photon.phresco.app.store.batch.job.WindowsTasklet","url":"http://www.windowsphone.com/en-us/store/app/walgreens/%s/reviews"}],"responseStatus":200,"responseCode":"phr200001","exception":null,"message":null});
				   }
				});
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"datasource;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"52ff66fe84bcc88c427194fd","name":"Walgreens Itunes Application","appId":"335364882","description":"Walgreens Itunes Application","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"5304591c9be59741aadd51c5","name":"Test","appId":"1234","description":"","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"5304903b9be52cfde3a9aeaf","name":"asd","appId":"12312","description":"asd","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"53049a519be54e406428f105","name":"Test","appId":"12345","description":"Description","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"53049a519be54e406428f106","name":"Test","appId":"12345","description":"Description","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null}],"responseStatus":200,"responseCode":"phr300001","exception":null,"message":null});
				   }
				});
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"dashboard/dashboardtype;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"52e6672124045e150c5e2a8e","name":"DASHBOARD"},{"id":"52e6682124045e150c5e2a8e","name":"RATING TREND"},{"id":"52e6691124045e150c5e2a8e","name":"DOWNLOAD TRENDS"}],"responseStatus":200,"responseCode":"phr600001","exception":null,"message":null});
				   }
				});
				
				$("#dashboardcreate").click();
				setTimeout(function() {
					start();
					var out = $('#widget_name').attr('id');
					equal('widget_name', out, "Views Create Page Rendering Tested successfully");
					self.viewsCreateNameValidationTest();
				}, 1500);
			});
		},
		
		viewsCreateNameValidationTest : function() {
			var self=this;
			asyncTest("Views Create Page Name Validation Test", function() {
				$("#widget_name").val('');
				$("#dashboardCreate").click();
				setTimeout(function() {
					start();
					var out = $("#widget_name").attr('class');
					equal('form-control errormessage', out, "Views Create Page Name Validation Tested successfully");
					self.viewsCreateTest();
				},1500);
			});
		},
		
		viewsCreateTest : function() {
			var self=this;
			asyncTest("Views Create Page Test", function() {
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"dashboard;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":null,"responseStatus":201,"responseCode":"phr600002","exception":null,"message":null});
				   }
				});
				
				$("#widget_name").val('SampleWidget');
				$("#dashboardCreate").click();
				setTimeout(function() {
					start();
					var out = $(".breadcrumb_div").attr('class');
					equal('breadcrumb_div', out, "Views Create Tested successfully");
					self.viewsCreateCancelTest();
				},1500);
			});
		},
		
		viewsCreateCancelTest : function() {
			var self=this;
			asyncTest("Views Create Cancel Page Test", function() {
				$("#dashboardcreate").click();
				$("#cancel_create").click();
				setTimeout(function() {
					start();
					var out = $(".breadcrumb_div").attr('class');
					equal('breadcrumb_div', out, "Views Create Cancel Tested successfully");
					self.viewsEditTest();
				},1500);
			});
		},
		
		viewsEditTest : function() {
			var self = this;
			asyncTest("Views Edit Test", function() {
				$.mockjax({
				   url: commonVariables.webserviceurl+"dashboard/5305c3cebfacb0ca2e1601b8;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":{"id":"5305c3cebfacb0ca2e1601b8","name":"z","dataSourceTypeId":"1234","dataSourceId":"52fdde3cbfac098f07ad123a","dashBoardTypeId":"52e6682124045e150c5e2a8e","ownerId":"admin","queryId":"52fccaa59cc0df1d84fddfec","autorefresh":"false","starttime":"","endtime":"","canShow":true,"properties":{"type":["piechart"],"xaxis":[null],"yaxis":[null]},"colorcodes":null},"responseStatus":200,"responseCode":"phr600001","exception":null,"message":null});
				   }
				});
				
				$.mockjax({
				   url: commonVariables.webserviceurl+"datasourcetype;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"1234","name":"ITUNES","taskletClassName":"com.photon.phresco.app.store.batch.job.ITunesTasklet","url":"http://itunes.apple.com/rss/customerreviews/id=%s/xml"},{"id":"123456","name":"Play Store","taskletClassName":"com.photon.phresco.app.store.batch.job.PlaystoreTasklet","url":"https://play.google.com/store/apps/details?id=%s"},{"id":"12344","name":"Windows","taskletClassName":"com.photon.phresco.app.store.batch.job.WindowsTasklet","url":"http://www.windowsphone.com/en-us/store/app/walgreens/%s/reviews"}],"responseStatus":200,"responseCode":"phr200001","exception":null,"message":null});
				   }
				});
					
				$.mockjax({
				   url: commonVariables.webserviceurl+"datasource;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"52ff66fe84bcc88c427194fd","name":"Walgreens Itunes Application","appId":"335364882","description":"Walgreens Itunes Application","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"5304591c9be59741aadd51c5","name":"Test","appId":"1234","description":"","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"5304903b9be52cfde3a9aeaf","name":"asd","appId":"12312","description":"asd","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"53049a519be54e406428f105","name":"Test","appId":"12345","description":"Description","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},{"id":"53049a519be54e406428f106","name":"Test","appId":"12345","description":"Description","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null}],"responseStatus":200,"responseCode":"phr300001","exception":null,"message":null});
				   }
				});
					
				$.mockjax({
				   url: commonVariables.webserviceurl+"dashboard/queryinfo;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
				   type: "GET",
				   dataType: "json",
				   contentType: "application/json",
				   status: 200,
				   response : function() {
					  this.responseText = JSON.stringify({"response":[{"id":"52fccaa59cc0df1d84fddfec","name":"Pie Bar Chart Itunes","dashBoardTypeId":null,"params":null,"queries":["http://localhost:8983/solr/walgreens/select?q=dataSourceId:52ff66fe84bcc88c427194fd&start=0&rows=0&wt=json&indent=true&facet=true&facet.field=rating"]},{"id":"77fccaa59cc0df1d84fddfec","name":"Line Chart Itunes","dashBoardTypeId":null,"params":null,"queries":["http://localhost:8983/solr/walgreens/select?q=dataSourceId%3A%2252ff66fe84bcc88c427194fd%22&start=0&rows=0&wt=json&indent=true&facet=true&facet.range=createDate&facet.field=rating&f.createDate.facet.range.start=NOW/DAY-10DAYS&f.createDate.facet.range.end=NOW/DAY&f.createDate.facet.range.gap=%2B1DAY"]},{"id":"01fccaa59cc0df1d84fddfec","name":"Line Chart PlayStore","dashBoardTypeId":null,"params":null,"queries":["http://localhost:8983/solr/walgreens/select?q=dataSourceId%3A%2252ff69bb84bcc88c42719504%22&start=0&rows=0&wt=json&indent=true&facet=true&facet.range=createDate&facet.field=rating&f.createDate.facet.range.start=NOW/DAY-10DAYS&f.createDate.facet.range.end=NOW/DAY&f.createDate.facet.range.gap=%2B1DAY"]},{"id":"123ccaa59cc0df1d84fddfec","name":"Pie Bar Chart Windows","dashBoardTypeId":null,"params":null,"queries":["http://localhost:8983/solr/walgreens/select?q=dataSourceId:52ff6bf484bcc88c42719508&start=0&rows=0&wt=json&indent=true&facet=true&facet.field=rating"]},{"id":"672ccaa59cc0df1d84fddfec","name":"Pie Bar Chart PlayStore","dashBoardTypeId":null,"params":null,"queries":["http://localhost:8983/solr/walgreens/select?q=dataSourceId:52ff69bb84bcc88c42719504&start=0&rows=0&wt=json&indent=true&facet=true&facet.field=rating"]},{"id":"234ccaa59cc0df1d84fddfec","name":"Line Chart Windows","dashBoardTypeId":null,"params":null,"queries":["http://localhost:8983/solr/walgreens/select?q=dataSourceId%3A%2252ff6bf484bcc88c42719508%22&start=0&rows=0&wt=json&indent=true&facet=true&facet.range=createDate&facet.field=rating&f.createDate.facet.range.start=NOW/DAY-10DAYS&f.createDate.facet.range.end=NOW/DAY&f.createDate.facet.range.gap=%2B1DAY"]}],"responseStatus":200,"responseCode":"phr600007","exception":null,"message":null});
				   }
				});
				
				$("#example tbody > tr").eq(0).click();
				$("a[name=editDashboard]").click();
				
				setTimeout(function() {
					start();
					var out = $("#widget_name").val();
					equal('SampleWidget', out, "Views Edit Page Tested successfully");
					self.viewsEditNameValidationTest();
				},1500);
			});
		},	
		
		viewsEditNameValidationTest : function() {
			var self = this;
			asyncTest("Views Edit Name Validation Test", function() {				
				$("#widget_name").val('');
				$("#dashboardCreate").click();
				setTimeout(function() {
					start();
					var out = $("#widget_name").attr('class');
					equal('form-control errormessage', out, "Groups Edit Name Validation Tested successfully");
					self.viewsUpdateTest();
				},1500);
			});
		},
		
		viewsUpdateTest : function() {
			
			$.mockjax({
			   url: commonVariables.webserviceurl+"datasource/52ff66fe84bcc88c427194fd;jsessionid=4FACB7C1DC4A30108D803EDCF4443A43",
			   type: "POST",
			   dataType: "json",
			   contentType: "application/json",
			   status: 200,
			   response : function() {
				  this.responseText = JSON.stringify({"response":{"id":"52ff66fe84bcc88c427194fd","name":"Walgreens Itunes Application","appId":"335364882","description":"Walgreens Itunes Application","mobileAPPStoreResponseType":"JSON","mobileAPPStoreTypeId":"1234","taskletClassName":null,"ownerId":null},"responseStatus":200,"responseCode":"phr210002","exception":null,"message":null});
			   }
			});
			
			asyncTest("Views Update Test", function() {
				$("#widget_name").val('z1');		
				$("#dashboardUpdate").click();
				setTimeout(function() {
					start();
					var out = $(".breadcrumb_div").attr('class');
					equal('breadcrumb_div', out, "Views Update Tested successfully");
				},1500);
			});
		}
	};
});	