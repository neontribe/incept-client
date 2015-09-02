window.childWindow = null;

var app = {
	insideWebView: window.location.protocol === 'file:',
	//childWindow: null,

	initialize: function () {
		this.bindEvents();
	},

	bindEvents: function () {
		if (this.insideWebView) {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		} else {
			this.onDeviceReady();
		}
	},

	onDeviceReady: function () {
		if (this.insideWebView) {
			window.open = cordova.InAppBrowser.open;
		}

		var anchors = document.querySelectorAll('[target="_inappbrowser"]');
		var self = this;

		for (var i = 0; i < anchors.length; i++) {
			var elem = anchors[i];
			elem.onclick = function (evt) {
				window.childWindow = window.open(evt.target.href, '_blank');
				window.childWindow.addEventListener('loadstart', function (evt) { console.log(evt); });
				//console.log(evt);
				return false;
			};
		}
	}
};

app.initialize();