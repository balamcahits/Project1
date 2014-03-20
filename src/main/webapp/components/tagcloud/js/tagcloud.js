define(["tagCloud/listener/tagCloudListener"], function() {
	Clazz.createPackage("com.components.tagCloud.js");

	Clazz.com.components.tagCloud.js.tagCloud = Clazz.extend(Clazz.WidgetWithTemplate, {
		
		// template URL, used to indicate where to get the template
		templateUrl: commonVariables.contexturl + "components/tagCloud/template/tagCloud.tmp",
		name : commonVariables.tagCloud,
		tagCloudListener : null,
		whereToRender : null,
		validation : null,
		charts : null,
		
		/***
		 * Called in initialization time of this class 
		 *
		 * @globalConfig: global configurations for this class
		 */
		initialize : function(globalConfig) {
			var self = this;
			if (self.tagCloudListener === null ) {
				self.tagCloudListener = new Clazz.com.components.tagCloud.js.listener.tagCloudListener();
			}
		},
		
		postRender : function(element) {	
			var self = this;
			 if(!$('#myCanvas').tagcanvas({
				textColour: '#D31530',
				outlineColour: '#D31530',
				reverse: true,
				depth: 0.5,
				maxSpeed: 0.05
				},'tags')) {
				// something went wrong, hide the canvas container
					$('#myCanvasContainer').hide();
				}
			//commonVariables.continueloading = false;
		},
		

		/***
		 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
		 *
		 */
		bindUI : function() {
			var self = this;
			
       
			
			Clazz.navigationController.mainContainer = commonVariables.contentPlaceholder;
		}
	});

	return Clazz.com.components.tagCloud.js.tagCloud;
});