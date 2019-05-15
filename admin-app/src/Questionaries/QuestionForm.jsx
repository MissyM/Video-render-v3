import React, {useContext } from 'react'
import styled from 'styled-components'
import { Formik, FastField} from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import grey from '@material-ui/core/colors/grey'
import Tooltip from '@material-ui/core/Tooltip'

import QuestionsModelCtx from './QuestionsModelCtx'

import Select from './Select'

const styles = () => ({
  cssLabel: {
    '&$cssFocused': {
      color: grey[400],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: grey[400],
    },
  },
  formControl: {
    minWidth: 50
  },
  selectEmpty: {}
})

export default withStyles(styles)(function ResourceForm({ classes, path, resource }) {
  const model = useContext(QuestionsModelCtx)
    return (
      <Formik
        initialValues={resource}
        validate={values => {
          const errors = {}
          if (!values.author) {
            errors.author = 'Escribe el autor'
          }
          if (!values.intelligence) {
            errors.intelligence = 'Seleccion una inteligencia'
          }
          if (!values.learningStyle) {
            errors.learningStyle = 'Seleccione un estilo de aprendizaje'
          }
          if (!values.img) {
            errors.img = 'Seleccione una miniatura'
          }
          if (!values.src) {
            errors.src = 'Seleccione un archivo'
          }
          return errors
        }}
        onSubmit={(values, actions) => {
          model.editResource(path, values)
          actions.setSubmitting(false)
        }}
        
        render={({ handleSubmit, setFieldValue, errors, touched, setFieldTouched, values }) => <>
          <FormSection>
            <InputAuthorContent>
              <FastField
                name="author"
                type="text"
                label="Autor*"
                style={{ width: '100%' }}
                component={TextField}
              />
            </InputAuthorContent>
            <Selects>
              <FastField
                name="intelligence"
                label="Inteligencia*"
                component={Select}
                formControl={{
                  variant: 'filled',
                  className: classes.formControl,
                }}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="cinetico-corporal">Cinetico-corporal</MenuItem>
                <MenuItem value="espacial">Espacial</MenuItem>
                <MenuItem value="logico-matematica">Logico-matematica</MenuItem>
                <MenuItem value="musical">Musical</MenuItem>
                <MenuItem value="naturalista">Naturalista</MenuItem>
                <MenuItem value="linguistica">Linguistica</MenuItem>
                <MenuItem value="interpersonal">Interpersonal</MenuItem>
                <MenuItem value="intrapersonal">Intrapersonal</MenuItem>
              </FastField>
              <FastField
                name="learningStyle"
                label="Estilo de aprendizaje*"
                component={Select}
                formControl={{
                  fullWidth: true,
                  variant: 'filled',
                  className: classes.formControl
                }}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="ACTIVO">Activo</MenuItem>
                <MenuItem value="PRAGMATICO">Pragmático</MenuItem>
                <MenuItem value="REFLEXIVO">Reflexivo</MenuItem>
                <MenuItem value="TEORICO">Teórico</MenuItem>
              </FastField>
            </Selects>
            <UploadThumbnailInput
              type="file"
              accept="image/*"
              id="thumbnailInput"
              onChange={ev => setFieldValue('img', ev.target.files[0])}
              onBlur={() => setFieldTouched('img', true)}
            />
            <UploadThumbnailLabel htmlFor="thumbnailInput">Cargar Miniatura*</UploadThumbnailLabel>
            {errors.img && touched.img && <div style={{ color: 'red' }}>{errors.img}</div>}
            {values.img && <div>Se selecciono el archivo: {values.img.name}</div>}
            <br />
            <UploadContentInput
              type="file"
              accept="video/mp4,video/x-m4v,video/*,application/pdf"
              id="contentInput"
              onChange={ev => setFieldValue('src', ev.target.files[0])}
              onBlur={() => setFieldTouched('src', true)}
            />
            <UploadContentLabel htmlFor="contentInput">Cargar Contenido*</UploadContentLabel>
            {errors.src && touched.src && <div style={{ color: 'red' }}>{errors.src}</div>}
            {values.src && <div>Se selecciono el archivo: {values.src.name}</div>}
            <br />
            <br />
            <Submit onClick={handleSubmit}>Guardar</Submit>
          </FormSection>
        </>}
      />
    )
  }
)
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Selects = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
`
const InputAuthorContent = styled.div`
  margin: 20px;
  width: 400px;
`
const UploadThumbnailInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  width: 1px;
  height: 1px;
`
const UploadThumbnailLabel = styled.label`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 430px;
  height: 50px;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  letter-spacing: .2em;
  transition: background-color .2s;
  background-color: #fff;
  color:#67e6dc;
  border: 2px solid #67e6dc;
  &:hover{
    cursor: pointer;
    background: #67e6dc;
    color: #fff;
  }
`
const UploadContentInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  width: 1px;
  height: 1px;
`
const UploadContentLabel = styled.label`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 430px;
  height: 50px;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;s
  letter-spacing: .2em;
  transition: background-color .2s;
  background-color: #fff;
  color:#67e6dc;
  border: 2px solid #67e6dc;
  &:hover{
    cursor: pointer;
    background: #67e6dc;
    color: #fff;
  }
`
const Submit = styled.button`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 430px;
  height: 50px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: .2em;
  background: #67e6dc;
  color: #fff;
  transition: background-color .2s;
  outline: none;
  border: 2px solid #67e6dc;
  &:hover{
    cursor: pointer;
    background-color: #fff;
    color:#67e6dc;
  }
`