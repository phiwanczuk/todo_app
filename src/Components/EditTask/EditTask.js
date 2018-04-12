import React from 'react'
import {database} from "../../firebase";
import './EditTask.css'

import {
    Button,
    Modal,
    FormGroup,
    FormControl
} from 'react-bootstrap'

class EditTask extends React.Component {

    state = {
        show: false,
        taskDesc: '',
        taskName: ''
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

    handleUpdateTask = (id) => {
if(this.state.taskName.length >=1 && this.state.taskDesc.length >=1) {


    database().ref(`/tasks/${id}`).update({
        taskName: this.state.taskName,
        taskDesc: this.state.taskDesc

    })
    this.setState({
        show: false
    })
}else {
    alert('wpisz treść/nazwę zadania')
}

    }


    render() {

        let close = () => this.setState({show: false});

        return (
            <div className="edit-view">
                {
                    <div className="modal-container">
                        <Button
                            bsStyle="info"
                            onClick={()=> this.setState({show:true})}
                        >
                            Edytuj
                        </Button>
                        <Modal
                            show={this.state.show}
                            onHide={close}
                            container={this}
                            aria-labelledby="contained-modal-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                Edytuj zadanie
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <form>
                                        <FormGroup>
                                            <FormControl type="text" placehoder="Nazwa zadanie..." value={this.state.taskName} onChange={this.handleEditedTaskName}/>
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
                                <Button bsStyle="info"
                                        onClick={() => {this.handleUpdateTask(this.props.task.id)}}
                                >Zapisz</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                }
            </div>
        )
    }
}

export default EditTask