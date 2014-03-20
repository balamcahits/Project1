define(["groups/listener/groupsListener"], function() {
	Clazz.createPackage("com.components.groups.js");

	Clazz.com.components.groups.js.groups = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/groups/template/groups.tmp",
		name : commonVariables.groups,
		groupsListener : null,
		whereToRender : null,
		validation : null,
		groups : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.groupsListener === null ) {
				self.groupsListener = new Clazz.com.components.groups.js.listener.groupsListener();
			}
			self.registerEvents(self.groupsListener);
		},
		
		registerEvents : function(groupsListener) {
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
		
		/* preRender: function(whereToRender, renderFunction){
			var self = this, userdata = {};
			self.groupsListener.getUsersList(self.groupsListener.getActionHeader('', "list"), function(response) {
				userdata.userlist = response.response;
				renderFunction('', whereToRender);
			});   								 
		},  */

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function(){
			var self=this, height;
			$('.hasChild ').find('ul.acc-menu').show().closest('li').addClass('open');		
			require(["lib/data_tables"], function(){
				self.groupsListener.dataTab();
			});
						
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});

	return Clazz.com.components.groups.js.groups;
});