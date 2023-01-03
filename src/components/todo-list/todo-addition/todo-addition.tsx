import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/store-redux'
import cn from './todo-addition.module.css'
import { actions } from '../../../redux/todo-reducer'
import React, { useEffect, useState } from 'react'

const TodoAddition: React.FC = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    const [titleInput, setTitleInput] = useState('')
    const [textInput, setTextInput] = useState('')
    const inputTextRef = React.useRef<HTMLInputElement>(null)
    const inputTitleRef = React.useRef<HTMLInputElement>(null)
    useEffect(() => {
        dispatch(actions.NotFinishedTodo())
        dispatch(actions.finishedTodo())
    }, [todos])
    const changeText = () => {
        //@ts-ignore
        let text = inputTextRef.current.value
        setTextInput(text)
    }
    const changeTitle = () => {
        //@ts-ignore
        let text = inputTitleRef.current.value
        setTitleInput(text)
    }
    const addTodoFunc = () => {
        if (titleInput !== '' && textInput !== '' && todos.length <= 20) {
            dispatch(actions.addTodo({ changeMode: false, title: titleInput, text: textInput, id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1, finished: false, textClose: true }))
            setTitleInput('')
            setTextInput('')
        }
    }
    return (
        <div className={cn.addTodo}>
            <input className={cn.TodoTitleInput} ref={inputTitleRef} value={titleInput} onChange={changeTitle} placeholder='Todo Title' />
            <input className={cn.TodoDescriptionInput} ref={inputTextRef} value={textInput} onChange={changeText} placeholder='Todo Description' />
            <button className={cn.AddTodoButton} onClick={addTodoFunc}>+</button>
        </div>
    )
}


export default TodoAddition