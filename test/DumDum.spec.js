import DumDum from '../lib/DumDum.js'
import expect from 'expect';
import jsDom from 'mocha-jsdom';
import sinon from 'sinon'

describe('DumDum', () => {

  jsDom()

  beforeEach(function () {
    this.clock = sinon.useFakeTimers(Date.now())
    document.body.classList = 'hello'

    new DumDum({
      hello() {
        document.body.textContent = 'Hello'
      },
      world() {
        document.body.textContent += 'World'
      }
    });
  })

  afterEach(function () {
    this.clock = sinon.restore();
  })

  it('triggers on the first page load', () => {
    expect(document.body.textContent).toContain('Hello')
  })

  it('triggers when the class list changes', function () {
    document.body.classList += ' world'
    this.clock.tick(101);

    expect(document.body.textContent).toContain('World')
  })

});
