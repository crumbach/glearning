sap.ui.controller("sap.ui.demo.logbook.view.masterPage", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/

	onInit: function() {
		this.router = sap.ui.core.routing.Router.getRouter("appRouter");
        this.router.attachRouteMatched(this.onRouteMatched, this);

        // following structure taken from best practices sample
		this.oEventBus = this.getOwnerComponent().getEventBus();
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();

		this.getView().byId("logbookList").attachEventOnce("updateFinished", this.updateFinished, this);

		//on phones, we will not have to select anything in the list so we don't need to attach to events
		if (sap.ui.Device.system.phone) {
			return; // <<<<====================================================
		}

		this.router.attachRoutePatternMatched(this.onRouteMatched, this);

		this.oEventBus.subscribe("Detail", "Changed", this.onDetailChanged, this);
		this.oEventBus.subscribe("Detail", "NotFound", this.onNotFound, this);
	},

    updateFinished : function() {
		this.oInitialLoadFinishedDeferred.resolve();
		this.oEventBus.publish("Master", "InitialLoadFinished", { oListItem : this.getView().byId("logbookList").getItems()[0] });
	},
		
    onRouteMatched : function(oEvent) {
		if (oEvent.getParameter("name") !== "splitApp") {
			return;
		}

		//Load the detail view in desktop
		this.router.myNavToWithoutHash({ 
			currentView : this.getView(),
			targetViewName : "sap.ui.demo.logbook.view.detailPage",
			targetViewType : "XML"
		});

		//Wait for the list to be loaded once
		this.waitForInitialListLoading(function () {
			//On the empty hash select the first item
			this.selectFirstItem();
		});
	},

	waitForInitialListLoading : function (fnToExecute) {
		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(fnToExecute, this));
	},

	onDetailChanged : function (sChanel, sEvent, oData) {
		var sPath = oData.sPath;

		//Wait for the list to be loaded once
		this.waitForInitialListLoading(function () {
			var oList = this.getView().byId("logbookList");

			var oSelectedItem = oList.getSelectedItem();
			// the correct item is already selected
			if(oSelectedItem && oSelectedItem.getBindingContext().getPath() === sPath) {
				return;
			}

			var aItems = oList.getItems();

			for (var i = 0; i < aItems.length; i++) {
				if (aItems[i].getBindingContext().getPath() === sPath) {
					oList.setSelectedItem(aItems[i], true);
					break;
				}
			}
		});
	},

	onNotFound : function () {
		this.getView().byId("logbookList").removeSelections();
	},

	selectFirstItem : function() {
		var oList = this.getView().byId("logbookList");
		var aItems = oList.getItems();
		if (aItems.length) {
			oList.setSelectedItem(aItems[0], true);
		}
	},

	onSelect: function(oEvent) {
		// Get the list item, either from the listItem parameter or from the event's
		// source itself (will depend on the device-dependent mode).
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},
	
	showDetail: function(oItem) {
		// If we're on a phone, include nav in history; if not, don't.
		var bReplace = jQuery.device.is.phone ? false : true;
		this.router.navTo("details", {
			from: "splitApp",
			year: oItem.getBindingContextPath().substr(10)
		}, bReplace);
	},
	
	onNewTrip : function() {
	    this.router.navTo("newTrip");
	},
	
	quitSplitApp : function() {
	    this.router.myNavBack("tiles");
	}
	
});
