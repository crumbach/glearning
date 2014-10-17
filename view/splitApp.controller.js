jQuery.sap.require("sap.hana.xs.lm.pe.ui.util.Controller");

sap.hana.xs.lm.pe.ui.util.Controller.extend("sap.ui.demo.logbook.view.splitApp", {

    onInit : function() {
        if (!jQuery.support.touch) { 
            // apply compact mode if touch is not supported
            // as the "App" is the root view, all views will inherit this property. 
            this.getView().addStyleClass("sapUiSizeCompact");
        }
    }

});