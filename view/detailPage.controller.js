sap.ui.controller("sap.ui.demo.logbook.view.detailPage", {

	getEventBus : function () {
		return this.getOwnerComponent().getEventBus();
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap.ui.demo.logbook.view.detailPage
*/
	onInit: function() {
		var sPath = this.buildPath("0");
		var oView = this.getView();
		oView.bindElement(sPath);
		
        var oTable = this.byId("tripsTable");
        oTable.bindContext(sPath + "/trips");
		oTable.bindElement(sPath);

        this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();

		if(sap.ui.Device.system.phone) {
			//don't wait for the master on a phone
			this.oInitialLoadFinishedDeferred.resolve();
 		} else {
 			this.getView().setBusy(true);
 			this.getEventBus().subscribe("Master", "InitialLoadFinished", this.onMasterLoaded, this);
		}

		this.router.attachRoutePatternMatched(this.onRouteMatched, this);
		
	},

	onMasterLoaded :  function (sChannel, sEvent, oData) {
		this.bindView(oData.oListItem.getBindingContext().getPath());
		this.getView().setBusy(false);
		this.oInitialLoadFinishedDeferred.resolve();
	},

    onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();

		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
			// when detail navigation occurs, update the binding context
			if (oParameters.name === "details") { 
    			this.bindView(this.buildPath(oEvent.getParameter("arguments").year));
			}
		}, this));

	},
	
	buildPath : function(year) {
	    return "/logbooks/" + year;
	},
	
	bindView : function (sPath) {
		var oView = this.getView();
		oView.bindElement(sPath);

        var oTable = this.byId("tripsTable");
        oTable.bindElement(sPath);

		//Check if the data is already on the client
		if(!oView.getModel().getData(sPath)) {

			// Check that the logbook specified actually was found.
			oView.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {
				var oData = oView.getModel().getData(sPath);
				if (!oData) {
					this.showEmptyView();
					this.fireDetailNotFound();
				} else {
					this.fireDetailChanged(sPath);
				}
			}, this));
 		} else {
 			this.fireDetailChanged(sPath);
		}
	},
	
 	fireDetailChanged : function (sPath) {
 		this.getEventBus().publish("Detail", "Changed", { sPath : sPath });
 	},

	fireDetailNotFound : function () {
		this.getEventBus().publish("Detail", "NotFound");
	},

	onNavBack : function() {
		// This is only relevant when running on phone devices
		this.router.myNavBack("splitApp");
	}

});