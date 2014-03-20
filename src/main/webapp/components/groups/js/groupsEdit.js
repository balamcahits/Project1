define(["framework/widgetWithTemplate", "groups/listener/groupsListener"], function() {
	Clazz.createPackage("com.components.groups.js");

	Clazz.com.components.groups.js.groupsEdit = Clazz.extend(Clazz.WidgetWithTemplate, {
		groupsListener : null,
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/groups/template/groupsEdit.tmp",
		configUrl: "components/groups/config/config.json",
		name : commonVariables.groups,
		groups : null,
		groupsRequestBody : {},

		/***
		 * Called in initialization time of this class 
		 */
		initialize : function(){
			var self = this;
			if(self.groupsListener === null){
				self.groupsListener = new Clazz.com.components.groups.js.listener.groupsListener();
			}	
		},

		/* preRender: function(whereToRender, renderFunction){
			var self = this, editData = {};
			self.groupsListener.ajaxCall(self.groupsListener.getRequestHeader('', "edit"), function(response) {
				editData.data = response.response;
				renderFunction(editData, whereToRender);
			});   								 
		}, */
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
				var selectedOpts = $('#lstBox1 option:selected');
				if (selectedOpts.length == 0) {
					alert("Nothing to move.");
					e.preventDefault();
				}

				$('#lstBox2').append($(selectedOpts).clone());
				$(selectedOpts).remove();
				e.preventDefault();
			});

			$('#btnLeft').click(function(e) {
				var selectedOpts = $('#lstBox2 option:selected');
				if (selectedOpts.length == 0) {
					e.preventDefault();
				}

				$('#lstBox1').append($(selectedOpts).clone());
				$(selectedOpts).remove();
				e.preventDefault();
			});
			
			$("#cancel_group").click(function() {
				commonVariables.navListener.getMyObj('groups', function(retVal) {
						self.groups = retVal;							
						Clazz.navigationController.push(self.groups, commonVariables.animation);
					});
			});
			
			$("#groupsupdate").click(function() {
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
		}
	});	

	return Clazz.com.components.groups.js.groupsEdit;
});