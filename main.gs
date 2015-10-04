
/**
 * main function
 */
function reportAnalytics() {
  var profileId = "XXXXXXXXX"; // google analytics profile Id

  reportSummary(profileId);
  reportViewsOfPageTitle(profileId);
}

/**
 * Post the results of analysis of the present time to Slack
 *
 * @param profileId google analytics profile Id
 */
function reportSummary(profileId) {

  var today = new Date();
  var toDate = Utilities.formatDate(today, Session.getTimeZone(), 'yyyy-MM-dd');
  var tableId = "ga:" + profileId;
  var metric = "ga:users,ga:sessions,ga:pageviews";
  var options = {
    "max-results" : 25
  }

  var text = "";
  var report = Analytics.Data.Ga.get(tableId, toDate, toDate, metric, options);
  if (report.rows) {
    var rows = report.getRows();
    text = "message\n";
    // index:0 users
    text += "users : " + rows[0][0] + "\n";
    Logger.log(rows[0][0]);
    // index:1 sessions
    text += "sessions : " + rows[0][1] + "\n";
    Logger.log(rows[0][1]);
    // index:2 pageviews
    text += "pageviews : " + rows[0][2] + "\n";
    Logger.log(rows[0][2]);
  }

  if (text != "") {
     var payload = {
     "text" : "message:\n" + text + "\n",
     "channel" : "#general",
     "username" : "XXXXXX",
     "icon_url" : "XXXXXX"
     }
     postSlack(payload);
   }
}

/**
 * Post the number of page views of each page title of the moment
 *
 * @param profileId google analytics profile Id
 */
function reportViewsOfPageTitle(profileId) {

  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  var startDate = Utilities.formatDate(oneWeekAgo, Session.getTimeZone(), 'yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, Session.getTimeZone(), 'yyyy-MM-dd');
  var tableId = "ga:" + profileId;
  var metric = "ga:pageviews";
  var options = {
    "dimensions" : "ga:pageTitle",
    "sort" : "-ga:pageviews",
    "max-results" : 25
  }

  var text = "";
  var report = Analytics.Data.Ga.get(tableId, endDate, endDate, metric, options);
  if (report.rows) {
     text = "message\n";
     for (var i = 0; i < report.getRows().length; i++) {
       Logger.log(report.getRows()[i]);
       text += report.getRows()[i] + "\n";
     }
  }

  if (text != "") {
     var payload = {
     "text" : "message\n" + text + "\n",
     "channel" : "#general",
     "username" : "XXXXXXX",
     "icon_url" : "XXXXXXX"
     }
     postSlack(payload);
   }
}

/**
 * Slack post function
 *
 * @param payload post payload
 */
function postSlack(payload) {

  var options = {
    "method" : "POST",
    "payload" : JSON.stringify(payload)
  }

  var url = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  var response = UrlFetchApp.fetch(url, options);
  var content = response.getContentText("UTF-8");
}


////////////////////////////////////////////////////////////////////////////////

// Account summay dump

function listAccounts() {
  var accounts = Analytics.Management.Accounts.list();
  if (accounts.items && accounts.items.length) {
    for (var i = 0; i < accounts.items.length; i++) {
      var account = accounts.items[i];
      Logger.log('Account: name "%s", id "%s".', account.name, account.id);

      // List web properties in the account.
      listWebProperties(account.id);
    }
  } else {
    Logger.log('No accounts found.');
  }
}


function listWebProperties(accountId) {
  var webProperties = Analytics.Management.Webproperties.list(accountId);
  if (webProperties.items && webProperties.items.length) {
    for (var i = 0; i < webProperties.items.length; i++) {
      var webProperty = webProperties.items[i];
      Logger.log('\tWeb Property: name "%s", id "%s".', webProperty.name,
          webProperty.id);

      // List profiles in the web property.
      listProfiles(accountId, webProperty.id);
      }
  } else {
    Logger.log('\tNo web properties found.');
  }
}

function listProfiles(accountId, webPropertyId) {
  var profiles = Analytics.Management.Profiles.list(accountId,
      webPropertyId);
  if (profiles.items && profiles.items.length) {
    for (var i = 0; i < profiles.items.length; i++) {
      var profile = profiles.items[i];
      Logger.log('\t\tProfile: name "%s", id "%s".', profile.name,
          profile.id);
    }
  } else {
    Logger.log('\t\tNo web properties found.');
  }
}
