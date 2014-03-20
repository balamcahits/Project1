define(["user/listener/userListener"], function() {
	Clazz.createPackage("com.components.user.js");

	Clazz.com.components.user.js.user = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/user/template/user.tmp",
		name : commonVariables.user,
		userListener : null,
		usersRequestBody : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.userListener === null ) {
				self.userListener = new Clazz.com.components.user.js.listener.userListener();
			}
			self.registerEvents(self.userListener);
		},
		
		registerEvents : function(userListener) {
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
			var self = this, userdata = {};
			self.userListener.getUsersList(self.userListener.getActionHeader('', "list"), function(response) {
				userdata.userlist = response.response;
				renderFunction(userdata, whereToRender);
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
				self.userListener.dataTab();
			});
						
			
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
		}
	});

	return Clazz.com.components.user.js.user;
});