/**
 * Expose `base64url`.
 */

var base64url = exports;

/**
 * Escape the given base64-encoded `str` according to the
 * RFC 4648, where '+' is encoded as '-' and '/' is encoded
 * as '_'. The padding character '=' is removed.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

base64url.urlSafe = function(str){
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * Encode the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

base64url.urlSafeEncode = function(str){
  var encoded = new Buffer(str || '').toString('base64');
  return base64url.urlSafe(encoded);
};

/**
 * Decode the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

base64url.urlSafeDecode = function(str){
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  str += Array(5 - str.length % 4).join('=');
  return new Buffer(str, 'base64').toString('utf8');
};
