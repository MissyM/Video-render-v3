import React from 'react'
import styled from 'styled-components'
import ButtonActions from '../components/ButtonsActions'
import NavBar from '../NavBar/index'
import palette from '../../utils/palette'

export default ({ history, location }) => {
  // useEffect(() => {
  //   const search = location.search
  //   getActivity(search)
  // }, [])
  // debugger
  // const getActivity = useCallback(()=>{
  //   const params = new URLSearchParams(search)
  //   console.log(params)
  // },[])
  // const questions = [
  //   {
  //     id: 1,
  //     topic:"",
  //     subtopic:"",
  //     resource: "",
  //     time: "", 
  //     question: "",
  //     answers: [
  //       {text: "" },
  //       {text: "" },
  //       {text: "" },
  //       {text: "", isOk: true},
  //     ]
  //   },
  //   {
  //     id: 1,
  //     topic:"",
  //     subtopic:"",
  //     resource: "",
  //     time: "", 
  //     question: "",
  //     answers: [
  //       {text: "" },
  //       {text: "" },
  //       {text: "" },
  //       {text: "", isOk: true},
  //     ]
  //   },
  //   {
  //     id: 1,
  //     topic:"",
  //     subtopic:"",
  //     resource: "",
  //     time: "", 
  //     question: "",
  //     answers: [
  //       {text: "" },
  //       {text: "" },
  //       {text: "" },
  //       {text: "", isOk: true},
  //     ]
  //   },
  //   {
  //     id: 1,
  //     topic:"",
  //     subtopic:"",
  //     resource: "",
  //     time: "", 
  //     question: "",
  //     answers: [
  //       {text: "" },
  //       {text: "" },
  //       {text: "" },
  //       {text: "", isOk: true},
  //     ]
  //   },
  //   {
  //     id: 1,
  //     topic:"",
  //     subtopic:"",
  //     resource: "",
  //     time: "", 
  //     question: "",
  //     answers: [
  //       {text: "" },
  //       {text: "" },
  //       {text: "" },
  //       {text: "", isOk: true},
  //     ]
  //   },
  // ]
 
  return (
    <Container>
      <h1>Módulo en construcción</h1>
      <h3>¡Estamomos trabajando para mejorar tu experiencia en yupay!</h3>

        {/* <NavBar />
        {props}
      <TrainingContainer>
        <QuestionContent >
          <Timer>2:50 min</Timer><Question> Aqui va la pregunta</Question>
        </QuestionContent> 
        <AnswerContent>
          <TopRow>
            <AnswerA> 3</AnswerA>
            <AnswerB> 3</AnswerB>
          </TopRow>
          <BottomRow>
            <AnswerC> 3</AnswerC>
            <AnswerD> 3</AnswerD>
          </BottomRow>
        </AnswerContent>
      </TrainingContainer>
      <ButtonActions/> */}
    </Container>
  )}
const Container = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${palette.white};
  width: 100%;
  height: 100%;
`
// const TrainingContainer = styled.div `
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-color: ${palette.white};
//   width: 100%;
//   height: 100%;
// `

// const QuestionContent = styled.div `
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 40%;
// `
// const Timer = styled.div `
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 130px;
//   height: 130px;
//   font-size: 30px;
//   color: ${palette.white};
//   background: ${palette.primaryBlue};
//   border-radius: 50%;
// `
// const Question = styled.div `
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: calc(80% - 130px);
//   height: 100%;
// `
// const AnswerContent = styled.div `
//   width: 100%;
//   height: 50%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin: 10px;
// `
// const TopRow = styled.div`
//   width: 100%;
//   height: 50%;
//   display: flex;
//   justify-content: space-around;
// `
// const BottomRow = styled.div`
//   width: 100%;
//   height: 50%;
//   display: flex;
//   justify-content: space-around;
// `
// const AnswerA = styled.div`
//   text-align: center;
//   padding: 20px;
//   width: 40%;
//   height: 60px;
//   background: ${palette.primaryGreen};
// `
// const AnswerB = styled.div`
//   text-align: center;
//   padding: 20px;
//   width: 40%;
//   height: 60px;
//   background: ${palette.primaryPurple};
// `
// const AnswerC = styled.div`
//   text-align: center;
//   padding: 20px;
//   width: 40%;
//   height: 60px;
//   background: ${palette.primaryRed};
// `
// const AnswerD = styled.div`
//   text-align: center;
//   padding: 20px;
//   width: 40%;
//   height: 60px;
//   background: ${palette.primaryYellow};
// `
