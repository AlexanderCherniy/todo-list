import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/store-redux'
import cn from './todos-in-process.module.css'
import { actions } from '../../../redux/todo-reducer'
import React, { useEffect } from 'react'
import TodoChangeMode from '../todo-change/todo-change'
import Todo from '../todo/todo'
import TodoInteraction from '../todo-interaction/todo-interaction'

const TodosInProcess: React.FC = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    const todosInProcess = useSelector((state: AppState) => state.todoReducer.TodosNotFinished)

    useEffect(() => {
        dispatch(actions.NotFinishedTodo())
        dispatch(actions.finishedTodo())
    }, [todos])
    return (
        <>
            {todosInProcess.length !== 0
                ? todosInProcess.map((todo: any) => {
                    return (
                        <div key={todo.id} className={cn.Todo}>
                            {todo.changeMode === false ?
                                <Todo todo={todo} />
                                :
                                <TodoChangeMode todo={todo} />
                            }
                            <TodoInteraction todo={todo} />
                        </div>
                    )
                })
                : <></>
            }
        </>
    )
}


export default TodosInProcess