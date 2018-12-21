import '@polymer/polymer/polymer-legacy.js';
import 'd2l-typography/d2l-typography.js';
import './internal/flyout-impl.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-opt-out-flyout">
	<template strip-whitespace="">
		<style include="d2l-typography">
			flyout-impl { font-size: 20px; }
		</style>
		<flyout-impl class="d2l-typography" opt-out="" open="{{open}}" title="[[title]]" details="[[details]]" tab-position="[[tabPosition]]" tutorial-link="[[tutorialLink]]" help-docs-link="[[helpDocsLink]]"><slot></slot></flyout-impl>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-opt-out-flyout',

	properties: {
		open: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		title: String,
		details: String,
		tabPosition: String,
		tutorialLink: String,
		helpDocsLink: String
	}

});
