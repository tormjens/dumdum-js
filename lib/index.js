class DumDum {

  /**
   * Set up DumDum
   * @param  {Object} routes An object of functions to execute
   * @return {Void}
   */
  constructor(routes) {
    this.body = document.body // cache the body element
    this.routes = routes // store all the routes in a class property
    this.executedRoutes = [] // all executed routes will reside here
    this.createObserver() // create the observer instance
    this.checkClasses() // on load check for class changes
  }

  /**
   * Sets up the observer
   * @return {Void}
   */
  createObserver() {
    // create the instance
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => this.observeChange(mutation))
    })

    // observe the body for attribute changes
    this.observer.observe(this.body, {
      attributes: true
    })
  }

  /**
   * Act on the observed change
   * @param  {mutation} mutation The mutated property
   * @return {Void}
   */
  observeChange(mutation) {
    if(mutation.attributeName === "class") { // we are only interested in changes to the class attribute
      this.checkClasses()
    }
  }

  /**
   * Check if any of the classes contain routes
   * @return {Void}
   */
  checkClasses() {
    let classes = this.createClassArray() // a list of all classes
    if(classes.length > 0 && classes[0]) {
      for(let className of classes) {
        this.maybeExecuteClassRoute(className); // try to execute a route
      }
    }
  }

  /**
   * Creates an array of classes
   * @return {Array}
   */
  createClassArray() {
    let classes = this.body.classList.value.replace(/-/g, '_').split(/\s+/) // remove dashes and replace them with underscores so they can be object names
    classes.unshift('common') // the common class is always in the queue
    return classes
  }

  /**
   * Checks if the route already was executed
   * @param  {String}  className
   * @return {Boolean}
   */
  isRouteExecuted(className) {
    return this.executedRoutes.indexOf(className) > -1
  }

  /**
   * Conditionally execute the class route
   * @param  {String} className
   * @return {Boolean}
   */
  maybeExecuteClassRoute(className) {

    if(this.routes[className] && !this.isRouteExecuted(className)) {
      this.executeRoute(className)
      return true // return true when we found a route and executed it
    }
    return false // return false if nothing was valid

  }

  /**
   * Execute a route
   * @param  {String} className
   * @return {Void}
   */
  executeRoute(className) {
    try { // try to execute the route
      this.routes[className]()
      this.executedRoutes.push(className)
    } catch(e) {
      console.error('No such route found.') // we'll assume no route by that className exists
    }
  }

}