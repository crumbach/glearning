sap.ui.controller("sap.ui.demo.logbook.view.tiles", {

    onPressTile : function(oEvent) {
        var oTileName = oEvent.getSource().getId();

        if (oTileName.indexOf("tileLogTrip") !== -1) {
            sap.ui.core.routing.Router.getRouter("appRouter").navTo("newTrip", { from: "tiles" }, false );
        } else if (oTileName.indexOf("tileTripOverview") !== -1) {
            sap.ui.core.routing.Router.getRouter("appRouter").navTo("splitApp", { from: "tiles" }, false );
        } else {
            sap.m.MessageToast("No route maintained for " + oTileName);
        }
    }


});