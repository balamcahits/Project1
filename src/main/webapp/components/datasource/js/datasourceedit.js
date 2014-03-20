define(["framework/widgetWithTemplate", "dataSource/listener/dataSourceListener"], function() {
	Clazz.createPackage("com.components.dataSource.js");

	Clazz.com.components.dataSource.js.dataSourceEdit = Clazz.extend(Clazz.WidgetWithTemplate, {
		datasourceListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/dataSource/template/dataSourceEdit.tmp",
		configUrl: "components/dataSource/config/config.json",
		name : commonVariables.dataSource,
		datasource : null,
		postBody : {},
		editDataStore : null,
		StoreName : null,
		dataSourceData : null,

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
			$("#edittype").val(self.editDataStore.mobileAPPStoreResponseType);
			if(self.editDataStore.mobileAPPStoreResponseType === "JSON")
				$("#edittype").append('<option value="json">JSON</option><option value="xml">XML</option>');
			else
				$("#edittype").append('<option value="xml">XML</option><option value="json">JSON</option>');
			$("#storetype option:selected").text(self.StoreName);
			$.each(self.dataSourceData,function(index,value) {
				if(self.StoreName !== value.name )
					$("#storetype").append('<option dynId='+value.id+'>'+value.name+'</option>');
			});
		},
		
		preRender: function(whereToRender, renderFunction){
			var self = this, editData = {};
				self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader('', "datasourcetype"), function(response) {
					self.dataSourceData = response.response;
					self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader('', "editdatasource"), function(response2) {
						$.each(response.response,function(index,value) {
							if(value.id === response2.response.mobileAPPStoreTypeId) {
								self.StoreName = value.name;
							}
						});
						editData.data = response2.response;
						self.editDataStore = response2.response;
						renderFunction(editData, whereToRender);
					});   
				});	
		}, 
		

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, tabheight;
			
			
			$("#cancel_update").click(function() {
				commonVariables.navListener.getMyObj('data_source', function(retVal) {
						self.datasource = retVal;							
						Clazz.navigationController.push(self.datasource, commonVariables.animation);
					});
			});
				
			
			$("#datasrcupdate").click(function() {
				var obj = $("#edit_name");
				var descobj = $("#editdesc");
				var responseType = $("#edittype option:selected").text();
				var appId = $("#edit_appId");
				var storeTypeId = $("#storetype option:selected").attr('dynId');
				if(obj.val() === '') {
					obj.addClass('errormessage');
					obj.focus();
					obj.attr('placeholder','Enter Name');
					obj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if(descobj.val() === '') {
					descobj.addClass('errormessage');
					descobj.focus();
					descobj.attr('placeholder','Enter Description');
					descobj.bind('keypress', function() {
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
						self.postBody.id = $("#storetype").attr('dynId');
						//self.postBody.appInfos =  null;
						self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader(self.postBody, "createdatasource"), function(response) {
							commonVariables.navListener.getMyObj('data_source', function(retVal) {
								self.datasource = retVal;							
								Clazz.navigationController.push(self.datasource, commonVariables.animation);
							});
						});	
				}		
			});	
			
			
			tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
			$('.create_table_div').css('height',tabheight + 'px'); 
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});	

	return Clazz.com.components.dataSource.js.dataSourceEdit;
});