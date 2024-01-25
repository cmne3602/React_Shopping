import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {changeName, changeCount} from './store.js'

function Cart() {

    let state = useSelector((state)=>{return state.cart });
    let dispatch = useDispatch();

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품 명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.map((a, i)=>{
                            return(
                                <tr>
                                    <td>{state[i].id}</td>
                                    <td>{state[i].name}</td>
                                    <td>{state[i].count}</td>
                                    <td><button onClick={()=>{
                                        dispatch(changeCount(i));
                                    }}>+</button></td>
                                </tr>    
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;