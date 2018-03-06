import React from 'react'
import {database} from "../../firebase";
import './FinishedTasks.css'

class FinishedTasks extends React.Component{

    state = {
        id: [],
        isDone: false,
        taskName: '',
        taskDesc: ''
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
                    isDone: tasks[task].isDone,
                    date: tasks[task].date
                });
            }
            this.setState({
                tasks: newState
            });
        });
    }



    render(){
        return(
            <div className='view'>
                {
                    this.state.tasks && this.state.tasks.filter(
                        ({isDone}) => (
                            isDone === true
                        )
                    ).map(({id,taskName,taskDesc,date}) => (
                        <div key={id}
                             className="task-view">
                            <p className="task-name"><label>Zadanie: </label> {taskName}</p>
                            <p className="task-desc"><label className="label-desc">Treść: </label> {taskDesc}</p>
                            <p className="task-date"><label>Dodane: </label> {date}</p>
                        </div>
                    ))
                }
            </div>
                )
    }
}


export default FinishedTasks