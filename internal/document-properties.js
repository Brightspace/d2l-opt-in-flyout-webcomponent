const DocumentPropertiesBehavior = {

	properties: {

		documentLanguage: {
			type: String,
			value: 'en'
		},

		documentFallbackLanguage: {
			type: String,
			value: null
		},

		documentTextDirection: {
			type: String,
			value: 'ltr'
		}

	},

	attached: function() {
		var updateLang = function() {
			var fallbackLang = window.document.documentElement.getAttribute('data-lang-default') || null;
			var requestedLang = window.document.documentElement.getAttribute('lang') || fallbackLang || 'en';

			this.documentFallbackLanguage = fallbackLang ? fallbackLang.toLowerCase() : null;
			this.documentLanguage = requestedLang.toLowerCase();
		}.bind(this);

		var updateDir = function() {
			this.documentTextDirection = window.document.body.getAttribute('dir') || 'ltr';
		}.bind(this);

		var htmlElementObserver = new MutationObserver(updateLang);
		htmlElementObserver.observe(window.document.documentElement, {
			attributeFilter: [ 'lang', 'data-lang-default' ],
			attributeOldValue: false,
			attributes: true,
			characterData: false,
			childList: false,
			subtree: false
		});

		var bodyElementObserver = new MutationObserver(updateDir);
		bodyElementObserver.observe(window.document.body, {
			attributeFilter: [ 'dir' ],
			attributeOldValue: false,
			attributes: true,
			characterData: false,
			childList: false,
			subtree: false
		});

		this.__documentPropertyObservers = [
			htmlElementObserver,
			bodyElementObserver
		];

		updateLang();
		updateDir();
	},

	detached: function() {
		this.__documentPropertyObservers.forEach(function(observer) {
			observer.disconnect();
		});
	}

};

export default [ DocumentPropertiesBehavior ];
