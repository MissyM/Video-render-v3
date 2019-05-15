import React, { useCallback, useRef, useState, useContext } from "react"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SessionCtx from '../../sessionContext'
import avatars from '../../model/avatars'
import Tooltip from '@material-ui/core/Tooltip'
import palette from '../../utils/palette'


const defaultAvatar = require('../../assetsStudent/Lobo-yupay-01.svg')

export default withRouter(({}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [handler, setHandler] = useState()
  const ref = useRef()

  const { session } = useContext(SessionCtx)

  const showMenu = useCallback(() => {
    if (!menuVisible) {
      setMenuVisible(true)
      const _handler = ev => {
        if (!ref.current) {
          window.removeEventListener('mousedown', _handler)
          return
        }
        if (ref.current.contains(ev.target) || ref.current === ev.target) {
          return
        }
        setMenuVisible(false)
        window.removeEventListener('mousedown', _handler)
        setHandler(undefined)
      }
      window.addEventListener('mousedown', _handler)
      setHandler(() => _handler)
    } else {
      setMenuVisible(false)
      window.removeEventListener('mousedown', handler)
      setHandler(undefined)
    }
  }, [handler, setHandler, menuVisible, setMenuVisible])

  return (
    <ProfileContent>
      {!session.id && <UserUnregistered username={session.username} />}
      <AvatarContainer >
        <Tooltip title={`Mi perfil`} placement="right-start">
          <Avatar
            onClick={showMenu}
            src={session.id ? avatars.find(avatar => avatar.avatar === session.avatar).src : defaultAvatar}
            alt="avatar"
          />
        </Tooltip>
      </AvatarContainer>
      {menuVisible ?
        <>
          <ProfileData ref={ref}>
          {session.id ?
            <>
              <Data><h4 style={{ marginRight: 5 }}>Nombre:</h4><h4>{session.username}</h4></Data>
              <Data><h4 style={{ marginRight: 5 }}>Edad:</h4><h4>{session.age}</h4></Data>
              <Data><h4 style={{ marginRight: 5 }}>Grado:</h4><h4>{session.grade}</h4></Data>
              <Link to="/Login" style={{ textDecoration: 'none' }} >
                <Tooltip title={`Ir al Login`} placement="right-start">
                  <Out>Salir</Out>
                </Tooltip>
              </Link>
            </>
          : 
            <>
              <Link to="/Login" style={{ textDecoration: 'none' }} >
                <Tooltip title={`Ir al Login`} placement="right-start">
                  <Out>Salir</Out>
                </Tooltip>
              </Link>
            </>
          }
          </ProfileData> 
        </>
      : null
      }
      
    </ProfileContent> 
  )
})
const UserUnregistered = (props) => {
  return (
    <Unregistered>
      Bienvenid@ <h4 style={{marginLeft: 5, marginRight: 5}}> { props.username } </h4>
      <StyledLinktoRegister to = '/Register'>
           regístrate!
      </StyledLinktoRegister>
    </Unregistered>
  )
}
const ProfileContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  right: 0px;
  width:200px;
  padding: 10px;
  z-index: 100;
`
const AvatarContainer= styled.div`
  position: absolute;
  top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
  background: ${palette.primaryBlue};
  border-radius: 50%;
`
const Unregistered= styled.div`
  width: 400px;
  height: 30px;
  right: 100px;
  top: 25px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
`
const Avatar = styled.img`
  height: 50px;
  width:50px;
`
const ProfileData= styled.div`
  position: absolute;
  width:190px;
  padding: 15px;
  margin-top: 185px;
  background-color: white;
  box-shadow: ${palette.secundaryBoxShadow};
`
const StyledLinktoRegister= styled(Link)`
  padding: 5px;
  cursor: pointer;
`
const Out= styled.div`
  display: flex;
  justify-content: center;
  bottom: 5px;
  align-items: center;
  letter-spacing: .2em;
  background-color: ${palette.primaryYellow};
  height: 30px;
  width: 70px;
  text-align: center;
  margin-left: 55px;
  font-weight: bold;
  color: ${palette.black};
`
const Data= styled.div`
  display: flex;
`