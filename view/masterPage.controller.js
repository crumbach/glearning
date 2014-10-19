sap.ui.controller("sap.ui.demo.logbook.view.masterPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
	onInit: function() {
        var oList = this.getView().byId("logbookList");
        oList.bindItems({
    		path : "/logbooks",
    		template : new sap.m.StandardListItem({
    			title       : "{title}",
    			description : "{desc}",
    			type        : "Navigation"
    		})
    	});
	},

	onItemPress: function() {
	    var oView = sap.ui.getCore().byId("overview");
        var oSplitApp = oView.byId("logbookView");
        oView = oSplitApp.getDetailPage("detailView");
        var oPage = oView.byId("detailPage");
        oPage.setTitle("New navigation");

		oSplitApp.to("detailView--detailPage");
	}
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
//	onExit: function() {
//
//	}

});
