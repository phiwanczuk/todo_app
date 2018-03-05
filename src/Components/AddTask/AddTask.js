import React from 'react'
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'
import *  as moment from 'moment';


import {database} from '../../firebase'


class AddTask extends React.Component {

    state = {
        id: '',
        taskName: '',
        taskDesc: '',
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
        let date = moment().format('MMMM Do YYYY, h:mm:ss a')
        database().ref(`tasks/`).push({
            taskName: this.state.taskName,
            taskDesc: this.state.taskDesc,
            isDone: false,
            date: date
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
                            className="title"
                            type='text'
                            placeholder='nazwa zadania'
                            onChange={this.handleTaskNameInputChange}
                            value={this.state.taskName}
                        />
                        <FormControl
                            className="task-desc"
                            type='text'
                            placeholder='treść zadania'
                            onChange={this.handleTaskDescInputChange}
                            value={this.state.taskDesc}
                        />
                        <Button
                            onClick={this.handleAddTask}
                        >Zapisz
                        </Button>

                    </FormGroup>

                </form>
            </div>
        )

    }
}

export default AddTask