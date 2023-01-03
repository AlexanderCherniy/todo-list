import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/store-redux'
import cn from './todo.module.css'
import { actions, finishedTodo } from '../../../redux/todo-reducer'
import React, { useEffect, useState } from 'react'
const finishTodo = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg>
const returnTodo = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 0-1.414z" fill="#0D0D0D" /></svg>

type Props = {
    todo: any
}
const Todo: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    useEffect(() => {
        dispatch(actions.NotFinishedTodo())
        dispatch(actions.finishedTodo())
    }, [todos])
    // localStorage.setItem("todos",JSON.stringify(todos))
    return (
        <div style={{ display: 'flex', gap: 5, alignItems: "center", justifyContent: "center" }}>
            {/* @ts-ignore */}
            <div style={{ cursor: "pointer" }} onClick={() => dispatch(finishedTodo(props.todo.id))}>{props.todo.finished ? returnTodo :  finishTodo}</div>
            <div style={props.todo.finished ? { textDecoration: 'line-through' } : {}}>
                <div className={cn.TodoTitle}>{props.todo.title}</div>
                <div className={props.todo.textClose ? cn.TodoTextClose : cn.TodoText}>{props.todo.text}</div>
            </div>
        </div>
    )
}


export default Todo