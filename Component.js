jQuery.sap.declare("sap.ui.demo.logbook.Component");
jQuery.sap.require("sap.ui.demo.logbook.MyRouter");

sap.ui.core.UIComponent.extend("sap.ui.demo.logbook.Component", {
	metadata : {
		name : "Driver Logbook",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},

		rootView : "sap.ui.demo.logbook.view.App",

		config : {
			resourceBundle : "i18n/messageBundle.properties"
		},

		routing : {
			config : {
				routerClass : sap.ui.demo.logbook.MyRouter, viewType : "XML",
				viewPath : "sap.ui.demo.logbook.view",
				targetControl : "logbookApp", 
				targetAggregation : "pages",
				transition: "slide",
				clearTarget : false
			},
			routes : [
				{
					name : "tiles",
					pattern : "",
					view : "tiles"
				},
				{
				    name : "splitApp",
				    pattern : "logbook",
				    view : "splitApp",
				    subroutes : [ 
				        {
				            name : "master",
				            pattern : "logbook/",
				            view : "masterPage",
            				targetControl : "idSplitApp", 
            				targetAggregation : "masterPages",
            				transition: "show"
				        },
				        {
				            name : "details",
				            pattern : "logbook/{year}",
				            view : "detailPage",
            				targetControl : "idSplitApp", 
            				targetAggregation : "detailPages",
            				transition: "show"
				        }
				    ]
			    },
				{
				    name : "newTrip",
				    pattern : "newtrip",
				    view : "newTrip"
				},
				{
					name : "catchallMaster",
				    pattern : "logbook",
					view : "splitApp",
					subroutes : [
						{
							pattern : ":all*:",
							name : "catchallDetail",
							view : "NotFound",
							transition : "slide"
						}
					]
				}

			]
		}
	},

	init : function() {
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		jQuery.sap.require("sap.ui.demo.logbook.MyRouter");
		
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

// 		var mConfig = this.getMetadata().getConfig();
// 		var responderOn = jQuery.sap.getUriParameters().get("responderOn");
		
		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
// 		var rootPath = jQuery.sap.getModulePath("sap.hana.xs.lm.pe.ui");

		// set i18n model
// 		var i18nModel = new sap.ui.model.resource.ResourceModel({
// 			bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
// 		});
// 		this.setModel(i18nModel, "i18n");
		
// 		// set process engine model
// 		var sServiceUrl = '/sap/hana/xs/lm/pe/public/display/engine.xsodata/';

// 		// start mock server
//         var oMockServer;
//         if (responderOn) {
//             jQuery.sap.require("sap.ui.core.util.MockServer");
//             oMockServer = new sap.ui.core.util.MockServer({
//                 rootUri: sServiceUrl
//             });
//             oMockServer.simulate("model/metadata.xml", "model/DEMO_HelloWorld/");
//             oMockServer.start();
//         }

// 		// Create and set domain model to the component
// 		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
// 		this.setModel(oModel);
        var oModel = new sap.ui.model.json.JSONModel("model/listMaster.json");
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
        //sap.ui.getCore().setModel(oModel);
        this.setModel(oModel);
        
        // set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		this.setModel(i18nModel, "i18n");

 		// Attache Request Failed Handler
         oModel.attachRequestFailed(this.oDataErrorHandling); 

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize();

	}

});
