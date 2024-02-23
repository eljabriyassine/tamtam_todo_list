import React from "react";
import "./TodoDetails.css";
import { RemoveTodoDoIcon } from "../Common/Icons";

class TodoDetails extends React.Component {
  handleCheckboxChange = () => {
    console.log(this.props.todo.status); // Corrected line
    const updatedStatus = this.props.todo.status === "TODO" ? "DONE" : "TODO";
    this.props.onChangeCheckbox(this.props.todo.id, updatedStatus);
  };

  RemoveTodoHandler =()=>{
    this.props.onRemoveToDo(this.props.todo.id);
    // console.log(this.props.todo.id);
  }
  render() {
    const { todo } = this.props;
    return (
      <div className="detail_container">
        <div className="detail_container_child">
          <input
            className="checkbox"
            type="checkbox"
            checked={todo.status === "DONE"}
            onChange={this.handleCheckboxChange}
          />
          <div>
            <h3 className="detail_title">{todo.title}</h3>
            <p className="date">{todo.date}</p>
          </div>
        </div>
        <button  className="button_delete "onClick={this.RemoveTodoHandler} >
          <RemoveTodoDoIcon />
        </button>
      </div>
    );
  }
}

export default TodoDetails;
