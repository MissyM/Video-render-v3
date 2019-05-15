import React from 'react'
import styled from 'styled-components'
import { Document, Page } from 'react-pdf'
import palette from '../../utils/palette'

import { getVideo, getPDF } from '../../services/api'

export default ({ resource }) => {
  return (
    <Container>
      {resource.type === 'video' ? (
        <Video video={resource} />
      ) : (
        <PDF pdf={resource} />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 700px;
  height: 394px;
`

const Video = styled.video.attrs({
  src: props => getVideo(props.video),
  controls: true,
})`
  width: 700px;
  height: 394px;
`

class PDF extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  nextPage = () => {
    this.setState(state => ({
      pageNumber:
        state.pageNumber === state.numPages
          ? state.pageNumber
          : state.pageNumber + 1,
    }))
  }

  prevPage = () => {
    this.setState(state => ({
      pageNumber: state.pageNumber === 1 ? 1 : state.pageNumber - 1,
    }))
  }

  render() {
    const { pageNumber, numPages } = this.state
    console.log(this.props.pdf, getPDF(this.props.pdf))

    return (
      <PDFContainer>
        {this.props.pdf.id && (
          <>
            <DocumentContainer>
              <Document
                file={getPDF(this.props.pdf)}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </DocumentContainer>
            <PDFControls>
              <BackBtn onClick={this.prevPage}>Página Anterior</BackBtn>
              <h4
                style={{
                  marginTop: '0px',
                  backgroundColor: 'transparent',
                  paddingLeft: '5px',
                }}
              >
                {' '}
                Página {pageNumber} de {numPages}
              </h4>
              <NextBtn onClick={this.nextPage}> Página Siguiente</NextBtn>
            </PDFControls>
          </>
        )}
      </PDFContainer>
    )
  }
}

const PDFContainer = styled.div`
  width: 700px;
  height: 394px;
  position: relative;
`
const BackBtn = styled.button`
  background-color: ${palette.primaryYellow};
  color: ${palette.black};
  font-weight: 'bold';
`
const NextBtn = styled.button`
  font-weight: '700';
  background-color: ${palette.primaryPurple};
  color: ${palette.black};
`
const DocumentContainer = styled.div`
  width: 700px;
  height: 394px;
  overflow-y: scroll;
`

const PDFControls = styled.div`
  position: absolute;
  bottom: 10px;
  right: 100px;
  width: 250px;
  height: 40px;
  display: flex;
`
