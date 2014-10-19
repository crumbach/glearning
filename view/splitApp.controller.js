sap.ui.controller("sap.ui.demo.logbook.view.splitApp", {

    onInit : function() {
        if (!jQuery.support.touch) { 
            // apply compact mode if touch is not supported
            // as the "App" is the root view, all views will inherit this property. 
            this.getView().addStyleClass("sapUiSizeCompact");
        }

        var oSplitApp = this.getView().byId("idSplitApp");
        oSplitApp.addMasterPage(new sap.ui.view({id:"masterView", viewName:"sap.ui.demo.logbook.view.masterPage", type:sap.ui.core.mvc.ViewType.XML}));
        oSplitApp.addDetailPage(new sap.ui.view({id:"detailView", viewName:"sap.ui.demo.logbook.view.detailPage", type:sap.ui.core.mvc.ViewType.XML}));
        oSplitApp.setInitialMaster("masterView");
        oSplitApp.setInitialDetail("detailView");

    }

});