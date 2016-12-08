import {app, router, store} from './app.js'
export default context => {

  // get the initialState of vue-router
  router.push(context.url)
  const s = Date.now();
  // Prefetch
  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      console.log("=============================");
      return component.preFetch(store)
    }
  })).then(() => {
    console.log(`data pre-fetch: ${Date.now() - s}ms`)
    context.initialState = store.state
    return app
  })
}
