# d2l-opt-in-flyout-webcomponent

This is the webcomponent version of the opt-in/opt-out flyout. For the substantially more performant plain javascript version, see [this repository](https://github.com/Brightspace/d2l-opt-in-flyout-fra).

**NOTE:** When testing on the demo page, you will need to manually append `/demo` to the URL after clicking on the version to view.

This repo provides 3 webcomponents: `<d2l-opt-in-flyout>`, `<d2l-opt-out-flyout>`, and `<d2l-opt-out-reason>`.

### Properties
The `<d2l-opt-in-flyout>` and `<d2l-opt-out-flyout>` components take in the following properties:
* `open` - A boolean flag used to make the flyout start expanded.
* `title` - The title to display at the top of the flyout
* `details` *(Optional)* - Additional text to display beneath the current opt-in status
* `tab-position` *(Optional)* - The position to display the expand/collapse tab. Can either be an integer percentage (including the `%` character) or the string `left`, `right`, or `center`/`centre`. If the document's text direction is RTL, this position is flipped. Defaults to `"right"`.
* `tutorial-link` *(Optional)* - A URL for a tutorial of the new experience or feature
* `help-docs-link` *(Optional)* - A URL for help documentation on the new experience or feature

If the `<d2l-opt-out-flyout>` has children, any `<d2l-opt-out-reason>` child elements will be used to provide the list of reasons that can be selected from the drop down for opting out. An opt-out reason with key `Other` will automatically be added and does not need to be provided. The `<d2l-opt-out-reason>` component has the following 2 required properties:
* `key` - A key that identifies the opt-out reason. This value is passed to the `opt-out` event (see below) and is not displayed to the user. It should be the same across all languages and localizations.
* `text` - The text that will be displayed to the user. This string *should* be localized.

If a `<d2l-opt-out-flyout>` component has no `<d2l-opt-out-reason>` children, it will use the following default reasons (in addition to the always present `Other` option:

| key                     | text (for English localization)                 |
| ----------------------- | ----------------------------------------------- |
| NotReadyForSomethingNew | It's not a good time for me to try this version |
| MissingFeature          | It's missing a feature that I use               |
| JustCheckingSomething   | Just switching back to check something          |
| PreferOldExperience     | I think the old version is a better experience  |

### Events
The `<d2l-opt-in-flyout>` and `<d2l-opt-out-flyout>` components fire the following events:
* `flyout-opened` - The flyout was expanded
* `flyout-closed` - The flyout was collapsed
* `opt-in` - The user clicked the *Turn it on* / *Leave it on* button
* `opt-out` - The user clicked the *Leave it off* button or clicked the *Turn it off* button and provided feedback.

The `opt-out` event has the following properties in its `event.detail` when fired from the `<d2l-opt-out-flyout>` component:
* `reason` - The key of the selected opt-out reason (same as the `key` property on `<d2l-opt-out-reason>`)
* `feedback` - Any text feedback provided with leading/trailing whitespace trimmed. If no feedback is provided, this value holds the empty string.

The `opt-out` event does not have these properties when fired from the `<d2l-opt-in-flyout>` component since the user is not asked for feedback.
