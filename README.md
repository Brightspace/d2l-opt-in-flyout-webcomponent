# d2l-opt-in-flyout-webcomponent

This repo provides 3 webcomponents: `<d2l-opt-in-flyout>`, `<d2l-opt-out-flyout>`, and `<d2l-opt-out-reason>`.

### Properties
The `<d2l-opt-in-flyout>` and `<d2l-opt-out-flyout>` components take in the following properties:
* `open` - A boolean flag used to make the flyout start expanded.
* `title` - The title to display at the top of the flyout
* `short-description` *(Optional)* - Descriptive text shown beneath the `title`
* `long-description` *(Optional)* - Additional text shown beneath `short-description`
* `tab-position` *(Optional)* - The position to display the expand/collapse tab. Can either be an integer percentage (including the `%` character) or the string `left`, `right`, or `center`/`centre`. If the document's text direction is RTL, this position is flipped. Defaults to `"right"`.
* `tutorial-link` *(Optional)* - A URL for a tutorial of the new experience or feature
* `help-docs-link` *(Optional)* - A URL for help documentation on the new experience or feature

### `<d2l-opt-out-flyout>` specific properties
* `hide-reason` *(Optional)* - A boolean that hides the reason field from the opt-out dialog
* `hide-feedback` *(Optional)* - A boolean that hides the feedback textarea field from the opt-out dialog

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

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
