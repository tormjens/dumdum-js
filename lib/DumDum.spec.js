/* global describe, it */

var expect = require('chai').expect
var dumdumJs = require('./DumDum')

describe('dumdum js', function () {
  it('should export an object', function () {
    expect(dumdumJs).to.be.a('object')
  })
})
