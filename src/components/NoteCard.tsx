import React, { useState } from 'react'
import { ICard, INote } from '../models/models'
import styles from '../styles/NoteCard.module.scss'
import changeTextTextareaStyles from '../styles/changeTextTextarea.module.scss'
import { ReactComponent as AddNewNoteIcon } from '../icons/add_notes_FILL0_wght400_GRAD0_opsz24.svg'
import { ReactComponent as EditCardTitleIcon } from '../icons/edit_FILL0_wght400_GRAD0_opsz24.svg'
import { ReactComponent as DeleteIcon } from '../icons/delete_FILL0_wght400_GRAD0_opsz48.svg'
import { ReactComponent as DoneIcon } from '../icons/done_FILL0_wght400_GRAD0_opsz24.svg'
import RemoveNotePopup from './RemoveNotePopup'
import Button from './UI/button/Button'
import AddNewNotePopup from './AddNewNotePopup'
import Note from './Note'
import RemoveCardPopup from './RemoveCardPopup'
import Input from './UI/input/Input'


interface NoteCardProps {
  card: ICard
  currentCard: ICard | null
  setCurrentCard: React.Dispatch<React.SetStateAction<ICard | null>>
  currentNote: INote | null
  setCurrentNote: React.Dispatch<React.SetStateAction<INote | null>>
  changeCardsHadler: (firstCard: ICard, secondCard: ICard) => Promise<void>
  addNewNoteHandler: (card: ICard) => Promise<void>
  removeNoteHandler: (card: ICard) => Promise<void>
  editNoteHandler: (card: ICard) => Promise<void>
  removeCardHandler: (card: ICard) => Promise<void>
  editСardTitleHandler: (card: ICard) => Promise<void>
  globalSearchNoteInput: string
}



