import React, { useEffect, useState } from 'react'
import { getContent } from './services/api'

const ContentCtx = React.createContext()

export function useContent() {
  const context = React.useContext(ContentCtx)
  if (!context) {
    throw new Error(`useContent must be used within a ContentProvider`)
  }
  return context
}

export function ContentProvider({ children, ...rest }) {
  const [content, setContent] = React.useState({
    topics: [],
    subtopics: [],
    resources: [],
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getContent()
      .then(c => {
        const topics = c.topics
        const subtopics = []
        for (const topic of topics) {
          subtopics.push.apply(
            subtopics,
            topic.subtopics.map(subtopic => ({
              ...subtopic,
              topicTitle: topic.title,
            }))
          )
        }
        const resources = []
        for (const subtopic of subtopics) {
          resources.push.apply(
            resources,
            subtopic.resources.map(r => ({
              ...r,
              subtopicId: subtopic.id,
              topicTitle: subtopic.topicTitle,
            }))
          )
        }
        const allResources = [...resources]
        const getTopic = id => topics.find(topic => topic.id === id)
        const getSubtopic = id => subtopics.find(subtopic => subtopic.id === id)
        const getResource = id => resources.find(resource => resource.id === id)
        const getRelatedResources = id => {
          const selectedResource = getResource(id)
          const subtopicId = selectedResource.subtopicId
          const subtopic = getSubtopic(subtopicId)
          const resourceIdx = subtopic.resources.findIndex(r => r.id === id)
          let nextResourceIdx =
            resourceIdx === subtopic.resources.length - 1 ? -1 : resourceIdx + 1
          const nextResource =
            nextResourceIdx !== -1
              ? subtopic.resources[nextResourceIdx]
              : undefined
          let rest = allResources.filter(
            r => r.id !== id && r.id !== (nextResource && nextResource.id)
          )
          const resources = [
            selectedResource,
            ...(nextResource ? [nextResource] : []),
            ...rest,
          ]
          return resources
        }
        setContent({
          topics,
          subtopics,
          resources,
          allResources,
          getTopic,
          getSubtopic,
          getResource,
          getRelatedResources,
        })
        setLoaded(true)
      })
      .catch(err => alert(err))
  }, [])
  return (
    <ContentCtx.Provider value={content} {...rest}>
      {loaded ? children : <div>Cargando ...</div>}
    </ContentCtx.Provider>
  )
}
