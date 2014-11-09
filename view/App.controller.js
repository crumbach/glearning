sap.ui.controller("sap.ui.demo.logbook.view.App", {

	onInit: function() {
 		var view = this.getView();

 		// to avoid scrollbars on desktop the root view must be set to block display
 		view.setDisplayBlock(true);

 		// apply compact mode if touch is not supported
 		// as the "App" is the root view, all views will inherit this property. 
 		if (!jQuery.support.touch) {
 			view.addStyleClass("sapUiSizeCompact");
 		}
    }

});