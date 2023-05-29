import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IAccordion } from '~/common/types/common'
import './Accordion.scss'

const Accordion = ({
  children,
  title,
  titleClass,
  arrowOpenClass,
}: IAccordion) => {
  const [expanded, setExpanded] = useState(false)
  
  const toggleAccordion = () => { 
    return setExpanded(!expanded) 
  }

  return (
    <div className='FAQ__record'>
      <motion.button
        initial={false}
        onClick={toggleAccordion}
        className={`${titleClass} ${expanded ? arrowOpenClass : ''}`}
        style={{
          textAlign: 'left',
          borderBottomLeftRadius: expanded ? '0px' : '10px',
          borderBottomRightRadius: expanded ? '0px' : '10px',
          borderColor: expanded ? '#207EED' : '#E0E0E0',
          paddingLeft: '30px'
        }}
      >
        {title}
      </motion.button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { 
                opacity: 1, 
                height: 'auto',
              },
              collapsed: { 
                opacity: 0, 
                height: 0
              },
            }}
            style={{ 
              overflow: 'hidden',
              border: '2px solid #207EED',
              borderTop: '0px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              borderColor: expanded ? '#207EED' : '#E0E0E0',
            }}
            //transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
