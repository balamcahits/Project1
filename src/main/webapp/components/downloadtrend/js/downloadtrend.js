define(["downloadTrend/listener/downloadTrendListener"], function() {
	Clazz.createPackage("com.components.downloadTrend.js");

	Clazz.com.components.downloadTrend.js.downloadTrend = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/downloadTrend/template/downloadTrend.tmp",
		name : commonVariables.downloadTrend,
		downloadTrendListener : null,
		whereToRender : null,
		validation : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.downloadTrendListener === null ) {
				self.downloadTrendListener = new Clazz.com.components.downloadTrend.js.listener.downloadTrendListener();
			}
		},
		
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */
		
		postRender : function(element) {
			$('#downloadTrend').addClass('act');
			var self = this;
			if(!commonVariables.animation){
				$("#placeholder1,#placeholder2,#placeholder3,#placeholder4").css('height','200px');
				$("#placeholder1,#placeholder2,#placeholder3,#placeholder4").css('width','200px');
				
			}
			self.downloadTrendListener.ajaxCall(self.downloadTrendListener.getRequestHeader('', "datasourcetype"), function(response) {
				commonVariables.continueloading = true;
				if(response) {
					$.each(response.response,function(i,v) {
						if(v.name === 'Windows') {
							$("#myTab li").eq(2).attr('id',v.id);
						} else if(v.name === 'ITUNES') {
							$("#myTab li").eq(0).attr('id',v.id);
						} else if(v.name === 'Play Store') {
							$("#myTab li").eq(1).attr('id',v.id);
						}
					});	
					self.downloadTrendListener.ajaxCall(self.downloadTrendListener.getRequestHeader($("#myTab li").eq(0).attr('id'), "getdashboard"), function(responseData) {
						
						if(!responseData.response || responseData.response.length <= 0){
							commonVariables.continueloading = false;
						}
					
						$.each(responseData.response,function(index,value) {							
							var view = '<div class="dashboard_view" style="height:290px;"><div class="dashboard_title"><div class="widget_name">'+value.name+'</div><div class="widget_btn"><a data-original-title="Maximize" class="tooltips" data-toggle="tooltip" data-placement="bottom" title=""><img src="themes/images/widget_enlarge_icon.png" class="enlarge_btn"></a><a data-original-title="Close" class="tooltips bootstrap" data-toggle="tooltip" data-placement="bottom" title="" href="#"><img src="themes/images/widget_delete_icon.png"></a></div></div><div class="dashboard_body"><div class="cssforchart"><div id="placeholder_'+value.id+'" class="demo-placeholder"></div></div></div></div>';
							$("#ios").append(view);
							self.constructWidget(responseData,index,value);							
						});
					});
				}
			});
		},
		
		constructWidget : function(responseData,index,value) {
			var self = this;
			if (self.charts === null || self.charts === undefined) {
				commonVariables.navListener.getMyObj(commonVariables.charts, function(chartsListener){
					/* var lineChartData = [[1,12],[2,2],[3,2],[4,2],[5,2],[6,2],[7,9],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2]];
					chartsListener.lineChart($("#placeholder4"), lineChartData, 'orange');
					*/
					self.downloadTrendListener.ajaxCall(self.downloadTrendListener.getRequestHeader(value.queryId, "query"), function(response) {
						if(response){
							if(value.properties.type.toString() === 'piechart') {
								chartsListener.constructPieInfo(response,value);
								if(value.autorefresh !== 'false') {
									self.autoRefresh(response,chartsListener,value,'pie');											
								}
							}	
							else if(value.properties.type.toString() === 'linechart')  {
								chartsListener.constructLineInfo(response,value);
								if(value.autorefresh !== 'false') {
									self.autoRefresh(response,chartsListener,value,'line');
								}
							} else if(value.properties.type.toString() === 'barchart')  {
								chartsListener.constructBarInfo(response,value);
								if(value.autorefresh !== 'false') {
									self.autoRefresh(response,chartsListener,value,'bar');
								}
							}	
						}
						
						if(responseData.response.length === 1) {
							commonVariables.continueloading = false;
						}	
						
						if(index == (responseData.response.length - 2)){
							console.info('zz');
							commonVariables.continueloading = false;
						}
						
						if((index + 1) == responseData.response.length){
							self.downloadTrendListener.clickFunctions();
						}
					});																								
					$(".tooltips").tooltip();
				});
			}
		},
		
		
		autoRefresh : function(response,chartsListener,value,type) {
			var self = this;
			 var regId = setInterval(function(){
				self.downloadTrendListener.ajaxCall(self.downloadTrendListener.getRequestHeader(value.queryId, "query"), function(response) {
					if(type === 'pie')
						chartsListener.constructPieInfo(response,value);
					else if(type === 'line')
						chartsListener.constructLineInfo(response,value);
					else if(type === 'bar')
						chartsListener.constructBarInfo(response,value);
				});					
			},value.autorefresh);
			commonVariables.clearInterval[regId] = value.id;		
		},



		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function() {
			var self = this;
			
			$(".tooltips").tooltip();
			var dat,data;
			
			var tabheight =  $(window).height() - ($(".page_heading").height() + $(".header_section").height());
			$('.tab-content').css('height',tabheight + 'px');  

			$("#myTab li").unbind('click');
			$("#myTab li").click(function() {
				var obj = this;
				if($(obj).find('a').text() === 'ANDROID') {
					$("#android").find('.dashboard_view').each(function() {
						$(this).remove();
					});	
				} else if($(obj).find('a').text() === 'WINDOWS') {
					$("#windows").find('.dashboard_view').each(function() {
						$(this).remove();
					});
				} else if($(obj).find('a').text() === 'IOS') {
					$("#ios").find('.dashboard_view').each(function() {
						$(this).remove();
					});
				}
				self.downloadTrendListener.ajaxCall(self.downloadTrendListener.getRequestHeader($(obj).attr('id'), "getdashboard"), function(responseData) {
						
						if(!responseData.response || responseData.response.length <= 0){
							commonVariables.continueloading = false;
						}
					
						$.each(responseData.response,function(index,value) {							
							var view = '<div class="dashboard_view" style="height:290px;"><div class="dashboard_title"><div class="widget_name">'+value.name+'</div><div class="widget_btn"><a data-original-title="Maximize" class="tooltips" data-toggle="tooltip" data-placement="bottom" title=""><img src="themes/images/widget_enlarge_icon.png" class="enlarge_btn"></a><a data-original-title="Close" class="tooltips bootstrap" data-toggle="tooltip" data-placement="bottom" title="" href="#"><img src="themes/images/widget_delete_icon.png"></a></div></div><div class="dashboard_body"><div class="cssforchart"><div id="placeholder_'+value.id+'" class="demo-placeholder"></div></div></div></div>';
							if($(obj).find('a').text() === 'ANDROID') {								
								$("#android").append(view);
							} else if($(obj).find('a').text() === 'WINDOWS') {							
								$("#windows").append(view);
							} else if($(obj).find('a').text() === 'IOS') {								
								$("#ios").append(view);	
							}	
							self.constructWidget(responseData,index,value);							
						});
					});
			});
			
			$('#reportrange').daterangepicker(
                     {
                        startDate: moment().subtract('days', 29),
                        endDate: moment(),
                        minDate: '01/01/2012',
                        maxDate: '12/31/2014',
                        dateLimit: { days: 60 },
                        showDropdowns: true,
                        showWeekNumbers: true,
                        timePicker: false,
                        timePickerIncrement: 1,
                        timePicker12Hour: true,
                        ranges: {
                           'Today': [moment(), moment()],
                           'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                           'Last 7 Days': [moment().subtract('days', 6), moment()],
                           'Last 30 Days': [moment().subtract('days', 29), moment()],
                           'This Month': [moment().startOf('month'), moment().endOf('month')],
                           'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                        },
                        opens: 'left',
                        buttonClasses: ['btn btn-default'],
                        applyClass: 'btn_style app_margin',
                        cancelClass: 'btn-small btn_style',
                        format: 'MM/DD/YYYY',
                        separator: ' to ',
                        locale: {
                            applyLabel: 'Apply',
                            fromLabel: 'From',
                            toLabel: 'To',
                            customRangeLabel: 'Custom Range',
                            daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat'],
                            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            firstDay: 1
                        }
                     },
                     function(start, end) {
                      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                     }
                  );
                  //Set the initial state of the picker label
                  $('#reportrange span').html('Select Date to View');
			
			Clazz.navigationController.mainContainer = commonVariables.contentPlaceholder;
		}
	});

	return Clazz.com.components.downloadTrend.js.downloadTrend;
});