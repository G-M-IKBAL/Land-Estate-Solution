import '../styles/employee.css'
import React, { useState } from 'react'
import { FaBell } from 'react-icons/fa';
import Badge from '@mui/material/Badge';


import {Row,Col,Button,Card,CardText,
  CardHeader,Navbar,NavbarBrand,Modal,ModalHeader,
  ModalBody,ModalFooter, Offcanvas,OffcanvasHeader,
  OffcanvasBody,Input,Form
  
} from 'reactstrap'

function Employee_dashboard(args) {
  const [modal, setModal] = useState(false)

  const [canvas,setcanvas] = useState(false)

  const toggle = () => setModal(!modal)

  const canvas_toggle =( ) => setcanvas(!canvas)

  return (
    
    <>
      <div id="model">

        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            
            <Row>

              <Col>
              <Form>
             <h2>Name</h2><Input type="text" placeholder='name'>
              </Input>
            </Form>
              </Col>

              <Col>
              <Form>
             <h2>Name</h2><Input type="text" placeholder='name'>
              </Input>
            </Form>
              </Col>
           

            </Row>
            
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      
      <Navbar className="my-2" color="secondary" dark id="bar">
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="images/img-01.png"
            style={{ height: 100, width: 100 }}
          />
          Jahan estate Marketing
        </NavbarBrand>

        <h1>Empolyee Dashboard</h1>

      <div>
      
  <Button onClick={canvas_toggle}>
    <h1><FaBell id= "bell" /></h1>
    <Badge id="bell_badge">
      4
    </Badge>
  </Button>


  <Offcanvas direction='end' isOpen={canvas} toggle={canvas_toggle}>
    <OffcanvasHeader toggle={canvas_toggle} id="canvas_head">
    <strong>Notifications</strong>
    </OffcanvasHeader>
    <OffcanvasBody>
    
        Notifications will be shown here 
     
    </OffcanvasBody>
  </Offcanvas>
</div> 

      </Navbar>

      <Row id="row">
        <Col sm="4" id="column">
          <Card body id="card">
            <CardHeader id="header">
              <h2>Client Registration</h2>
            </CardHeader>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to
              additional content. With supporting text below as a natural
              lead-in to additional content.
            </CardText>
            <Button id="btn" onClick={toggle}>
              New Client
            </Button>
          </Card>
        </Col>

        <Col sm="4" id="column">
          <Card body id="card">
            <CardHeader id="header">
              <h2>Property Booking</h2>
            </CardHeader>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to
              additional content. With supporting text below as a natural
              lead-in to additional content.
            </CardText>
            <Button id="btn">New Booking</Button>
          </Card>
        </Col>

        <Col sm="4" id="column">
          <Card body id="card">
            <CardHeader id="header">
              <h2>Add Expence</h2>
            </CardHeader>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to
              additional content. With supporting text below as a natural
              lead-in to additional content.
            </CardText>
            <Button id="btn">New Expence</Button>
          </Card>
        </Col>

        <Col sm="4" id="column">
          <Card body id="card">
            <CardHeader id="header">
              <h2>Generate Report</h2>
            </CardHeader>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to
              additional content. With supporting text below as a natural
              lead-in to additional content.
            </CardText>
            <Button id="btn">Report Generation</Button>
          </Card>
        </Col>

        <Col sm="4" id="column">
          <Card body id="card">
            <CardHeader id="header">
              <h2>Client Registration</h2>
            </CardHeader>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to
              additional content. With supporting text below as a natural
              lead-in to additional content.
            </CardText>
            <Button id="btn">New Client</Button>
          </Card>
        </Col>

        <Col sm="4" id="column">
          <Card body id="card">
            <CardHeader id="header">
              <h2>Client Registration</h2>
            </CardHeader>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content. With supporting text below as a natural lead-in to
              additional content. With supporting text below as a natural
              lead-in to additional content.
            </CardText>
            <Button id="btn">New Client</Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Employee_dashboard
