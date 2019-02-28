import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class OptOutReason extends PolymerElement {

	static get is() {
		return 'd2l-opt-out-reason';
	}

	static get template() {
		return html`
			<style>
				:host {
					display: none;
				}
			</style>
		`;
	}

	static get properties() {
		return {
			key: String,
			text: String
		};
	}
}

customElements.define( OptOutReason.is, OptOutReason );
