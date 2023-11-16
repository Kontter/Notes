import React,  { useState } from 'react';
import styles from './styles/App.module.scss'
import NoteCard from './components/NoteCard';
import { ICard, INote } from './models/models';
import { ReactComponent as AddNewCardIcon } from './icons/create_new_folder_FILL0_wght400_GRAD0_opsz24.svg'
import { useAddNewCardMutation, useAddNewNoteMutation, useChangeNotesMutation, useEditCardTitleMutation, useEditNoteMutation, useGetCardsQuery, useRemoveCardMutation, useRemoveNoteMutation } from './store/notesApi';
import Button from './components/UI/button/Button';
import Input from './components/UI/input/Input';



function App() {

  const {data: cards = [], isLoading: cardsIsLoading, error: cardsError, refetch} = useGetCardsQuery('', {
    refetchOnFocus: true 
  })
  if(cardsError) {
    console.log('ошибка загрузки карточек:',cardsError);
  }
  
  const copyCards: ICard[] = JSON.parse(JSON.stringify(cards)) 
  
  const [changeNotes, {error: changeNotesError}] = useChangeNotesMutation()
  if(changeNotesError) {
    console.log('ошибка изменения дропа:', changeNotesError);
  }

  const [addNewNote, {error: addNewNoteError}] = useAddNewNoteMutation()
  if(addNewNoteError) {
    console.log('ошибка добавления новой заметки:', addNewNoteError);
  }

  const [addNewCard, {error: addNewCardError}] = useAddNewCardMutation()
  if(addNewCardError) {
    console.log('ошибка добавления новой карточки:', addNewCardError);
  }

  const [removeNote, {error: removeNoteError}] = useRemoveNoteMutation()
  if(removeNoteError) {
    console.log('ошибка удаления заметки:', removeNoteError);
  }

  const [removeCard, {error: removeCardError}] = useRemoveCardMutation()
  if(removeCardError) {
    console.log('ошибка удаления карточки:', removeCardError);
  }

  const [editNote, {error: editNoteError}] = useEditNoteMutation()
  if(removeNoteError) {
    console.log('ошибка редактирования заметки:', editNoteError);
  }

  const [editCardTitle, {error: editCardTitleError}] = useEditCardTitleMutation()
  if(editCardTitleError) {
    console.log('ошибка редактирования названия заметки:', editCardTitleError);
  }


  
  const [currentCard, setCurrentCard] = useState<ICard | null>(null)  
  const [currentNote, setCurrentNote] = useState<INote | null>(null)
  const [globalSearchNoteInput, setGlobalSearchNoteInput] = useState<string>('')






  // запросы на сервер на изменение заметок в досках при дропе
  const changeCardsHadler = async (firstCard: ICard, secondCard: ICard) => {
    await changeNotes(firstCard).unwrap() 
    await changeNotes(secondCard).unwrap() 
    await refetch()
  }

  // запрос на сервер на добавление новой заметки
  const addNewNoteHandler = async (card: ICard) => {
    addNewNote(card)
  }

  // запрос на сервер на добавление новой карточки
  const addNewCardHandler = async () => {
    const newCard: ICard = {
      title: '',
      id: Date.now(),
      notes: []
    }
    addNewCard(newCard)
  }

  // запрос на сервер на удаление заметки
  const removeNoteHandler = async (card: ICard) => {
    removeNote(card)
  }

  // запрос на сервер на удаление карточки
  const removeCardHandler = async (card: ICard) => {
    removeCard(card)
  }

  // запрос на сервер на редактирование заметки
  const editNoteHandler = async (card: ICard) => {
    editNote(card)
  }

  // запрос на сервер на редактирование названия заметки
  const editСardTitleHandler = async (card: ICard) => {
    editCardTitle(card)
  }


  










  return (
    <div>
      {cardsIsLoading && <h1 className={styles.loading}>Идет загрузка...</h1>}
      {cardsError 
        ? <h1 className={styles.error}>Возникла ошибка</h1>
        : 
          <>
          <h1 style={{textAlign: 'center', margin: '10px 0'}}>Заметки</h1>
          <Button style={{display: 'block', margin: '0px auto 10px'}} onClick={ e => addNewCardHandler()}>
            <AddNewCardIcon className={styles.addNewCardIcon}/>
          </Button>
          <Input
            placeholder='Поиск'
            style={{display: 'block', margin: '0px auto'}}
            type="text" 
            value={globalSearchNoteInput}
            onChange={ e => setGlobalSearchNoteInput(e.currentTarget.value)}
          />
          <div className={styles.notes}>
            {copyCards.map( card => 
              <NoteCard
                key={card.id}
                card={card}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                changeCardsHadler={changeCardsHadler}
                addNewNoteHandler={addNewNoteHandler}
                removeNoteHandler={removeNoteHandler}
                editNoteHandler={editNoteHandler}
                removeCardHandler={removeCardHandler}
                editСardTitleHandler={editСardTitleHandler}
                globalSearchNoteInput={globalSearchNoteInput}
              />
            )}
          </div>
          </>
      }
    </div>
  );
}

export default App;
