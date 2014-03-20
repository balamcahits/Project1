define(["framework/widgetWithTemplate", "groups/listener/groupsListener"], function() {
	Clazz.createPackage("com.components.groups.js");

	Clazz.com.components.groups.js.groupsCreate = Clazz.extend(Clazz.WidgetWithTemplate, {
		groupsListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/groups/template/groupsCreate.tmp",
		configUrl: "components/groups/config/config.json",
		name : commonVariables.groups,
		groups : null,

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.groupsListener === null){
				self.groupsListener = new Clazz.com.components.groups.js.listener.groupsListener();
			}	
		},

		postRender : function(element) {
			var self=this;
			self.groupsListener.getUsersList(self.groupsListener.getActionHeader('', "userlist"), function(response) {
				$.each(response.response,function(index,value) {
					if(value.firstName !== null)
						$('#permissions').append('<option value='+value.id+'>'+value.firstName+' '+value.lastName+'</option>');
					else
						$('#permissions').append('<option value='+value.id+'>'+value.name+'</option>');
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
			
			$("#cancel_groups").click(function() {
				commonVariables.navListener.getMyObj('groups', function(retVal) {
						self.groups = retVal;							
						Clazz.navigationController.push(self.groups, commonVariables.animation);
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
			
			$("#groupscreate").click(function() {
				var obj = $("#groupname");
				var descobj = $("#groupdesc");
				if(obj.val() === '') {
					obj.addClass('errormessage');
					obj.focus();
					obj.attr('placeholder','Enter Name');
					obj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				} else if(descobj.val() === '') {
					descobj.addClass('errormessage');
					descobj.focus();
					descobj.attr('placeholder','Enter Description');
					descobj.bind('keypress', function() {
						$(this).removeClass("errormessage");
						$(this).removeAttr("placeholder");
					});
				}	
			});	
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});	

	return Clazz.com.components.groups.js.groupsCreate;
});