define(["roles/listener/rolesListener"], function() {
	Clazz.createPackage("com.components.roles.js");

	Clazz.com.components.roles.js.roles = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/roles/template/roles.tmp",
		name : commonVariables.roles,
		rolesListener : null,
		whereToRender : null,
		validation : null,
		roles : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.rolesListener === null ) {
				self.rolesListener = new Clazz.com.components.roles.js.listener.rolesListener();
			}
			self.registerEvents(self.rolesListener);
		},
		
		registerEvents : function(rolesListener) {
			var self = this;
		},
		
		/***
		 * Called after the preRender() and bindUI() completes. 
		 * Override and add any preRender functionality here
		 *
		 * @element: Element as the result of the template + data binding
		 */
		postRender : function(element) {
			var self=this;
		},
		
		preRender: function(whereToRender, renderFunction){
			var self = this, roleData = {};
			self.rolesListener.ajaxCall(self.rolesListener.getRequestHeader('', "getroles"), function(response) {
				roleData.roleslist = response;
				renderFunction(roleData, whereToRender);
			});   								 
		},


		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, height;
			$('.hasChild ').find('ul.acc-menu').show().closest('li').addClass('open');		
			require(["lib/data_tables"], function(){
				self.rolesListener.dataTab();
			});
						
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});

	return Clazz.com.components.roles.js.roles;
});