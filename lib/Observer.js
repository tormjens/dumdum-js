class Observer {
    constructor(element, callback) {
        this.element = element
        this.callback = callback
        this.lastMutation = null;
        this.checkMutations()
        setInterval(() => {
            this.checkMutations()
        }, 100);
    }

    checkMutations() {
        if(this.element.className !== this.lastMutation) {
            this.lastMutation = this.element.className;
            this.callback({
                attributeName: 'class'
            })
        }
    }
}

export default Observer;