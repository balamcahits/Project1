define([], function(datatable) {

	Clazz.createPackage("com.components.user.js.listener");

	Clazz.com.components.user.js.listener.userListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		usercreate : null,
		useredit : null,
		usersRequestBody : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;	
		},
		
		
		/* renderTemplate  : function(response, renderFunction, whereToRender, callback) {
			var self = this;
			renderFunction(this, whereToRender);
		}, */
		
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
			
			if(action === "roles") {
				header.requestMethod = "GET";
				header.webserviceurl = commonVariables.webserviceurl + "roles;jsessionid="+authToken;
			}
			
			return header;
		},
		
		append_adddel : function() {
			var self = this;
			setTimeout(function() {
				var temp = $('#example_length');
				temp.append('<div class="DTTT btn-group"><a id="datasrccreate" data-original-title="Create" class="tooltips btn_style create_datatable_btn" data-toggle="tooltip" data-placement="bottom" title=""></a><a data-original-title="Edit" class="tooltips btn_style edit_icon_btn" data-toggle="tooltip" data-placement="bottom" title="" name="editUser" disabled></a><a data-original-title="Delete" href="#" name="deleteUser" id="bootstrap" class="tooltips btn_style delete_icon_btn" data-toggle="tooltip" data-placement="bottom" title="" disabled></a></div>');
				$('#example').wrap('<div class="table-responsive"></div>');
				self.bootstrapclick();
				$(".tooltips").tooltip();
				if($(window).width() < 760) {
					var table_height_res = $(window).height() - ( $('.header_section').height() + $('.breadcrumb_div').height() + $('#example_wrapper').find('.row').eq(0).height() + $('#example_wrapper').find('.row').eq(1).height()) - 20;
					$('.table-responsive').css('height',table_height_res);
				}
				
			},500);				
		},
		
		dataTab : function() {
			var self = this, oTable;
			
			$("#example tbody tr").click( function( e ) {
				if ( $(this).hasClass('row_selected') ) {
					$(this).removeClass('row_selected');
					$("a[name=editUser]").attr('disabled', 'true');
					$("a[name=deleteUser]").attr('disabled', 'true');
				}
				else {
					oTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					$("a[name=editUser]").attr('disabled', 'false');
					$("a[name=deleteUser]").attr('disabled', 'false');
				}
				if ($(this).hasClass('row_selected')){
					$('.DTTT').children('a').removeAttr('disabled')
				}
			});
				
				/* Add a click handler for the delete row */
			$('#delete').click( function() {
				var anSelected = self.userListener.fnGetSelected( oTable );
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
							commonVariables.userId = $("#example").find('tr.row_selected').attr('userId');
							self.getUsersList(self.getActionHeader('', "delete"), function(response) {
								commonVariables.navListener.getMyObj('user', function(retVal) {
									self.user = retVal;	
									Clazz.navigationController.push(self.user, commonVariables.animation);
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
				
				$("#datasrccreate").click(function() {
					commonVariables.navListener.getMyObj('usercreate', function(retVal) {
						self.usercreate = retVal;							
						Clazz.navigationController.push(self.usercreate, commonVariables.animation);
					});
				});
				
				$("a[name=editUser]").click(function() {
					commonVariables.userId = $("#example").find('tr.row_selected').attr('userId');
					commonVariables.navListener.getMyObj('useredit', function(retVal) {
						self.useredit = retVal;							
						Clazz.navigationController.push(self.useredit, commonVariables.animation);
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

	return Clazz.com.components.user.js.listener.userListener;
});