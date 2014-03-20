define([], function() {

	Clazz.createPackage("com.components.roles.js.listener");

	Clazz.com.components.roles.js.listener.rolesListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		rolescreate : null,
		rolesedit : null,
		
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
		
		getRequestHeader : function(projectRequestBody, type, descid) {
			var header;
			header = {
				dataType: "json",
				contentType:"application/json"
			};
			
			var authToken = commonVariables.api.localVal.getSession("jsessionid");
			
			if(type === "getroles"){
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "roles;jsessionid="+authToken;
			}
			
			if(type === "create"){
				header.requestMethod = "POST";
				header.requestPostBody = JSON.stringify(projectRequestBody);
				header.webserviceurl = commonVariables.webserviceurl + "roles;jsessionid="+authToken;
			}
			
			if(type === "edit"){
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "roles/" + commonVariables.roleId+";jsessionid="+authToken;
			}
			
			if(type === "permissions") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "permission;jsessionid="+authToken;
			}
			return header;
		},
		
		append_adddel : function() {
			var self = this;
			setTimeout(function() {
				$('#example_length').append('<div class="DTTT btn-group"><a id="rolescreate" data-original-title="Create" class="tooltips btn_style create_datatable_btn" data-toggle="tooltip" data-placement="bottom" title=""></a><a id="rolesedit" data-original-title="Edit" class="tooltips btn_style edit_icon_btn" data-toggle="tooltip" data-placement="bottom" title=""></a><a data-original-title="Delete" href="#" id="bootstrap" class="tooltips btn_style delete_icon_btn" data-toggle="tooltip" data-placement="bottom" title="" disabled></a></div>');
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
				
				$("#rolescreate").click(function() {
					commonVariables.navListener.getMyObj('rolescreate', function(retVal) {
						self.rolescreate = retVal;							
						Clazz.navigationController.push(self.rolescreate, commonVariables.animation);
					});
				});
				
				$("#rolesedit").click(function(){
					var roleId = $("#example").find('tr.row_selected').attr('roleId');
					commonVariables.roleId = roleId;
					commonVariables.navListener.getMyObj('rolesedit', function(retVal) {
						self.rolesedit = retVal;							
						Clazz.navigationController.push(self.rolesedit, commonVariables.animation);
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

	return Clazz.com.components.roles.js.listener.rolesListener;
});