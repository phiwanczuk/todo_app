import React from 'react'
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'
import *  as moment from 'moment';
import styled from 'styled-components';

import {database} from '../../firebase'


const Form = styled.form`
        border-color: black`;

class AddTask extends React.Component {




    state = {
        id: '',
        taskName: '',
        taskDesc: '',
        isDone: false,
        uid: null
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


    handleAddTask = () => {
        let date = moment().format('MMMM Do YYYY, h:mm:ss a')
        database().ref(`tasks/`).push({
            taskName: this.state.taskName,
            taskDesc: this.state.taskDesc,
            isDone: false,
            uid: this.state.uid >= 0 ? this.state.uid++ : this.state.uid,
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
                            style={{color:"blue",
                            backgroundColor:"black"}
    }
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