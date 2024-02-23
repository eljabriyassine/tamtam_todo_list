import React from "react";
import './AddTodoForm.css';

class AddTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.titleInputRef = React.createRef();
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onAddTodo(this.titleInputRef.current.value)
        event.target.reset();
    }

    onCancel = () => {
        // Reset the form using the form reference
        this.formRef.reset();
    }
    


    render() {
        return (
            <form className="add-todo-form" ref={(form) => this.formRef = form} onSubmit={this.onSubmitForm}>
                <input
                    className="add-todo-input"
                    name="title"
                    type="text"
                    placeholder="Add Todo"
                    ref={this.titleInputRef}
                />
                <button className="add-todo-button" type="submit">
                    Save
                </button>
                <button className="cancel-todo-button" type="button" onClick={this.onCancel}>
                    Cancel
                </button>
            </form>
        );
    }
    
}

export default AddTodoForm;
