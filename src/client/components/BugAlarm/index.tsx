import './bugAlarm.scss'
import React, { useMemo, useState } from 'react'
import { FaBug, FaLongArrowAltDown } from 'react-icons/fa'

const BugAlarm: React.FC = () => {

  const [ shownInfo, setShownInfo ] = useState<string | null>(localStorage.getItem('bug-alarm-info'))

  const [ step, setStep ] = useState<number>(0)

  const onSubmit = () => {
    localStorage.setItem('bug-alarm-info', 'approved')
    setShownInfo('approved')
  }


  const message = useMemo(() => {
    switch (step) {
    case 0:
      return (
        <>
          <h3>Добро пожаловать на новый сайт ПММ!</h3>
          <p>В данный момент веб-приложение ещё находится в разработке и проходит стадию бета-тестирования.</p>
          <button onClick={() => setStep(step + 1)}>Далее</button>
        </>
      )
    case 1:
      return (
        <>
          <h3>Помогите нам стать лучше!</h3>
          <p>Пожалуйста, сообщите нам в случае обнаружения ошибки. Напишите на почту разработчику, нажав на кнопку с
            жучком в нижнем правом углу</p>
          <button onClick={() => setStep(step + 1)}>Далее</button>
        </>
      )
    case 2:
      return (
        <>
          <h3>Действия при обнаружении бага:</h3>
          <p>1. Если это возможно, сделать скриншот.</p>
          <p>2. Сообщить, на какой странице найден баг.</p>
          <p>3. Описать, что именно пошло не так.</p>
          <br/>
          <p>Благодарим вас за помощь!</p>
          <button onClick={onSubmit}>Принято</button>
        </>
      )
    }
  }, [ step ])

  return (
    <div className="bug-alarm">
      {
        !shownInfo &&
        <>
          <div className="bug-alarm__background">
          </div>
          <div className="dialogue">
            <div className="dialogue__content">
              <h2 className="dialogue__header">Бета-тестирование приложения</h2>
              {message}
            </div>
          </div>
        </>
      }
      {
        !shownInfo && step === 1 &&
        <div className="arrow">
          <FaLongArrowAltDown/>
        </div>
      }
      <button
        className="button-svg bug-alarm--bug-button"
        onClick={() => location.href = 'mailto:koshkinoko.hana@gmail.com?subject=Обнаружен баг в веб-приложении ПММ'}>
        <FaBug className="svg-base-size"/></button>

    </div>
  )
}

export default BugAlarm
