import React from 'react';
import PropTypes from "prop-types";

const itemQuantity = (cart, id) => {
  let item = cart.find(item => item.id === id);
  return item ? item.quantity : 1;
}

export default function CartItems({cart,id,title,desc,currency,price,quantity, quantityChage }) {

    const itemCount = itemQuantity(cart, id);
    
  return (

      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-8">
          <div className="card rounded-3 mb-2">
            <div className="card-body p-4">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <img src="./images/dummy.jpeg"
                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                  <p className="lead fw-normal mb-2">{title}</p>
                  <p className="small mb-0">{desc}</p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button className="btn btn-link px-2" onClick={()=>quantityChage(id,"Decrease")} disabled={itemCount ===0}>
                    <i className="fas fa-minus"></i>
                  </button>
  
                  <input id="form1" min="0" name="quantity" value={itemCount} onChange={quantityChage} type="text"
                    className="form-control form-control-sm" />
  
                  <button className="btn btn-link px-2" onClick={()=>quantityChage(id,"Increase")}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 className="mb-0">{currency}{price}</h5>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
  );
}

CartItems.propTypes = {
  cart: PropTypes.array,
}