import React from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import palette from '../../utils/palette'

export default () => {
  return (
  <Bottons>
    <Tooltip title={`Regresa a la pregunta anterior`} placement="top">
      <Previous>Anterior</Previous>
    </Tooltip>
    <Tooltip title={`Haz click para saltar esta pregunta`} placement="top">
      <SkipBtn>Saltar pregunta</SkipBtn>
    </Tooltip>
    <Tooltip title={`Haz click aqui para continuar con la siguiente pregunta`} placement="top">
      <NextBtn>Siguiente</NextBtn>
    </Tooltip>
  </Bottons>
  )
}

const Bottons = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-around;
`
const SkipBtn = styled.button`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  padding: 0px 10px;
  letter-spacing: .2em;
  background:  ${palette.white};
  color:${palette.black};
  border: 2px solid ${palette.primaryYellow};
  &:hover{
    cursor: pointer;
    background: ${palette.primaryYellow};
    border: 2px solid ${palette.primaryYellow};
    color: ${palette.black};
  }
`
const NextBtn = styled.button`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  padding: 0px 10px;
  letter-spacing: .2em;
  transition: background-color .2s;
  background-color: ${palette.white};
  color:${palette.primaryBlue};
  border: 2px solid ${palette.primaryBlue};
  &:hover{
    cursor: pointer;
    background: ${palette.primaryBlue};
    border: 2px solid ${palette.primaryBlue};
    color: ${palette.black};
  }
`
const Previous = styled.button`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  padding: 0px 10px;
  letter-spacing: .2em;
  background-color: ${palette.white};
  color:${palette.primaryPink};
  transition: background-color .2s;
  border: 2px solid ${palette.primaryPink};
  &:hover{
    cursor: pointer;
    border: 2px solid ${palette.primaryPink};
    background-color: ${palette.primaryPink};
    color: ${palette.black};
  }
`