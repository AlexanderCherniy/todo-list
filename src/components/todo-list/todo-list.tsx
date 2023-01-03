import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/store-redux'
import cn from './todo-list.module.css'
import { actions, finishedTodo } from '../../redux/todo-reducer'
import React, { useEffect, useState } from 'react'
import Todo from './todo/todo'
import TodoChange from './todo-change/todo-change'
import TodoChangeMode from './todo-change/todo-change'
import TodoAddition from './todo-addition/todo-addition'
import TodoInteraction from './todo-interaction/todo-interaction'
import TodosFinished from './todos-finished/todos-finished'
import TodosInProcess from './todos-in-process/todos-in-process'
import NoTodos from './no-todos/no-todos'
const TodoList: React.FC = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    useEffect(() => {
        dispatch(actions.NotFinishedTodo())
        dispatch(actions.finishedTodo())
    }, [todos])
    localStorage.setItem("todos", JSON.stringify(todos))
    return (
        <div className={cn.TodoListContainer}>
            <div className={cn.TodoList}>
                <h2>Todo List App</h2>
                <TodoAddition />
                <div className={cn.Todos}>
                    <TodosInProcess/>
                    <NoTodos/>
                    <TodosFinished/>
                </div>
            </div>
        </div>
    )
}


export default TodoList