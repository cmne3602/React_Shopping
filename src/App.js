import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import bgroot from './bg.png';
import { useState } from 'react';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './Detail.js'
import axios from 'axios';
import Cart from './Cart.js'

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Shopping Mall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{
            navigate('/')
          }}>Home</Nav.Link>
          <Nav.Link onClick={()=>{
            navigate('/cart')
          }}>Cart</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세</Link> */}
      <Routes>
        <Route path='/' element={<div><Main shoes={shoes} setShoes={setShoes}></Main></div>}/>
        <Route path='/detail/:id' element={<div>{<Detail shoes={shoes}></Detail>}</div>}/>

        <Route path='/about' element={<About></About>}>
          <Route path='member' element={<div>멤버임</div>}></Route>
          <Route path='location' element={<div>위치정보임</div>}></Route>
        </Route>
        <Route path='/event' element={<Event></Event>}>
          <Route path='one' element={<div>첫 주문 시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일 기념 쿠폰 받기</div>}></Route>
        </Route>
        
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='*' element={<div>없는페이지요</div>}></Route>
      </Routes>

    </div>
  );
}

function Main(props) {

  let [isLoading, setIsLoading] = useState(false);

  return(
    <>
      <div className='main-bg' style={{backgroundImage : 'url('+bgroot+'  )'}}></div>
      <Container>
        <Row>
          {
            props.shoes.map((a, i)=>{
              return(
                <Col>
                <Item obj={props.shoes[i]} url={'https://codingapple1.github.io/shop/shoes'+(props.shoes[i].id+1)+'.jpg'}></Item>
              </Col>
              )
            })
          }
        </Row>
      </Container>
      <button onClick={ ()=>{
        setIsLoading(true);
        let i = props.shoes.length / 3 + 1;
        if(i > 3) {
          alert('상품이 없습니다'); 
        }
        else{
          axios.get('https://codingapple1.github.io/shop/data'+i+'.json')
          .then((result)=>{
            let temp = [...props.shoes, ...result.data];
            props.setShoes(temp);
            setIsLoading(false);
          })
          .catch(()=>{
            setIsLoading(false);
            console.log('실패');
          })
        }
      } }>버튼</button>
      <Loading isLoading={isLoading}></Loading>
    </>
  )
}

function Tab(props) {
  return(
    <div>
      <button> </button>
    </div>
  )
}

function Loading(props) {
  if(props.isLoading)
    return(
      <div>로딩 중입니다.</div>
    )
  return; 
}

function Item(props) {
  let navigate = useNavigate();
  return(
    <div>
      <img src={props.url} width='80%' onClick={()=>{
        navigate('/detail/'+props.obj.id);
      }}/>
      <h4>{ props.obj.title }</h4>
      <p>{ props.obj.content }</p>
    </div>
  )
}

function About() {
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return(
    <div>
      오늘의 이벤트
      <Outlet></Outlet>
    </div>
  )
}

export default App;
