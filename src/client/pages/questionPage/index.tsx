import ReactPaginate from 'react-paginate'
import React, { useEffect } from 'react'
import { PaginateRight } from '~/common/icons/PaginateRight'
import { PaginateLeft } from '~/common/icons/PaginateLeft'
import { ClientRoutes } from '~/common/types/routes'
import { PathKey } from '~/client/components/pageHeader/types'
import Header from '~/client/components/pageHeader'
import Accordion from '~/common/components/Accordion/Accordion'
import ContactForm from './components/ContactForm'
import './quesionPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestionListAction } from '@client/ducks/actions/faq'
import { getQuestions } from '@client/ducks/selectors/faq'
/* eslint-disable quotes */
const QuestionPage: React.FC = () => {
  const [offset, setOffset] = React.useState(0)
  const [perPage, setPerPage] = React.useState(5)
  const dispatch = useDispatch()
  const questionsList = useSelector(getQuestions)

  useEffect(() => {
    dispatch(fetchQuestionListAction())
  }, [])

  console.log(`@@!! questionsList: ${questionsList}`)

  return (
    <div className='body'>
      <Header
        header={'Вопрос декану'}
        description={'Здесь вы можете напрямую задать вопрос декану факультета ПММ проф. Шашкину Александру Ивановичу и через некоторое время получить на него ответ. Ваш вопрос, в зависимости от сложности и загруженности декана, может рассматриваться сроком до 2х недель'}
        path={{
          [PathKey.FAQ]: ClientRoutes.deanFaq
        }}
      />
      <section  className='FAQ'>
        <div className='FAQ__container'>
          <h2>Часто задаваемые вопросы</h2>
          {questionsList.slice(offset, offset + perPage).map((item, index) => (
            <Accordion
              key={index}
              title={item.question}
              titleClass='FAQ__item__title'
              arrowOpenClass='open'
            >
              <div style={{ padding: '20px 30px' }}>{item.answer} </div>
            </Accordion>
          ))}

          <div className='FAQ__paginator'>
            <ReactPaginate
              containerClassName='FAQ__list'
              pageClassName='FAQ__list__item'
              pageLinkClassName='FAQ__list__item__link'
              previousClassName='FAQ__list__arrow_left'
              nextClassName='FAQ__list__arrow_right'
              nextLabel={<PaginateRight />}
              previousLabel={<PaginateLeft />}
              breakClassName='FAQ__list__break'
              breakLinkClassName='FAQ__list__break__link'
              breakLabel="..."
              pageCount={Math.ceil(questionsList.length / perPage)}
              forcePage={0}
              onPageChange={({ selected }) => { setOffset(Math.ceil(selected * perPage)) }}
            />
          </div>
        </div>
      </section>
      <section className='ask-a-question'>
        <div className='ask-a-question__container'>
          <h2>Задать вопрос</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

export default QuestionPage
