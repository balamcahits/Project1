define(["framework/widgetWithTemplate", "dataSource/listener/dataSourceListener"], function() {
	Clazz.createPackage("com.components.dataSource.js");

	Clazz.com.components.dataSource.js.dataSource = Clazz.extend(Clazz.WidgetWithTemplate, {
		datasourceListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/dataSource/template/dataSource.tmp",
		configUrl: "components/dataSource/config/config.json",
		name : commonVariables.dataSource,
		datasource : {},
		application : null,
		currentId : null,
		a : null,
		b : null,
		c : null,
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
			require(['lib/all'], function () {
		 //SCHEDULER
		 	$('#datepicker1').datepicker();
			
			$('.radio-custom > input[type=radio]').each(function () {
				var $this = $(this);
				if ($this.data('radio')) return;
				$this.radio($this.data());
			});
			
            /* $('#MyScheduler').on('changed', function(){
                if(window.console && window.console.log){
                    window.console.log('scheduler changed: ', arguments);
                }
            }); */

            $('#MyScheduler').scheduler();
        });
			
		},
		
		preRender: function(whereToRender, renderFunction){
			var self = this;
			
				self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader('', "getdatasources"), function(response) {
					self.datasource.data = response.response;
					renderFunction(self.datasource, whereToRender);
				});   
		},

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		 
		bindUI : function(){
			var self=this, height;
			$("div.week").hide();
			$("div.month").hide();
			$('.hasChild ').find('ul.acc-menu').show().closest('li').addClass('open');		
			require(["lib/data_tables"], function(){
				self.datasourceListener.dataTab();
			});
						
						
		
			$(".app_page").click(function() {
				
				self.currentId = $(this).parents('tr').attr('id');
				self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader(self.currentId, "schedulerget"), function(response) {
					console.info(response);
					if(response.response && response.response.repeatType === 'CRONEXPRESSION') {
						$("#cronexpval").val(response.response.cronValue);
						$('#cronexp').prop('checked', true);
						$(".scheduler-table tbody").find('button').attr('disabled','disabled');
						$(".scheduler-table tbody").find('input.span2').attr('disabled','disabled');
						$(".scheduler-table tbody").find('input.input-mini').attr('disabled','disabled');
						$(".scheduler-table tbody").find('input.input-mini').css('cursor','not-allowed');
						$(".scheduler-table tbody").find('input.span2').css('cursor','not-allowed');
						$(".scheduler-table tbody").find('.btn-group').css('cursor','not-allowed');
					} else {
						$("#cronexpval").val('');
						$('#cronexp').prop('checked', false);
						$("#cronexpval").attr('disabled','disabled');
						$("#cronexpval").css('cursor','not-allowed');
						$(".scheduler-table tbody").find('button').removeAttr('disabled');
						$(".scheduler-table tbody").find('input.span2').removeAttr('disabled');
						$(".scheduler-table tbody").find('input.input-mini').removeAttr('disabled');
						$(".scheduler-table tbody").find('input.input-mini').css('cursor','pointer');
						$(".scheduler-table tbody").find('input.span2').css('cursor','pointer');
						$(".scheduler-table tbody").find('.btn-group').css('cursor','pointer');
					}
					/* $('#MyScheduler').scheduler('value', {
						startDateTime: self.b,
						timeZone: self.c,
						recurrencePattern: self.a
					}); */
				});
			});
			
			$("#scheduleEvery").change(function() {
				if($(this).val() === 'daily') {
					$("div.week").hide();
					$("div.month").hide();
				} else if($(this).val() === 'weekly') {
					$("div.week").show();
					$("div.month").hide();
				} else {
					$("div.week").hide();
					$("div.month").show();
				}
			});
			
			$("#cronexp").unbind('change');
			$("#cronexp").change(function() {
				if($(this).is(':checked')) {
					$("#cronexpval").removeAttr('disabled');
					$("#cronexpval").css('cursor','pointer');
					$(".scheduler-table tbody").find('button').attr('disabled','disabled');
					$(".scheduler-table tbody").find('input.span2').attr('disabled','disabled');
					$(".scheduler-table tbody").find('input.input-mini').attr('disabled','disabled');
					$(".scheduler-table tbody").find('input.input-mini').css('cursor','not-allowed');
					$(".scheduler-table tbody").find('input.span2').css('cursor','not-allowed');
					$(".scheduler-table tbody").find('.btn-group').css('cursor','not-allowed');
				} else {
					$("#cronexpval").attr('disabled','disabled');
					$("#cronexpval").css('cursor','not-allowed');
					$(".scheduler-table tbody").find('button').removeAttr('disabled');
					$(".scheduler-table tbody").find('input.span2').removeAttr('disabled');
					$(".scheduler-table tbody").find('input.input-mini').removeAttr('disabled');
					$(".scheduler-table tbody").find('input.input-mini').css('cursor','pointer');
					$(".scheduler-table tbody").find('input.span2').css('cursor','pointer');
					$(".scheduler-table tbody").find('.btn-group').css('cursor','pointer');
				}		
			});
			
			$('.scheduler-repeat').find('ul:first li').click(function() {
				if($(this).text() === 'Monthly' || $(this).text() === 'Yearly') {
					//$('.scheduler-end').find('.dropdown-label').text('Never');
				}
			});
			
			$("#schedule_app").click(function() {					
				var postData = {};
				var schedulerData = $('#MyScheduler').scheduler('value');
				var recurrencePattern = {}, startDate = {}, timeZone = {};
				recurrencePattern = schedulerData['recurrencePattern'];
				var recPat = recurrencePattern.split(';');
				var repeatType = recPat[0].split('=');
				postData.repeatType = repeatType[1];
				if($('.repeat-interval').find('span:first').text() === 'None (run once)') {
					postData.repeatType = "NONE";					
				} else if(($('.repeat-interval').find('span:first').text() === 'Hourly') || ($('.repeat-interval').find('span:first').text() === 'Daily')) {
					var every = recPat[1].split('=');
					postData.every = every[1];
					if($('.scheduler-end').find('span:first').text() === 'After') {
						var after = recPat[2].split('=');
						postData.after = after[1];
					} else if($('.scheduler-end').find('span:first').text() === 'On date') {
						var expirydate = recPat[2].split('=');
						postData.expiryDate = expirydate[1];
					}
				} else if($('.repeat-interval').find('span:first').text() === 'Weekdays') {
					postData.repeatType = "WEEKDAYS"; 
					postData.days = ["2","3","4","5","6"];
					if($('.scheduler-end').find('span:first').text() === 'After') {
						var after = recPat[3].split('=');
						postData.after = after[1];
					} else if($('.scheduler-end').find('span:first').text() === 'On date') {
						var expirydate = recPat[3].split('=');
						postData.expiryDate = expirydate[1];
					}
				} else if($('.repeat-interval').find('span:first').text() === 'Weekly') {
					var dateCollection = recPat[1].split('=');
					dateCollection = dateCollection[1].split(',');
					for(var i = 0;i< dateCollection.length;i++) {
						if(dateCollection[i] === 'SU')
							dateCollection[i] = 1;
						else if(dateCollection[i] === 'MO')
							dateCollection[i] = 2;	
						else if(dateCollection[i] === 'TU')
							dateCollection[i] = 3;
						else if(dateCollection[i] === 'WE')
							dateCollection[i] = 4;
						else if(dateCollection[i] === 'TH')
							dateCollection[i] = 5;
						else if(dateCollection[i] === 'FR')
							dateCollection[i] = 6;
						else if(dateCollection[i] === 'SA')
							dateCollection[i] = 7;			
					};
					postData.days = dateCollection;
					var every = recPat[2].split('=');
					postData.every = every[1];
					if($('.scheduler-end').find('span:first').text() === 'After') {
						var after = recPat[3].split('=');
						postData.after = after[1];
					} else if($('.scheduler-end').find('span:first').text() === 'On date') {
						var expirydate = recPat[3].split('=');
						postData.expiryDate = expirydate[1];
					}
				} else if($('.repeat-interval').find('span:first').text() === 'Monthly') {					
					var dayOfTheMonth = recPat[2].split('=');
					postData.dayOfTheMonth = dayOfTheMonth[1];
					if($('.scheduler-end').find('span:first').text() === 'On date') {
						var expirydate = recPat[3].split('=');
						postData.expiryDate = expirydate[1];
					}
				} else if($('.repeat-interval').find('span:first').text() === 'Yearly') {
					var dayOfTheMonth = recPat[2].split('=');
					postData.dayOfTheMonth = dayOfTheMonth[1];
					var byMonth = recPat[1].split('=');
					postData.byMonth = byMonth[1];
					if($('.scheduler-end').find('span:first').text() === 'On date') {
						var expirydate = recPat[3].split('=');
						postData.expiryDate = expirydate[1];
					}
				}
				startDate = schedulerData['startDateTime'];
				timeZone = schedulerData['timeZone'];
				self.a = recurrencePattern;
				self.b = startDate;
				self.c = timeZone;
				console.info(schedulerData);				
				//console.info(timeZone);
				postData.dataSourceId = self.currentId;
				postData.status = "Running";				
				postData.startDate = startDate;
				
				if($("#cronexp").is(':checked')) {
					//postData = {};
					postData.repeatType = "CRONEXPRESSION";
					postData.cronValue = $('#cronexpval').val();
				}
				
				$("#schedule_app").attr('data-dismiss','modal');
				self.datasourceListener.ajaxCall(self.datasourceListener.getRequestHeader(postData, "scheduler"), function(response) {
				});
			});
			
			
			
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});	

	return Clazz.com.components.dataSource.js.dataSource;
});