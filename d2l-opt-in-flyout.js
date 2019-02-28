import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'd2l-typography/d2l-typography.js';
import './internal/flyout-impl.js';

class OptInFlyout extends PolymerElement {

	static get is() {
		return 'd2l-opt-in-flyout';
	}

	static get template() {
		const template = html`
			<style include="d2l-typography">
				flyout-impl { font-size: 20px; }
			</style>
			<flyout-impl class="d2l-typography" open="{{open}}" title="[[title]]" short-description="[[shortDescription]]" long-description="[[longDescription]]" tab-position="[[tabPosition]]" tutorial-link="[[tutorialLink]]" help-docs-link="[[helpDocsLink]]"></flyout-impl>
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
			tutorialLink: String,
			helpDocsLink: String
		};
	}

}

customElements.define( OptInFlyout.is, OptInFlyout );
