import React from "react";
import "./TodoList.css";
import TodoState from "./TodoState";
import { ToDoListIcon } from "../Common/Icons";
import TodoDetails from "./TodoDetails";
import AddTodoForm from "./AddTodoForm";
import dummyTodoDoList from '../data/dummy_todo_list';


class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyTodoDoList: dummyTodoDoList,
      TodoState: "DONE",
      newTask: "",
    };
  }
  getFilteredTodoList = () => {
    const { dummyTodoDoList, TodoState } = this.state;
    return TodoState !== 'ALL' ? dummyTodoDoList.filter(todo => todo.status === TodoState) : dummyTodoDoList;
  };



  onTodoStateChange = (todoState) => {
    this.setState({
      TodoState: todoState,
    });
  };

  onAddTodo = (title) => {
    const todo = {
      id: Math.random(),
      title,
      date: "Today at 03:00 PM",
      status: "TODO",
    }
    return this.setState(prevState => ({
      dummyTodoDoList: [...prevState.dummyTodoDoList, todo],
    }));
  }


  onChangeCheckbox = (todoId, updatedStatus) => {
    console.log(`Todo with ID ${todoId} updated status to: ${updatedStatus}`);
    this.setState(prevState => {
      const updatedList = prevState.dummyTodoDoList.map(todo =>
        todo.id === todoId ? { ...todo, status: updatedStatus } : todo
      );

      return {
        dummyTodoDoList: updatedList,
      };
    });
  };


  onRemoveToDo = (todoId) => {
    this.setState(prevState => ({
      dummyTodoDoList: prevState.dummyTodoDoList.filter(todo => todo.id !== todoId),
    }));
  };


  render() {
    const filtredDummyTodoDoList = this.getFilteredTodoList();
    return (
      <div className="container">
        <div className="header">
          <ToDoListIcon />
        </div>
        <div className="container_body">
          <aside>
            <TodoState onTodoStateChange={this.onTodoStateChange} />
          </aside>
          <div className="list">
            <div className="list_child">
              {filtredDummyTodoDoList.map((todo) => (
                <TodoDetails index={todo.id} todo={todo} onChangeCheckbox={this.onChangeCheckbox} onRemoveToDo={this.onRemoveToDo}></TodoDetails>
              ))}
            </div>
            <div className="footer_details">
              <AddTodoForm onAddTodo={this.onAddTodo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoListPage;
