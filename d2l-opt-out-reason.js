import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-opt-out-reason">
	<template strip-whitespace="">
		<style>
			:host {
				display: none;
			}
		</style>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-opt-out-reason',

	properties: {
		key: String,
		text: String
	}

});
