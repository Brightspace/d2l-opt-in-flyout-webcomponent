import '@polymer/polymer/polymer-legacy.js';
import './document-properties.js';
import '../lang/ar.js';
import '../lang/de.js';
import '../lang/en.js';
import '../lang/es.js';
import '../lang/fr.js';
import '../lang/ja.js';
import '../lang/ko.js';
import '../lang/nb.js';
import '../lang/nl.js';
import '../lang/pt.js';
import '../lang/sv.js';
import '../lang/tr.js';
import '../lang/zh-TW.js';
import '../lang/zh.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OptInFlyout = window.D2L.PolymerBehaviors.OptInFlyout || {};

/** @polymerBehavior D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior */
D2L.PolymerBehaviors.OptInFlyout.TranslateBehaviorImpl = {

	properties: {

		translate: {
			type: Function,
			computed: '_getTranslateFunction(documentLanguage,documentFallbackLanguage)'
		}

	},

	_getTranslateFunction: function(documentLanguage, documentFallbackLanguage) {
		var tryGetTerm = function(langPack, langTerm) {
			var langPath = langTerm.split('.');
			langPath.forEach(function(langPart) {
				if (!langPack || typeof langPack !== 'object') {
					return null;
				}
				langPack = langPack[langPart];
			});

			if (typeof langPack !== 'string') {
				return null;
			}

			return langPack;
		};

		return function(langTag, fallbackLangTag, langTerm) {
			/* eslint-disable no-constant-condition */
			while (true) {
				var languagePack = this['translations_' + langTag];
				var translation = tryGetTerm(languagePack, langTerm);
				if (translation) {
					return translation;
				} else if (langTag.indexOf('-') > -1) {
					langTag = langTag.substring(0, langTag.indexOf('-'));
				} else if (fallbackLangTag) {
					langTag = fallbackLangTag;
					fallbackLangTag = null;
				} else if (langTag !== 'en') {
					langTag = 'en';
				} else {
					return null;
				}
			}
		}.bind(this, documentLanguage, documentFallbackLanguage);
	}

};

/** @polymerBehavior */
D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior = [
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehaviorImpl,
	D2L.PolymerBehaviors.OptInFlyout.DocumentProperties,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangArBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangDeBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangEnBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangEsBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangFrBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangJaBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangKoBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangNbBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangNlBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangPtBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangSvBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangTrBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangZhBehavior,
	D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior.LangZhTwBehavior
];
