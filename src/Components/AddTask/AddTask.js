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
     if(this.state.taskName.length >=1 && this.state.taskDesc.length >=1) {
         event.preventDefault()
         let date = moment().format('MMMM Do YYYY, h:mm:ss a')
         database().ref(`tasks/`).push({
             taskName: this.state.taskName,
             taskDesc: this.state.taskDesc,
             isDone: false,
             date: date
         })
     }else{
         alert('wpisz treść/nazwę zadania!')
     }

    }


    render() {
        return (
            <div>
                <div>
                    <h3 className="add-hype">Tutaj dodaj nazwę i treść swojego zadanie. Zostanie dodana do niego data, możliwość edycji oraz guzik, który umożliwi przeniesienie go do zadań ukończonych.</h3>
                </div>
                <div className="arrow">

                </div>
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
                            bsStyle='success'
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