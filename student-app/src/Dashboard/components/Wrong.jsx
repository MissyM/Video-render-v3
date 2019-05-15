import React from 'react'
import styled from 'styled-components'
import palette from '../../utils/palette'

export default () => {
  return (
    <WrongContent>
      <SadFace/>
      <Text>¡Incorrecto!</Text>
    </WrongContent>
  )}

const WrongContent = styled.div`
  width: 410px;
  height: 300px;
  background: ${palette.primaryPurple};
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${palette.white};
  margin: 100px;
  box-shadow: ${palette.secundaryBoxShadow};
`
const Text = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin: 5px 15px;
`
const SadFace = styled.img.attrs({
  src: require('../../assetsStudent/sad.svg'),
  alt: "Cara feliz"
})`
  width: 140px;
  height: 140px;
  margin: 5px;
`
