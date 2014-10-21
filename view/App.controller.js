sap.ui.demo.logbook.util.Controller.extend("sap.ui.demo.logbook.view.App", {

	onInit: function() {

 		var view = this.getView();

// 		// to avoid scrollbars on desktop the root view must be set to block display
// 		view.setDisplayBlock(true);

// 		// apply compact mode if touch is not supported
// 		// as the "App" is the root view, all views will inherit this property. 
// 		if (!jQuery.support.touch) {
// 			view.addStyleClass("sapUiSizeCompact");
// 		}

// 		// Data is fetched here
// 		jQuery.ajax("ui5logbook/listMaster.json", { // load the data from a relative URL (the Data.json file in the same directory)
// 			dataType: "json",
// 			success: function(data) {
// 				var oModel = new sap.ui.model.json.JSONModel(data);
// 				view.setModel(oModel);
// 			}
// 		});

// 		// remember the App Control
// 		this.app = view.byId("theApp");

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