import React from 'react'
import { Route, Redirect, Router, Switch } from 'react-router'
import {HashRouter } from 'react-router-dom'
import Principal from '../components/principal'
import About from '../components/about'
export default props =>(
    <HashRouter>
        <div>
            <Switch>
                <Route path='/main' component={Principal} />
                <Route path='/about' component={About} />
                <Redirect from="*" to='/main' />
            </Switch>
        </div>
    </HashRouter>
)