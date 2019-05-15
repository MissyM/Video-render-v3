/*QUESTIONS PANEL ADMIN (index)*/
import React, { useState, useCallback, useMemo, useRef, useContext } from 'react'
import styled, { css } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton  from '@material-ui/core/IconButton'
import uuidV4 from 'uuid/v4'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import palette from '../../utils/palette'

import QuestionsModelCtx from './QuestionsModelCtx'

import QuestionForm from './QuestionForm'

const electronRequire = window.require
const electron = electronRequire('electron')
const fs = electronRequire('fs')
const pathModule = electronRequire('path')
const app = electron.remote.app

const userPath = app.getPath('userData')
const yupayPath = pathModule.join(userPath, 'yupay-files')
if (!fs.existsSync(yupayPath)) {
  fs.mkdirSync(yupayPath)
}
const questionsFile = pathModule.join(yupayPath, 'yupay-questions.json')
const questionsFolder = pathModule.join(yupayPath, 'yupay-questions')

if (!fs.existsSync(questionsFolder)) {
  fs.mkdirSync(questionsFolder)
}

function getExtension(name) {
  const parts = name.split('.')
  return parts[parts.length - 1]
}

const initialData = fs.existsSync(questionsFile)
  ? JSON.parse(fs.readFileSync(questionsFile, 'utf-8'))
  : { topics: [] }

const saveInDB = newData => {
  fs.writeFile(contentsFile, JSON.stringify(newData), 'utf-8', () => {})
}

const removeResourceFiles = resource => {
  if (resource.img) {
    const imgFile = pathModule.join(contentsFolder, `${resource.id}.${resource.img}`)
    fs.unlinkSync(imgFile)
  }
  if (resource.src) {
    const contentFile = pathModule.join(contentsFolder, `${resource.id}.${resource.src}`)
    fs.unlinkSync(contentFile)
  }
}

export default () => {
  const [data, _setData] = useState(initialData)

  const setData = newData => {
    saveInDB(newData)
    _setData(newData)
  }

  const model = useMemo(() => ({
    new(path) {
      const name = path[path.length - 1]
      const clonedData = cloneDeep(data)
      const targetArr = get(clonedData, path)
      const subName = name === 'topics' ? 'subtopics' : 'resources'
      targetArr.push({
        id: uuidV4(),
        title: 'Nuevo Item',
        ...(name !== 'resources' ? { [subName]: [] } : {
          author: '',
          type: '',
          intelligence:'',
          learningStyle: '',
          avatar: '',
        }),
      })
      setData(clonedData)
    },
    remove(path, idx, openItem, setOpenItem) {
      const clonedData = cloneDeep(data)
      const targetArr = get(clonedData, path)
      const lastPart = path[path.length - 1]
      const obj = targetArr[idx]
      if (lastPart === 'topics') {
        for (const subtopic of obj.subtopics) {
          for (const resource of subtopic.resources) {
            removeResourceFiles(resource)
          }
        }
      } else if (lastPart === 'subtopics') {
        for (const resource of obj.resources) {
          removeResourceFiles(resource)
        }
      } else if (lastPart === 'resources') {
        removeResourceFiles(obj)
      }
      targetArr.splice(idx, 1)
      setData(clonedData)
      if (openItem === idx) {
        setOpenItem(-1)
      }
    },
    editTitle(path, idx, newTitle) {
      const clonedData = cloneDeep(data)
      const targetArr = get(clonedData, path)
      targetArr[idx].title = newTitle
      setData(clonedData)
    },
    down(path, idx, openItem, setOpenItem) {
      if (idx < data.topics.length - 1) {
        const clonedData = cloneDeep(data)
        const targetArr = get(clonedData, path)
        const aux = targetArr[idx]
        targetArr[idx] = targetArr[idx + 1]
        targetArr[idx + 1] = aux
        setData(clonedData)
        if (openItem === idx) {
          setOpenItem(idx + 1)
        }
      }
    },
    up(path, idx, openItem, setOpenItem) {
      if (idx > 0) {
        const clonedData = cloneDeep(data)
        const targetArr = get(clonedData, path)
        const aux = targetArr[idx]
        targetArr[idx] = targetArr[idx - 1]
        targetArr[idx - 1] = aux
        setData(clonedData)
        if (openItem === idx) {
          setOpenItem(idx - 1)
        }
      }
    },
    editResource(resourcePath, newResource) {
      const clonedData = cloneDeep(data)
      const resource = get(clonedData, resourcePath)
      removeResourceFiles(resource)
      Object.assign(resource, newResource)
      const id = resource.id || uuidV4()
      resource.id = id
      if (typeof resource.img === 'object') {
        const imgExt = getExtension(resource.img.name)
        const imgPath = pathModule.join(contentsFolder, `${id}.${imgExt}`)
        fs.writeFileSync(imgPath, '', 'utf-8')
        fs.createReadStream(resource.img.path).pipe(fs.createWriteStream(imgPath))
        resource.img = imgExt
      }
      if (typeof resource.src === 'object') {
        const srcExt = getExtension(resource.src.name)
        const srcPath = pathModule.join(contentsFolder, `${id}.${srcExt}`)
        fs.writeFileSync(srcPath, '', 'utf-8')
        fs.createReadStream(resource.src.path).pipe(fs.createWriteStream(srcPath))
        resource.type = srcExt === 'pdf' ? 'pdf' : 'video'
        resource.src = srcExt
      }
      setData(clonedData)
    }
  }), [data, setData])

  return (
    <QuestionsModelCtx.Provider value={model}>
      <List
        title="Temas"
        path={['topics']}
        items={data.topics}
        itemComponent={(topic, topicIdx) => (
          <List
            title="Subtemas"
            path={['topics', topicIdx, 'subtopics']}
            items={topic.subtopics}
            itemComponent={(subtopic, subtopicIdx) => (
              <List
                title="Recursos"
                path={['topics', topicIdx, 'subtopics', subtopicIdx, 'resources']}
                items={subtopic.resources}
                itemComponent={(resource, resourceIdx) => (
                  <QuestionForm
                    path={['topics', topicIdx, 'subtopics', subtopicIdx, 'resources', resourceIdx]}
                    resource={resource}
                  />
                )}
              />
            )}
          />
        )}
      />
    </QuestionsModelCtx.Provider>
  )
}

