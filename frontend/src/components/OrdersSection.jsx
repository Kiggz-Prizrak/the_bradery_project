import React from "react";
import CheckoutRecapItem from "./CheckoutRecapItem";
import CloseIcon from "../assets/icons/CloseIcon";


const OrderSection = ({ orders }) => {
  console.log(orders);
  return (
    <section className="orderSection_container">
      <h2>yours orders</h2>
      <ul className="orderCard_container">
        {orders?.map((order) => (
          <li key={order.id} className="orderCard">
            <h3>Total price : {order.totalPrice} €</h3>
            <ul>
              {order.OrderItems?.map((orderItem) => (
                <li key={orderItem.id}>
                  <div className="orderCard_content">
                    <CloseIcon />

                    <div className="checkoutRecapItem-text">
                      <p>{orderItem.name}</p>
                      <p className="subtitle">{orderItem.price} $</p>
                    </div>
                  </div>
                  <p>{` x ${orderItem.quantity}`}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderSection;
