/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import './footer.scss'
import IconColor from '@/src/assets/IconColor.svg'
import IconBW from '@/src/assets/IconBw.svg'
import { Link } from 'react-router-dom'
import  { Phone, Twitter, Vk, Marker } from '@/src/common/icons'
const Footer: React.FC = () => {
  console.log('')
  return (
    <div className="footer">
      <div className='footer-box'>
        <div className="footer-container">
          <div className="links-container">
            <div className='logo-container'>
              <div className="icon-container">
                <img src={IconBW} />
                <img src={IconColor} />
              </div>
            </div>
            <div className='column'>
              <Link to="/" className="p2">Новости</Link>
              <Link to="/" className="p2">Кафедры</Link>
              <Link to="/" className="p2">Вопрос декану</Link>
            </div>
            <div className='column'>
              <Link to="/" className="p2">Галерея</Link>
              <Link to="/" className="p2">Контакты</Link>
              <Link to="/" className="p2">Контакты</Link>
            </div>
          </div>
          <div className='contacts-container'>
            <div className='column'>
              <div className='social-icons'>
                <Link to="/" className="p2"><Vk/></Link>
                <Link to="/" className="p2"><Twitter/></Link>
              </div>
              <div className='item'>
                <Link to="/" className="p2">
                  <a href="#" className='link'>
                    <span> <Phone /> </span>
                    <span> +7 (473) 2-208-266 </span>
                  </a>
                </Link>
              </div>
              <div className='item'>
                <Link to="/" className="p2">
                  <a href="#" className='link'>
                    <span><Marker /></span>
                    <span>г. Воронеж, Университетская пл. 1</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className='mobile-icon'>
            <div className='logo-container'>
              <div className="icon-container">
                <img src={IconBW} />
                <img src={IconColor} />
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-text">© Факультет ПММ, 2022</div>
      </div>
    </div>
  )
}

export default Footer