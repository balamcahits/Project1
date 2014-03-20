define([], function() {

	Clazz.createPackage("com.components.userProfile.js.listener");

	Clazz.com.components.userProfile.js.listener.userProfileListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		userProfilecreate : null,
		userProfileedit : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
		},
		
		ajaxCall : function(header, callback) {
			try {
				commonVariables.api.ajaxRequest(header,
					function(response) {
						callback(response);

					},

					function(textStatus) {
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
			
			if(type === "getuserProfile"){
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "userProfile";
			}
			
			if(type === "create"){
				header.requestMethod = "POST";
				header.requestPostBody = JSON.stringify(projectRequestBody);
				header.webserviceurl = commonVariables.webserviceurl + "userProfile";
			}
			
			if(type === "edit"){
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "userProfile/" + commonVariables.roleId;
			}
			return header;
		},
				
		fnGetSelected : function( oTableLocal ) {
			return oTableLocal.$('tr.row_selected');
		}

	});

	return Clazz.com.components.userProfile.js.listener.userProfileListener;
});