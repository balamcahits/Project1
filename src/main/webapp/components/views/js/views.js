define(["views/listener/viewsListener"], function() {
	Clazz.createPackage("com.components.views.js");

	Clazz.com.components.views.js.views = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/views/template/views.tmp",
		name : commonVariables.views,
		viewsListener : null,
		whereToRender : null,
		datasourceName : [],
		dataSrcTypeArr : [],
		autoRefresharr : [],
						
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.viewsListener === null ) {
				self.viewsListener = new Clazz.com.components.views.js.listener.viewsListener();
			}
			self.registerEvents(self.viewsListener);
		},
		
		registerEvents : function(viewsListener) {
			var self = this;
		},
		
		preRender: function(whereToRender, renderFunction){
			var self = this, dashboardData = {};
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "getAllDashboard"), function(response) {
				if(response.response !== null) {
					$.each(response.response, function(index, dashboardObject){
						self.autoRefresharr.push(dashboardObject.autorefresh);
						self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader(dashboardObject.dataSourceId, "getDatasourcename"), function(datasourcename) {
							dashboardData.dashboardlist = response.response;
							if(datasourcename.response !== null){
								self.datasourceName.push({"id":datasourcename.response.id, "sourcename": datasourcename.response.name});
							} else {
								self.datasourceName.push({"id":datasourcename.response.id, "sourcename": null});						
							}	
						});
					});
				}	
				renderFunction(dashboardData, whereToRender);
			});
		},
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */		
		
		postRender : function(element) {
			var self=this;
			$.each(self.datasourceName, function(index, datasourceObj){
				$("#example > tbody > tr").each(function(index, value){
				var datasourceId = $(this).find('td:nth-child(3)').attr('class');
					if(datasourceObj.id === datasourceId){
						$(this).find('td:nth-child(3)').text(datasourceObj.sourcename);
					}
				});
			});			
			
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "datasourcetype"), function(response) {
				
					$.each(response.response,function(i,v) {
						if(v.name === 'Windows') {
							self.dataSrcTypeArr[0] = v.id;
						} else if(v.name === 'ITUNES') {
							self.dataSrcTypeArr[1] = v.id;
						} else if(v.name === 'Play Store') {
							self.dataSrcTypeArr[2] = v.id;
						}
					});
				$("#example > tbody > tr").find('td:nth-child(2)').each(function() {
					if($(this).text() === self.dataSrcTypeArr[0])
						$(this).text('Windows');
					else if($(this).text() === self.dataSrcTypeArr[1])
						$(this).text('ITUNES');
					else if($(this).text() === self.dataSrcTypeArr[2])
						$(this).text('Play Store');	
				});
			});
			var counter = 0 ;
			$("#example > tbody > tr").find('td:last').each(function() {
					$(this).text(self.autoRefresharr[counter]);
					counter++;
				});
			
		},
		
		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this;
			
			$('.hasChild ').find('ul.acc-menu').show().closest('li').addClass('open');		
			require(["lib/data_tables"], function(){
				self.viewsListener.dataTab();
			});
						
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
		
	});

	return Clazz.com.components.views.js.views;
});