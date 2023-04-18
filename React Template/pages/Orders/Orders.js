import React from "react";
import Loading from './../Products/LoadingError/Loading';
import { Alert } from "reactstrap";
import moment from "moment";
const Orders = (props) => {
  const { loading, error, orders } = props;

  return (

    <div className="d-flex justify-content-center align-items-center flex-column">
       {
        loading? ( <Loading /> ): error? (<Alert variant="alert-danger" >{error}</Alert>
        ):(<>
        {
          orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3" >
              
              No orders
              <b>  <a className="btn btn-success mx-5 px-5 py-3"
          href="/ProductsLeftBar"
            style={{ fontSize:"12px"}}
            > Shopping Now </a></b> 
              </div>
          ):(
          
         
          <div className="table-responsive" >
<table className="table" >
<thead>
<tr>
  <th>ID</th>
  <th>STATUS</th>

  <th>DATE</th>

  <th>TOTAL</th>

</tr>

</thead>
<tbody>

{
  orders.map( (order)=>(

<tr className={`${order.isPaid ? "alert-success" :"alert-danger" }`} key={order._id} >

  <td>
    <a href={`/Orders/${order._id}`} className="link" >{order._id}</a>
  </td>
  <td>{order.isPaid ? <>Paid</>:<>Not Paid</> }</td>
  <td>{order.isPaid
  ? moment (order.paidAt).calendar():
  moment(order.createdAt).calendar()
  }</td>
  <td> {order.totalPrice} DT </td>


</tr>

  ) )
}

</tbody>
  

</table>


          </div>)
        }
        </>)
       }

    </div>
  );
};

export default Orders;
