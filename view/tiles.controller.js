sap.ui.controller("sap.ui.demo.logbook.view.tiles", {

    onPressTile : function(oEvent) {
        var oTileName = oEvent.getSource().getId();

        if (oTileName.indexOf("tileLogTrip") !== -1) {
            sap.ui.core.routing.Router.getRouter("appRouter").navTo("newTrip", { from: "tiles" } );
        } else if (oTileName.indexOf("tileTripOverview") !== -1) {
            sap.ui.core.routing.Router.getRouter("appRouter").navTo("splitApp", { from: "tiles" } );
        } else {
            console.log(oTileName);
        }
    }
    
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap.ui.demo.logbook.view.tile
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap.ui.demo.logbook.view.tile
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap.ui.demo.logbook.view.tile
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap.ui.demo.logbook.view.tile
*/
//	onExit: function() {
//
//	}

});