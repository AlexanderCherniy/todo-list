import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/store-redux'
import cn from './todos-finished.module.css'
import { actions } from '../../../redux/todo-reducer'
import React, { useEffect } from 'react'
import Todo from '../todo/todo'
import TodoInteraction from '../todo-interaction/todo-interaction'

const TodosFinished: React.FC = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    const todosFinished = useSelector((state: AppState) => state.todoReducer.TodosFinished)
    useEffect(() => {
        dispatch(actions.NotFinishedTodo())
        dispatch(actions.finishedTodo())
    }, [todos])
    return (
        <>
            {todosFinished.length !== 0
                ? todosFinished.map((todo: any) => {
                    return (
                        <div key={todo.id} className={cn.TodoFinished}>
                            <Todo todo={todo} />
                            <TodoInteraction todo={todo} />
                        </div>
                    )
                })
                : <></>
            }
        </>
    )
}


export default TodosFinished