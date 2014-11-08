sap.ui.controller("sap.ui.demo.logbook.view.masterPage", {

	getEventBus : function () {
		return this.getOwnerComponent().getEventBus();
	},

	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/

	onInit: function() {
        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);

        // following structure taken from best practices sample
		this.oEventBus = this.getEventBus();
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();

		this.getView().byId("logbookList").attachEventOnce("updateFinished", this.updateFinished, this);

		//on phones, we will not have to select anything in the list so we don't need to attach to events
		if (sap.ui.Device.system.phone) {
			return; // <<<<====================================================
		}

		sap.ui.core.routing.Router.getRouter("appRouter").attachRoutePatternMatched(this.onRouteMatched, this);

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
		this.getRouter().myNavToWithoutHash({ 
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
 	    console.log("onDetailChanged: " + oData.sPath);
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

	selectDetail : function() {
		if (!sap.ui.Device.system.phone) {
			var oList = this.getView().byId("logbookList");
			var aItems = oList.getItems();
			if (aItems.length && !oList.getSelectedItem()) {
				oList.setSelectedItem(aItems[0], true);
				this.showDetail(aItems[0]);
			}
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
		sap.ui.core.UIComponent.getRouterFor(this).navTo("details", {
			from: "splitApp",
			year: oItem.getBindingContextPath().substr(10)
		}, bReplace);
	},
	
	onNewTrip : function() {
	    sap.ui.core.routing.Router.getRouter("appRouter").navTo("newTrip");
	},
	
	quitSplitApp : function() {
	    sap.ui.core.routing.Router.getRouter("appRouter").myNavBack("tiles");
	}
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap.ui.demo.logbook.view.masterPage
*/
//	onExit: function() {
//
//	}

});
