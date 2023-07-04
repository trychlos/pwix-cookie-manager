/*
 * pwix:cookie-manager/test/js/index.js
 */

// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by forums.js.
import { name as packageName } from "meteor/pwix:cookie-manager";

// Write your tests here!
// Here is an example.
Tinytest.add('CookieManager - example', function (test) {
  test.equal(packageName, "cookie-manager");
});
