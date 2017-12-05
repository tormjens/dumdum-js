import DumDum from '../lib/DumDum.js'
import expect from 'expect';
import jsDom from 'mocha-jsdom';

describe ('DumDum', () => {

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

});