import { AllActionType, AppState, TypeFunction } from "./store-redux"
import { ThunkAction } from "redux-thunk"

const initialState = {
    Todos: JSON.parse(localStorage.getItem("todos") as string) !== null
    ? JSON.parse(localStorage.getItem("todos") as string) : [] as Array<any>,
    TodosFinished: [] as Array<any>,
    TodosNotFinished: [] as Array<any>
}
type initialStateType = typeof initialState

const todoReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "todo-reducer/ADD_TODO": {
            return {
                ...state,
                // @ts-ignore
                Todos: [...state.Todos, action.Todo]
            }
        }
        case "todo-reducer/DELETE_TODO": {
            return {
                ...state,
                // @ts-ignore
                Todos: state.Todos?.filter((todo: any)=> todo.id !== action.TodoId)
            }
        }
        case "todo-reducer/CHANGE_TODO": {
            return {
                ...state,
                // @ts-ignore
                Todos: state.Todos?.map((todo: any)=> todo.id === action.TodoId ? {changeMode : !todo.changeMode, title: action.TitleText !== undefined ? action.TitleText : todo.title,text: action.DescriptionText !== undefined ? action.DescriptionText : todo.text, id: todo.id, finished: false} : todo)
            }
        }
        case "todo-reducer/FINISHED_TODO": {
            return {
                ...state,
                TodosFinished: state.Todos?.filter((todo: any)=> todo.finished === true)
            }
        }
        case "todo-reducer/CHANGE_FINISHED_TODO": {
            return {
                ...state,
                // @ts-ignore
                Todos: state.Todos?.map((todo: any)=> todo.id === action.TodoId ? {changeMode : false, title: action.TitleText !== undefined ? action.TitleText : todo.title,text: action.DescriptionText !== undefined ? action.DescriptionText : todo.text, id: todo.id, finished: !todo.finished, textClose: todo.textClose} : todo)
            }
        }
        case "todo-reducer/NOT_FINISHED_TODO": {
            return {
                ...state,
                TodosNotFinished: state.Todos?.filter((todo: any)=> todo.finished === false )
            }
        }
        case "todo-reducer/TEXT_TODO": {         
            return {
                ...state,
                // @ts-ignore
                Todos: state.Todos?.map((todo: any)=> todo.id === action.TodoId ? {changeMode : false, title: action.TitleText !== undefined ? action.TitleText : todo.title,text: action.DescriptionText !== undefined ? action.DescriptionText : todo.text, id: todo.id, finished: todo.finished, textClose: !todo.textClose} : todo)
            }
        }
        default: {
            return state
        }
    }
}
type ActionType = ReturnType<AllActionType<typeof actions>>
type ThunkType = ThunkAction<Promise<void>, AppState, unknown, any>
export const actions = {
    addTodo: (Todo: any) => ({ type: "todo-reducer/ADD_TODO", Todo}),
    deleteTodo: (TodoId: number) => ({ type: "todo-reducer/DELETE_TODO", TodoId}),
    changeTodo: (TodoId: number, TitleText?: string, DescriptionText?: string) => ({ type: "todo-reducer/CHANGE_TODO", TodoId, TitleText,DescriptionText}),
    finishedTodo: ()=> ({type: "todo-reducer/FINISHED_TODO"}),
    changeFinishedTodo: (TodoId: number)=> ({type: "todo-reducer/CHANGE_FINISHED_TODO", TodoId}),
    NotFinishedTodo: ()=> ({type: "todo-reducer/NOT_FINISHED_TODO"}),
    textTodo: (TodoId: number)=> ({type: "todo-reducer/TEXT_TODO", TodoId})
}
export const finishedTodo = (TodoId: number):ThunkType => async (dispatch) => {
    dispatch(actions.changeFinishedTodo(TodoId))
    dispatch(actions.finishedTodo())
}
export default todoReducer



