define(["framework/widgetWithTemplate", "roles/listener/rolesListener"], function() {
	Clazz.createPackage("com.components.roles.js");

	Clazz.com.components.roles.js.rolesCreate = Clazz.extend(Clazz.WidgetWithTemplate, {
		rolesListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/roles/template/rolesCreate.tmp",
		configUrl: "components/roles/config/config.json",
		name : commonVariables.roles,
		roles : null,
		rolesRequestBody : {},

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.rolesListener === null){
				self.rolesListener = new Clazz.com.components.roles.js.listener.rolesListener();
			}	
		},

		postRender : function(element) {
			var self = this;
			self.rolesListener.ajaxCall(self.rolesListener.getRequestHeader('', "permissions"), function(response) {
				$.each(response.response,function(index,value) {
						$('#permissions').append('<option value='+value.id+'>'+value.name+'</option>');					
				});
				
			});   
		},
		
		pageRefresh : function() {
			var self = this;
			commonVariables.navListener.getMyObj('roles', function(retVal) {
				self.roles = retVal;							
				Clazz.navigationController.push(self.roles, commonVariables.animation);
			});
		},
		
		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, tabheight;
			
			tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
			$('.create_table_div').css('height',tabheight + 'px'); 
			
			$(window).resize(function() {
				tabheight =  $(window).height() - ($(".breadcrumb_div").height() + $(".header_section").height()) - 116;
				$('.create_table_div').css('height',tabheight + 'px'); 
			});	
			
			$("#cancel_roles").click(function() {
				commonVariables.navListener.getMyObj('roles', function(retVal) {
					self.roles = retVal;							
					Clazz.navigationController.push(self.roles, commonVariables.animation);
				});
			});
			
			$('#btnRight').click(function(e) {
				var selectedOpts = $('#permissions option:selected');
				if (selectedOpts.length == 0) {
					alert("Nothing to move.");
					e.preventDefault();
				}

				$('#assigned').append($(selectedOpts).clone());
				$(selectedOpts).remove();
				e.preventDefault();
			});

			$('#btnLeft').click(function(e) {
				var selectedOpts = $('#assigned option:selected');
				if (selectedOpts.length == 0) {
					e.preventDefault();
				}

				$('#permissions').append($(selectedOpts).clone());
				$(selectedOpts).remove();
				e.preventDefault();
			});
			
			$("#rolecreate").click(function() {
				var nameobj = $("#rolename");
				var descobj = $("#roledesc");
				if(nameobj.val() === '') {
					nameobj.addClass('errormessage');
					nameobj.focus();
					nameobj.attr('placeholder','Enter Name');
					nameobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else {
					var name = $(nameobj).val();
					var description = $(descobj).val();
					var assignedRoles = [];
					$('#assigned').children().each(function() {
						console.info($(this).val());
						assignedRoles.push($(this).val());
					});
					self.rolesRequestBody.name = name;
					self.rolesRequestBody.permissions = assignedRoles;
					//self.rolesRequestBody.permissions = $("#assigned").val();
					self.rolesListener.ajaxCall(self.rolesListener.getRequestHeader(self.rolesRequestBody, "create"), function(response) {
						self.pageRefresh();
					});
				}	
			});		
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});	

	return Clazz.com.components.roles.js.rolesCreate;
});