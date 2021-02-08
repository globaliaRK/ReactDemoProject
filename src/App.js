import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Home from './component/Home'

function App() {

  const Routes = [
    {
      path: "/",
      component: Home
    }
  ]


  return (
    <Router>
      <Switch>
        {
          Routes.map((route, i) => {
            <Route key={i} {...route} />
          })
        }
        <Redirect path='/' />
      </Switch>
    </Router>
  );
}

export default App;
