import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/store-redux'
import cn from './no-todos.module.css'
import React from 'react'

const NoTodos: React.FC = () => {
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    return (
        <>
            {todos.length === 0 ?
                <div className={cn.NoTodos}>
                    <div>
                        <div>ADD YOUR TODO</div>
                        <div>write a title and description for your todo </div>
                    </div>
                </div>
                : <></>}
        </>
    )
}


export default NoTodos