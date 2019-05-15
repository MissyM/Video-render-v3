/*CONTENTS PANEL ADMIN (index)*/
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useContext,
} from 'react'
import styled, { css } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import uuidV4 from 'uuid/v4'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'

import ContentsModelCtx from './ContentsModelCtx'

import ResourceForm from './ResourceForm'

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
const contentsFile = pathModule.join(yupayPath, 'yupay-contents.json')
const contentsFolder = pathModule.join(yupayPath, 'yupay-contents')

if (!fs.existsSync(contentsFolder)) {
  fs.mkdirSync(contentsFolder)
}

function getExtension(name) {
  const parts = name.split('.')
  return parts[parts.length - 1]
}

const initialData = fs.existsSync(contentsFile)
  ? JSON.parse(fs.readFileSync(contentsFile, 'utf-8'))
  : { topics: [] }

const saveInDB = newData => {
  fs.writeFile(contentsFile, JSON.stringify(newData), 'utf-8', () => {})
}

const removeResourceFiles = resource => {
  if (resource.img) {
    const imgFile = pathModule.join(
      contentsFolder,
      `${resource.id}.${resource.img}`
    )
    fs.unlinkSync(imgFile)
  }
  if (resource.src) {
    const contentFile = pathModule.join(
      contentsFolder,
      `${resource.id}.${resource.src}`
    )
    fs.unlinkSync(contentFile)
  }
}

export default ({ show = true }) => {
  const [data, _setData] = useState(initialData)

  const setData = newData => {
    saveInDB(newData)
    _setData(newData)
  }

  const model = useMemo(
    () => ({
      new(path) {
        const name = path[path.length - 1]
        const clonedData = cloneDeep(data)
        const targetArr = get(clonedData, path)
        const subName = name === 'topics' ? 'subtopics' : 'resources'
        targetArr.push({
          id: uuidV4(),
          title: 'Nuevo Item',
          ...(name !== 'resources'
            ? { [subName]: [] }
            : {
                author: '',
                type: '',
                intelligence: '',
                learningStyle: '',
                img: '',
                src: '',
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
        }
      },
      editResource(resourcePath, formData) {
        const clonedData = cloneDeep(data)
        const resource = get(clonedData, resourcePath)
        const id = resource.id || uuidV4()
        resource.id = id
        resource.author = formData.author
        resource.type = formData.type
        resource.intelligence = formData.intelligence
        resource.learningStyle = formData.learningStyle
        // if the user choose an image
        if (typeof formData.img === 'object') {
          // if there is already a file, remove it
          if (resource.img) {
            fs.unlinkSync(
              pathModule.join(contentsFolder, `${id}.${resource.img}`)
            )
          }
          const imgExt = getExtension(formData.img.name)
          const imgPath = pathModule.join(contentsFolder, `${id}.${imgExt}`)
          fs.writeFileSync(imgPath, '', 'utf-8')
          fs.createReadStream(formData.img.path).pipe(
            fs.createWriteStream(imgPath)
          )
          resource.img = imgExt
        }
        // if the user choose a source
        if (typeof formData.src === 'object') {
          // if there is already a file, remove it
          if (resource.src) {
            fs.unlinkSync(
              pathModule.join(contentsFolder, `${id}.${resource.src}`)
            )
          }
          const srcExt = getExtension(formData.src.name)
          const srcPath = pathModule.join(contentsFolder, `${id}.${srcExt}`)
          fs.writeFileSync(srcPath, '', 'utf-8')
          fs.createReadStream(formData.src.path).pipe(
            fs.createWriteStream(srcPath)
          )
          resource.type = srcExt === 'pdf' ? 'pdf' : 'video'
          resource.src = srcExt
        }
        setData(clonedData)
      },
    }),
    [data, setData]
  )

  return (
    <ContentsModelCtx.Provider value={model}>
      <List
        style={{ display: show ? 'block' : 'none' }}
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
                path={[
                  'topics',
                  topicIdx,
                  'subtopics',
                  subtopicIdx,
                  'resources',
                ]}
                items={subtopic.resources}
                itemComponent={(resource, resourceIdx) => (
                  <ResourceForm
                    path={[
                      'topics',
                      topicIdx,
                      'subtopics',
                      subtopicIdx,
                      'resources',
                      resourceIdx,
                    ]}
                    resource={resource}
                  />
                )}
              />
            )}
          />
        )}
      />
    </ContentsModelCtx.Provider>
  )
}

