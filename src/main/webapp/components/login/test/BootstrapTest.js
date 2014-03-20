
var commonVariables = {
	globalconfig : "",
	webserviceurl : "",
	contexturl : "src/",
	login : "login",
	loginContext : "login",
	navListener : null,
	header : "header",
	headerContext : "header",
	upgrade : "upgrade",
	upgradeAvailable : "upgradeAvailable",
	revenues : "revenues", 
	dashboard : "dashboard",
	charts : "charts",
	navigation : "navigation",
	navigationContext : "",
	loadingScreen : null,
	api : null,
	basePlaceholder : "basepage\\:widget",
	headerPlaceholder : "<div id='header'></div>",
	contentPlaceholder : "content\\:widget",
	footerPlaceholder : "<div id='footer'></div>",
	navigationPlaceholder : "navigation\\:widget"
};

define([], function() {
	$(document).ready(function(){

		$.get('src/components/login/test/config.json', function(data) {
			commonVariables.globalconfig = data;
			commonVariables.animation = data.navigation.animation;
			
			configJson = {
				// comment out the below line for production, this one is so require doesn't cache the result
				urlArgs: "time=" +  (new Date()).getTime(),
				baseUrl: "src/",
				
				paths : {
					lib : "lib",
					js : "js",
					framework : "js/framework",
					listener : "js/commonComponents/listener",
					fastclick : "lib/fastclick",
					api : "js/api",
					common : "js/commonComponents/common",
					modules: "js/commonComponents/modules",
					Clazz : "js/framework/class",
					components: "components",
					configData: data
				}
			};
            
            commonVariables.basePlaceholder=$("<div id='base'></div>");
            commonVariables.headerPlaceholder=$("<div id='header'></div>");
			commonVariables.navigationPlaceholder=$("<navigation\\:widget></navigation\\:widget>");
            commonVariables.contentPlaceholder=$("<div id='content'></div>");
            commonVariables.footerPlaceholder=$("<div id='footer'></div>");
			
			$.each(commonVariables.globalconfig.components, function(index, value){
				configJson.paths[index] = value.path;
			});
			
			// setup require.js
			var requireConfig = requirejs.config(configJson);

			require(["framework/class", "framework/widget", "framework/widgetWithTemplate", "framework/navigationController", "common/loading", "api/api", "lib/jquery_ui-1.10.3", "lib/bootstrap_select_min-3.1", "lib/bootstrap_min-2.3.1", "lib/signal-1.0.1", "lib/signalbinding-1.0.1", "lib/i18next-1.6.0", "lib/nav_bar", "lib/nav_bar_cookie", "lib/jquery.flot", "lib/jquery.flot.pie", "lib/jquery.flot.resize", "lib/jquery.flot.stack", "lib/jquery.flot.time", "lib/bootstrap-modal",  "lib/bootstrap-modalmanager", "lib/bootstrap-datetimepicker.min", "lib/daterangepicker", "lib/moment", "lib/main-2.3", "lib/scrollbars-1.0"], function () {

				Clazz.config = data;
				Clazz.navigationController = new Clazz.NavigationController({
					mainContainer : "basepage\\:widget",
					transitionType : Clazz.config.navigation.transitionType,
					cancelTransitionType : Clazz.config.navigation.cancelTransitionType,
					isNative : Clazz.config.navigation.isNative
				});

				//Apply customer based theme
				if(localStorage.getItem('customertheme') !== null && localStorage.getItem('customertheme') !== ""){
					JSS.css(eval('(' + localStorage.getItem('customertheme') + ')'));
				}
				
				commonVariables.loadingScreen = new Clazz.com.js.widget.common.Loading();
				commonVariables.api = new Clazz.com.js.api.API();
			
				require(["loginTest", "navigation/listener/navigationListener" ], function(loginTest){
					commonVariables.navListener = Clazz.com.components.navigation.js.listener.navigationListener();
					loginTest.runTests(data);
				});
			});
		}, "json");
	});
});
