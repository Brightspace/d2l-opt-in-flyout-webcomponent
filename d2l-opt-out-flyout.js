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
		<flyout-impl class="d2l-typography" opt-out="" open="{{open}}" title="[[title]]" short-description="[[shortDescription]]" long-description="[[longDescription]]" tab-position="[[tabPosition]]" tutorial-link="[[tutorialLink]]" help-docs-link="[[helpDocsLink]]" hide-reason="[[hideReason]]" hide-feedback="[[hideFeedback]]" no-transform="[[noTransform]]"><slot></slot></flyout-impl>
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
		shortDescription: String,
		longDescription: String,
		tabPosition: String,
		noTransform: Boolean,
		tutorialLink: String,
		helpDocsLink: String,
		hideReason: Boolean,
		hideFeedback: Boolean
	}

});
