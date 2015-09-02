var app = {
	insideWebView: window.location.protocol === 'file:',
	childWindowRef: null,

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

		var onSocialAuth = function (evt) {
			var m = evt.url.match(/\/auth\/result\?token=([\w.]+)/);
			if (m) {
				console.log(m[1]);
				self.childWindowRef.close();
				document.getElementById('notice').innerHTML = 'Your token is: ' + m[1];
			}
		};

		var onSocialAuthError = function (evt) {
			console.log(evt);
			self.childWindowRef.close();
			document.getElementById('notice').innerHTML = 'Error: ' + evt.message;
		};

		for (var i = 0; i < anchors.length; i++) {
			var elem = anchors[i];
			elem.onclick = function (evt) {
				self.childWindowRef = window.open(evt.target.href, '_blank', 'location=no');
				self.childWindowRef.addEventListener('loadstart', onSocialAuth);
				self.childWindowRef.addEventListener('loaderror', onSocialAuthError);
				return false;
			};
		}
	}
};

app.initialize();