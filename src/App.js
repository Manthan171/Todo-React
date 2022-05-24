import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './Components/login/login';
import Todo from './Components/todo/todo';
import View from './Components/view/view';

function App() {
  return (
    <>
      {/* <Login /> */}
      <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/home' element={<Todo />} />
      <Route exact path='/View' element={<View />} />
      </Routes>
      {/* <Login/>
    <Todo /> */}
    </>
    
  );
}

export default App;