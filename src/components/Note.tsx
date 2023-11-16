import React, { useState, useMemo } from 'react'
import { ICard, INote } from '../models/models'
import styles from '../styles/Note.module.scss'
import changeTextTextareaStyles from '../styles/changeTextTextarea.module.scss'
import { ReactComponent as EditNoteIcon } from '../icons/edit_FILL0_wght400_GRAD0_opsz24.svg'
import { ReactComponent as DeleteIcon } from '../icons/delete_FILL0_wght400_GRAD0_opsz48.svg'
import { ReactComponent as DoneIcon } from '../icons/done_FILL0_wght400_GRAD0_opsz24.svg'


interface NoteProps {
    card: ICard
    note: INote
    currentCard: ICard | null
    setCurrentCard: React.Dispatch<React.SetStateAction<ICard | null>>
    currentNote: INote | null
    setCurrentNote: React.Dispatch<React.SetStateAction<INote | null>>
    changeCardsHadler: (firstCard: ICard, secondCard: ICard) => Promise<void>
    removeNote: (e: React.MouseEvent, note: INote) => void
    editNoteHandler: (card: ICard) => Promise<void>
    searchCardNoteInput: string
    globalSearchNoteInput: string
}


const Note: React.FC<NoteProps> = ({
  card, 
  note, 
  currentCard, 
  setCurrentCard, 
  currentNote, 
  setCurrentNote, 
  changeCardsHadler, 
  removeNote, 
  editNoteHandler, 
  searchCardNoteInput, 
  globalSearchNoteInput
}) => {



  const [isEditNote, setIsEditNote] = useState<boolean>(false)
  const [editNoteTextarea, setEditNoteTextarea] = useState<string>('')
  const [textareaHeight, setTextareaHeight] = useState<string>('')

  const [isFoundNote, setIsFoundNote] = useState<boolean>(false)



  // выделение найденной заметки 
  useMemo( () => {
    if(globalSearchNoteInput) {
      if(note.body.toLowerCase().includes(globalSearchNoteInput.toLowerCase())) {
        setIsFoundNote(true)
      } else {
        setIsFoundNote(false)
      }
    } else {
      setIsFoundNote(false)
    }

    if(!globalSearchNoteInput && searchCardNoteInput) {
      if(searchCardNoteInput) {
        if(note.body.toLowerCase().includes(searchCardNoteInput.toLowerCase())) {
          setIsFoundNote(true)
        } else {
          setIsFoundNote(false)
        }
      } else {
        setIsFoundNote(false)
      }
    }
    
    if(globalSearchNoteInput && searchCardNoteInput) {
      if(searchCardNoteInput) {
        if(note.body.toLowerCase().includes(searchCardNoteInput.toLowerCase())) {
          setIsFoundNote(true)
        } else {
          setIsFoundNote(false)
        }
      } else {
        setIsFoundNote(false)
      }
    }
  }, [note.body, globalSearchNoteInput, searchCardNoteInput])


  

  // редактирование заметки
  const editNote = () => {
    note.body = editNoteTextarea.trim()
    editNoteHandler(card)
    setIsEditNote(false)
    setEditNoteTextarea('')
  }
  // изменение высоты textarea при вводе текста
  const changeTextareaHeight = (e: any) => {
    let scHeight = e.target.scrollHeight
    setTextareaHeight(scHeight)
  }
    



  // когда держим дроп над заметкой
  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>, card: ICard, note: INote) => {
    e.preventDefault()
    if(e.currentTarget.className === styles.note) {
      e.stopPropagation()
      e.currentTarget.style.boxShadow = '0 0px 7px 5px gray'
    }
    if(currentCard?.id === card.id && currentNote?.id === note.id) {
      e.currentTarget.style.backgroundColor = '#ff4747'
    }
  }


  // когда уводим дроп с заметки
  const dragLeaveHandler = (e: React.DragEvent<HTMLLIElement>) => {
    if(e.currentTarget.className === styles.note) {
      e.stopPropagation()
      e.currentTarget.style.boxShadow = 'none'
      e.currentTarget.style.backgroundColor = 'transparent'
    }
  }


  // когда взяли заметку
  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, card: ICard, note: INote) => {
    e.stopPropagation()
    setCurrentCard(card)
    setCurrentNote(note)
  }


  // когда отпускаем заметку не на объекте дропа
  const dragEndHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if(e.currentTarget.className === styles.note) {
      e.stopPropagation()
      e.currentTarget.style.boxShadow = 'none'
      e.currentTarget.style.backgroundColor = 'transparent'
    }
  }


  // когда отпускаем дроп на заметке
  const dropHandler = (e: React.DragEvent<HTMLLIElement>, card: ICard, note: INote) => {
    e.preventDefault()
    e.stopPropagation()
    if(e.currentTarget.className === styles.note) {
      e.currentTarget.style.boxShadow = 'none'
      e.currentTarget.style.backgroundColor = 'transparent'
    }

    if(currentCard && currentNote) {
      // если мы отпускаем заметку на себя же, то ничего не происходит 
      if(currentNote.id === note.id) {
        return
      }

      // если доска, с которой взяли заметку и та, на которую отпускаем одна и та же
      if(currentCard.id === card.id) {
        // получаю индекс взятой заметки и удаляю ее из той доски, с которой взяли
        const currentIndex = currentCard.notes.indexOf(currentNote)
        card.notes.splice(currentIndex, 1)
      }

      // получаю индекс взятой заметки и удаляю ее из той доски, с которой взяли
      const currentIndex = currentCard.notes.indexOf(currentNote)
      currentCard.notes.splice(currentIndex, 1)
      
      // получаю индекс той заметки, над которой отпускаем ЛКМ, и добавляю на эту же доску ту замететку, что держали 
      const dropIndex = card.notes.indexOf(note)
      card.notes.splice( dropIndex + 1, 0, currentNote)
      
      changeCardsHadler(currentCard, card)
      }
  }



  


  return (
    <>
        {isEditNote
            ?   
                <div className={changeTextTextareaStyles.editBlock}>
                    <textarea
                        style={{height: `${textareaHeight}px`}}
                        className={changeTextTextareaStyles.editBlock__editTextTextarea}
                        value={editNoteTextarea}
                        onChange={ e => setEditNoteTextarea(e.target.value)}
                        onKeyUp={ e => changeTextareaHeight(e)}
                    />
                    <DoneIcon 
                        className={changeTextTextareaStyles.editBlock__doneIcon}
                        onClick={ e => editNote()}
                    />
                </div>
            :
                <li 
                    className={styles.note} 
                    style={isFoundNote ? {color: '#7700ff'} : {}}
                    key={note.id}
                    draggable={true}
                    onDragOver={ e => dragOverHandler(e, card, note)}
                    onDragLeave={ e => dragLeaveHandler(e)}
                    onDragStart={ e => dragStartHandler(e, card, note)}
                    onDragEnd={ e => dragEndHandler(e)}
                    onDrop={ e => dropHandler(e, card, note)}
                >
                    {note.body}
                    <EditNoteIcon
                        className={styles.note__editIcon}
                        onClick={ e => {
                            setIsEditNote(true)
                            setEditNoteTextarea(note.body)
                        }}
                    />
                    <DeleteIcon
                        className={styles.note__deleteIcon}
                        onClick={ e => removeNote(e, note)}
                    />
                </li>
        }
    </>
  )
}
export default Note