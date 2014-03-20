define(["views/listener/viewsListener"], function() {
	Clazz.createPackage("com.components.viewsCreate.js");

	Clazz.com.components.views.js.viewsCreate = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/views/template/viewsCreate.tmp",
		name : commonVariables.viewsCreate,
		viewsListener : null,
		whereToRender : null,
		validation : null,
		viewsCreate : null,
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
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */		
		
		preRender: function(whereToRender, renderFunction){
			var self = this;
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "datasourcetype"), function(response) {
				if(response !== null) {
					self.datasourcetype.data = response.response;
					self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader(response.response[0].id, "datasource"), function(responseData) {
						if(responseData !== null && responseData.response !== null){
							self.dataSourceInfo = responseData.response;
						}
						renderFunction(self.datasourcetype, whereToRender);	
					});
				} 	
			});   
		},
		
		postRender : function(element) {
			var self=this;
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "query"), function(response) {
				$.each(response.response,function(index,value) {
					$('#query').append('<option value='+value.name+' id='+value.id+'>'+value.name+'</option>');
				});
				var tempVall = $('#query option:first').text();
				$('.queryy').find('.filter-option').text(tempVall);
			});
			$.each(self.dataSourceInfo,function(index,value) {
				$('#dataSourceId').append('<option value='+value.id+'>'+value.name+'</option>');
			});
			var tempVal = $('#dataSourceId option:first').text();
			$('.datsrc').find('.filter-option').text(tempVal);
			
			self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('', "dashboardType"), function(response) {
				$.each(response.response,function(index,value) {
					$('#dashboardType').append('<option value='+value.id+'>'+value.name+'</option>');
				});
				var tempVal2 = $('#dashboardType option:first').text();
				$('.dashtype').find('.filter-option').text(tempVal2);
			});
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
			  
			/* $('ul[name="sortable1"]').append('<li value="sadsadsd"><div class="bar_radio"><input type="checkbox" name="optionsRadiosfd" value="asdsda"></div><div name="envListName" class="bar_name">"fsfsf"</div><div class="colorbar_div"><input class="pick_color colorpick" placeholder="Pick Color" type="text" value="xxsddszv" name="assa"></li>');	 

			$('ul[name="sortable1"]').append('<li value="sadssdadsd"><div class="bar_radio"><input type="checkbox" name="optionsRadiosfd" value="ssdsdd"></div><div name="envListName" class="bar_name">"fsssfsf"</div><div class="colorbar_div"><input class="pick_color colorpick" placeholder="Pick Color" type="text" value="xxsddddszv" name="assasa"></li>');	 */

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
			$("#dataSourceType").unbind('change');
			$("#dataSourceType").change(function() {
				var typeId = $('#dataSourceType option:selected').attr('id');
				self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader(typeId, "datasource"), function(responseData) {
					if(responseData !== null && responseData.response !== null){
						$('#dataSourceId').empty();
						$('.datsrc').find('.filter-option').text('');
						$.each(responseData.response,function(index,value) {
							$('#dataSourceId').append('<option value='+value.id+'>'+value.name+'</option>');
						});
						var tempVal = $('#dataSourceId option:first').text();
						$('.datsrc').find('.filter-option').text(tempVal);
					}
				});
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
			
			/* $("#execute_query").click(function() {
				self.viewsListener.ajaxCall(self.viewsListener.getRequestHeader('52f4871c24045e174c7a20a4', "queryval"), function(response) {
				});
			}); */
			var flag = 0;
			$("#dashboardCreate").click(function() {
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
					postData.dataSourceTypeId = $('#dataSourceType option:selected').attr('id');
					postData.dashBoardTypeId = $('#dashboardType').val();
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
			
			$("#cancel_user").click(function() {
				commonVariables.navListener.getMyObj('views', function(retVal) {
					self.views = retVal;							
					Clazz.navigationController.push(self.views, commonVariables.animation);
				});
			});
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
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
	});

	return Clazz.com.components.views.js.viewsCreate;
});