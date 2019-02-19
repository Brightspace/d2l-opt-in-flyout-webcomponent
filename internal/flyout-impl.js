import '@polymer/polymer/polymer-legacy.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-button/d2l-button.js';
import 's-html/s-html.js';
import './opt-out-dialog.js';
import './translate-behaviour.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="flyout-impl">
	<template strip-whitespace="">
		<style>
			:host {
				height: 100%;
				overflow: hidden;
				pointer-events: none;
				position: absolute;
				width: 100%;
				@apply --d2l-body-standard-text;
			}

			#flyout {
				background-color: white;
				border-bottom: 1px solid var(--d2l-color-mica);
				box-sizing: border-box;
				overflow: visible;
				padding-bottom: 2rem;
				pointer-events: auto;
				position: var(--custom-element-position, absolute);
				top: var(--custom-element-top, 0);
				width: 100%;
				z-index: var(--custom-element-z-index, 900);
			}

			#flyout.flyout-opened {
				transition: transform 0.2s ease-out;
			}

			#flyout.flyout-closed {
				transition: transform 0.2s ease-in;
			}

			.flyout-opened {
				transform: translateY(0);
			}
			.flyout-closed {
				transform: translateY(-100%);
			}

			.flyout-content {
				text-align: center;
			}

			.flyout-content h1 {
				@apply --d2l-heading-1;
				margin-bottom: 1.2rem;
			}

			.flyout-text {
				margin-bottom: 1.5rem;
				margin-left: auto;
				margin-right: auto;
			}

			#short-description {
				margin-bottom: 0.5rem;
				margin-top: 0;
			}

			#long-description {
				margin: auto;
				margin-bottom: 0;
				max-width: 800px;
			}

			.flyout-tutorial {
				margin: auto;
				margin-top: 0.5em;
			}

			.flyout-tutorial a {
				color: var(--d2l-color-celestine);
				text-decoration: none;
			}

			.flyout-tutorial a:hover, .flyout-tutorial a:focus {
				text-decoration: underline;
			}

			.flyout-buttons {
				margin-left: auto;
				margin-right: auto;
			}

			.flyout-buttons d2l-button {
				margin-left: 0.5rem;
				margin-right: 0.5rem;
			}

			.flyout-tab-container {
				height: 1rem;
				left: 50%;
				max-width: 1230px;
				pointer-events: none;
				position: absolute;
				top: 100%;
				transform: translateX(-50%);
				width: 100%;
				overflow: hidden;
				padding-bottom: 4px;
			}

			.flyout-tab {
				background-color: white;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 0 0 8px 8px;
				border-top: none;
				box-sizing: border-box;
				cursor: pointer;
				height: 1rem;
				padding: 1px;
				pointer-events: auto;
				position: absolute;
				text-align: center;
				top: 0;
				width: 5rem;
			}

			.flyout-tab:hover, .flyout-tab:focus {
				background-color: var(--d2l-color-gypsum);
			}

			.flyout-tab:focus {
				border-color: rgba(0, 111, 191, 0.4);
  				border-style: solid;
  				border-width: 0 1px 1px 1px;
  				box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
			}

			.flyout-tab:active, .flyout-tab:focus {
				outline: 0;
			}

			.flyout-tab > d2l-icon {
				margin: auto;
				vertical-align: top !important;
			}
		</style>

		<template is="dom-if" if="[[_optOutDialogOpen]]" restamp="true">
			<opt-out-dialog on-cancel="_cancelOptOut" on-confirm="_confirmOptOut" hide-reason="[[hideReason]]" hide-feedback="[[hideFeedback]]"><slot></slot></opt-out-dialog>
		</template>
		<div id="flyout" role="dialog" aria-labelledby="title" aria-describedby="description" class$="[[_getFlyoutClass(_visibleState)]]">
			<div class="flyout-content" style$="[[_getContentStyle(_visibleState)]]">
				<div class="flyout-text">
					<h1 id="title">[[title]]</h1>
					<p id="short-description" hidden="[[!shortDescription]]">
						<s-html html="[[shortDescription]]"></s-html>
					</p>
					<p id="long-description" hidden="[[!longDescription]]">
						<s-html html="[[longDescription]]"></s-html>
					</p>
					<p class="flyout-tutorial">

						<template is="dom-if" if="[[_checkNumberOfLinks(tutorialLink,helpDocsLink,1)]]">
							<span>[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,0)]]</span>
							<a href="[[_getTutorialLink(translate,tutorialLink,helpDocsLink,0)]]" target="_blank" rel="noopener">
								[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,1)]]
							</a>
							<span>[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,2)]]</span>
						</template>

						<template is="dom-if" if="[[_checkNumberOfLinks(tutorialLink,helpDocsLink,2)]]">
							<span>[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,0)]]</span>
							<a href="[[_getTutorialLink(translate,tutorialLink,helpDocsLink,0)]]" target="_blank" rel="noopener">
								[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,1)]]
							</a>
							<span>[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,2)]]</span>
							<a href="[[_getTutorialLink(translate,tutorialLink,helpDocsLink,1)]]" target="_blank" rel="noopener">
								[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,3)]]
							</a>
							<span>[[_getTutorialTextPart(translate,tutorialLink,helpDocsLink,4)]]</span>
						</template>
					</p>
				</div>
				<div class="flyout-buttons">
					<d2l-button primary="" on-click="_clickOptIn">[[_primaryButtonText]]</d2l-button>
					<d2l-button on-click="_clickOptOut">[[_secondaryButtonText]]</d2l-button>
				</div>
			</div>
			<d2l-offscreen>
				<label id="tab-label">[[translate('Close')]]</label>
			</d2l-offscreen>
			<div class="flyout-tab-container">
				<button class="flyout-tab" style$="[[_getTabStyle(tabPosition,documentTextDirection, noTransform)]]" tabindex="0" aria-labelledby="tab-label" on-click="_clickTab">
					<d2l-icon icon="[[_getTabIcon(_visibleState)]]"></d2l-icon>
				</button>
			</div>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'flyout-impl',

	properties: {
		optOut: {
			type: Boolean,
			value: false
		},
		open: {
			type: Boolean,
			value: false,
			reflectToAttribute: true,
			observer: '_openChanged'
		},
		title: String,
		shortDescription: {
			type: String,
			value: ''
		},
		longDescription: {
			type: String,
			value: ''
		},
		tabPosition: {
			type: String,
			value: 'right'
		},
		noTransform: {
			type: Boolean,
			value: false
		},
		tutorialLink: {
			type: String,
			value: null
		},
		helpDocsLink: {
			type: String,
			value: null
		},
		_optOutDialogOpen: {
			type: Boolean,
			value: false
		},
		_primaryButtonText: {
			type: String,
			computed: '_getPrimaryButtonText(translate,optOut)'
		},
		_secondaryButtonText: {
			type: String,
			computed: '_getSecondaryButtonText(translate,optOut)'
		},
		_visibleState: {
			type: String,
			value: 'CLOSED'
		},
		hideReason: Boolean,
		hideFeedback: Boolean
	},

	behaviors: [
		D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior
	],

	attached: function() {
		this._visibleState = this.open ? 'OPENED' : 'CLOSED';

		// Polymer doesn't correctly support this event, so we have to add it manually
		this._onTransitionComplete = this._onTransitionComplete.bind(this);
		this.$.flyout.addEventListener('transitionend', this._onTransitionComplete);
	},

	detached: function() {
		this.$.flyout.removeEventListener('transitionend', this._onTransitionComplete);
	},

	_checkNumberOfLinks: function(tutorialLink, helpDocsLink, expectedNumber) {
		var result;
		if (tutorialLink && helpDocsLink) {
			result = 2;
		} else if (tutorialLink || helpDocsLink) {
			result = 1;
		} else {
			result = 0;
		}
		return result === expectedNumber;
	},

	_getPrimaryButtonText: function(translate, optOut) {
		return translate(optOut ? 'LeaveOn' : 'TurnOn');
	},

	_getSecondaryButtonText: function(translate, optOut) {
		return translate(optOut ? 'TurnOff' : 'LeaveOff');
	},

	_openChanged: function(open, previousValue) {
		if (open && this._visibleState === 'CLOSED' || this._visibleState === 'CLOSING') {
			this._visibleState = 'OPENING';
		} else if (!open && this._visibleState === 'OPENED' || this._visibleState === 'OPENING') {
			this._visibleState = 'CLOSING';
		}

		if (previousValue !== undefined) {
			this.fire(open ? 'flyout-opened' : 'flyout-closed');
		}
	},

	_onTransitionComplete: function(event) {
		if (event.target.id !== 'flyout' || event.propertyName !== 'transform') {
			return null;
		}

		if (this._visibleState === 'OPENING') {
			this._visibleState = 'OPENED';
		} else if (this._visibleState === 'CLOSING') {
			this._visibleState = 'CLOSED';
		}
	},

	_clickTab: function() {
		if (this._visibleState === 'OPENED' || this._visibleState === 'CLOSED') {
			this.open = !this.open;
		}
	},

	_clickOptIn: function() {
		this.fire('opt-in');
		this.open = false;
	},

	_clickOptOut: function() {
		if (this.optOut) {
			this._optOutDialogOpen = true;
		} else {
			this.fire('opt-out');
			this.open = false;
		}
	},

	_cancelOptOut: function(event) {
		this._optOutDialogOpen = false;
		event.stopPropagation();
	},

	_confirmOptOut: function(event) {
		this._optOutDialogOpen = false;
		this.fire('opt-out', event.detail);
		this.open = false;
		event.stopPropagation();
	},

	_getContentStyle: function(visibleState) {
		return visibleState === 'CLOSED' ? 'visibility: hidden;' : 'visibility: visible;';
	},

	_getFlyoutClass: function(visibleState) {
		if (visibleState === 'OPENING' || visibleState === 'OPENED') {
			return 'flyout-opened';
		} else {
			return 'flyout-closed';
		}
	},

	_getTabStyle: function(position, documentTextDirection, noTransform) {
		var rtl = documentTextDirection === 'rtl';

		if (position === 'left') {
			position = 'calc(2.5rem + 15px)';
		} else if (position === 'right' || position === 'default' || !position) {
			position = 'calc(2.5rem + 15px)';
			rtl = !rtl;
		} else if (position === 'center' || position === 'centre') {
			position = '50%';
		} else if (!/^\d+(?:\.\d+)?%$/.test(position)) {
			/* eslint-disable no-console */
			console.warn('Invalid position supplied to opt-in flyout');
			position = 'calc(2.5rem + 15px)';
			rtl = !rtl;
		}

		var side = rtl ? 'right' : 'left';
		var shift = rtl ? '50%' : '-50%';

		var tabStyle = side + ': ' + position + ';';

		if (noTransform) {
			return tabStyle;
		}

		return tabStyle + ' transform: translateX(' + shift + ');';
	},

	_getTabIcon: function(visibleState) {
		if (visibleState === 'CLOSED' || visibleState === 'CLOSING') {
			return 'd2l-tier1:chevron-down';
		} else {
			return 'd2l-tier1:chevron-up';
		}
	},

	_getTutorialTextPart: function(translate, tutorialLink, helpDocsLink, i) {
		if (tutorialLink && helpDocsLink) {
			var tutorialHelpMessage = translate('TutorialAndHelpMessage');
			return tutorialHelpMessage.split(/\*|~/)[i] || '';
		} else if (tutorialLink || helpDocsLink) {
			var individualMessage = translate(tutorialLink ? 'TutorialMessage' : 'HelpMessage');
			return individualMessage.split('*')[i] || '';
		} else {
			return null;
		}
	},

	_getTutorialLink: function(translate, tutorialLink, helpDocsLink, i) {
		if (tutorialLink && helpDocsLink) {
			var translation = translate('TutorialAndHelpMessage');
			var videoFirst = translation.indexOf('*') < translation.indexOf('~');

			var links = videoFirst ? [ tutorialLink, helpDocsLink ] : [ helpDocsLink, tutorialLink ];
			return links[i];
		}
		return tutorialLink || helpDocsLink || null;
	}

});
