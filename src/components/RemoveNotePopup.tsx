import React from 'react'
import { INote } from '../models/models'
import styles from '../styles/RemoveNotePopup.module.scss'
import Button from './UI/button/Button'


interface RemoveNotePopupProps {
    isRemoveNotePopup: boolean
    confirmRemoveNote: () => void
    setIsRemoveNotePopup: React.Dispatch<React.SetStateAction<boolean>>
    setNoteToRemove: React.Dispatch<React.SetStateAction<INote | null>>
    cardScrollHeight: string
}



const RemoveNotePopup: React.FC<RemoveNotePopupProps> = ({isRemoveNotePopup, confirmRemoveNote, setIsRemoveNotePopup, setNoteToRemove, cardScrollHeight}) => {

    const rootStyles = [styles.popup]
    if(isRemoveNotePopup) {
      rootStyles.push(styles.active)
    }     

  return (
    <div 
        className={rootStyles.join(' ')}
        style={cardScrollHeight ? {height: `${cardScrollHeight}px`} : {height: '100%'}}
        onClick={ e => {
            setIsRemoveNotePopup(false)
            setNoteToRemove(null)
        }}
    >   
            <div className={styles.popup__content} onClick={ e => e.stopPropagation()}>
                <h2 className={styles.popup__title}>Удалить заметку?</h2>
                <div className={styles.popup__buttons}>
                  <Button onClick={ e => confirmRemoveNote()}>Да</Button>
                  <Button cancel onClick={ e => {
                      setIsRemoveNotePopup(false)
                      setNoteToRemove(null)
                  }}>Нет</Button>
                </div>
            </div>
    </div>
  )
}
export default RemoveNotePopup