define(["framework/widgetWithTemplate", "roles/listener/rolesListener"], function() {
	Clazz.createPackage("com.components.roles.js");

	Clazz.com.components.roles.js.rolesEdit = Clazz.extend(Clazz.WidgetWithTemplate, {
		rolesListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/roles/template/rolesEdit.tmp",
		configUrl: "components/roles/config/config.json",
		name : commonVariables.roles,
		roles : null,
		rolesRequestBody : {},
		permissionsArray : [],

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.rolesListener === null){
				self.rolesListener = new Clazz.com.components.roles.js.listener.rolesListener();
			}	
		},

		preRender: function(whereToRender, renderFunction){
			var self = this, editData = {};
			self.permissionsArray = [];
			self.rolesListener.ajaxCall(self.rolesListener.getRequestHeader('', "edit"), function(response) {
				editData.data = response;
				if(response.permissions) {
					$.each(response.permissions,function(index,value) {
						self.permissionsArray.push(value);
					});
				}	
				renderFunction(editData, whereToRender);
			});   								 
		},
		
		postRender : function(element) {
			var self = this;
			self.rolesListener.ajaxCall(self.rolesListener.getRequestHeader('', "permissions"), function(response) {
				$.each(response.response,function(index,value) {
						if($.inArray(value.id,self.permissionsArray) === -1) {
							$('#permissions').append('<option value='+value.id+'>'+value.name+'</option>');
						}	
						else
							$('#assigned').append('<option value='+value.id+'>'+value.name+'</option>');	
				});
				
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
			
			$("#roleupdate").click(function() {
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
		}
	});	

	return Clazz.com.components.roles.js.rolesEdit;
});