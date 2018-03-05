import React from 'react'
import {database} from "../../firebase";
import EditTask from "../../Components/EditTask/EditTask"
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


    handleToggleDone = (id,isDone) => {
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
            <div className='view'>
                {
                    this.state.tasks && this.state.tasks.map(
                        ({id, taskName, taskDesc, date,isDone}) => (
                            <div key={id}>
                                <p><label>Zadanie:</label>{taskName}</p>
                                <p><label>Treść:</label>{taskDesc}</p>
                                <p><label>Dodane:</label>{date}</p>
                                <Button
                                    onClick={() => {
                                        this.handleRemoveTask(id)
                                    }}
                                >Usuń
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.handleToggleDone(id,isDone)

                                    }}
                                >{
                                 isDone ?
                                        'undone' :
                                        'done'
                                }
                                </Button>
                                <EditTask task={{id,taskName, taskDesc, date, isDone}}/>

                            </div>
                        )
                    )
                }


            </div>
        )
    }
}


export default Tasks