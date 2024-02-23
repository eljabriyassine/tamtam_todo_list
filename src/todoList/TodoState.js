import React from "react";
import { AllIcon, TodoIcon, DoneIcon } from "../Common/Icons";
import "./TodoState.css";

class TodoState extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClickState = (type) => {
    this.props.onTodoStateChange(type);
  };

  render() {
    return (
      <div className="side_conatiner">
        <button className="wrapper" onClick={() => this.handleClickState('ALL')}>
          <AllIcon />
          <h3>All</h3>
        </button>
        <button className="wrapper" onClick={() => this.handleClickState('TODO')}>
          <TodoIcon />
          <h3>todo</h3>
        </button>
        <button className="wrapper" onClick={() => this.handleClickState('DONE')}>
          <DoneIcon />
          <h3>Done</h3>
        </button>
        <div className="copyright">
          <h4>© Tamtam International - Stage 2023</h4>
        </div>
      </div>
    );
  }
}

export default TodoState;
