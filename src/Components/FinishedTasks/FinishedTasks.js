import React from 'react'
import {database} from "../../firebase";

class FinishedTasks extends React.Component{

    state = {
        id: '',
        isDone: false
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
                });
            }
            this.setState({
                tasks: newState
            });
        });
    }



    render(){
        return(
            <div>
                {
                    this.state.tasks && this.state.tasks.map(
                        ({id, taskName, taskDesc}) => (
                                    <p key={id}>{taskName}{taskDesc}</p>
                        )
                    )
                }
            </div>
                )
    }
}


export default FinishedTasks