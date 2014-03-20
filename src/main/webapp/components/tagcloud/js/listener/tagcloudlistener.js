define([], function() {

	Clazz.createPackage("com.components.tagCloud.js.listener");

	Clazz.com.components.tagCloud.js.listener.tagCloudListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;
		},
		
		
		ajaxCall : function(header, callback) {
			try {
				commonVariables.api.ajaxRequest(header,
					function(response) {
						callback(response);

					},

					function(textStatus) {
						callback(textStatus);
					}
				);
			} catch(exception) {
			}
		},
		
		getRequestHeader : function(projectRequestBody, type, descid) {
			var header;
			header = {
				dataType: "json",
				contentType:"application/json"
			};
			
			if(type === "datasourcetype") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "datasourcetype";
			} else if(type === "datasource") {
				header.requestMethod = "GET";
				header.webserviceurl =  commonVariables.webserviceurl + "datasource?dashBoardTypeId="+commonVariables.tagCloudId+"dataSourceTypeId="+projectRequestBody;
			} else if(type === "query") {
				header.requestMethod = "POST";
				header.webserviceurl =  commonVariables.webserviceurl + 'query?queryId='+projectRequestBody;
			} else if(type === "getdashboard") {
				header.requestMethod = "GET";
				header.webserviceurl =  commonVariables.webserviceurl + "dashboard?dashBoardTypeId="+commonVariables.tagCloudId+"&dataSourceTypeId="+projectRequestBody;
			}
			return header;
		}
		
	});

	return Clazz.com.components.tagCloud.js.listener.tagCloudListener;
});