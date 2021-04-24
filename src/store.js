import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'
import moduleReducer from './reducers/moduleReducer'
import lectureReducer from './reducers/lectureReducer'
import lectureCommentsReducer from './reducers/lectureCommentsReducer'
import discussionReducer from './reducers/discussionReducer'
import announcementsReducer from './reducers/announcementsReducer'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  modules: moduleReducer,

  lectures: lectureReducer,
  lectureComments: lectureCommentsReducer,
  discussions: discussionReducer,
  announcements: announcementsReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

// debugging with devtools
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)
let persistor = persistStore(store)

export { store, persistor }
