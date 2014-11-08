sap.ui.controller("sap.ui.demo.logbook.view.App", {

	onInit: function() {
	    if (!jQuery.support.touch) { 
            // apply compact mode if touch is not supported
            // as the "App" is the root view, all views will inherit this property. 
            this.getView().addStyleClass("sapUiSizeCompact");
        }

 		var view = this.getView();

 		// to avoid scrollbars on desktop the root view must be set to block display
 		view.setDisplayBlock(true);

 		// apply compact mode if touch is not supported
 		// as the "App" is the root view, all views will inherit this property. 
 		if (!jQuery.support.touch) {
 			view.addStyleClass("sapUiSizeCompact");
 		}

// 		this.app.setHomeIcon({
// 			'phone': 'img/57_iPhone_Desktop_Launch.png',
// 			'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
// 			'tablet': 'img/72_iPad_Desktop_Launch.png',
// 			'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
// 			'favicon': 'img/favicon.ico',
// 			'precomposed': false
// 		});
    }

});