const List = ({ title, path, items, itemComponent, ...rest }) => {
  const [openItem, setItem] = useState(-1)
  const model = useContext(ContentsModelCtx)

  const handlerOpenItem = useCallback(
    idx => {
      setItem(idx === openItem ? -1 : idx)
    },
    [openItem, setItem]
  )

  return (
    <MainContainer {...rest}>
      <Header>
        <MainTitle>{title}</MainTitle>
        <Tooltip title="Agregar" placement="right-start">
          <IconButton onClick={() => model.new(path)}>
            <Add />
          </IconButton>
        </Tooltip>
      </Header>
      <ListContainer>
        {items.map((item, idx) => (
          <Item key={item.id}>
            <TopicHeader>
              <Tooltip title={`Desplegar ${title}`} placement="bottom-end">
                <IconButton onClick={() => handlerOpenItem(item.id)}>
                  <Dropdown rotateArrow={openItem === item.id} />
                </IconButton>
              </Tooltip>
              <ItemTitle
                title={title}
                value={item.title}
                onChange={value => model.editTitle(path, idx, value)}
              />
              <Arrows>
                <Tooltip title="Mover hacia abajo" placement="left-start">
                  <IconButton onClick={() => model.down(path, idx)}>
                    <DownArrow />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Mover hacia arriba" placement="left-start">
                  <IconButton onClick={() => model.up(path, idx)}>
                    <UpArrow />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" placement="right-start">
                  <IconButton onClick={() => model.remove(path, idx)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Arrows>
            </TopicHeader>
            {openItem === item.id && (
              <div style={{ padding: 40, paddingTop: 0, width: '100%' }}>
                {itemComponent(item, idx)}
              </div>
            )}
          </Item>
        ))}
      </ListContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  height: calc(100% - 50px);
  width: 100%;
`
const MainTitle = styled.div`
  font-size: 18px;
  color: #a79fa5;
  margin: 0px 20px 0px 5px;
`
const Add = styled.img.attrs({
  src: require('../assets/plus-blue.png'),
  alt: 'Agregar',
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
  border-bottom: 1px solid #cbc7b3;
`
const TopicHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

const Dropdown = styled.img.attrs({
  src: require('../assets/down-arrow-blue.png'),
  alt: 'Desplegar',
})`
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: all 0.4s ease;
  ${props =>
    props.rotateArrow &&
    css`
      transform: rotateZ(-180deg);
      transition: transform 0.3s;
    `}
`

const ItemTitle = ({ title, value, onChange }) => {
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

  const handleKeyPress = useCallback(
    event => {
      if (event.key === 'Enter') {
        save()
      }
    },
    [state, setState, inputValue]
  )

  const save = useCallback(() => {
    setState('show')
    onChange(inputValue)
  }, [state, setState, inputValue])

  const handleBlur = useCallback(
    ev => {
      if (ev.relatedTarget !== buttonRef.current) {
        save()
      } else {
        setInputValue(value)
      }
    },
    [state, setState, inputValue]
  )

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
  border-bottom: solid 1px #a79fa5;
  font-size: 18px;
  color: #a79fa5;
  outline: none;
`

const ItemTitleContainer = styled.div`
  font-size: 18px;
  color: #a79fa5;
  margin: 5px 20px 0px 5px;
`
const Arrows = styled.div`
  position: absolute;
  right: 30px;
  width: 150px;
`
const DownArrow = styled.img.attrs({
  src: require('../assets/down-blue.png'),
  alt: 'Subir',
})`
  width: 20px;
  height: 20px;
  cursor: pointer;
`
const UpArrow = styled.img.attrs({
  src: require('../assets/up-blue.png'),
  alt: 'Bajar',
})`
  width: 20px;
  height: 20px;
  cursor: pointer;
`
const Delete = styled.img.attrs({
  src: require('../assets/garbage-blue.png'),
  alt: 'Eliminar',
})`
  width: 20px;
  height: 20px;
  cursor: pointer;
`
