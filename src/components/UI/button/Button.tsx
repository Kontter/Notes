import React from 'react'
import styles from './Button.module.scss'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cancel?: boolean
  addNewNote?: boolean
  notActive?: boolean
  edit?: boolean
  addNewCard?: boolean
}


const Button: React.FC<ButtonProps> = ({children, cancel, addNewNote, notActive, edit, addNewCard, ...props}) => {

  const rootStyles = [styles.button]
  if(cancel) {
    rootStyles.push(styles.cancel)
  }   
  if(addNewNote) {
    rootStyles.push(styles.addNewNote)
  }   
  if(notActive) {
    rootStyles.push(styles.notActive)
  }   
  if(edit) {
    rootStyles.push(styles.edit)
  }   

  return (
    <button {...props} className={rootStyles.join(' ')}>
      {children}
    </button>
  )
}
export default Button