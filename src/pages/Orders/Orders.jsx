import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  const statusHandler = async (event,orderid)=>{
 const response =await axios.post(url+"/api/order/status",{
  orderid,
  status:event.target.value
 })
 if (response.data.success) {
   await fetchAllOrders();

 }
  
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />

            <div>
               {/* ITEMS  */}
              <p className="order-item-food">
                {order.items
                  .map(item => `${item.name} × ${item.quantity}`)
                  .join(", ")}
              </p>

              {/* NAME */}
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>

              {/* ADDRESS */}
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.pinCode}
                </p>
              </div>
              <p className="order-item-phone">
                {order.address.mobileNumber}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
