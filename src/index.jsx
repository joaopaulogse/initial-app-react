import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'
import {render} from 'react-dom'
import Home from './main/Home'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducers from './main/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
const middlewareStore = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)
render(
    <Provider store={middlewareStore}>
        <Home/>
    </Provider>
, document.getElementById("app"))