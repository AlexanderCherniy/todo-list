import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/store-redux'
import cn from './todo-list.module.css'
import { actions, finishedTodo } from '../../redux/todo-reducer'
import React, {useEffect, useState} from 'react'
const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/> </svg>
const arrowUp = <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/> </svg>
const editPencel = <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/> </svg>
const trash = <svg style={{color: "red"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="red"></path> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="red"></path> </svg>
const finishTodo = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1z" fill="#0D0D0D"/></svg>
const returnTodo = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
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
        dispatch(actions.finishedTodo())
    }, [todos])

    const addTodoFunc = () =>{
        if(titleInput !== '' && textInput !== '' && todos.length <= 20){
        dispatch(actions.addTodo({changeMode: false,title: titleInput ,text: textInput, id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1, finished: false, textClose: true}))
        setTitleInput('')
        setTextInput('')
        }
    }
    localStorage.setItem("todos",JSON.stringify(todos))
    return(
        <div className={cn.TodoListContainer}>
            <div className={cn.TodoList}>
                <h2>Todo List App</h2>
                <div className={cn.addTodo}>
                    <input className={cn.TodoTitleInput} ref={inputTitleRef} value={titleInput} onChange={changeTitle} placeholder='Todo Title'/>
                    <input className={cn.TodoDescriptionInput} ref={inputTextRef} value={textInput} onChange={changeText} placeholder='Todo Description'/>
                    <button className={cn.AddTodoButton} onClick={addTodoFunc}>+</button>
                </div>
                <div className={cn.Todos}>
                    {todosNotFinished.length !== 0 
                    ? todosNotFinished.map((todo:any)=>{
                        return (
                        <div key={todo.id} className={cn.Todo}>
                            {todo.changeMode === false ? 
                            <div style={{display: 'flex', gap: 5, alignItems: "center", justifyContent: "center"}}>
                                {/* @ts-ignore */}
                                <div style={{cursor: "pointer"}} onClick={()=> dispatch(finishedTodo(todo.id))}>{finishTodo}</div>
                                <div>
                                    <div className={cn.TodoTitle}>{todo.title}</div>
                                    <div className={todo.textClose ? cn.TodoTextClose : cn.TodoText}>{todo.text}</div>
                                </div>
                            </div>
                            : 
                            <div onBlur={()=> {changeTitle2(todo.id);changeDescription(todo.id)}} style={{marginLeft: 25, maxWidth: 450, width: "100%"}}>
                                <div>
                                <input className={cn.TodoTitleInputChange} ref={inputTitleRef2} defaultValue={todo.title}/>
                                </div>
                                <div>
                                <input className={cn.TodoDescriptionInputChange} ref={inputDescriptionRef} defaultValue={todo.text}/>
                                </div>
                            </div>
                            }  
                            <div style={{display: 'flex', gap: 8, marginTop: 5 , alignItems: "center", justifyContent: "center"}}>
                                <span title={todo.textClose ? "Open Text" : "Close Text"} style={{cursor: "pointer"}} onClick={()=> dispatch(actions.textTodo(todo.id))}>{todo.textClose ? arrowDown : arrowUp}</span>
                                <span style={{cursor: "pointer"}} title={'Edit Todo'} onClick={()=> dispatch(actions.changeTodo(todo.id))}>{editPencel}</span>
                                <span title={"Delete Todo"} style={{cursor: "pointer"}} onClick={()=> dispatch(actions.deleteTodo(todo.id))}>{trash}</span>
                            </div>
                        </div>
                        )
                    })
                    : <></>
                    }
                    {todos.length === 0 ? 
                    <div className={cn.NoTodos}>
                        <div>
                            <div>ADD YOUR TODO</div>
                            <div>write a title and description for your todo </div>
                        </div>
                    </div> : <></>}
                    
                    {todosFinished.length !== 0 
                    ? todosFinished.map((todo:any)=>{
                        return (
                        <div key={todo.id} className={cn.TodoFinished}>
                            <div style={{display: 'flex', gap: 5, alignItems: "center", justifyContent: "center"}}>
                            {/* @ts-ignore */}
                                <div style={{cursor: "pointer"}} onClick={()=> dispatch(finishedTodo(todo.id))}>{returnTodo}</div>
                                <div style={{textDecoration: 'line-through'}}>
                                    <div className={cn.TodoTitle}>{todo.title}</div>
                                    <div className={todo.textClose ? cn.TodoTextClose : cn.TodoText}>{todo.text}</div>
                                </div>
                            </div>
                            <div style={{display: 'flex', gap: 5, marginTop: 5, alignItems: "center", justifyContent: "center"}}>
                                <span title={todo.textClose ? "Open Text" : "Close Text"} style={{cursor: "pointer"}} onClick={()=> dispatch(actions.textTodo(todo.id))}>{todo.textClose ? arrowDown : arrowUp}</span>
                                <span style={{cursor: "pointer"}} title={'Edit Todo'} onClick={()=> dispatch(actions.changeTodo(todo.id))}>{editPencel}</span>
                                <span title={"Delete Todo"} style={{cursor: "pointer"}} onClick={()=> dispatch(actions.deleteTodo(todo.id))}>{trash}</span>
                            </div>
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