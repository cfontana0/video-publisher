import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistState } from 'redux-devtools'
// import createLogger from 'redux-logger'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

// connect react-router to redux store
const router = routerMiddleware(hashHistory)

// redux devtools config
const enhancer = compose(
    applyMiddleware(thunk, router),

    persistState(
        window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
    )
)

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
