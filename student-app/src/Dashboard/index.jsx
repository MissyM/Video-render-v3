import React from 'react'
import { Route } from 'react-router-dom'
import "./styles.css"
import { ContentProvider } from '../contentCtx'
import Profile from '../Dashboard/components/Profile'
//Componentes principales de la aplicación
import Browser from './Browser'
import Learning from './Learning/index'
import Activity from './Activity'

export default function ({ location }) {
  return <ContentProvider>
    <div className="dashboard">
      <Profile/> 
      <div className="content">
        <Route path="/buscador" exact component={Browser} />
        <Route path="/buscador/learning" component={props => <Learning key={location.search} {...props} />} />
        <Route path="/buscador/training" component={Activity} />
        <Route path="/buscador/competition" component={Activity} />
      </div>
    </div>
  </ContentProvider>
}
