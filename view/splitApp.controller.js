sap.ui.controller("sap.ui.demo.logbook.view.splitApp", {

    onInit : function() {

        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);

        var oSplitApp = this.getView().byId("idSplitApp");
        oSplitApp.addMasterPage(new sap.ui.view({id:"masterView", viewName:"sap.ui.demo.logbook.view.masterPage", type:sap.ui.core.mvc.ViewType.XML}));
        oSplitApp.addDetailPage(new sap.ui.view({id:"detailView", viewName:"sap.ui.demo.logbook.view.detailPage", type:sap.ui.core.mvc.ViewType.XML}));
        oSplitApp.setInitialMaster("masterView");
        // oSplitApp.setInitialDetail("detailView");
        
        // sap.ui.core.UIComponent.getRouterFor(this).navTo("master", {}, false);

    },

    onRouteMatched : function(oEvent) {
        var oParameters = oEvent.getParameters();
        // when detail navigation occurs, update the binding context
        // if (oParameters.name !== "services") {
        //     return;
        // }
    },
    
    onAfterDetailNavigate : function() {
     //this.byId("idSplitApp").hideMaster(); 
    }

});