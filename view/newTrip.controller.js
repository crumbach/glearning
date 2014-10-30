sap.ui.controller("sap.ui.demo.logbook.view.newTrip", {

	onInit : function() {
	    
		var oView = this.getView();
	},

	onNavBack : function(oEvent) {
	    sap.ui.core.routing.Router.getRouter("appRouter").myNavBack("tiles", { from : "newTrip"}, false);
	},
	
	onSave : function() {

	},

	onCancel : function() {
		sap.ui.core.UIComponent.getRouterFor(this).backWithoutHash(this.getView());
	},

    onTapOnDate: function (oEvent) {
        sap.m.MessageToast.show("You tapped on " + oEvent.getParameters().date + " didSelect: " + oEvent.getParameters().didSelect);
//        this._updateModel();
    },

    onChangeRange: function (oEvent) {
        sap.m.MessageToast.show("You selected a range of dates starting on: " + oEvent.getParameters().fromDate + " to: " + oEvent.getParameters().toDate);
//        this._updateModel();
    },

    _updateModel: function () {
        var oCalendar = this.getView().byId("selectionCalendar");
        var aSelectedDates = oCalendar.getSelectedDates();
        var strDate;
        var oData = {selectedDates: []};
        if (aSelectedDates.length > 0) {
            for (var i = 0; i < aSelectedDates.length; i++) {
                strDate = aSelectedDates[i];
                oData.selectedDates.push({Date: strDate });
                // Because of potential issues due to DST and the time in the night at which the change happens,
                // the recommended way to instantiate a Date object is:
                // var oDate = sap.me.Calendar.parseDate(strDate);
                // Do not rely on anything lower than the day unit in this Date object.
                // Hours, minutes, seconds, milliseconds must not be taken into account.

                // Since you are reading this, the explanation why the hours must not be taken into account.
                // Change your computer's time zone to Brasilia (UTC-3)
                // Open your favorite browser and create a Date object for October 19th, 2014:
                // var oTheDayBefore = new Date(2014, 9, 19);
                // Display 'oTheDayBefore'.
            }
            this.oModel.setData(oData);
        } else {
            this._clearModel();
        }
    },

    _clearModel: function () {
        this.oModel.setData({selectedDates: []});
    }	

});