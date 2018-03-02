import React from 'react'
import {database} from "../../firebase";

import {
    Button,
    Modal,
    FormGroup,
    FormControl
} from 'react-bootstrap'

class EditTask extends React.Component {

    state = {
        id: this.props.id,
        show: false,
        taskDesc: this.props.taskDesc,
        taskName: this.props.taskName
    }

    getInitialState(){
        return{show: false};
    }

    handleEditedTaskName = (event) => {
        this.setState({
            taskName: event.target.value
        })
    }

    handleEditedTaskDesc = (event) => {
        this.setState({
            taskDesc: event.target.value
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
                    date: tasks[task].date
                });
            }
            this.setState({
                tasks: newState
            });
        });
    }




    handleUpdateTask = id => {
        this.setState({
            show: !this.state.show
        })
        database().ref(`/tasks/${id}`).update({
            taskName: this.state.taskName,
            taskDesc: this.state.taskDesc,

        })

    }



    render() {

        let close = () => this.setState({show: false});

        return (
            <div>
                <Button
                    bsSize="xsmall"
                    onClick={() => this.setState({show: true})}
                >
                    Edytuj
                </Button>
                {
                    this.state.tasks && this.state.tasks.map(
                        ({id}) => (
                            <div className="modal-container">

                                <Modal
                                    show={this.state.show}
                                    onHide={close}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">Edytuj zadanie</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <form>
                                                <FormGroup>
                                                    <FormControl type="text"
                                                                 placeholder="Nazwa zadania..."
                                                                 value={this.state.taskName}
                                                                 onChange={this.handleEditedTaskName}/>
                                                </FormGroup>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <FormControl onChange={this.handleEditedTaskDesc}
                                                                 style={{height: 100}}
                                                                 componentClass="textarea"
                                                                 placeholder="Opis zadania..."
                                                                 value={this.state.taskDesc}/>
                                                </FormGroup>
                                            </form>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => {
                                            this.handleUpdateTask(id)
                                        }}>Zapisz</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>


                        )
                    )
                }

            </div>
        )
    }
}


export default EditTask