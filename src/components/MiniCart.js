import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import NavBar from './NavBar';
import PropTypes from "prop-types";

export default function MiniCart({cart, inital, quantityChage}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const getCartTotal = (cart, inital) => {

            if(cart.length>0){
              const totalItems = cart.reduce((sum, { quantity }) => sum + quantity, 0 );
              const cartTotal = cart.reduce((sum, { price, quantity }) => sum + (price * quantity), 0 );
              return [cartTotal, totalItems];
            }else{
              const totalItems = inital.reduce((sum, { quantity }) => sum + quantity, 0 );
              const cartTotal = inital.reduce((sum, { price, quantity }) => sum + (price * quantity), 0 );
              return [cartTotal, totalItems];
            }
    }

    const [cartTotal, totalItems] = getCartTotal(cart, inital);
  return (
        <div style={{textAlign: "right"}}>
        <Button
        onMouseEnter={(event) => {
          setAnchorEl(event.currentTarget);
        }}><h3>${cartTotal}</h3>
        <div className="cart-icon">
        <img src="./images/cart.png" alt="cart" />
        <p>{totalItems}</p>
        </div>
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={open}
        id={open ? "simple-popover" : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
       {cart.length === 0?inital.map((element)=>{
                return <NavBar quantityChage={quantityChage} key={element.id} {...element}/>
            }):
            cart.map((element)=>{
                return <NavBar quantityChage={quantityChage} key={element.id} {...element}/>
            })
          }
      </Popover>
        </div>
    );
}

MiniCart.propTypes = {
  cart: PropTypes.array,
}