const List = ({ title, path, items, itemComponent }) => {
  const [openItem, setItem] = useState(-1)
  const model = useContext(QuestionsModelCtx)

  const handlerOpenItem = useCallback((idx)=> {
    setItem(idx === openItem ? -1 : idx)
  }, [openItem, setItem])

  return (
    <MainContainer>
      <Header>
        <MainTitle>{title}</MainTitle>
        <Tooltip title="Agregar" placement="right-start">
          <Add onClick={() => model.new(path)} />
        </Tooltip>
      </Header>
      <ListContainer>
        {items.map((item, idx) => 
          <Item key={item.id}>
            <TopicHeader>
              <Tooltip title={`Desplegar ${title}`} placement="bottom-end">
                <Dropdown onClick={() => handlerOpenItem(idx)} rotateArrow={openItem === idx}/>
              </Tooltip>
              <ItemTitle title={title} value={item.title} onChange={value => model.editTitle(path, idx, value)} />
              <Tooltip title="Mover hacia abajo" placement="left-start">
                <DownArrow onClick={() => model.down(path, idx)}/>
              </Tooltip>
              <Tooltip
                title="Mover hacia arriba" placement="left-start">
                <UpArrow  onClick={() => model.up(path, idx)}/>
              </Tooltip>
              <Tooltip title="Eliminar" placement="right-start">
                <Delete onClick={() => model.remove(path, idx)}/>
              </Tooltip>
            </TopicHeader>
            {openItem === idx && <div style={{ padding: 40, paddingTop: 0, width: '100%' }}>
              {itemComponent(item, idx)}
            </div>}
          </Item>
        )}
      </ListContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  height : calc(100% - 50px);
  width: 100%;
`
const MainTitle = styled.div`
  font-size: 18px;
  color: ${palette.tertiaryGray};
  margin: 0px 20px 0px 5px; 
`
const Add = styled.img.attrs({
  src: require('../assets/plus-blue.png'),
  alt: 'Agregar'
})`
  width: 40px;
  height: 40px;
  cursor: pointer;
`
const Header = styled.div`
  width: 100px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px; 
`
const ListContainer = styled.div`
  width: 100%;
`
const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${palette.tertiaryGray};
`
const TopicHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`
const Dropdown = styled.img.attrs({
  src: require('../assets/down-arrow-blue.png'),
  alt: 'Desplegar'
})`
  width: 18px;
  height: 18px;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  ${props=>props.rotateArrow && css`
    transform: rotateZ(-180deg);
    transition: transform .3s;
  `}
`

const ItemTitle = ({ value, onChange }) => {
  const inputRef = useRef()
  const buttonRef = useRef()

  const [state, setState] = useState('show')
  const [inputValue, setInputValue] = useState(value)

  const handleItemClick = useCallback(() => {
    if (state === 'show') {
      setState('edit')
      setTimeout(() => {
        inputRef.current.focus()
      })
    }
  })

  const handleKeyPress = useCallback((event) => {
    if (event.keyCode === 13){
      save()
    }
  }, [state, setState, inputValue])

  const save = useCallback(() => {
    setState('show')
    onChange(inputValue)
  }, [state, setState, inputValue])

  const handleBlur = useCallback(ev => {
    if (ev.relatedTarget !== buttonRef.current) {
      save()
    } else {
      setInputValue(value)
    }
  }, [state, setState, inputValue])

  const cancel = useCallback(() => {
    setState('show')
  }, [state, setState, inputValue])

  return (
    <ItemTitleContainer onClick={handleItemClick}>
      {state === 'show' ? (
        value
      ) : (
        <>
          <NewItemInput
            ref={inputRef}
            value={inputValue}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            onChange={ev => setInputValue(ev.target.value)}
          />
          <Tooltip title="Cancelar Modificación" placement="bottom-end">
            <IconButton buttonRef={buttonRef} onClick={cancel}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </ItemTitleContainer>
  )
}

const CancelIcon = styled.img.attrs({
  src: require('../assets/cancel.svg'),
  alt: 'Cancelar Modificación',
})`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const NewItemInput = styled.input`
  border: none;
  border-bottom: solid 1px ${palette.tertiaryGray};
  font-size: 18px;
  color:${palette.tertiaryGray};
  outline: none;
`

const ItemTitleContainer = styled.div`
  font-size: 18px;
  color: ${palette.tertiaryGray};
  margin: 5px 20px 0px 5px; 
`

const DownArrow = styled.img.attrs({
  src: require('../assets/down-blue.png'),
  alt: 'Subir'
})`
  position: absolute;
  right: 45px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`
const UpArrow = styled.img.attrs({
  src: require('../assets/up-blue.png'),
  alt: 'Bajar'
})`
  position: absolute;
  right: 65px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`
const Delete = styled.img.attrs({
  src: require('../assets/garbage-blue.png'),
  alt: 'Eliminar'
})`
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`