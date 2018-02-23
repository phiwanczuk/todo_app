import React from 'react'
import {database} from "../../firebase";
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'
class Tasks extends React.Component{

    state = {
        id: '',
        taskName: '',
        taskDesc: '',
        isDone: false
    }


    handleRemoveTask = id => {
        database().ref(`/tasks/${id}`).set(null)
    }


    handleCheckbox = (id) => {
        this.setState({
            isDone: !this.state.isDone
        })
        database().ref().child(`/tasks/${id}`).update({isDone:!this.state.isDone})
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
                    taskDesc: tasks[task].taskDesc
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
                        ({id, taskName, taskDesc}) => (
                            <div>
                                <p key={id}>{taskName}</p>
                                <p key={id}>{taskDesc}</p>
                                <Button
                                    onClick={()=>{
                                        this.handleRemoveTask(id)
                                    }}
                                >Usuń
                                </Button>
                                <FormControl
                                    type='checkbox'
                                    onChange={()=>{
                                        this.handleCheckbox(id)}}
                                    defaultChecked={this.state.isDone}
                                />
                            </div>
                        )
                    )
                }


            </div>
        )
    }
}










export default Tasks