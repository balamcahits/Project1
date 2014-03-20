define([], function() {

	Clazz.createPackage("com.components.ratingTrend.js.listener");

	Clazz.com.components.ratingTrend.js.listener.ratingTrendListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;
		},
		
		
		deletewidget : function(obj) {
			$("#alertify-ok").click(function() {
				obj.parents('.dashboard_view').remove();
			});
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
			var authToken = commonVariables.api.localVal.getSession("jsessionid");
			if(type === "datasourcetype") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "datasourcetype;jsessionid="+authToken;
			} else if(type === "datasource") {
				header.requestMethod = "GET";
				header.webserviceurl =  commonVariables.webserviceurl + "datasource;jsessionid="+authToken+"?dashBoardTypeId="+commonVariables.ratingTrendId+"dataSourceTypeId="+projectRequestBody;
			} else if(type === "query") {
				header.requestMethod = "POST";
				header.webserviceurl =  commonVariables.webserviceurl + 'query;jsessionid='+authToken+'?queryId='+projectRequestBody;
			} else if(type === "getdashboard") {
				header.requestMethod = "GET";
				header.webserviceurl =  commonVariables.webserviceurl + "dashboard;jsessionid="+authToken+"?dashBoardTypeId="+commonVariables.ratingTrendId+"&dataSourceTypeId="+projectRequestBody;
			}
			return header;
		},
		
		clickFunctions : function() {
			var self = this, count = $('.dashboard_view').length,dat, data, flag=0;
			
			if(count == 1){
				$('.dashboard_view').css('width','98%');
			} else if (count >= 2) {
				$('.dashboard_view').css('width','48%');
			}
			
			if($(window).width() < 760) {
				$('.dashboard_view').css('width', '93%');
			}
			
			$('.enlarge_btn').unbind('click');
			$('.enlarge_btn').click(function(){
				var parent=$(this).closest('.dashboard_view');
				if(!flag) {
					$('.dashboard_view').hide();	 				 
					parent.show();
					parent.css('width', '98%');
					var ht = $(window).height() - 200;
					var chart_ht = ht - 70;
					parent.css('height', ht);
					parent.find('.cssforchart').removeClass('cssforchart');							
					parent.find('.demo-placeholder').parent().css('height', chart_ht + 'px');
					flag = 1;
				} else {
					$('.dashboard_view').show();
					$('.dashboard_view').css('height','290px');
					var count = $('.dashboard_view').length;
					parent.find('.demo-placeholder').parent().addClass('cssforchart');
					if(count == 1){
					$('.dashboard_view').css('width','98%');
					} else if (count >=2) {
					$('.dashboard_view').css('width','48%');
					}
					flag = 0;
				}
			});
			
			require(["lib/alertify.min"],function(alertify) {
				$(".bootstrap").on( 'click', function () {					
					alertify.set({
						labels : {
							ok     : "OK",
							cancel : "Cancel"
						},
						delay : 1800,
						buttonReverse : false,
						buttonFocus   : "ok"
					});
					
					
					
					$("#toggleCSS").attr("href", "themes/css/style.css");
					alertify.prompt("Are you sure you want to delete This?", function (e) {
						if (e) {
							alertify.success("Delete Successful");
						} else {
							alertify.error("Delete Cancelled");
						}
					});
					
					$('.alertify').hide();
					var leftpos = $(this).position().left + 58;
					var toppos = ($(this).position().top  > 120 ) ? $(this).position().top - 120 : 0;
					$('.alertify').css('top',toppos);
					$('.alertify').css('left',leftpos);
					$('.alertify').show();
					
					self.deletewidget($(this));
					return false;
				});
			});	
		}
		
	});

	return Clazz.com.components.ratingTrend.js.listener.ratingTrendListener;
});