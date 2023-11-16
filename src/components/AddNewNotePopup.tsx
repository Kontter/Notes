import React, { useState } from 'react'
import { ICard } from '../models/models'
import styles from '../styles/AddNewNotePopup.module.scss'
import Button from './UI/button/Button'



interface AddNewNotePopupProps {
    isAddNewNotePopup: boolean
    setIsAddNewNotePopup: React.Dispatch<React.SetStateAction<boolean>>
    addNewNote: () => void
    newNoteTextarea: string
    setNewNoteTextarea: React.Dispatch<React.SetStateAction<string>>
    cardScrollHeight: string
}


const AddNewNotePopup: React.FC<AddNewNotePopupProps> = ({isAddNewNotePopup, setIsAddNewNotePopup, addNewNote, newNoteTextarea, setNewNoteTextarea, cardScrollHeight}) => {


    
    

    const rootStyles = [styles.popup]
    if(isAddNewNotePopup) {
      rootStyles.push(styles.active)
    }   


  return (
    <div 
        className={rootStyles.join(' ')} 
        style={cardScrollHeight ? {height: `${cardScrollHeight}px`} : {height: '100%'}}
        onClick={ e => {
            setIsAddNewNotePopup(false)
            setNewNoteTextarea('')
        }}
    >       
            <textarea 
                className={styles.popup__textarea} 
                value={newNoteTextarea}
                onClick={ e => e.stopPropagation()} 
                onChange={ e => setNewNoteTextarea(e.target.value)}
            >
            </textarea>
            <div className={styles.popup__buttons} onClick={ e => e.stopPropagation()}>
                {newNoteTextarea
                    ?
                        <Button style={{padding: 3, fontSize: 15}} onClick={ e => addNewNote()}>Сохранить</Button>
                    :
                        <Button disabled notActive style={{padding: 3, fontSize: 15}} onClick={ e => addNewNote()}>Сохранить</Button>
                }
                <Button 
                    cancel 
                    style={{padding: 3, fontSize: 15}}
                    onClick={ e => {
                        setIsAddNewNotePopup(false)
                        setNewNoteTextarea('')
                    }}
                >Отмена</Button>
            </div>
    </div>
  )
}

export default AddNewNotePopup