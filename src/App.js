import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import bgroot from './bg.png';
import { useState } from 'react';
import data from './data.js';
import {Routes, Route, Link} from 'react-router-dom'
import detail from './detail.js'

function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Shopping Mall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Link to="/">홈</Link>
      <Link to="/detail">상세</Link>
      <Routes>
        <Route path='/detail' element={<div>{detail()}</div>}/>
        <Route path='/' element={<div><Main></Main></div>}/>
      </Routes>

    </div>
  );
}

function Main() {
  let [shoes, setShoes] = useState(data);
  return(
    <>
      <div className='main-bg' style={{backgroundImage : 'url('+bgroot+'  )'}}></div>
      <Container>
        <Row>
          {
            shoes.map((a, i)=>{
              return(
                <Col>
                <Item obj={data[i]} url={'https://codingapple1.github.io/shop/shoes'+(i+1)+'.jpg'}></Item>
              </Col>
              )
            })
          }
        </Row>
      </Container>
    </>
  )
}

function Item(props) {
  return(
    <div>
      <img src={props.url} width='80%'/>
      <h4>{ props.obj.title }</h4>
      <p>{ props.obj.content }</p>
    </div>
  )
}

export default App;
