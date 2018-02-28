import React from 'react'
import {database} from "../../firebase";
import {
    Button
} from 'react-bootstrap'
class Tasks extends React.Component{

    state = {
        id: '',
        isDone: false
    }


    handleRemoveTask = id => {
        database().ref(`/tasks/${id}`).set(null)
    }


    handleToggleDone = (id) => {
        this.setState({
            isDone: !this.state.isDone
        })
        database().ref(`/tasks/${id}`).update({isDone:!this.state.isDone})
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
                    this.state.tasks && this.state.tasks.map(
                        ({id, taskDesc,taskName,date}) => (
                            <div>

                                <p key={id}>{taskDesc}{taskName}{date}</p>
                                <Button
                                    onClick={()=>{
                                        this.handleRemoveTask(id)
                                    }}
                                >Usuń
                                </Button>
                               <Button
                                   onClick={() =>{
                                    this.handleToggleDone(id)

                                   }}
                                   >{
                                    this.state.isDone ?
                                        'undone' :
                                        'done'
                                   }
                               </Button>
                               {/*<li key={this.state.task.id}>*/}
                                   {/*<Button*/}
                                       {/*onClick={this.handleRemoveTask}>*/}
                                       {/*usun*/}
                                   {/*</Button>*/}
                                   {/*<Button*/}
                                       {/*onClick={this.handleToggleDone}*/}
                                   {/*>*/}
                                       {/*{*/}
                                           {/*this.state.isDone ?*/}
                                               {/*'undone' :*/}
                                               {/*'done'*/}
                                       {/*}*/}
                                   {/*</Button>*/}

                               {/*</li>*/}

                            </div>
                        )
                    )
                }


            </div>
        )
    }
}










export default Tasks