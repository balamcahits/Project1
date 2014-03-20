define([], function() {

	Clazz.createPackage("com.components.navigation.js.listener");

	Clazz.com.components.navigation.js.listener.navigationListener = Clazz.extend(Clazz.WidgetWithTemplate, {
		localStorageAPI : null,
		header : null,
		datasourcecreate : null,
		createApp : null,
		editApp : null,
		datasourceedit : null,
		views : null,
		footer : null,
		dashboard : null,
		revenues : null,
		charts : null,
		currentTab : null,
		datasource : null,
		ratingTrend : null,
		downloadTrend : null,
		tags : null,
		tagscreate : null,
		roles : null,
		rolescreate : null,
		rolesedit : null,
		groups : null,
		groupscreate : null,
		groupsedit : null,
		user: null,
		usercreate : null,
		useredit : null,
		viewscreate : null,
		viewsedit : null,
		userProfile : null,
		tagCloud : null,

		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;
		},
		
		
		landingPage : function(currentContent){
			var self = this;
			self.renderHeader(function(retVal){
				if(currentContent === undefined || currentContent === null || currentContent === 'dashboard'){
					self.renderContent(function(retVal){
					});
				} 
			});
		},
		

		getMyObj : function(keyword, callback) {
			var self=this, retuenObj, objInfo = "";
				switch(keyword){
					case 'header' :
						if(self.header === null){
							require(["header/header"], function(){
								self.header = new Clazz.com.commonComponents.modules.header.js.Header();
								callback(self.header);	
							});
						}else{
							callback(self.header);
						}
					break;
						
					case commonVariables.revenues :
						if(self.revenues === null){
							require(["revenues/revenues"], function(){
								self.revenues = new Clazz.com.components.revenues.js.Revenues();
								callback(self.revenues);	
							});
						}else{
							callback(self.revenues);
						}
					break;
					
					case 'RATING TREND' :
						if(self.ratingTrend === null){
							require(["ratingTrend/ratingTrend"], function(){
								self.ratingTrend = new Clazz.com.components.ratingTrend.js.ratingTrend();
								callback(self.ratingTrend);	
							});
						}else{
							callback(self.ratingTrend);
						}
					break;
					
					case 'DOWNLOAD TRENDS' :
						if(self.downloadTrend === null){
							require(["downloadTrend/downloadTrend"], function(){
								self.downloadTrend = new Clazz.com.components.downloadTrend.js.downloadTrend();
								callback(self.downloadTrend);	
							});
						}else{
							callback(self.downloadTrend);
						}
					break;
						
					case commonVariables.charts :
						if(self.charts === null){
							require(["charts/charts"], function(){
								self.charts = new Clazz.com.components.charts.js.Charts();
								callback(self.charts);	
							});
						}else{
							callback(self.charts);
						}
					break;	
					
					case 'DASHBOARD' :
						if(self.dashboard === null){
							require(["dashboard/dashboard"], function(){
								self.dashboard = new Clazz.com.components.dashboard.js.Dashboard();
								callback(self.dashboard);	
							});
						}else{
							callback(self.dashboard);
						}
					break;
				
					
					case 'data_source' :
						if(self.datasource === null) {
							require(["dataSource/dataSource"], function() {
								self.datasource = new Clazz.com.components.dataSource.js.dataSource();
								callback(self.datasource);	
							});
						}else{
							callback(self.datasource);
						}	
					break;
										
					
					case 'tags' :
						if(self.tags === null) {
							require(["tags/tags"], function() {
								self.tags = new Clazz.com.components.tags.js.tags();
								callback(self.tags);	
							});
						}else{
							callback(self.tags);
						}	
					break;
					
					case 'tagscreate' :
						if(self.tagscreate === null) {
							require(["tags/tagsCreate"], function() {
								self.tagscreate = new Clazz.com.components.tags.js.tagsCreate();
								callback(self.tagscreate);	
							});
						}else{
							callback(self.tagscreate);
						}	
					break;
					
					case 'roles' :
						if(self.roles === null) {
							require(["roles/roles"], function() {
								self.roles = new Clazz.com.components.roles.js.roles();
								callback(self.roles);	
							});
						}else{
							callback(self.roles);
						}	
					break;
					
					case 'rolescreate' :
						if(self.rolescreate === null) {
							require(["roles/rolesCreate"], function() {
								self.rolescreate = new Clazz.com.components.roles.js.rolesCreate();
								callback(self.rolescreate);	
							});
						}else{
							callback(self.rolescreate);
						}	
					break;
					
					case 'rolesedit' :
						if(self.rolesedit === null) {
							require(["roles/rolesEdit"], function() {
								self.rolesedit = new Clazz.com.components.roles.js.rolesEdit();
								callback(self.rolesedit);	
							});
						}else{
							callback(self.rolesedit);
						}	
					break;
					
					case 'groups' :
						if(self.groups === null) {
							require(["groups/groups"], function() {
								self.groups = new Clazz.com.components.groups.js.groups();
								callback(self.groups);	
							});
						}else{
							callback(self.groups);
						}	
					break;
					
					case 'groupscreate' :
						if(self.groupscreate === null) {
							require(["groups/groupsCreate"], function() {
								self.groupscreate = new Clazz.com.components.groups.js.groupsCreate();
								callback(self.groupscreate);	
							});
						}else{
							callback(self.groupscreate);
						}	
					break;
					
					case 'groupsedit' :
						if(self.groupsedit === null) {
							require(["groups/groupsEdit"], function() {
								self.groupsedit = new Clazz.com.components.groups.js.groupsEdit();
								callback(self.groupsedit);	
							});
						}else{
							callback(self.groupsedit);
						}	
					break;
					
					case 'user' :
						if(self.user === null) {
							require(["user/user"], function() {
								self.user = new Clazz.com.components.user.js.user();
								callback(self.user);	
							});
						}else{
							callback(self.user);
						}	
					break;
					
					case 'usercreate' :
						if(self.usercreate === null) {
							require(["user/userCreate"], function() {
								self.usercreate = new Clazz.com.components.user.js.userCreate();
								callback(self.usercreate);	
							});
						}else{
							callback(self.usercreate);
						}	
					break;
					
					case 'useredit' : 
						if(self.useredit === null) {
							require(["user/userEdit"], function() {
								self.useredit = new Clazz.com.components.user.js.userEdit();
								callback(self.useredit);	
							});
						} else {
							callback(self.useredit);
						}
					break;
					
					case 'userProfile' : 
						if(self.userProfile === null) {
							require(["userProfile/userProfile"], function() {
								self.userProfile = new Clazz.com.components.userProfile.js.userProfile();
								callback(self.userProfile);	
							});
						} else {
							callback(self.userProfile);
						}
					break;
					
					case 'tagCloud' : 
						if(self.tagCloud === null) {
							require(["tagCloud/tagCloud"], function() {
								self.tagCloud = new Clazz.com.components.tagCloud.js.tagCloud();
								callback(self.tagCloud);	
							});
						} else {
							callback(self.tagCloud);
						}
					break;
					
					case 'datasrccreate' :
						if(self.datasourcecreate === null){
							require(["dataSource/dataSourceCreate"], function(){
								self.datasourcecreate = new Clazz.com.components.dataSource.js.dataSourceCreate();
								callback(self.datasourcecreate);	
							});
						}else{
							callback(self.datasourcecreate);
						}
					break;													
						
					case 'datasrcedit' :
						if(self.datasourceedit === null){
							require(["dataSource/dataSourceEdit"], function(){
								self.datasourceedit = new Clazz.com.components.dataSource.js.dataSourceEdit();
								callback(self.datasourceedit);	
							});
						}else{
							callback(self.datasourceedit);
						}
					break;
		
					case 'views' :
						if(self.views === null){
							require(["views/views"], function(){
								self.views = new Clazz.com.components.views.js.views();
								callback(self.views);	
							});
						}else{
							callback(self.views);
						}
					break;
					
					case 'viewscreate' :
						if(self.viewscreate === null){
							require(["views/viewsCreate"], function(){
								self.viewscreate = Clazz.com.components.views.js.viewsCreate();
								callback(self.viewscreate);
							});
						}else{
							callback(self.viewscreate);
						}
					break;
					
					case 'viewsedit' :
						if(self.viewsedit === null){
							require(["views/viewsEdit"], function(){
								self.viewsedit = Clazz.com.components.views.js.viewsEdit();
								callback(self.viewsedit);
							});
						}else{
							callback(self.viewsedit);
						}
					break;	
				}
		},

		renderHeader : function(callback) {
			var self = this;
			Clazz.navigationController.jQueryContainer = commonVariables.headerPlaceholder;
			self.getMyObj('header', function(returnVal){
				self.header.data = JSON.parse(commonVariables.api.localVal.getSession('userInfo'));
				Clazz.navigationController.push(self.header, false);
				callback(true);
			});
		},
		
		ajaxCall : function(header, callback) {
			try {
				commonVariables.api.ajaxRequest(header,
					function(response) {
						callback(response);

					},

					function(textStatus) {
					}
				);
			} catch(exception) {
			}
		},
		
		getRequestHeader : function(projectRequestBody, type) {
			var header;
			header = {
				dataType: "json",
				contentType:"application/json"
			};
			
			if(type === "dashboardType") {
				header.requestMethod = "GET";
				header.requestPostBody="";
				var authToken = commonVariables.api.localVal.getSession("jsessionid");
				header.webserviceurl =  commonVariables.webserviceurl + "dashboard/dashboardtype;jsessionid="+authToken;
			}	
			return header;
		},
		
		renderContent : function(callback){
			var self = this;
			Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
			self.header.headerListener.currentTab = "Projects";
			self.ajaxCall(self.getRequestHeader('',"dashboardType"),function(response) {
				var arr = [];
				$.each(response.response,function(index,value) {
					arr.push(value.name);
					if(value.name === 'DASHBOARD')
						commonVariables.dashboardId = value.id;
					else if(value.name === 'DOWNLOAD TRENDS')
						commonVariables.downloadTrendId = value.id;
					else if(value.name === 'RATING TREND')
						commonVariables.ratingTrendId = value.id;
				});
				
				if($.inArray('DASHBOARD',arr) === -1) {
					$('#dashboard').parent().hide();					
				}	
				if($.inArray('DOWNLOAD TRENDS',arr) === -1) {
					$('#downloadTrend').parent().hide();
				}	
				if($.inArray('RATING TREND',arr) === -1) {
					$('#ratingTrend').parent().hide();
				}	
				self.getMyObj(arr[0], function(returnVal){
					self.currentTab = commonVariables.dashboard;
					Clazz.navigationController.push(returnVal, commonVariables.animation);
					callback(true);
				});		
			});
			
			
		},
		
		onMytabEvent : function(keyword) {
			var self = this, currentObj;
			self.getMyObj(keyword, function(returnVal){
				currentObj = returnVal;
				self.myTabRenderFunction(currentObj, keyword);
			}); 
		},
		
		myTabRenderFunction : function(currentObj, keyword) {
			var self = this;
			if(currentObj !== undefined && currentObj !== null){
				self.currentTab = keyword;
				Clazz.navigationController.jQueryContainer = commonVariables.contentPlaceholder;
				Clazz.navigationController.push(currentObj, commonVariables.animation);
			}
		}
	});

	return Clazz.com.components.navigation.js.listener.navigationListener;
});
