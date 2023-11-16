import React from 'react'
import Button from './UI/button/Button'
import styles from '../styles/RemoveCardPopup.module.scss'
import { ICard } from '../models/models'



interface setIsRemoveCardPopup {
    isRemoveCardPopup: boolean
    setIsRemoveCardPopup: React.Dispatch<React.SetStateAction<boolean>>
    removeCard: (card: ICard) => void
    card: ICard
    cardScrollHeight: string
}


const RemoveCardPopup: React.FC<setIsRemoveCardPopup> = ({isRemoveCardPopup, setIsRemoveCardPopup, removeCard, card, cardScrollHeight}) => {


    const rootStyles = [styles.popup]
    if(isRemoveCardPopup) {
      rootStyles.push(styles.active)
    }  


  return (
    <div 
        className={rootStyles.join(' ')}
        style={cardScrollHeight ? {height: `${cardScrollHeight}px`} : {height: '100%'}}
        onClick={ e => {
            setIsRemoveCardPopup(false)
        }}
    >   
        <div className={styles.popup__contentContainer}>
          <div className={styles.popup__content} onClick={ e => e.stopPropagation()}>
              <h2 className={styles.popup__title}>Удалить карточку?</h2>
              <div className={styles.popup__buttons}>
                <Button onClick={ e => removeCard(card)}>Да</Button>
                <Button cancel onClick={ e => {
                  setIsRemoveCardPopup(false)
                }}>Нет</Button>
              </div>
          </div>
        </div>
</div>
  )
}
export default RemoveCardPopup