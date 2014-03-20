define([], function() {

	Clazz.createPackage("com.components.views.js.listener");

	Clazz.com.components.views.js.listener.viewsListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		viewscreate : null,
		viewsedit : null,
		viewsRequestBody : null,
		
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
		
		getRequestHeader : function(projectRequestBody, type) {
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
				header.webserviceurl =  commonVariables.webserviceurl + "datasource;jsessionid="+authToken+"?dataSourceTypeId="+projectRequestBody;
			} else if(type === "query") {
				header.requestMethod = "GET";
				header.webserviceurl =  commonVariables.webserviceurl + "dashboard/queryinfo;jsessionid="+authToken;
			} else if(type === "create") {
				header.requestMethod = "POST";
				header.requestPostBody = JSON.stringify(projectRequestBody);
				header.webserviceurl =  commonVariables.webserviceurl + "dashboard;jsessionid="+authToken;
			} else if(type === "queryval") {
				header.requestMethod = "POST";
				header.webserviceurl = commonVariables.webserviceurl + 'query;jsessionid='+authToken+'?queryId='+projectRequestBody;
			} else if(type === "getAllDashboard") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "dashboard;jsessionid="+authToken;
			} else if(type === "getDatasourcename") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "datasource/" + projectRequestBody+";jsessionid="+authToken;
			} else if(type === "dashboardType") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "dashboard/dashboardtype;jsessionid="+authToken;
			} else if(type === "editDashboard") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "dashboard/" + commonVariables.dashboardId+";jsessionid="+authToken;
			} else if(type === "delete"){
				header.requestMethod = "DELETE";
				header.webserviceurl = commonVariables.webserviceurl + "dashboard/" + commonVariables.dashboardId+";jsessionid="+authToken;;
			}
			return header;
		},
		
		append_adddel : function() {
			var self = this;
			setTimeout(function() {
				var temp = $('#example_length');
				temp.append('<div class="DTTT btn-group"><a id="dashboardcreate" data-original-title="Create" class="tooltips btn_style create_datatable_btn" data-toggle="tooltip" data-placement="bottom" title=""></a><a data-original-title="Edit" class="tooltips btn_style edit_icon_btn" data-toggle="tooltip" data-placement="bottom" title="" name="editDashboard" disabled></a><a data-original-title="Delete" href="#" name="deleteDashboard" id="bootstrap" class="tooltips btn_style delete_icon_btn" data-toggle="tooltip" data-placement="bottom" title="" disabled></a></div>');
				$('#example').wrap('<div class="table-responsive"></div>');
				self.bootstrapclick();
				$(".tooltips").tooltip();
				if($(window).width() < 760) {
					var table_height_res = $(window).height() - ( $('.header_section').height() + $('.breadcrumb_div').height() + $('#example_wrapper').find('.row').eq(0).height() + $('#example_wrapper').find('.row').eq(1).height()) - 40;
					$('.table-responsive').css('height',table_height_res);
				} 
				
			},500);				
		},
		
		dataTab : function() {
			var self = this, oTable;
			
			$("#example tbody tr").click( function( e ) {
				if ( $(this).hasClass('row_selected') ) {
					$(this).removeClass('row_selected');
					$("a[name=editDashboard]").attr('disabled', 'true');
					$("a[name=deleteDashboard]").attr('disabled', 'true');
				}
				else {
					oTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					$("a[name=editDashboard]").attr('disabled', 'false');
					$("a[name=deleteDashboard]").attr('disabled', 'false');
				}
				if ($(this).hasClass('row_selected')){
					$('.DTTT').children('a').removeAttr('disabled')
				}
			});
				
			/* Add a click handler for the delete row */
			$('#delete').click( function() {
				var anSelected = self.fnGetSelected( oTable );
				if ( anSelected.length !== 0 ) {
					oTable.fnDeleteRow( anSelected[0] );
				}
			});
			self.append_adddel();
			oTable = $('#example').dataTable( {
				"sDom" : "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "full_numbers"
			} );
			
			$("#example_paginate").addClass('pagination');
		},
		
		bootstrapclick: function() {
			var self = this;
			require(["lib/alertify.min"],function(alertify) {
				$("#bootstrap").on( 'click', function () {
					alertify.set({
						labels : {
							ok     : "OK",
							cancel : "Cancel"
						},
						delay : 2000,
						buttonReverse : false,
						buttonFocus   : "ok"
					});

					// Getting the name of the element to delete
					var target, targetName;						
					$("#example").find('tbody').children('tr').each(function() {
						target = $(this);
						 if(target.hasClass('row_selected')) {
							targetName = target.find('td').eq(0).text();
						}
					});
					
					$("#toggleCSS").attr("href", "../themes/css/style.css");
					alertify.prompt("Are you sure you want to delete " + targetName + "?", function (e) {
						if (e) {
							commonVariables.dashboardId = $("#example").find('tr.row_selected').attr('dashboardId');
							self.ajaxCall(self.getRequestHeader('', "delete"), function(response) {
								commonVariables.navListener.getMyObj('views', function(retVal) {
									var viewsData = retVal;							
									Clazz.navigationController.push(viewsData, commonVariables.animation);
								});
							});
							alertify.success("Delete Successful");
						} else {
							alertify.error("Delete Cancelled");
						}
					});
					return false;
				});
			
				$("#bootstrap").click(function() {
					$("#alertify-ok").click(function() {
						$("#example").find('tbody').children('tr').each(function() {
							 if($(this).hasClass('row_selected')) {
								$(this).remove();
							}
						});
						$('#bootstrap').attr('disabled','disabled');
					});
				});
				
				$("#dashboardcreate").click(function() {
					commonVariables.navListener.getMyObj('viewscreate', function(retVal) {
						self.viewscreate = new Clazz.com.components.views.js.viewsCreate();
						Clazz.navigationController.push(self.viewscreate, commonVariables.animation);
					});
				});
				
				$("a[name=editDashboard]").click(function() {
					commonVariables.dashboardId = $("#example").find('tr.row_selected').attr('dashboardId');
					commonVariables.navListener.getMyObj('viewsedit', function(retVal) {
						self.viewsedit = new Clazz.com.components.views.js.viewsEdit();
						Clazz.navigationController.push(self.viewsedit, commonVariables.animation);
					});
				});
				
			});
		},
		
		fnGetSelected : function( oTableLocal ) {
			return oTableLocal.$('tr.row_selected');
		}

	});

	return Clazz.com.components.views.js.listener.viewsListener;
});