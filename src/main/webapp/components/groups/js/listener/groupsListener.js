define([], function() {

	Clazz.createPackage("com.components.groups.js.listener");

	Clazz.com.components.groups.js.listener.groupsListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		groupscreate : null,
		groupsedit : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;	
		},
		
		getUsersList : function(header, callback) {
			var self = this;
			try {
				commonVariables.api.ajaxRequest(header,
					function(response) {
						if (response) {
							callback(response);
						}
					},
					function(textStatus) {
					}
				);
			} catch(exception) {
			}
		},
		
		getActionHeader : function(usersRequestBody, action) {
			var self=this, header;
			header = {
				contentType: "application/json",				
				dataType: "json",
				webserviceurl: ''
			};
			var authToken = commonVariables.api.localVal.getSession("jsessionid");
			
			if(action === "list") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "groups;jsessionid="+authToken;	
			}

			if(action === "userlist") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "users;jsessionid="+authToken;	
			} 	
			
			if(action === "create") {
				header.requestMethod = "POST";
				header.requestPostBody = JSON.stringify(usersRequestBody);
				header.webserviceurl = commonVariables.webserviceurl + "users;jsessionid="+authToken;
			}
			
			if(action === "edit") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "users/" + commonVariables.userId+";jsessionid="+authToken;
			}
			
			if(action === "delete") {
				header.requestMethod = "DELETE";
				header.webserviceurl = commonVariables.webserviceurl + "users/" + commonVariables.userId+";jsessionid="+authToken;
			}
			
			return header;
		},
		
		append_adddel : function() {
			var self = this;
			setTimeout(function() {
				$('#example_length').append('<div class="DTTT btn-group"><a id="groupscreate" data-original-title="Create" class="tooltips btn_style create_datatable_btn" data-toggle="tooltip" data-placement="bottom" title=""></a><a disabled id="groupsedit" data-original-title="Edit" class="tooltips btn_style edit_icon_btn todisable" data-toggle="tooltip" data-placement="bottom" title=""></a><a data-original-title="Delete" href="#" id="bootstrap" class="tooltips btn_style delete_icon_btn todisable" data-toggle="tooltip" data-placement="bottom" title="" disabled></a></div>');
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
			oTable = $('#example').dataTable( {
				"sDom" : "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "full_numbers",
				"aoColumnDefs" : [ {
					'bSortable' : false,
					'aTargets' : [ ]
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
				
				$("#groupscreate").click(function() {
					commonVariables.navListener.getMyObj('groupscreate', function(retVal) {
						self.groupscreate = retVal;							
						Clazz.navigationController.push(self.groupscreate, commonVariables.animation);
					});
				});
				
				$("#groupsedit").click(function(){
					var roleId = $("#example").find('tr.row_selected').attr('roleId');
					commonVariables.roleId = roleId;
					commonVariables.navListener.getMyObj('groupsedit', function(retVal) {
						self.groupsedit = retVal;							
						Clazz.navigationController.push(self.groupsedit, commonVariables.animation);
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

	return Clazz.com.components.groups.js.listener.groupsListener;
});