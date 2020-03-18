import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Noise from './components/cloud/Noise'
import Cloud from './components/cloud/Cloud'
import Warp from './components/warp/Warp'
import Double from './components/double/Double'
import Home from './components/Home'
import 'bulma'
import './style.scss'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
    }
  }

  componentDidMount() {

  }



  render() {
    return (

      <Router>
        <main>

          <Switch>
            <Route path="/noise" component={Noise} />
            <Route path="/double" component={Double} />
            <Route path="/cloud" component={Cloud} />
            <Route path="/warp" component={Warp} />
            <Route path="/" component={Home} />

          </Switch>
          <div className='nav navbar is-fixed-bottom'>
            <a href='/'>None</a>
            <a href='/#/cloud'>Cloud</a> <a href='/#/warp'>Warp</a>
            <a href='/#/double'>Double</a>  <a href='/#/noise'>Noise</a> <a  href='#fullS'>Full Stack Sites</a> <a href='#other'>Other</a>
          </div>
        </main>

      </Router>


    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
