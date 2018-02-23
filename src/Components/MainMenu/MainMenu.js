import React from 'react'
import {
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

const MainMenu = props =>(
    <Navbar>
        <Nav>
            <LinkContainer to ="/tasks">
                <NavItem>
                    Zadania
                </NavItem>
            </LinkContainer>
            <LinkContainer to ="/addtask">
                <NavItem>
                    Dodaj zadanie
                </NavItem>
            </LinkContainer>

        </Nav>
    </Navbar>
)
export default MainMenu