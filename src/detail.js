import { useParams } from "react-router-dom";
import styled from 'styled-components'

let Btn = styled.button`
    background : ${ props=>props.bg }};
    color : ${ props=>props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;`

let Box = styled.div`
    background : grey;
    padding : 20px;
`
let NewBtn = styled.button(Btn)


let Detail = function(props){

    let {id} = useParams();
    console.log(id)
    return(
        <div className="container">
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
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}

export default Detail;