const NoteCard: React.FC<NoteCardProps> = ({
  card, 
  currentCard,
  setCurrentCard,
  currentNote,
  setCurrentNote,
  changeCardsHadler,
  addNewNoteHandler,
  removeNoteHandler,
  editNoteHandler,
  removeCardHandler,
  editСardTitleHandler,
  globalSearchNoteInput
}) => {





  const [newNoteTextarea, setNewNoteTextarea] = useState<string>('')
  const [isRemoveNotePopup, setIsRemoveNotePopup] = useState<boolean>(false)
  const [isAddNewNotePopup, setIsAddNewNotePopup] = useState<boolean>(false)
  const [noteToRemove, setNoteToRemove] = useState<INote | null>(null)

  const [isRemoveCardPopup, setIsRemoveCardPopup] = useState<boolean>(false)

  const [isEditCardTitle, setIsEditCardTitle] = useState<boolean>(false)
  const [editCardTitleTextarea, setEditCardTitleTextarea] = useState<string>('')
  const [textareaHeight, setTextareaHeight] = useState<string>('')
  
  const [searchCardNoteInput, setSearchCardNoteInput] = useState<string>('')

  const [cardScrollHeight, setCardScrollHeight] = useState<string>('')

  

  








  // добавление новой заметки
  const addNewNote = () => {
    const newNote: INote = {
      id: Date.now(),
      body: newNoteTextarea.trim()
    }
    card.notes.push(newNote)
    addNewNoteHandler(card)
    setIsAddNewNotePopup(false)
    setNewNoteTextarea('')
  }

  // удаление заметки
  const removeNote = (e: React.MouseEvent, note: INote) => {
    setIsRemoveNotePopup(true)
    setNoteToRemove(note)
  }
  // подтверждение удаления заметки в попапе
  const confirmRemoveNote = () => {
    const filteredNotes = card.notes.filter( n => n.id !== noteToRemove?.id)
    // перезаписываю массив заметок на новый
    card.notes = filteredNotes
    removeNoteHandler(card)
    setIsRemoveNotePopup(false)
    setNoteToRemove(null)
  }

  // удаление карточки
  const removeCard = (card: ICard) => {
    setIsRemoveCardPopup(false)
    removeCardHandler(card)
  }

  // редактирование названия карточки
  const editCardTitle = () => {
    card.title = editCardTitleTextarea.trim()
    editСardTitleHandler(card)
    setIsEditCardTitle(false)
    setEditCardTitleTextarea('')
  }

  // изменение высоты textarea при вводе текста
  const changeTextareaHeight = (e: any) => {
    let scHeight = e.target.scrollHeight
    setTextareaHeight(scHeight)
  }

  // изменение высоты попапа новой заметки и попапа удаления карточки 
  const getCardScrollHeight = (e: any) => {
    setCardScrollHeight(e.target.scrollHeight);
  }
  








   // когда держим дроп над карточкой
  const dragOverCardHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
    e.preventDefault()
    if(e.currentTarget.className === styles.noteCard) {
      e.currentTarget.style.borderColor = 'green'
    }
    if(currentCard?.id === card.id && e.currentTarget.className === styles.noteCard) {
      e.currentTarget.style.borderColor = 'red'
    }
  }


  // когда уводим дроп с карточки
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if(e.currentTarget.className === styles.noteCard) {
      e.currentTarget.style.borderColor = '#00b6db'
    }
    
  }


  // когда отпускаем дроп над карточкой
  const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
    e.currentTarget.style.borderColor = '#00b6db'

    if(currentCard && currentNote) {
      // если текущая доска, с которой взяли заметку, и доска, на которую сбрасываем одна и та же, то ничего не делаем
      if(currentCard.id === card.id) {
        return
      }
      // дабавляю на доску новую заметку в конец
      card.notes.push(currentNote)
       // получаю индекс взятой заметки и удаляю ее из той доски, с которой взяли
      const currentIndex = currentCard.notes.indexOf(currentNote)
      currentCard.notes.splice(currentIndex, 1)
   
      changeCardsHadler(currentCard, card)
    }
  }





  return (
    <div 
      className={styles.noteCard}
      onDragOver={ e => dragOverCardHandler(e, card)}
      onDragLeave={ e => dragLeaveHandler(e)}
      onDrop={ e => dropCardHandler(e, card)}
      onClick={ e => setIsEditCardTitle(false)}
      onScroll={ e => getCardScrollHeight(e)}
    >
      <>
        {isEditCardTitle
          ?
            <div className={changeTextTextareaStyles.editBlock}>
              <textarea
                  style={{height: `${textareaHeight}px`, fontSize: 32, fontWeight: 'bold', padding: '10px 40px 4px 3px', border: '1px solid #00b6db'}}
                  className={changeTextTextareaStyles.editBlock__editTextTextarea}
                  value={editCardTitleTextarea}
                  onChange={ e => setEditCardTitleTextarea(e.target.value)}
                  onKeyUp={ e => changeTextareaHeight(e)}
                  onClick={ e => e.stopPropagation()}
              />
              <DoneIcon 
                  className={changeTextTextareaStyles.editBlock__doneIcon}
                  onClick={ e => editCardTitle()}
              />
            </div>
          :
            <h1 className={styles.noteCard__title}>
              {card.title}
            </h1>
        }
      </>


      <div className={styles.noteCard__buttons}>
        <Button addNewNote onClick={ e => setIsAddNewNotePopup(true)}>
          <AddNewNoteIcon className={styles.noteCard__addNewNoteIcon}/>
        </Button>
        {!isEditCardTitle && 
          <Button edit onClick={ e => {
            e.stopPropagation()
            setIsEditCardTitle(true)
            setEditCardTitleTextarea(card.title)
          }}>
            <EditCardTitleIcon 
              className={styles.noteCard__editCardTitleIcon} />
          </Button>
        }
        <Button cancel onClick={ e => setIsRemoveCardPopup(true)}>
          <DeleteIcon className={styles.noteCard__deleteIcon}/>
        </Button>
      </div>
      <Input
        placeholder='Поиск'
        style={{display: 'block', margin: '0px auto 10px'}}
        type="text" 
        value={searchCardNoteInput}
        onChange={ e => setSearchCardNoteInput(e.currentTarget.value)}
      />


      <div className={styles.noteCard__decorLine}></div>


      <ul>
        {card.notes.map( note => 
          <Note
            key={note.id}
            card={card}
            note={note}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            changeCardsHadler={changeCardsHadler}
            removeNote={removeNote}
            editNoteHandler={editNoteHandler}
            searchCardNoteInput={searchCardNoteInput}
            globalSearchNoteInput={globalSearchNoteInput}
          />
        )}
      </ul>

      <RemoveNotePopup
        isRemoveNotePopup={isRemoveNotePopup}
        confirmRemoveNote={confirmRemoveNote}
        setIsRemoveNotePopup={setIsRemoveNotePopup}
        setNoteToRemove={setNoteToRemove}
        cardScrollHeight={cardScrollHeight}
      />
      <RemoveCardPopup
        isRemoveCardPopup={isRemoveCardPopup}
        setIsRemoveCardPopup={setIsRemoveCardPopup}
        removeCard={removeCard}
        card={card}
        cardScrollHeight={cardScrollHeight}
      />
      <AddNewNotePopup
        isAddNewNotePopup={isAddNewNotePopup}
        setIsAddNewNotePopup={setIsAddNewNotePopup}
        addNewNote={addNewNote}
        newNoteTextarea={newNoteTextarea}
        setNewNoteTextarea={setNewNoteTextarea}
        cardScrollHeight={cardScrollHeight}
      />

    </div>
  )
}

export default NoteCard