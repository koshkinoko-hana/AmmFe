import ReactPaginate from 'react-paginate'
import './quesionPage.scss'
import React from 'react'

const QuestionPage: React.FC = () => {
  return (
    <div className='body'>
      <section className='dean-question'>
        <div className='container'>
          <div className='top'>
            Вопрос декану
          </div>
          <h1>Вопрос декану</h1>
          <p>Здесь вы можете напрямую задать вопрос декану факультета ПММ проф. Шашкину Александру Ивановичу и через некоторое время получить на него ответ.</p>
          <p>Ваш вопрос, в зависимости от сложности и загруженности декана, может рассматриваться сроком до 2х недель.</p>
        </div>
      </section>
      <section className='FAQ'>
        <h2>Часто задаваемые вопросы</h2>        
        <ReactPaginate 
          containerClassName='FAQ__list' 
          pageClassName='FAQ__list__item' 
          pageLinkClassName='FAQ__list__item__link'
          previousClassName='FAQ__list__arrow_left'
          nextClassName='FAQ__list__arrow_right'
          nextLabel=">"
          previousLabel="<"
          breakClassName='FAQ__list__break'
          breakLinkClassName='FAQ__list__break__link'
          breakLabel="..."
          pageCount={57}
          forcePage={1}
          //onPageChange={}
        />
      </section>
      <section className='ask-a-question'>
        <h2>Задать вопрос</h2>
      </section>
    </div>
  )
}

export default QuestionPage