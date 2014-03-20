define([], function(datatable) {

	Clazz.createPackage("com.components.dataSource.js.listener");

	Clazz.com.components.dataSource.js.listener.DatasourceListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		datasourcecreate : null,
		datasourceedit : null,
		delId : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;	
		},
		
		ajaxCall : function(header, callback) {
			var self = this;
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
			var self = this, header;
			header = {
				dataType: "json",
				contentType:"application/json"
			};
			var authToken = commonVariables.api.localVal.getSession("jsessionid");
			
			if(type === "getdatasources"){
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "datasource;jsessionid="+authToken;
			} else if(type === "createdatasource") {
				header.requestMethod = "POST";
				header.requestPostBody = JSON.stringify(projectRequestBody);
				header.webserviceurl = commonVariables.webserviceurl + "datasource;jsessionid="+authToken;
			} else if(type === "editdatasource") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "datasource/" + commonVariables.editId + ";jsessionid="+authToken;
			} else if(type === "datasourcetype") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "datasourcetype;jsessionid="+authToken;
			} else if(type === "deletedatasource") {
				header.requestMethod = "DELETE";
				header.webserviceurl =  commonVariables.webserviceurl + "datasource/"+self.delId+";jsessionid="+authToken;
			} else if(type === "scheduler") {
				header.requestMethod = "POST";
				header.requestPostBody = JSON.stringify(projectRequestBody);
				header.webserviceurl =  commonVariables.webserviceurl + "datasource/scheduler;jsessionid="+authToken;
			} else if(type === "schedulerget") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				header.webserviceurl =  commonVariables.webserviceurl + "datasource/scheduler;jsessionid="+authToken+"?dataSourceId=" + projectRequestBody;
			}
			return header;
		},
		
		append_adddel : function() {
			var self = this;
			setTimeout(function() {
				var temp = $('#example_length');
				temp.append('<div class="DTTT btn-group"><a id="datasrccreate" data-original-title="Create" class="tooltips btn_style create_datatable_btn" data-toggle="tooltip" data-placement="bottom" title=""></a><a id="datasrcedit" disabled data-original-title="Edit" class="tooltips btn_style edit_icon_btn todisable" data-toggle="tooltip" data-placement="bottom" title=""></a><a data-original-title="Delete" href="#" id="bootstrap" class="tooltips btn_style delete_icon_btn todisable" data-toggle="tooltip" data-placement="bottom" title="" disabled></a></div>');
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
				}
				else {
					oTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
				}
				if ($(this).hasClass('row_selected')){
					$('.todisable').removeAttr('disabled');
				} else {
					$('.todisable').attr('disabled','disabled');
				}
			});
				
			self.append_adddel();
			//oTable = $('#example').dataTable();
			oTable = $('#example').dataTable( {
				"sDom" : "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "full_numbers",
				 "aoColumnDefs" : [ {
					'bSortable' : false,
					'aTargets' : [3]
				} ]
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
					
					$("#toggleCSS").attr("href", "../themes/css/style.css");

					// Getting the name of the element to delete
					var target, targetName;						
					$("#example").find('tbody').children('tr').each(function() {
						target = $(this);
						 if(target.hasClass('row_selected')) {
							targetName = target.find('td').eq(0).text();
						}
					});

					alertify.prompt("Are you sure you want to delete " + targetName + "?", function (e) {
																						if (e) {
							alertify.success("Delete Successful");
						} else {
							alertify.error("Delete Cancelled");
						}
					});
					return false;
				});
			
				$("#bootstrap").click(function() {
					$("#alertify-ok").click(function() {
						var obj;						
						$("#example").find('tbody').children('tr').each(function() {
							 if($(this).hasClass('row_selected')) {
								obj = this;
								self.delId = $(this).attr('id');	
							}
						});
						
						self.ajaxCall(self.getRequestHeader('', "deletedatasource"), function(response) {							
							commonVariables.navListener.getMyObj('data_source', function(retVal) {
								Clazz.navigationController.push(retVal, commonVariables.animation);
							});
						});	
					});
				});
				
				$("#datasrccreate").click(function() {
					commonVariables.navListener.getMyObj('datasrccreate', function(retVal) {
						self.datasourcecreate = retVal;							
						Clazz.navigationController.push(self.datasourcecreate, commonVariables.animation);
					});
				});
				
				$("#datasrcedit").click(function() {
					var id = $("#example").find('tr.row_selected').attr('id');
					var postBody = {};
					commonVariables.editId = id;
					commonVariables.navListener.getMyObj('datasrcedit', function(retVal) {
						self.datasourceedit = retVal;							
						Clazz.navigationController.push(self.datasourceedit, commonVariables.animation);
					}); 
				});
		
			});
		},
		
		reset : function() {
		},
		
		fnGetSelected : function( oTableLocal ) {
			return oTableLocal.$('tr.row_selected');
		}

	});

	return Clazz.com.components.dataSource.js.listener.DatasourceListener;
});