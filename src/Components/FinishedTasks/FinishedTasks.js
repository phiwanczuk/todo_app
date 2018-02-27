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

    handleCheckboxTrue = (id) => {
        this.setState({
            isDone: this.state.isDone
        })
        database().ref().child(`/tasks/${id}`).update({isDone:this.state.isDone})
    }



    render(){
        return(
            <div>
                {
                    this.state.tasks && this.state.tasks.map(
                        ({id, taskName, taskDesc, isDone}) => {
                            return this.state.isDone === true ? <div>
                                    <p key={id}>{taskName}</p>
                                </div>:<div>
                                    <p>jebac biede</p>

                                </div>


                        }
                    )
                }
            </div>
                )
    }
}


export default FinishedTasks