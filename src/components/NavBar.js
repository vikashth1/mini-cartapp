import React from 'react';

export default function NavBar({id,title,currency,price,quantity,quantityChage}) {
  return (
        <div>
            {quantity>0 && <ul className="list-group">
                <li className="list-group-item d-flex justify-content-center align-items-start">
                  <div className="ms-2 me-auto">
                  <div className="fw-bold">{title}</div>
                  {currency}{price}
                </div>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Qty</div>
                  {quantity}
                </div>
                <div className="ms-2 me-auto">
                <p className="text-danger"><i className="fas fa-trash fa-lg" onClick = {()=>{quantityChage(id,"Remove")}}></i></p>
                </div>
                </li>
            </ul>}
        </div>
    );
}
