/**
 * File: index.js
 * Author: Antoine Bourassa
 * Date: 2019-07-02
 * License: All rights reserved Kontron Canada Inc. 2019-Present
 */

let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(([\-\.]+[a-z0-9]+)*\.[a-z]{2,5})?(:[0-9]{1,5})?(\/.*)?$/;

/**
 * This module is a wrapper to translate the backend to be compatible with Jira
 * @param {String} URL base URL of the query. e.g http://symkloud.com/
 * @param {Array} whitelistedParams an array of valid parameters for the query. Parameters from Jira API
 * @param {Object} providedParams Given parameters for the query (from req.query). 
 * @return {String} return the custom query. URL + custom params
 */
function buildQuery(URL, whitelistedParams, providedParams) {
  if (!URL || typeof URL !== "string" || !urlRegex.test(URL)) {
    throw new Error(`URL is required and must be a valid URL, at : ${URL}`);
  }

  if (!whitelistedParams || typeof whitelistedParams !== "object") {
    throw new Error(
      `whitelistedParams is required and must be an array, at : ${whitelistedParams}`
    );
  }

  if (!providedParams || typeof providedParams !== "object") {
    throw new Error(
      `providedParams is required and must be an object, at : ${providedParams}`
    );
  }

  if (Object.keys(providedParams).length === 0) {
    return URL;
  }

  URL += "?"; // start to happens the query parameters
  Object.keys(providedParams).forEach((param, key) => {
    if (whitelistedParams.indexOf(param) > -1) {
      if (key !== 0) {
        URL += "&";
      }
      URL += `${param}=${providedParams[param]}`;
    }
  });

  return URL;
}

module.exports = {
  buildQuery
};
