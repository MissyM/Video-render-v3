import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BrowserNavBar from './BrowserNavBar'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'

import styled from 'styled-components'
import palette from '../../utils/palette'

export default withRouter(class extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  render (){ 
    return ( 
      <ContentGrey>
        <ContentWhite > 
          <Link to="/buscador/">
            <Tooltip title={`Ir al inicio`} placement="right-start">
              <YupayIcon onClick={this.yupayIconClickHandler} />
            </Tooltip>
          </Link>
          <ContentCenterElements>
            <BrowserNavBar />
          </ContentCenterElements>
        </ContentWhite>
        <TriangleShadowLow />
       </ContentGrey>
    )
  }
})
const ContentGrey = styled.div`
  display: flex;
  position: relative;
  z-index: 10;
  background-color: ${palette.primaryGray};
  margin-top: 0px;
  padding: 0px;
  width: 100%;
  height: 100px;
  box-shadow: ${palette.primaryBoxShadow};
`
const ContentWhite= styled.div`
  display: flex;
  background-color: ${palette.white};
  margin-top: 0px;
  padding: 0px;
  width: 65%;
  height: 100px;
`
const ContentCenterElements= styled.div`
  padding-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 480px;
  height: 100px; 
`
const TriangleShadowLow= styled.div`
  width: 120px;
  background-color: white;
  transform: rotate(-70deg) translateX(0px) translateY(-1px);
  transform-origin: left bottom;
  box-shadow: ${palette.primaryBoxShadow};
`

const YupayIcon= styled.img.attrs({
  src: require('../assetsDashboard/yupay-azul-01.png'),
  alt:"Principal",
})`
  width: 150px;
  height: 60px;
  margin-top: 20px; 
`

