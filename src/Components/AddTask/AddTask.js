import React from 'react'
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'

import {database} from '../../firebase'


class AddTask extends React.Component {

    state = {
        id: '',
        taskName: '',
        taskDesc: '',
        isDone: false
    }

    handleTaskNameInputChange = (event) => {
        this.setState({
            taskName: event.target.value
        });
    }
    handleTaskDescInputChange = (event) => {
        this.setState({
            taskDesc: event.target.value
        });
    }


    handleAddTask = (event) => {
        event.preventDefault()
        const tasks = database().ref('tasks')
        const task = {
            taskName: this.state.taskName,
            isDone: this.state.isDone,
            taskDesc: this.state.taskDesc
        }
        tasks.push(task)
        this.setState({
            taskName: '',
            taskDesc: ''
        })
    }

    render() {

        return (
            <div>
                <form>
                    <FormGroup
                        className='form'
                    >
                        <FormControl
                            type='text'
                            placeholder='nazwa zadania'
                            onChange={this.handleTaskNameInputChange}
                            value={this.state.taskName}
                        />
                        <FormControl
                            type='text'
                            placeholder='treść zadania'
                            onChange={this.handleTaskDescInputChange}
                            value={this.state.taskDesc}
                        />
                        <Button
                            onClick={this.handleAddTask}
                        >Zapisz</Button>

                    </FormGroup>

                </form>
            </div>
        )

    }
}

export default AddTask