/**
 * Module dependencies.
 */

var crypto = require('crypto')
  , base64url = require('./base64url');

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Signing separator.
 */

var separator = '.';

/**
 * Return signature for `value`.
 *
 * @param {String} value
 * @param {String} salt
 * @param {String} secret
 * @return {String}
 * @api private
 */

function getSignature(value, salt, secret) {
  var key = crypto.createHash('sha1').update(salt + 'signer' + secret)
    , mac = crypto.createHmac('sha256', key.digest()).update(value);
  return base64url.urlSafe(mac.digest('base64'));
}

/**
 * Constant-time comparison to prevent timing attacks.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Boolean}
 * @api private
 */

function constantTimeCompare(s1, s2) {
  if (s1.length !== s2.length) return false;

  var result = 0;
  for (var i = 0; i < s1.length; i++) {
    result |= s1[i].charCodeAt(0) ^ s2[i].charCodeAt(0);
  }

  return result === 0;
}

/**
 * Sign the given `value` with `secret` and `salt`.
 *
 * @param {String} value
 * @param {String} secret
 * @param {String} salt
 * @return {String}
 * @api public
 */

exports.sign = function(value, secret, salt){
  if ('string' != typeof value) throw new TypeError('value required');
  if ('string' != typeof secret) throw new TypeError('secret required');
  if ('string' != typeof salt) throw new TypeError('salt required');

  var encoded = base64url.urlSafeEncode(value);
  return encoded + separator + getSignature(encoded, salt, secret);
};

/**
 * Unsign the given `signed` with `secret` and `salt`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} signed
 * @param {String} secret
 * @param {String} salt
 * @return {String|Boolean}
 * @api public
 */

exports.unsign = function(signed, secret, salt){
  if ('string' != typeof signed) throw new TypeError('signed required');
  if ('string' != typeof secret) throw new TypeError('secret required');
  if ('string' != typeof salt) throw new TypeError('salt required');

  if (signed.indexOf(separator) == -1)
    throw new Error('No ' + separator + ' found in signed value');

  var spos = signed.lastIndexOf(separator)
    , value = signed.slice(0, spos)
    , signature = signed.slice(spos + 1);

  if (constantTimeCompare(signature, getSignature(value, salt, secret)))
    return base64url.urlSafeDecode(value);

  // Signature does not match
  return false;
};
