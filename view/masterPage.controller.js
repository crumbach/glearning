sap.ui.controller("sap.ui.demo.logbook.view.masterPage", {

	onInit: function() {
	    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
	},
	
    onRouteMatched : function(oEvent) {
        var oParameters = oEvent.getParameters();
        // when detail navigation occurs, update the binding context
        // if (oParameters.name !== "services") {
        //     return;
        // }
    },	

	onSelect: function(oEvent) {
		// Get the list item, either from the listItem parameter or from the event's
		// source itself (will depend on the device-dependent mode).
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},
	
	showDetail: function(oItem) {
		// If we're on a phone, include nav in history; if not, don't.
		var bReplace = jQuery.device.is.phone ? false : true;
		sap.ui.core.UIComponent.getRouterFor(this).navTo("details", {
			from: "logbook",
			year: oItem.getBindingContextPath().substr(10)
		}, bReplace);
	},
	
	onNewTrip : function() {
	    sap.ui.core.routing.Router.getRouter("appRouter").navTo("newTrip", {}, false);
	},
	
	quitSplitApp : function() {
	    sap.ui.core.routing.Router.getRouter("appRouter").myNavBack("tiles");
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
