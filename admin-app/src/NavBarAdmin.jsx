import React from 'react'
import styled from 'styled-components'

export default ({ handleDisplayMain, handleDisplayContents }) => {
  return (
    <NavBar>
      <Logo/>
      <MainTitle>Panel de Administración</MainTitle>
      <TagContent>
        <MainTag onClick={ handleDisplayMain }>Principal</MainTag>
        <ContentsTag onClick={ handleDisplayContents }>Contenidos</ContentsTag>
      </TagContent>
    </NavBar>
  )
}

const NavBar = styled.div`
  position: relative;
  display: flex;
  background-color: #ffffff;
  padding: 0px;
  width: 100%;
  height: 50px;
  box-shadow: 3px 5px 5px 0 rgba(0, 0, 0, 0.13);
`
const Logo = styled.img.attrs({
  src: require('./assets/yupay-azul-01.png'),
  alt: 'Yupay'
})`
  width: 90px;
  height: 40px;
  margin: 5px 0px 5px 55px; 
`
const MainTitle = styled.p`
  font-size: 18px;
  color: #a79fa5;
  margin: 15px 0px 5px 55px;
`
const TagContent = styled.div`
  position absolute;
  right: 55px;
  bottom: 5px;
  display: flex;
  font-size: 18px;
  color: #a79fa5;
  width: 210px;
  justify-content: space-between;
`
const MainTag = styled.div`
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  color: #c56cf0;
  border: solid 2px #c56cf0;
  border-radius: 3px;
  &:hover{
    color: #ffffff;
    background-color: #c56cf0;
    border: solid 2px #c56cf0;
  }
`
const ContentsTag = styled.div`
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  color: #18dcff;
  border: solid 2px #18dcff;
  border-radius: 3px;
  &:hover{
    color: #ffffff;
    background-color: #18dcff;
    border: solid 2px #18dcff;
  }
`
