import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './Detail.css';
import { addCart } from './store.js';
import { useDispatch } from "react-redux";

let Btn = styled.button`
    background : ${ props=>props.bg }};
    color : ${ props=>props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;`

let Box = styled.div`
    background : grey;
    padding : 20px;
`
let NewBtn = styled(Btn)`
    
`

let Detail = function(props) {
    let [isTimeout, setIsTimeout] = useState(false);
    let dispatch = useDispatch();

    useEffect(()=>{ //mount, update
        let a = setTimeout(()=>{
            setIsTimeout(true);
        }, 2000);

        return()=>{
            clearTimeout(a)
        } //mount 실행X, unmount 실행
    })
    
    let [text, setText] = useState('');
    let [tabID, setTabID] = useState(1);

    useEffect(()=>{
        if(isNaN(text)) alert('그러지마세요');
    }, [text])

    let {id} = useParams();

    return(
        <div className="container">
            <Sale isTimeout={isTimeout}></Sale>
            <input onChange={(e)=>{ setText(text + e.target.value); }}></input>
            <Box>
                <Btn bg='blue'>버튼</Btn>
                <Btn bg='orange'>버튼</Btn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(Number(id)+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addCart({id : props.shoes[id].id, name : props.shoes[id].title, count : 1}));
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link3">
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{ setTabID(1); }}>Tab 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{ setTabID(2); }}>Tab 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link3" onClick={()=>{ setTabID(3); }}>Tab 3</Nav.Link>
                </Nav.Item>
            </Nav>
            <Modal id={tabID}></Modal>
        </div> 
    )
}

function Modal(props) {
    let [fade, setFade] = useState('');

    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 100);

        return ()=>{
            setFade('')
        }
    }, [props.id])

    return(
        <div className={"start "+fade}>
            모달 {props.id} 입니다.
        </div>
    )
}

function Sale(props) {
    if(props.isTimeout)
        return;
    return(
        <div className="alert-warning">
            2초 이내 구매 시 할인
        </div>
    )
}

export default Detail;