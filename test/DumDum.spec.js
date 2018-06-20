import DumDum from '../lib/DumDum.js'
import expect from 'expect';
import jsDom from 'mocha-jsdom';

describe('DumDum', () => {

  jsDom()

  beforeEach(() => {
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

  it('triggers on the first page load', () => {
    expect(document.body.textContent).toContain('Hello')
  })

  it('triggers when the class list changes', (done) => {
    document.body.classList += ' world'
    setTimeout(() => {
      expect(document.body.textContent).toContain('World')
      done()
    }, 100);
  })

  it('fires an event when checking for routes', (done) => {
    let eventFired = false

    setTimeout(() => {
      expect(eventFired).toBe(true);
      done();
    }, 400)

    document.body.addEventListener('dumdum:route:before', e => {
      eventFired = true
    })
  })

  it('fires an event when a route is triggered by the class list changing', (done) => {
    let eventFired = false

    document.body.classList += ' world'
    setTimeout(() => {
      expect(eventFired).toBe(true);
      done();
    }, 300)

    document.body.addEventListener('dumdum:route:after', e => {
      if (e.detail.route === 'world') {
        eventFired = true
      }
    })
  })

});
