import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'd2l-typography/d2l-typography.js';
import './internal/flyout-impl.js';

class OptOutFlyout extends PolymerElement {

	static get is() {
		return 'd2l-opt-out-flyout';
	}

	static get template() {
		const template = html`
			<style include="d2l-typography">
				flyout-impl { font-size: 20px; }
			</style>
			<flyout-impl class="d2l-typography" opt-out="" open="{{open}}" title="[[title]]" short-description="[[shortDescription]]" long-description="[[longDescription]]" tab-position="[[tabPosition]]" tutorial-link="[[tutorialLink]]" help-docs-link="[[helpDocsLink]]" hide-reason="[[hideReason]]" hide-feedback="[[hideFeedback]]" no-transform="[[noTransform]]"><slot></slot></flyout-impl>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			open: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			title: String,
			shortDescription: String,
			longDescription: String,
			tabPosition: String,
			noTransform: Boolean,
			tutorialLink: String,
			helpDocsLink: String,
			hideReason: Boolean,
			hideFeedback: Boolean
		};
	}

}

customElements.define(OptOutFlyout.is, OptOutFlyout);
