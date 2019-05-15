import * as api from './api'

const log = logObject => {
  //Cambiar por = new Date()
  logObject.timestamp = new Date(Date.now())

  api.log(logObject)
}
export const logUsuarioRegistrado = (username) => log({ 
  eventName: 'UsuarioRegistrado', 
  username,
})
export const logSesionIniciada = (username) => log({ 
  eventName: 'SesionIniciada', 
  username,
})

export const logNavego = pathname => log({
  eventName: 'Navegó',
  url: pathname,
})

//Componente TopicSelected
export const logSelectDelNavBarClickeado = () => log({
  eventName: 'SelectDelNavBarClickeado',
})
//Logs del componente Browser
export const logLogoLoboYupayClickeado = () => log({
  eventName: 'LogoLoboYupayClickeado',
})

//Logs del Componente Learning

export const logIconoVisualizacionesClickeado = () => log({
  eventName: 'VisualizacionesClickeado',
})
export const logIconoLikesClickeado = () => log({
  eventName: 'IconoLikesClickeado',
})
export const logBtnEntrenamientoClickeado = () => log({
  eventName: 'trainingBtnHandler',
})
export const logBtnCompetenciaClickeado = () => log({
  eventName: 'competitionBtnHandler',
})