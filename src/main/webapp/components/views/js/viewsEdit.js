define(["views/listener/viewsListener"], function() {
	Clazz.createPackage("com.components.views.js");
	Clazz.com.components.views.js.viewsEdit = Clazz.extend(Clazz.WidgetWithTemplate, {
	
		templateUrl: commonVariables.contexturl + "components/views/template/viewsEdit.tmp",
		name : commonVariables.viewsEdit,
		viewsListener : null,
		datasourcetype : {},
		dataSourceInfo : {},
		views : null,
		
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
			var self = this;
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "editDashboard"), function(response) {
				self.datasourcetype.dashboardData = response.response;
				self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "datasourcetype"), function(response) {
					self.datasourcetype.data = response.response;
					self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader(response.response[0].id, "datasource"), function(responseData) {
						self.dataSourceInfo = responseData.response;
						renderFunction(self.datasourcetype, whereToRender);	
					});
				});
			});   
		}, 
		
		postRender : function(element) {
			var self = this;
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "query"), function(response) {
				$.each(response.response,function(index,value) {
					$('#query').append('<option value='+value.name+' id='+value.id+'>'+value.name+'</option>');
				});
				var tempVall = $('#query option:first').text();
				$('.queryy').find('.filter-option').text(tempVall);
			});
			
			$.each(self.dataSourceInfo, function(index,value) {
				$('#dataSourceId').append('<option value='+value.id+'>'+value.name+'</option>');
			});
			
			$.each($('#dataSourceId > option'), function(index, value){
				var datasourceId = $(this).attr('value');
				if(self.datasourcetype.dashboardData.dataSourceId === datasourceId){
					$(this).attr('selected', 'selected');
					$('#dataSourceId').selectpicker('refresh');
				}
			});
			
			$('#widgetType > option').each(function(index, value){
				var widgetType = $(this).attr('value');
				if(self.datasourcetype.dashboardData.properties.type[0] === widgetType){
					$(this).attr('selected', 'selected');
					$('#widgetType').selectpicker('refresh');
				}
			});
			
		},
		
		optionsshowhide : function(tr_toshow) {
			var self = this;
			$("#line-chart-container").hide();
			$("#pie-chart-container").hide();
			$("#bar-chart-container").hide();
			if(tr_toshow !== '' && tr_toshow !== 'table') {
				//if($("#"+tr_toshow).find('select').children().length) {
					$("#"+tr_toshow).show();
				//}	
				//$("img[name='execute_query']").show();
				//$("#viewsCreate").attr('disabled','disabled');
			} else {
					//$("img[name='execute_query']").hide();
					//$("#viewsCreate").removeAttr('disabled');
			}	
		 },
		
		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, height;
			$('.hasChild ').find('ul.acc-menu').show().closest('li').addClass('open');		
			
			tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
			$('.create_table_div').css('height',tabheight + 'px'); 
			
			$(window).resize(function() {
				tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
				$('.create_table_div').css('height',tabheight + 'px'); 
			});	
			
			$("#line-chart-container").hide();
			$("#pie-chart-container").hide();
			$("#bar-chart-container").hide();
			$("#timeoutval").hide();
			
			$('#datetimepicker1').datetimepicker({
			});
				  
			$('#datetimepicker2').datetimepicker({
			});
			
			$('.selectpicker').selectpicker();
			
			$('#colorpalette1').colorPalette()
			  .on('selectColor', function(e) {
				$('#selectedcolor1').val(e.color);
			  });
			
			$('.connected').sortable({
				connectWith: '.connected'
			});  
		
			$("#widgetType").unbind('change');
			$("#widgetType").change(function() {
				var typeofchart = $(this).children('option:selected').val();
				if(typeofchart === 'table') {
					self.optionsshowhide('');
				} else if(typeofchart === 'linechart') {
					self.optionsshowhide('line-chart-container');
				} else if(typeofchart === 'piechart') {
					self.optionsshowhide('pie-chart-container');
				} else if(typeofchart === 'barchart') {
					self.optionsshowhide('bar-chart-container');
				}
			});
			
			$("#timeout").unbind('change');
			$("#timeout").change(function() {
				if($(this).is(':checked')) {
					$("#timeoutval").show();
				} else {
					$("#timeoutval").hide();
				}		
			});
			
			$("#showhideDashboard").unbind('change');
			$("#showhideDashboard").change(function() {
				if($(this).is(':checked')) {
					$(this).val(true);
				} else {
					$(this).val(false);
				}		
			});
			
			$("#timeoutval").bind('keypress',function(e) {
				if((e.which >= 48 && e.which <= 57) || (e.which === 8)){
					return true;
				} else {
					e.preventDefault();
				}
			});
			
			var flag = 0;
			$("#dashboardUpdate").click(function() {
				var name = $("#widget_name");
				if(name.val() === '') {
					name.addClass('errormessage');
					name.focus();
					name.attr('placeholder','Enter Widget Name');
					name.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if($("#timeout").is(":checked")) {
					if($("#timeoutval").val() === '') {
						$("#timeoutval").addClass('errormessage');
						$("#timeoutval").focus();
						$("#timeoutval").attr('placeholder','Enter Refresh Interval value');
						$("#timeoutval").bind('keypress', function() {
							$(this).removeClass("errormessage");
							$(this).removeAttr("placeholder");
						});
					} else {
						flag = 1;
					}
				} else {
					flag = 1;
				}	
				
				if(flag ===1) {
					var postData = {};
					postData.name = name.val();		
					postData.id = commonVariables.dashboardId;
					postData.dataSourceTypeId = $('#dataSourceType option:selected').attr('id');				
					postData.dataSourceId = $('#dataSourceId').val();					
					postData.ownerId = "admin";				
					postData.queryId = $('#query option:selected').attr('id');
					postData.starttime = $("#fromTime").val();
					postData.endtime = $("#toTime").val();
					postData.properties = {};
					postData.properties.type = [];
					postData.properties.type.push($('#widgetType').val());	
					postData.canShow = $("#showhideDashboard").val();
					if($("#timeout").is(":checked"))
						postData.autorefresh = $("#timeoutval").val();
					else 
						postData.autorefresh = "false";
					 self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader(postData, "create"), function(response) {
						if(response) {
							commonVariables.navListener.getMyObj('views', function(retVal) {
								var viewsData = retVal;							
								Clazz.navigationController.push(viewsData, commonVariables.animation);
							});
						}
					});
				}
			});
			
			$("#cancel_create").click(function() {
				commonVariables.navListener.getMyObj('views', function(retVal) {
					self.views = retVal;							
					Clazz.navigationController.push(self.views, commonVariables.animation);
				});
			});
			
		}
	});
	
	return Clazz.com.components.views.js.viewsEdit;
});