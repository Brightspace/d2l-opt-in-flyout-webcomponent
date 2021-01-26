import { expect, fixture, html } from '@open-wc/testing';
import '../d2l-opt-in-flyout.js';
import '@polymer/iron-test-helpers/mock-interactions.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import TestUtil from './test-util.js';

const emptyFixture = html`<d2l-opt-in-flyout open></d2l-opt-in-flyout>`;

const propertiesFixture = html`<d2l-opt-in-flyout
	open title="Flyout Demo" short-description="This is a short description"
	long-description="This is a long description"
	tab-position="right"
	tutorial-link="https://www.testlink1.com"
	help-docs-link="https://www.testlink2.com"></d2l-opt-in-flyout>`;

describe('d2l-opt-in-flyout', function() {

	describe('defaults', function() {

		let flyout, innerFlyout;

		beforeEach(async() => {
			flyout = await fixture(emptyFixture);
			innerFlyout = flyout.shadowRoot.querySelector('flyout-impl');
		});

		it('should contain short description', () => {
			const shortDescription = innerFlyout.$$('#short-description');
			expect(shortDescription.hidden).to.be.true;
		});

		it('should not contain title', () => {
			const title = innerFlyout.$$('#title');
			expect(title.textContent).to.equal(' ');
		});

		it('should not contain long description', () => {
			const longDescription = innerFlyout.$$('#long-description');
			expect(longDescription.hidden).to.be.true;
		});

		it('should not contain tutorial link or help documentation if not set', () => {
			const tutorial = innerFlyout.$$('.flyout-tutorial');
			const link = tutorial.querySelector('a');
			expect(link).to.not.exist;
		});

	});

	describe('properties specified', function() {

		let flyout, innerFlyout;

		beforeEach(async() => {
			flyout = await fixture(propertiesFixture);
			innerFlyout = flyout.shadowRoot.querySelector('flyout-impl');
		});

		it('should contain short description', () => {
			const shortDescription = innerFlyout.$$('#short-description');
			expect(shortDescription.hidden).to.be.false;
			const content = innerFlyout.shadowRoot.querySelector('#short-description s-html').shadowRoot;
			expect(content.textContent).to.equal('This is a short description');
		});

		it('should contain title', () => {
			const title = innerFlyout.$$('#title');
			expect(title.textContent).to.equal('Flyout Demo');
		});

		it('should reflect title attribute to property', () => {
			const newTitle = 'new title';

			flyout.setAttribute('title', newTitle);
			expect(flyout.title).to.equal(newTitle);
			const title = flyout.shadowRoot.querySelector('flyout-impl').$$('#title');
			expect(title.textContent).to.equal(newTitle);
		});

		it('should contain long description', () => {
			const longDescription = innerFlyout.$$('#long-description');
			expect(longDescription.hidden).to.be.false;
			const content = innerFlyout.shadowRoot.querySelector('#long-description s-html').shadowRoot;
			expect(content.textContent).to.equal('This is a long description');
		});

		it('should contain tutorial link', () => {
			const tutorial = innerFlyout.$$('.flyout-tutorial');
			const links = TestUtil.selectVisible(tutorial, 'a');

			expect(links.length).to.equal(2);

			expect(links[0].href).to.contain('https://www.testlink1.com');
			expect(links[0].textContent).to.contain('tutorials');
		});

		it('should contain help documentation link', () => {
			const tutorial = innerFlyout.$$('.flyout-tutorial');
			const links = TestUtil.selectVisible(tutorial, 'a');

			expect(links.length).to.equal(2);

			expect(links[1].href).to.contain('https://www.testlink2.com');
			expect(links[1].textContent).to.contain('help documentation');

		});

		it('should contain only tutorial specific text when only tutorial link specified', done => {
			innerFlyout.helpDocsLink = null;
			afterNextRender(flyout, () => {
				const tutorial = innerFlyout.$$('.flyout-tutorial');
				const links = TestUtil.selectVisible(tutorial, 'a');

				expect(links.length).to.equal(1);

				expect(links[0].href).to.contain('https://www.testlink1.com');
				expect(links[0].textContent).to.contain('tutorials');

				done();
			});
		});

		it('should contain only help documentation specific text when only help link specified', done => {
			innerFlyout.tutorialLink = null;
			afterNextRender(flyout, () => {
				const tutorial = innerFlyout.$$('.flyout-tutorial');
				const links = TestUtil.selectVisible(tutorial, 'a');

				expect(links.length).to.equal(1);

				expect(links[0].href).to.contain('https://www.testlink2.com');
				expect(links[0].textContent).to.contain('help documentation');

				done();
			});
		});

		it('should contain enable button', () => {
			const button = innerFlyout.$$('d2l-button[primary]');
			expect(button.textContent).to.equal('Turn it on');
			expect(button).to.exist;
		});

		it('should contain leave it off button', () => {
			const button = innerFlyout.$$('d2l-button:not([primary])');
			expect(button.textContent).to.equal('Leave it off');
			expect(button).to.exist;
		});

		it('should fire opt-in event when enable button clicked', done => {
			flyout.addEventListener('opt-in', () => {
				done();
			});

			const button = innerFlyout.$$('d2l-button[primary]');
			MockInteractions.tap(button);
		});

		it('should fire flyout-closed event when enable button clicked', done => {
			flyout.addEventListener('flyout-closed', () => {
				done();
			});

			const button = innerFlyout.$$('d2l-button[primary]');
			MockInteractions.tap(button);
		});

		it('should fire opt-out event when leave it disabled button clicked', done => {
			flyout.addEventListener('opt-out', () => {
				done();
			});

			const button = innerFlyout.$$('d2l-button:not([primary])');
			MockInteractions.tap(button);
		});

		it('should fire flyout-closed event when leave it disabled button clicked', done => {
			flyout.addEventListener('flyout-closed', () => {
				done();
			});

			const button = innerFlyout.$$('d2l-button:not([primary])');
			MockInteractions.tap(button);
		});

		it('should fire flyout-closed event when tab clicked', done => {
			flyout.addEventListener('flyout-closed', () => {
				done();
			});

			const tab = innerFlyout.$$('.flyout-tab');
			MockInteractions.tap(tab);
		});

	});

	describe('flyout closed', function() {

		let flyout, innerFlyout;

		beforeEach(async() => {
			flyout = await fixture(html`<d2l-opt-in-flyout></d2l-opt-in-flyout>`);
			innerFlyout = flyout.shadowRoot.querySelector('flyout-impl');
		});

		it('should fire flyout-opened event when tab clicked', done => {
			flyout.addEventListener('flyout-opened', () => {
				done();
			});

			const tab = innerFlyout.$$('.flyout-tab');
			MockInteractions.tap(tab);
		});

	});

});
