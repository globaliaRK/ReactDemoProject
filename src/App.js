import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Home from './component/Home'
import Login from './component/Login'
import Navbar from './component/Navbar'
import Registration from './component/Registration'


const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/registration',
    component: Registration,
    exact: true,
  }
]

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        {routes.map((route, i) => (
          < Route key={i} path={route.path} component={route.component} exact={route.exact} />
        ))}
        <Redirect path='/*' to="/" />
      </Switch>
    </Router>
  );
}

export default App;
