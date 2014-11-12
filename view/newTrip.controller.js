sap.ui.controller("sap.ui.demo.logbook.view.newTrip", {
    // dates selected on the calendar are stored on the model as "selectedDates"
    // only upon save, these are moved to the actual logbook 

    oFormatYyyymmdd: null,

    onInit : function() {
        this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
        
        var oLegend = this.getView().byId("idLegend");
        oLegend.addItem(new sap.ui.unified.CalendarLegendItem({
            text : "Logged trips"
        }));
    },
    
    onBeforeRendering : function() {

		this.getView().byId("selectedDatesList").attachEventOnce("updateFinished", this.updateFinished, this);
    },
    
    updateFinished : function() {
		this.initCalendar();
	},
		
	initCalendar : function() {
        var oCalendar = this.getView().byId("calendar");
        oCalendar.removeAllSelectedDates();
            
	    var oModel = this.getView().byId("selectedDatesList").getModel();
	    if (oModel) {
            var logbooks = oModel.getData().logbooks;
            for (var i = 0; i < logbooks.length; i++) {
                for (var j = 0; j < logbooks[i].trips.length; j++) {
                    oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
                        type:      sap.ui.unified.CalendarDayType.Type01,
                        startDate: new Date(logbooks[i].trips[j].datum)
                    }));
                }
            }
	    }
	},

	onNavBack : function() {
        this.cancelTrip();
	},
	
	onSave : function() {
	    // get base model
	    var oModel = this.getView().getModel();
	    var oData = oModel.getData("selectedDates");

        // get selected dates from model
        var aCalendarDates = oData.selectedDates;
        var oDate = null;
        if (aCalendarDates.length > 0) {
            // extend base dates with calendar dates
            for (var i = 0; i < aCalendarDates.length; i++) {
                oDate = new Date(aCalendarDates[i].datum);
                var logbook = this.getLogbook(oData.logbooks, oDate.getFullYear());
                // logbook.trips.push({"datum": aCalendarDates[i].datum });
                logbook.trips.push({"datum": aCalendarDates[i].datum });
            }
            // replace selected dates in base model
            oModel.setData({"logbooks": oData.logbooks}, true);
        }
        
        // finally navigate to splitApp
        this._clearModel(true);
        sap.ui.core.routing.Router.getRouter("appRouter").navTo("splitApp", { from: "newTrip" } );
    },

    getLogbook : function(logbooks, year) {
    	// Does the logbook exist for this year?
        for (var i = 0; i < logbooks.length; i++) {
            if (year.toString() === logbooks[i].year) {
                return logbooks[i];
            }
        }
		// We have to create a new logbooks
		logbooks.push({
			"year" : year,
			"number"  : "1",
			"trips" : []
		});
		return logbooks[logbooks.length - 1];
    },
    
	onCancel : function() {
	    this.cancelTrip();
	},
	
	cancelTrip : function() {
        sap.m.MessageToast.show("Logging canceled");
        this._clearModel(true);
		sap.ui.core.UIComponent.getRouterFor(this).myNavBack("tiles");
	},

	_clearModel : function(clearCalendar) {
	    // start with an empty calendar
	    if (clearCalendar === true) {
            var oCalendar = this.getView().byId("calendar");
            oCalendar.removeAllSelectedDates();
	    }
	    
        // This does not work as it either merges in selectedDates (no effect)
        // or replaces, but then logbooks are lost
        var oModel = this.getView().getModel();
        var aSelectedDates = oModel.getData().selectedDates;
        while (aSelectedDates && aSelectedDates.length > 0) {
            aSelectedDates.splice(0, 1); // delete all, so simply delete first one always
        }
        oModel.setData({"selectedDates": aSelectedDates}, true );
	},

    calendarSelect : function (oEvent) {
	    // get base model
	    var oModel = this.getView().getModel();
        // we always get the full list of selected dates, so we start with an initial one
        var aSelectedDates = new Array();
        this._clearModel(false);

        // extend base dates with calendar dates
	    var aCalendarDates = oEvent.oSource.getSelectedDates();
        for (var i = 0; i < aCalendarDates.length; i++) {
            aSelectedDates.push({"datum": this.oFormatYyyymmdd.format(aCalendarDates[i].getStartDate()) });
        }

        // replace selected dates in base model
        oModel.setData({"selectedDates": aSelectedDates}, true );
    }
});