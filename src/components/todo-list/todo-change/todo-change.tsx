import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/store-redux'
import cn from './todo-change.module.css'
import { actions } from '../../../redux/todo-reducer'
import React, { useEffect } from 'react'
type Props = {
    todo: any
}
const TodoChangeMode: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const todos = useSelector((state: AppState) => state.todoReducer.Todos)
    const inputTitleRef2 = React.useRef<HTMLInputElement>(null)
    const inputDescriptionRef = React.useRef<HTMLInputElement>(null)
    const changeTitle2 = (id: number) => {
        //@ts-ignore
        let text = inputTitleRef2.current.value
        dispatch(actions.changeTodo(id, text))
    }
    const changeDescription = (id: number) => {
        //@ts-ignore
        let text = inputDescriptionRef.current.value
        dispatch(actions.changeTodo(id, undefined, text))
    }
    useEffect(() => {
        dispatch(actions.NotFinishedTodo())
        dispatch(actions.finishedTodo())
    }, [todos])
    // localStorage.setItem("todos",JSON.stringify(todos))
    return (
        <div onBlur={() => { changeTitle2(props.todo.id); changeDescription(props.todo.id) }} style={{ marginLeft: 25, maxWidth: 450, width: "100%" }}>
            <div>
                <input className={cn.TodoTitleInputChange} ref={inputTitleRef2} defaultValue={props.todo.title} />
            </div>
            <div>
                <input className={cn.TodoDescriptionInputChange} ref={inputDescriptionRef} defaultValue={props.todo.text} />
            </div>
        </div>
    )
}


export default TodoChangeMode