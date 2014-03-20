define(["framework/widgetWithTemplate", "dataSource/listener/dataSourceListener"], function() {
	Clazz.createPackage("com.components.dataSource.js");

	Clazz.com.components.dataSource.js.dataSourceCreate = Clazz.extend(Clazz.WidgetWithTemplate, {
		datasourceListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/dataSource/template/dataSourceCreate.tmp",
		configUrl: "components/dataSource/config/config.json",
		name : commonVariables.dataSource,
		datasource : null,
		datasourcetype : {},
		postBody : {},

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.datasourceListener === null){
				self.datasourceListener = new Clazz.com.components.dataSource.js.listener.DatasourceListener();
			}	
		},

		postRender : function(element) {
			var self=this;
		},
		
		preRender: function(whereToRender, renderFunction){
			var self = this;
			self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader('', "datasourcetype"), function(response) {
				self.datasourcetype.data = response.response;
				renderFunction(self.datasourcetype, whereToRender);
			});   
		},

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, tabheight;
			
			tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
			$('.create_table_div').css('height',tabheight + 'px'); 
			
			$(window).resize(function() {
				tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
				$('.create_table_div').css('height',tabheight + 'px'); 
			});	
			
			$("#cancel_create").click(function() {
				commonVariables.navListener.getMyObj('data_source', function(retVal) {
						self.datasource = retVal;							
						Clazz.navigationController.push(self.datasource, commonVariables.animation);
					});
			});				
			
			$("#datasrccreate").click(function() {
				var obj = $("#datasrcname");
				var descobj = $("#datasrcdesc");
				var responseType = $("#datasrctype option:selected").text();
				var appId = $("#appId");
				var storeTypeId = $("#storetype option:selected").attr('id');
				if(obj.val() === '') {
					obj.addClass('errormessage');
					obj.focus();
					obj.attr('placeholder','Enter Name');
					obj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if(appId.val() === '') {
					appId.addClass('errormessage');
					appId.focus();
					appId.attr('placeholder','Enter App Id');
					appId.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else {
						self.postBody = {};
						self.postBody.name =  obj.val();
						self.postBody.description =  descobj.val();
						self.postBody.mobileAPPStoreResponseType =  responseType;
						self.postBody.mobileAPPStoreTypeId = storeTypeId;
						self.postBody.appId =  appId.val();
						//self.postBody.appInfos =  null;
						self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader(self.postBody, "createdatasource"), function(response) {
							commonVariables.navListener.getMyObj('data_source', function(retVal) {
								self.datasource = retVal;							
								Clazz.navigationController.push(self.datasource, commonVariables.animation);
							});
						});	
				}	
			});	
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});	

	return Clazz.com.components.dataSource.js.dataSourceCreate;
});