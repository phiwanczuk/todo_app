import React from 'react'
import {database} from "../../firebase";
import EditTask from "../../Components/EditTask/EditTask"
import './tasks.css'
import {
    Button
} from 'react-bootstrap'

class Tasks extends React.Component {

    state = {
        id: [],
        isDone: false
    }


    handleRemoveTask = id => {
        database().ref(`/tasks/${id}`).set(null)
    }


    handleToggleDone = (id, isDone) => {
        database().ref(`/tasks/${id}/`).update({
            isDone: !isDone
        })
    }

    componentDidMount() {
        const tasks = database().ref('tasks');
        tasks.on('value', (snapshot) => {
            let tasks = snapshot.val();
            let newState = [];
            for (let task in tasks) {
                newState.push({
                    id: task,
                    taskName: tasks[task].taskName,
                    taskDesc: tasks[task].taskDesc,
                    date: tasks[task].date,
                    isDone: tasks[task].isDone
                });
            }
            this.setState({
                tasks: newState
            });
        });
    }


    render() {
        return (

            <div className='opening'>
                <h1>Lista Twoich Zadań: </h1>
                <div className='view'>
                    {
                        this.state.tasks && this.state.tasks.map(
                            ({id, taskName, taskDesc, date, isDone}) => (
                                <div key={id}
                                     className="task-view">
                                    <p className="task-name"><label>Zadanie: </label> {taskName}</p>
                                    <p className="task-desc"><label className="label-desc">Treść: </label> {taskDesc}</p>
                                    <p className="task-date"><label>Dodane: </label> {date}</p>
                                    <Button
                                        bsStyle="danger"
                                        className="delete-button"
                                        onClick={() => {
                                            this.handleRemoveTask(id)
                                        }}
                                    >Usuń
                                    </Button>
                                    <Button
                                        bsStyle="primary"
                                        onClick={() => {
                                            this.handleToggleDone(id, isDone)

                                        }}
                                    >{
                                        isDone ?
                                            'Niegotowe' :
                                            'Gotowe'
                                    }
                                    </Button>
                                    <EditTask
                                        task={{id, taskName, taskDesc, date, isDone}}/>

                                </div>
                            )
                        )
                    }


                </div>
            </div>
        )
    }
}


export default Tasks