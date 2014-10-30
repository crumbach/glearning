sap.ui.controller("sap.ui.demo.logbook.view.splitApp", {

    onInit : function() {

        var oSplitApp = this.getView().byId("idSplitApp");
        oSplitApp.addMasterPage(new sap.ui.view({id:"masterView", viewName:"sap.ui.demo.logbook.view.masterPage", type:sap.ui.core.mvc.ViewType.XML}));
        oSplitApp.addDetailPage(new sap.ui.view({id:"detailView", viewName:"sap.ui.demo.logbook.view.detailPage", type:sap.ui.core.mvc.ViewType.XML}));
        oSplitApp.setInitialMaster("masterView");
        oSplitApp.setInitialDetail("detailView");

    },
    
    onAfterDetailNavigate : function() {
     this.byId("idSplitApp").hideMaster(); 
    }

});