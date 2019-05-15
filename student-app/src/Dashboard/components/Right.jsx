import React from 'react'
import styled from 'styled-components'
import palette from '../../utils/palette'

export default () => {
  return (
    <RightContent>
        <HappyFace/>
        <Text>¡Correcto!</Text>
      <TextCoin> + 10<Coin/></TextCoin>
    </RightContent>
  )}

const RightContent = styled.div`
  width: 410px;
  height: 300px;
  background: ${palette.primaryPurple};
  flex-direction: column;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${palette.white};
  margin: 100px;
  box-shadow: ${palette.secundaryBoxShadow};
`
const Text = styled.div`
  font-weight: bold;
  font-size: 40px;
  margin: 5px 15px;
`
const Coin= styled.img.attrs({
  src: require('../../assetsStudent/ic_competencia.svg'),
  alt: "Moneda"
})`
  width: 50px;
  height: 50px;
`
const TextCoin = styled.div`
  font-weight: bold;
  font-size: 40px;
  display:flex;
  align-items: center;
  justify-content: center;
`
const HappyFace = styled.img.attrs({
  src: require('../../assetsStudent/happy.svg'),
  alt: "Cara triste"
})`
  width: 140px;
  height: 140px;
  margin: 5px;
`
