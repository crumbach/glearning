sap.ui.controller("sap.ui.demo.logbook.view.detailPage", {

	onInit: function() {
		var sPath = this.buildPath("0");
		var oView = this.getView();
		oView.bindElement(sPath);
		
        var oTable = this.byId("tripsTable");
        oTable.bindContext(sPath + "/trips");
		oTable.bindElement(sPath);

		sap.ui.core.routing.Router.getRouter("appRouter").attachRoutePatternMatched(this.onRouteMatched, this);
	},

    onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();

		// when detail navigation occurs, update the binding context
		if (oParameters.name === "details") { 
			this.bindView(this.buildPath(oEvent.getParameter("arguments").year));
		}
	},
	
	buildPath : function(year) {
	    return "/logbooks/" + year;
	},
	
	bindView : function (sPath) {
		var oView = this.getView();
		oView.bindElement(sPath);

        var oTable = this.byId("tripsTable");
        oTable.bindElement(sPath);

	},
	
	onNavBack : function() {
		// This is only relevant when running on phone devices
		var bReplace = true;  // otherwise we go backwards with a forward history
		sap.ui.core.UIComponent.getRouterFor(this).myNavBack("splitApp", {}, bReplace);
		                                                                
	}

});