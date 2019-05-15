/*LEARNING */
import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/index'
import Thumbnail from './Thumbnail'
import styled from 'styled-components'
import palette from '../../utils/palette'

import {
  logIconoVisualizacionesClickeado,
  logIconoLikesClickeado,
  logBtnEntrenamientoClickeado,
  logBtnCompetenciaClickeado,
} from '../../services/log'
import ResourceView from './ResourceView'
import Tooltip from '@material-ui/core/Tooltip'
import { useContent } from '../../contentCtx'

export default ({ history, location }) => {
  const [state, setState] = useState('loading')
  const [actualResource, setActualResource] = useState({ title: '...' })
  const [nextResource, setNextResource] = useState({ title: '...' })
  const [otherResources, setOtherResources] = useState([])
  const [topicTitle, setTopicTitle] = useState('')
  const [activity, setActivity] = useState('training') // || competition

  const {
    getTopic,
    getSubtopic,
    getResource,
    getRelatedResources,
  } = useContent()
  const handlerActivity = useCallback(
    ev => {
      setActivity('competition ')
    },
    [activity, setActivity]
  )
  useEffect(() => {
    const search = location.search
    load(search)
  }, [])

  const load = search => {
    const params = new URLSearchParams(search)
    const id = params.get('id')
    const option = params.get('option')
    let resources = []
    if (option === 'topic') {
      const topic = getTopic(id)
      setTopicTitle(topic.title)
      topic.subtopics.forEach(function(subtopic) {
        subtopic.resources.forEach(function(resource) {
          resources.push(resource)
        })
      })
    } else if (option === 'subtopic') {
      let subtopic = getSubtopic(id)
      setTopicTitle(subtopic.topicTitle)
      resources = subtopic.resources
    } else if (option === 'resource') {
      let resource = getResource(id)
      resources = getRelatedResources(id)
      setTopicTitle(resource.topicTitle)
    }
    if (resources.length > 0) {
      setState('loaded')
      if (resources[0]) {
        setActualResource(resources[0])
      }
      if (resources[1]) {
        setNextResource(resources[1])
      }
      setOtherResources(resources.slice(2))
    } else {
      setState('noResources')
    }
  }
  const playResource = id => {
    if (id) {
      history.push(`/buscador/learning?option=resource&id=${id}`)
    }
  }
  //Logs
  const visualizationsIconHandler = () => {
    logIconoVisualizacionesClickeado()
  }
  const likesIconHandler = () => {
    logIconoLikesClickeado()
  }
  const trainingBtnHandler = () => {
    handlerActivity()
    logBtnEntrenamientoClickeado()
  }
  const competitionBtnHandler = () => {
    handlerActivity()
    logBtnCompetenciaClickeado()
  }

  return state === 'noResources' ? (
    <h1>No hay recursos en este subtema</h1>
  ) : (
    <Container>
      <NavBar />
      <LearningContainer>
        <ContentContainer>
          <ResourceView resource={actualResource} />
          <Title>{actualResource.title}</Title>
          <Subtitle>Tema:{topicTitle}</Subtitle>
          <Toolbar>
            <View onClick={visualizationsIconHandler}>4 Visualizaciones</View>
            <LikeIcon onClick={likesIconHandler} />
            <Label onClick={likesIconHandler}>10</Label>
          </Toolbar>
        </ContentContainer>
        <OtherContent>
          <Modules>
            <Link to="/buscador/training" style={{ textDecoration: 'none' }}>
              <Tooltip title="¡Practica lo aprendido!" placement="left-start">
                <TrainingBtn onClick={trainingBtnHandler}>Entrenar</TrainingBtn>
              </Tooltip>
            </Link>
            <Link to="/buscador/competition" style={{ textDecoration: 'none' }}>
              <Tooltip title="¡Mide tus capacidades!" placement="bottom">
                <CompetitionBtn onClick={competitionBtnHandler}>
                  Competir
                </CompetitionBtn>
              </Tooltip>
            </Link>
          </Modules>
          <Label>Siguiente</Label>
          <PreviewContainer onClick={() => playResource(nextResource.id)}>
            <Thumbnail resource={nextResource} />
          </PreviewContainer>
          <NextResourceDivider />
          <Content>
            {otherResources.map(r => (
              <PreviewContainer key={r.id} onClick={() => playResource(r.id)}>
                <Thumbnail resource={r} />
              </PreviewContainer>
            ))}
          </Content>
        </OtherContent>
      </LearningContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  background: ${palette.white};
  padding-top: 20px;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
`
const LearningContainer = styled.div`
  display: flex;
  padding-top: 20px;
`
//Contiene el recurso que se está renderizando y los controles
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`
const Modules = styled.div`
  display: flex;
  width: 230px;
  justify-content: space-between;
  font-family: sans-serif !important;
  margin-right: 20px;
`
const TrainingBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-size: 16px;
  letter-spacing: 0.2em;
  transition: background-color 0.2s;
  font-weight: bold;
  background: ${palette.secundaryGreen};
  color: ${palette.white};
  border: 2px solid ${palette.secundaryGreen};
  border-radius: 3px;
  &:hover {
    font-weight: bold;
    cursor: pointer;
    background-color: ${palette.white};
    color: ${palette.secundaryGreen};
  }
`
const CompetitionBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-size: 16px;
  letter-spacing: 0.2em;
  font-weight: bold;
  transition: background-color 0.2s;
  background: ${palette.primaryRed};
  color: ${palette.white};
  border: 2px solid ${palette.primaryRed};
  border-radius: 3px;
  &:hover {
    font-weight: bold;
    cursor: pointer;
    background-color: ${palette.white};
    color: ${palette.primaryRed};
  }
`
const Title = styled.div`
  width: 70%;
  margin-top: 10px;
  font-size: 26px;
  font-weight: bold;
`
const Subtitle = styled.div`
  width: 70%;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`
const Toolbar = styled.div`
  display: flex;
  width: 70%;
  height: 30px;
  margin-top: 10px;
  color: ${palette.secundaryGray};
`
const View = styled.div`
  height: 30px;
  width: 50%;
`
const LikeIcon = styled.img.attrs({
  src: require('../assetsDashboard/ic-like.png'),
  alt: 'Like',
})`
  height: 18px;
  width: 18px;
  margin-right: 10px;
`
const Label = styled.div`
  padding-right: 100px;
  color: ${palette.secundaryGray};
`
/*Contenedor derecho*/
const OtherContent = styled.div`
  height: 100%;
  width: auto;
`
const NextResourceDivider = styled.div`
  margin-top: 10px;
  height: 1.5px;
  width: 100%;
  border-bottom: 1.5px solid ${palette.primaryGray};
`
const PreviewContainer = styled.div`
  margin-top: 10px;
  display: flex;
  height: 150px;
  width: 100%;
  cursor: pointer;
`
const Content = styled.div`
  width: 100%;
  height: 380px;
  overflow-y: scroll;
  border-bottom: 1.5px solid ${palette.primaryGray};
  margin-right: 10px;
`
