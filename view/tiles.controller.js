sap.ui.controller("sap.ui.demo.logbook.view.tiles", {

    onInit : function() {
        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
    },

    onPressTile : function(oEvent) {
        var oTileName = oEvent.getSource().getId();

        if (oTileName.indexOf("tileLogTrip") !== -1) {
            sap.ui.core.routing.Router.getRouter("appRouter").navTo("newTrip", { from: "tiles" }, false );
        } else if (oTileName.indexOf("tileTripOverview") !== -1) {
            sap.ui.core.routing.Router.getRouter("appRouter").navTo("splitApp", { from: "tiles" }, false );
        } else {
            sap.m.MessageToast("No route maintained for " + oTileName);
        }
    },
    
    onRouteMatched : function(oEvent) {
        var oParameters = oEvent.getParameters();
        // when detail navigation occurs, update the binding context
        // if (oParameters.name !== "services") {
        //     return;
        // }
    }


});