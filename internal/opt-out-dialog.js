import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import './opt-out-reason-selector.js';
import TranslateBehavior from './translate-behaviour.js';

class OptOutDialog extends mixinBehaviors(TranslateBehavior, PolymerElement) {

	static get is() {
		return 'opt-out-dialog';
	}

	static get template() {
		const template = html`
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
					background-color: #ffffff;
					height: 100%;
					opacity: 0.7;
					position: absolute;
					width: 100%;
					z-index: 1;
				}

				.dialog {
					background-color: #ffffff;
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
					margin-bottom: 1rem;
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
				<span tabindex="0" on-focus="_shiftToLast"/>
				<label id="title-label">[[translate('Feedback.Title')]]</label>
				<br><br>
				<div hidden="[[hideReason]]">
					<label id="reason-label">[[translate('Feedback.ReasonLabel')]]</label>
					<opt-out-reason-selector id="reason-selector" aria-labelledby="reason-label" selected="{{_reason}}" dir$="[[documentTextDirection]]"><slot></slot></opt-out-reason-selector>
				</div>
				<div hidden="[[hideFeedback]]">
					<label id="feedback-label">[[translate('Feedback.FeedbackLabel')]]</label>
					<d2l-input-textarea id="feedback" aria-labelledby="feedback-label" rows="4" max-rows="4"></d2l-input-textarea>
				</div>
				<div>
					<d2l-button id="done-button" primary="" on-click="_confirm">[[translate('Done')]]</d2l-button>
					<d2l-button on-click="_cancel">[[translate('Cancel')]]</d2l-button>
				</div>
				<d2l-button-icon icon="d2l-tier1:close-small" id="close-button" class="close-button" on-click="_cancel" text="[[translate('Close')]]" dir$="[[documentTextDirection]]"></d2l-button-icon>
				<span tabindex="0" on-focus="_shiftToFirst"/>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
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
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this._setFocus();
	}

	_cancel() {
		this.dispatchEvent(
			new CustomEvent(
				'cancel', {
					bubbles: true,
					composed: true
				}
			)
		);
	}

	_confirm() {
		this.dispatchEvent(
			new CustomEvent(
				'confirm', {
					bubbles: true,
					composed: true,
					detail: {
						reason: this._reason || '',
						feedback: (this.$.feedback.value || '').trim()
					}
				}
			)
		);
	}

	_setFocus() {
		if (!this.hideReason) {
			this.$['reason-selector'].focus();
		} else if (!this.hideFeedback) {
			this.$['feedback'].focus();
		} else {
			this.$['done-button'].focus();
		}
	}

	_shiftToFirst() {
		this._setFocus();
	}

	_shiftToLast() {
		this.$['close-button'].focus();
	}

}

customElements.define(OptOutDialog.is, OptOutDialog);
