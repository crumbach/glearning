sap.ui.controller("sap.ui.demo.logbook.view.newTrip", {
    // dates selected on the calendar are stored on the model as "selectedDates"
    // only upon save, these are moved to the actual logbook 
    
// 	onInit : function() {
// 	},

	onNavBack : function() {
        this.cancelTrip();
	},
	
	onSave : function() {
	    // get base model
        sap.m.MessageToast.show("Saving data");
	    var oModel = this.getView().getModel();
	    var oData = oModel.getData("selectedDates");
        var aSelectedDates = oData.selectedDates;

        // get selected dates on calendar        
        var oCalendar = this.getView().byId("selectionCalendar");
        var aCalendarDates = oCalendar.getSelectedDates();
        if (aCalendarDates.length > 0) {
            // extend base dates with calendar dates
            for (var i = 0; i < aCalendarDates.length; i++) {
                aSelectedDates.push({"datum": aCalendarDates[i] });
            }
            // replace selected dates in base model
            oModel.setData({"selectedDates": aSelectedDates}, true );
        }
        
        // finally navigate to splitApp
        this._clearModel();
        sap.ui.core.routing.Router.getRouter("appRouter").navTo("splitApp", { from: "newTrip" } );
    },

	onCancel : function() {
	    this.cancelTrip();
	},
	
	cancelTrip : function() {
        sap.m.MessageToast.show("Logging canceled");
        this._clearModel();
		sap.ui.core.UIComponent.getRouterFor(this).myNavBack("tiles");
	},

    onTapOnDate: function (oEvent) {
        sap.m.MessageToast.show("You tapped on " + oEvent.getParameters().date + " didSelect: " + oEvent.getParameters().didSelect);
        // add or remove? oEvent.getParameters().didSelect
        this._updateModel(oEvent.getParameters());
    },
    
	_clearModel : function() {
	    // start with an empty calendar
        var oCalendar = this.getView().byId("selectionCalendar");
        oCalendar.unselectAllDates();

        // This does not work as it either merges in selectedDates (no effect)
        // or replaces, but then logbooks are lost
        var oModel = this.getView().getModel();
        var aSelectedDates = oModel.getData().selectedDates;
        while (aSelectedDates.length > 0) {
            aSelectedDates.splice(0, 1); // delete all, so simply delete first one always
        }
        oModel.setData({"selectedDates": aSelectedDates}, true );
	},

    _updateModel: function (evtParameters) {
	    // get base model
	    var oModel = this.getView().getModel();
        var aSelectedDates = oModel.getData().selectedDates;
        if (!aSelectedDates) {
            aSelectedDates = new Array();
        }

        // extend base dates with calendar dates
        if (evtParameters.didSelect === true) {
            aSelectedDates.push({"datum": evtParameters.date });
        } else {
            for (var j = 0; j < aSelectedDates.length; j++) {
                if (aSelectedDates[j].datum === evtParameters.date) {
                    aSelectedDates.splice(j, 1);
                }
            }
        }

        // replace selected dates in base model
        oModel.setData({"selectedDates": aSelectedDates}, true );
        }
    }
);