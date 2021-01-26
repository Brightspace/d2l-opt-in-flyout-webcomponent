import { expect, fixture, html } from '@open-wc/testing';
import '../internal/opt-out-dialog.js';
import '../d2l-opt-out-reason.js';
import '@polymer/iron-test-helpers/mock-interactions.js';

const defaultOptionsFixture = html`<opt-out-dialog></opt-out-dialog>`;

const optionsFixture = html`<opt-out-dialog>
	<d2l-opt-out-reason key="test-1" text="Test Option 1"></d2l-opt-out-reason>
	<d2l-opt-out-reason key="test-2" text="Test Option 2"></d2l-opt-out-reason>
</opt-out-dialog>`;

const reasonHiddenFixture = html`<opt-out-dialog hide-reason>
	<d2l-opt-out-reason key="test-1" text="Test Option 1"></d2l-opt-out-reason>
	<d2l-opt-out-reason key="test-2" text="Test Option 2"></d2l-opt-out-reason>
</opt-out-dialog>`;

const feedbackHiddenFixture = html`<opt-out-dialog hide-feedback></opt-out-dialog>`;

describe('opt-out-dialog', () => {

	describe('defaults', () => {

		let flyout;

		beforeEach(async() => {
			flyout = await fixture(defaultOptionsFixture);
		});

		it('should contain a title', () => {
			const message = flyout.shadowRoot.querySelector('#title-label');
			expect(message.textContent).to.contain('Let us know how to improve!');
		});

		it('should contain opt-out-reason-selector', () => {
			const selector = flyout.shadowRoot.querySelector('opt-out-reason-selector');
			expect(selector).to.exist;
		});

		it('should contain feedback text input box', () => {
			const feedback = flyout.shadowRoot.querySelector('#feedback');
			expect(feedback).to.exist;
		});

		it('should contain cancel button', () => {
			const cancelButton = flyout.shadowRoot.querySelector('d2l-button:not([primary])');
			expect(cancelButton).to.exist;
		});

		it('should fire confirm event when reason selected and done clicked (no feedback)', done => {
			flyout.addEventListener('confirm', e => {
				expect(e.detail.reason).to.equal('PreferOldExperience');
				expect(e.detail.feedback).to.equal('');
				done();
			});

			const select = flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('select');
			MockInteractions.tap(select);
			flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('#selector').selectedIndex = 1;

			const evt = document.createEvent('HTMLEvents');
			evt.initEvent('change', false, true);
			select.dispatchEvent(evt);

			const doneButton = flyout.shadowRoot.querySelector('d2l-button[primary]');
			MockInteractions.tap(doneButton);
		});

		it('should fire confirm event when reason selected and done clicked with feedback', done => {
			const textFeedback = 'not a fan';

			flyout.addEventListener('confirm', e => {
				expect(e.detail.reason).to.equal('PreferOldExperience');
				expect(e.detail.feedback).to.equal(textFeedback);
				done();
			});

			const select = flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('select');
			MockInteractions.tap(select);
			flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('#selector').selectedIndex = 1;

			const feedback = flyout.shadowRoot.querySelector('d2l-input-textarea');
			feedback.value = textFeedback;

			const evt = document.createEvent('HTMLEvents');
			evt.initEvent('change', false, true);
			select.dispatchEvent(evt);

			const doneButton = flyout.shadowRoot.querySelector('d2l-button[primary]');
			MockInteractions.tap(doneButton);
		});

	});

	describe('options specified', () => {

		let flyout;

		beforeEach(async() => {
			flyout = await fixture(optionsFixture);
		});

		it('should contain the first option', done => {
			flyout.addEventListener('confirm', e => {
				expect(e.detail.reason).to.equal('test-1');
				done();
			});

			const select = flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('select');
			MockInteractions.tap(select);
			flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('#selector').selectedIndex = 1;

			const evt = document.createEvent('HTMLEvents');
			evt.initEvent('change', false, true);
			select.dispatchEvent(evt);

			const doneButton = flyout.shadowRoot.querySelector('d2l-button[primary]');
			MockInteractions.tap(doneButton);
		});

		it('should contain the second option', done => {
			flyout.addEventListener('confirm', e => {
				expect(e.detail.reason).to.equal('test-2');
				done();
			});

			const select = flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('select');
			MockInteractions.tap(select);
			flyout.shadowRoot.querySelector('opt-out-reason-selector').$$('#selector').selectedIndex = 2;

			const evt = document.createEvent('HTMLEvents');
			evt.initEvent('change', false, true);
			select.dispatchEvent(evt);

			const doneButton = flyout.shadowRoot.querySelector('d2l-button[primary]');
			MockInteractions.tap(doneButton);
		});

	});

	describe('reason hidden', () => {

		let flyout;

		beforeEach(async() => {
			flyout = await fixture(reasonHiddenFixture);
		});

		it('fires confirm with no reason', done => {
			flyout.addEventListener('confirm', e => {
				expect(e.detail.reason).to.equal('');
				done();
			});

			const hiddenReason = flyout.shadowRoot.querySelector('div[hidden] > #reason-selector');
			expect(hiddenReason).to.exist;

			const doneButton = flyout.shadowRoot.querySelector('d2l-button[primary]');
			MockInteractions.tap(doneButton);
		});

	});

	describe('feedback hidden', () => {

		let flyout;

		beforeEach(async() => {
			flyout = await fixture(feedbackHiddenFixture);
		});

		it('fires confirm with no feedback', done => {
			flyout.addEventListener('confirm', e => {
				expect(e.detail.feedback).to.equal('');
				done();
			});

			const hiddenFeedback = flyout.shadowRoot.querySelector('div[hidden] > #feedback');
			expect(hiddenFeedback).to.exist;

			const doneButton = flyout.shadowRoot.querySelector('d2l-button[primary]');
			MockInteractions.tap(doneButton);
		});

	});

});
