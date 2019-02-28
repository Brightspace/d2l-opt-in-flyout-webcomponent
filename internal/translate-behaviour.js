import DocumentPropertiesBehavior from './document-properties.js';

import LangAr from '../lang/ar.js';
import LangDe from '../lang/de.js';
import LangEn from '../lang/en.js';
import LangEs from '../lang/es.js';
import LangFr from '../lang/fr.js';
import LangJa from '../lang/ja.js';
import LangKo from '../lang/ko.js';
import LangNb from '../lang/nb.js';
import LangNl from '../lang/nl.js';
import LangPt from '../lang/pt.js';
import LangSv from '../lang/sv.js';
import LangTr from '../lang/tr.js';
import LangTrTw from '../lang/zh-TW.js';
import LangZh from '../lang/zh.js';

const TranslateBehavior = {

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

export default [
	TranslateBehavior,
	DocumentPropertiesBehavior,
	LangAr,
	LangDe,
	LangEn,
	LangEs,
	LangFr,
	LangJa,
	LangKo,
	LangNb,
	LangNl,
	LangPt,
	LangSv,
	LangTr,
	LangTrTw,
	LangZh
];
