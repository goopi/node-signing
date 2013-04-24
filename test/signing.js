/**
 * Module dependencies.
 */

var signing = require('../lib/signing')

/**
 * Tests.
 */

describe('.sign(value, secret, salt)', function() {
  it('should sign the value', function() {
    var val = signing.sign('hi', 'secret', 'salt')
    val.should.equal('aGk.fYUxykx5WU-pHxHRIWkQrS4alndcr17dx3RZ5BSGiOA')

    val = signing.sign('hi', 'othersecret', 'salt')
    val.should.not.equal('aGk.fYUxykx5WU-pHxHRIWkQrS4alndcr17dx3RZ5BSGiOA')

    val = signing.sign('hi', 'secret', 'othersalt')
    val.should.not.equal('aGk.fYUxykx5WU-pHxHRIWkQrS4alndcr17dx3RZ5BSGiOA')
  })
})

describe('.unsign(signed, secret, salt)', function() {
  it('should unsign the signed value', function() {
    var val = signing.sign('hi', 'secret', 'salt')
    signing.unsign(val, 'secret', 'salt').should.equal('hi')
    signing.unsign(val, 'othersecret', 'salt').should.be.false
    signing.unsign(val, 'secret', 'othersalt').should.be.false
  })
})
