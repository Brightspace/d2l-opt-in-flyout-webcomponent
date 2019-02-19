import '@polymer/polymer/polymer-legacy.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-button/d2l-button.js';
import 'd2l-inputs/d2l-input-textarea.js';
import './opt-out-reason-selector.js';
import './translate-behaviour.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="opt-out-dialog">
	<template strip-whitespace="">
		<style>
			:host {
				height: 100%;
				overflow: hidden;
				pointer-events: auto;
				position: absolute;
				width: 100%;
				z-index: 950;
			}

			.opt-out-modal-fade {
				background-color: var(--d2l-color-white);
				height: 100%;
				opacity: 0.7;
				position: absolute;
				width: 100%;
				z-index: 1;
			}

			.dialog {
				background-color: var(--d2l-color-white);
				border: 1px solid var(--d2l-color-mica);
				border-radius: 0.3rem;
				box-shadow: 0 2px 12px rgba(86, 90, 92, 0.25);
				box-sizing: border-box;
				left: 50%;
				max-width: 680px;
				padding: 1rem;
				position: absolute;
				top: 7.5%;
				transform: translateX(-50%);
				width: 90%;
				z-index: 2;
			}

			label {
				display: block;
				margin-bottom: 0.5rem;
			}

			#title-label {
				display: inline;
				font-weight: bold;
				margin-bottom: 0;
			}

			d2l-input-textarea {
				height: 5rem;
				margin-bottom: 1rem;
				resize: none;
			}

			d2l-button {
				margin-right: 1rem;
			}

			.close-button {
				position: absolute;
				top: 0.6rem;
				right: 0.6rem;
			}

			.close-button[dir="rtl"] {
				left: 0.6rem;
				right: auto;
			}

		</style>

		<div class="opt-out-modal-fade"></div>
		<div class="dialog" role="dialog" arial-labelledby="title-label">
			<label id="title-label">[[translate('Feedback.Title')]]</label>
			<br><br>
			<div hidden="[[hideReason]]">
				<label id="reason-label">[[translate('Feedback.ReasonLabel')]]</label>
				<opt-out-reason-selector id="reason-selector" aria-labelledby="reason-label" selected="{{_reason}}" dir$="[[documentTextDirection]]"><slot></slot></opt-out-reason-selector>
			</div>
			<div hidden="[[hideFeedback]]">
				<label id="feedback-label">[[translate('Feedback.FeedbackLabel')]]</label>
				<d2l-input-textarea id="feedback" aria-labelledby="feedback-label"></d2l-input-textarea>
			</div>
			<div>
				<d2l-button primary="" on-click="_confirm">[[translate('Done')]]</d2l-button>
				<d2l-button on-click="_cancel">[[translate('Cancel')]]</d2l-button>
			</div>
			<d2l-button-icon icon="d2l-tier1:close-small" class="close-button" on-click="_cancel" text="[[translate('Close')]]" dir$="[[documentTextDirection]]"></d2l-button-icon>
		</div>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'opt-out-dialog',

	properties: {
		_reason: {
			type: String,
			value: null
		},
		hideReason: {
			type: Boolean,
			value: false
		},
		hideFeedback: {
			type: Boolean,
			value: false
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.OptInFlyout.TranslateBehavior
	],

	_cancel: function() {
		this.fire('cancel');
	},

	_confirm: function() {
		this.fire('confirm', {
			reason: this._reason || '',
			feedback: (this.$.feedback.value || '').trim()
		});
	},

});
