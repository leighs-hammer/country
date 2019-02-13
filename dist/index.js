"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.ruralIso = exports.Iso = Iso;
exports.ruralName = exports.Name = Name;
exports.ruralRaw = exports.rawset = rawset;
exports.ruralCurrency = exports.currencyCode = currencyCode;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Modules
 */

/**
 * DataSets
 */
const countries = require('./datasets/countries.json');

const countries_iso = require('./datasets/countries_iso.json');

const ruralFull = require('./datasets/rural.json');
/**
 * Rural
 * 
 * Default Params. 
 * @param {number} code
 * @param {object} options
 * @param {boolean} debug
 * @return {string, object}
 * 
 */
// default


function _default() {
  let code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'returnAll';
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (code === 'returnAll') {
    return ruralFull;
  } else {
    const upperCode = code.toUpperCase();

    if (upperCode.length === 2) {
      // fastest
      return ruralFull[upperCode];
    } else if (upperCode.length === 3) {
      // loop
      const codeIso = Iso(upperCode);
      return ruralFull[`${codeIso}`];
    } else {
      console.error('Country Code to Short! requires either an ISO, AA or AAA code. ');
    }
  } // Remove on production
  // Logs out the params if the debug is passed


  if (debug !== undefined && debug === true) {
    console.log('Input Code Identifier: ' + code);
    console.log('Options : ' + options);
    console.log('Output Object: Only works with ISO2 Codes ');
    console.log(ruralFull[upperCode]);
  } // Return

} // ancsiliraries

/**
 * Returns the ISO Alpha 2 code to Aplpha 3, Options and Debug ar oprional. 
 * @param {string} code 
 * @param {object} options 
 * @param {string , object} debug 
 */


function Iso(code, options, debug) {
  // Catch lowercase
  var upperCode = code.toUpperCase(); // catch by length

  if (upperCode.length === 2) {
    return countries_iso[`${upperCode}`];
  } else if (upperCode.length === 3) {
    // a performance costly method
    var sOut = ''; //console.log(Object.entries(countries_iso))

    for (const _ref of Object.entries(countries_iso)) {
      var _ref2 = _slicedToArray(_ref, 2);

      const key = _ref2[0];
      const item = _ref2[1];

      if (item === upperCode) {
        sOut = `${key}`;
      }
    }

    return sOut;
  } else {
    console.error('Iso Output requires a 2 Charachter country code -> us -> usa');
  } // Remove on production
  // Logs out the params if the debug is passed


  if (debug !== undefined && debug === true) {
    console.log(code);
    console.log(options);
    console.log(countries_iso);
  } // Return

}

/**
 * Returns the country code from ISO or 3 Char code, Options and Debug ar oprional. 
 * @param {string} code 
 * @param {object} options 
 * @param {string , object} debug 
 */
function Name(code, options, debug) {
  // Catch lowercase
  var upperCode = code.toUpperCase();

  if (upperCode.length === 2) {
    return countries[`${upperCode}`]; // return
  } else if (upperCode.length === 3) {
    var lcode = Iso(upperCode, null, null); // return

    return countries[`${lcode}`];
  } else {
    console.error('A valid ISO Alpha 2 or Alpha 3 code is required to look up country name');
  } // Remove on production
  // Logs out the params if the debug is passed


  if (debug !== undefined && debug === true) {
    console.log(code);
    console.log(options);
  } // Return

}

/**
 * Returns the full data set of a specific option. 
 * @param {string} item
 * 'full' // 'names' // 'iso' 
 */
function rawset(item) {
  if (item !== undefined) {
    var upperCode = item.toUpperCase();

    switch (upperCode) {
      case 'FULL':
        return ruralFull;
        break;

      case 'ISO':
        return countries_iso;
        break;

      case 'NAMES':
        return countries;
        break;

      default:
        console.error('Requires an object to be returned, valid options are: "full", "names", "iso"');
        break;
    }
  } else {
    console.error('Requires an object to be returned, valid options are: "full", "names", "iso"');
  }
}

function currencyCode(code) {
  if (!code) {
    return false;
  }

  const values = Object.values(ruralFull);
  const foundCountry = values.find(country => {
    return country.currency === code.toUpperCase();
  });

  if (!foundCountry) {
    return {
      error: true,
      message: `No country could be found with the code : ${code.toUpperCase()}`
    };
  }

  const cleanCurrency = {
    currency: foundCountry.currency,
    currencyPosition: foundCountry.currencyPosition,
    currencyMeta: foundCountry.currencyMeta,
    currencySymbol: foundCountry.currencySymbol,
    currencyName: foundCountry.currencyName,
    currencyNamePlural: foundCountry.currencyNamePlural,
    currecnyDecimalDigits: foundCountry.currecnyDecimalDigits,
    currencyRounding: foundCountry.currencyRounding
  };
  return cleanCurrency;
}