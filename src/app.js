import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Cloud from './components/cloud/Cloud'
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
            <Route path="/cloud" component={Cloud} />

          </Switch>
          <div className='nav navbar is-fixed-bottom'>
            <a href='/#/cloud'>Cloud</a> <a href='#contact'>Contact</a>
            <a href='#ml'>ML Controlled</a>  <a href='#games'>Games</a> <a  href='#fullS'>Full Stack Sites</a> <a href='#other'>Other</a>
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
