import React, { useCallback, useState } from 'react'

import NavBarAdmin from './NavBarAdmin'
import Main from './Main'
import Contents from './Contents/index.jsx'

import './App.css'

const App = () => {
  const [panel, setPanel] = useState('Main')
  const handleDisplayMain = useCallback(() => {
    setPanel('Main')
  },[panel, setPanel])
  const handleDisplayContents = useCallback(() => {
    setPanel('Contents')
  },[panel, setPanel])

  return (
    <div className="App">
      <NavBarAdmin 
        handleDisplayMain={ handleDisplayMain } 
        handleDisplayContents={ handleDisplayContents }
      /> 
      <Main show={panel === 'Main'} />
      <Contents show={panel === 'Contents'} />
    </div>
  )
}

export default App
