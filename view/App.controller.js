sap.ui.controller("sap.ui.demo.logbook.view.App", {

	onInit: function() {
	    
	    if (!jQuery.support.touch) { 
            // apply compact mode if touch is not supported
            // as the "App" is the root view, all views will inherit this property. 
            this.getView().addStyleClass("sapUiSizeCompact");
        }

    }

});