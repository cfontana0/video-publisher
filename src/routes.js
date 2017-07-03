import React from 'react'
import IndexRoute from 'react-router/lib/IndexRoute'
import Route from 'react-router/lib/Route'
import App from './components/App'
import Home from './components/Home'
import Videos from './components/Videos'

export default (
    <Route path='/' component={App} onUpdate={() => window.scrollTo(0, 0)}>
        <IndexRoute component={Home} />
        <Route path='videos' component={Videos} />
    </Route>
)
