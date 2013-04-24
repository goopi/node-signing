/**
 * Module dependencies.
 */

var base64url = require('../lib/base64url')

/**
 * Tests.
 */

describe('.urlSafe(str)', function() {
  it('should return the url safe version of base64-encoded str', function() {
    var val = base64url.urlSafe('a+b/c===')
    val.should.equal('a-b_c')
  })
})

describe('.urlSafeEncode(str)', function() {
  it('should return the url safe base64-encoded version of str', function() {
    var val = base64url.urlSafeEncode('irbis?lab?')
    val.should.equal('aXJiaXM_bGFiPw')
  })
})

describe('.urlSafeDecode(str)', function() {
  it('should return the base64-decoded version of str', function() {
    var val = base64url.urlSafeDecode('aXJiaXM_bGFiPw')
    val.should.equal('irbis?lab?')
  })
})
