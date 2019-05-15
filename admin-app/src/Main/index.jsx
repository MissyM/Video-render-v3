/*MAIN PANEL ADMIN (index) */
import React from 'react'
import styled from 'styled-components'
// import Tooltip from '@material-ui/core/Tooltip'

const electronRequire = window.require

const ip = electronRequire('ip')
const opn = electronRequire('opn')
const path = electronRequire('path')
const electron = electronRequire('electron')
const isDev = electronRequire('electron-is-dev')
const app = electron.remote.app

const userPath = app.getPath('userData')
const yupayLogsFile = path.join(userPath, 'yupay-files/yupay-logs.txt')
const link = isDev ? `http://${ip.address()}:8000` : `http://${ip.address()}:8080`

export default ({ show = true }) => {

  return show ? (
    <MainContainer>
      <MainTitle>Direccion de acceso: {link}</MainTitle> 
      <BtnAccess onClick={()=> opn(link)}>Acceder a Yupay</BtnAccess>
      <MainTitle> Logs de usuario: {yupayLogsFile}</MainTitle>
       <BtnAccess onClick={()=> opn(yupayLogsFile)}>Abrir</BtnAccess>
    </MainContainer>
  ) : <></>
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0px 100px 0px;
  width: 80%;
`
const MainTitle = styled.div`
  font-size: 18px;
  color: #a79fa5;
  margin: 25px 20px 20px 25px; 
`

const BtnAccess = styled.button`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 50px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: .2em;
  transition: background-color .2s;
  background: none;
  outline: none;
  color: #c56cf0;
  border: solid 2px #c56cf0;
  border-radius: 3px;
  &:hover{
    color: #ffffff;
    background-color: #c56cf0;
    border: solid 2px #c56cf0;
  }
`