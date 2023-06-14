import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './deanFaqPage.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFaqListAction } from '@admin/ducks/actions/faq'
import { getFaqs, getFaqsLoading } from '@admin/ducks/selectors/faq'
import List from '~/common/components/list'
import ListItem from './listItem'
import { AdminRoutes } from '~/common/types/routes'

const AdminFaqPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const faqs = useSelector(getFaqs)
  const loading = useSelector(getFaqsLoading)

  useEffect(() => {
    dispatch(fetchFaqListAction())
  }, [])

  const updateFaq = (id: number) => {
    navigate(`/${AdminRoutes.root}/${AdminRoutes.faq}/${id}`)
  } 
  return (
    loading ? (
      <>loading</>
    ) : (
      faqs && (
        <div className="container faqs">
          <div className="faqs__header">
            <h1>Вопросы декану</h1>
          </div>
          <List
            itemsRender={[
              <ListItem key="header" bold={true} />,

              faqs.map((e) => {
                return (
                  <ListItem 
                    faq={{
                      id: e.id,
                      name: `${e.lastName} ${e.firstName} ${e.middleName}`,
                      question: e.question,
                      answer: e.answer,
                      respondent: e.respondent
                    }} 
                    key={e.id} 
                    onClick={() => updateFaq(e.id)}
                  />
                )
              })
            ]}
          />
        </div>
      )
    )
  )
 
}

export default AdminFaqPage