import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home} from './components/Home';
import {Jobs} from './components/Jobs';
import {UserRegistration} from './components/Users';
import {Dashboard} from './components/Layouts';
import {Employers} from './components/Employers';
import {NotFound} from './components/Shared';
import Radium from 'radium';

const styles = {
  marginTop: 76
}

const Main = (props) =>
  <main style={styles}>
    <Switch>
      <Route path='/jobs' render={() => (<Jobs {...props}/>)}/>
      <Route path='/dashboard' render={() => (<Dashboard {...props}/>)}/>
      <Route path='/employers' render={() => (<Employers {...props}/>)}/>
      <Route exact path='/' render={() => (<Home {...props}/>)}/>
      <Route exact path='/register' render={() => (<UserRegistration {...props}/>)}/>
      <Route exact path='*' render={() => (<NotFound {...props}/>)}/>
    </Switch>
  </main>

export default Radium(Main);
