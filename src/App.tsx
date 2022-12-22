import './App.css';
import TodoList from './components/todo-list/todo-list';

const App:React.FC = () => {
  return (
    <div className="Container">
        <TodoList />
    </div>
  );
}

export default App;


