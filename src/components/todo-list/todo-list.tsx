import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/store-redux'
import cn from './todo-list.module.css'
import { actions, finishedTodo } from '../../redux/todo-reducer'
import React, {useEffect, useState} from 'react'
const TodoList: React.FC = () =>{
    const [titleInput, setTitleInput] = useState('')
    const [textInput, setTextInput] = useState('')
    const dispatch = useDispatch()
    const inputTextRef = React.useRef<HTMLInputElement>(null)
    const inputTitleRef = React.useRef<HTMLInputElement>(null)
    const inputTitleRef2 = React.useRef<HTMLInputElement>(null)
    const inputDescriptionRef = React.useRef<HTMLInputElement>(null)
    const todos = useSelector((state: AppState)=> state.todoReducer.Todos)
    const todosFinished = useSelector((state: AppState)=> state.todoReducer.TodosFinished)
    const todosNotFinished = useSelector((state: AppState)=> state.todoReducer.TodosNotFinished)
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
    const changeTitle2 = (id: number) => {
        //@ts-ignore
        let text = inputTitleRef2.current.value
        dispatch(actions.changeTodo(id, text))
    }
    const changeDescription = (id: number) => {
        //@ts-ignore
        let text = inputDescriptionRef.current.value
        dispatch(actions.changeTodo(id, undefined ,text))
    }
    useEffect(()=>{
        dispatch(actions.NotFinishedTodo())
    }, [todos])
    return(
        <div className={cn.TodoListContainer}>
            <div className={cn.TodoList}>
                <h2>Todo List</h2>
                <div className={cn.addTodo}>
                    <input ref={inputTitleRef} value={titleInput} onChange={changeTitle} placeholder='add your todo'/>
                    <input ref={inputTextRef} value={textInput} onChange={changeText} placeholder='add your todo'/>
                    {textInput !== '' ? <button onClick={()=> dispatch(actions.addTodo({changeMode: false,title: titleInput ,text: textInput, id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1, finished: false}))}>+</button> : <></>}
                </div>
                <div className={cn.Todos}>
                    {todosNotFinished.length !== 0 
                    ? todosNotFinished.map((todo:any)=>{
                        return (
                        <div>
                            {todo.changeMode === false ? 
                            <>
                                {/* @ts-ignore */}
                                <input type="checkbox" checked={false} onChange={()=> dispatch(finishedTodo(todo.id))}/>
                                <span>{todo.title}</span>
                                -
                                <span>{todo.text}</span>
                            </>
                            : 
                            <>
                                <input ref={inputTitleRef2} onBlur={()=> changeTitle2(todo.id)} defaultValue={todo.title}/>
                                -
                                <input ref={inputDescriptionRef} onBlur={()=> changeDescription(todo.id)}  defaultValue={todo.text}/>
                            </>
                            }  
                            
                            <span onClick={()=> dispatch(actions.changeTodo(todo.id))}>edit-</span> <span onClick={()=> dispatch(actions.deleteTodo(todo.id))}>X</span>
                        </div>
                        )
                    })
                    : <div className={cn.Todo}>
                        Wake up at 6 o'clock
                    </div>
                    }
                    {todosFinished.length !== 0 ? <h2>Выполненные задания</h2> : <></>}
                    {todosFinished.length !== 0 
                    ? todosFinished.map((todo:any)=>{
                        return (
                        <div>
                            
                            {todo.changeMode === false ? 
                            <>
                            {/* @ts-ignore */}
                                <input type="checkbox" checked onChange={()=> dispatch(finishedTodo(todo.id))}/>
                                <span>{todo.title}</span>
                                -
                                <span>{todo.text}</span>
                            </>
                            : 
                            <>
                                <input ref={inputTitleRef2} onBlur={()=> changeTitle2(todo.id)} defaultValue={todo.title}/>
                                -
                                <input ref={inputDescriptionRef} onBlur={()=> changeDescription(todo.id)}  defaultValue={todo.text}/>
                            </>
                            }  
                            
                            <span onClick={()=> dispatch(actions.changeTodo(todo.id))}>edit-</span> <span onClick={()=> dispatch(actions.deleteTodo(todo.id))}>X</span>
                        </div>
                        )
                    })
                    : <></>
                    }
                </div>
            </div>
        </div>
    )
}


export default TodoList