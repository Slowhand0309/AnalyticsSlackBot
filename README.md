# AnalyticsSlackBot
Google analytics bot for Slack

## Environment

Preparing the `.env` file with the following key-value.

|key|describe|
|:--|:-------|
|GAS_PROJECT_KEY|Project key at Google Apps Script|
|ANALYTICS_PROFILEID|Profile ID at Google Analytics|
|USER_NAME|User name to post|
|ICON_URL|Icon URL to post|
|SLACK_URL|Slack URL to post|

## Usage

Synchronized with the project of Google apps script.

```sh
$ grunt init
```

Generate script file `main.js` by template.

```sh
$ grunt
```

Deploy script file.

```sh
$ grunt upload
```

## Licence

MIT

## Author

[slowhand0309](https://github.com/Slowhand0309)
