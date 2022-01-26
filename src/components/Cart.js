import React, {useState, useEffect} from 'react';
import CartItems from './CartItems';
import MiniCart from './MiniCart';


const cartDataLocalStorage = JSON.parse(localStorage.getItem('cartData') || '[]');

export default function Cart() {

    const [products, setProducts] = useState([]);
    const [cartData, setCartData] = useState(cartDataLocalStorage);
    let cartItem =[];
    const getProduct = async() =>{
        const url ="http://dnc0cmt2n557n.cloudfront.net/products.json";
        let data = await fetch(url);
        let parsData = await data.json();
        const arrWithInitalQuantity = parsData.products.map(element => {
            return {...element, quantity: 1};
          });
        setProducts(arrWithInitalQuantity);  
        if(cartData.length ===  0){
            localStorage.setItem('cartData', JSON.stringify(arrWithInitalQuantity)); 
        }       
    } 

    // Function to Manage quantity on increase, decrease and remove
    const quantityChage = (item, type) =>{
        let upddateLocalData
        cartItem = JSON.parse(localStorage.getItem('cartData'));
        const exist = cartItem.find((e) => e.id === item);
        if(exist){
            if(type === "Increase"){
                upddateLocalData = cartItem.map((e) =>e.id === item ? { ...exist, quantity: e.quantity+1 } : e);
                localStorage.setItem('cartData', JSON.stringify(upddateLocalData));
            }else if(exist.quantity >= 0 && type === "Decrease"){
                upddateLocalData = cartItem.map((e) =>e.id === item ? { ...exist, quantity: e.quantity-1 } : e);
                localStorage.setItem('cartData', JSON.stringify(upddateLocalData));
            }
            else {
                upddateLocalData = cartItem.map((e) =>e.id === item ? { ...exist, quantity: 0 } : e);
                localStorage.setItem('cartData', JSON.stringify(upddateLocalData));
            }
            let cartData = JSON.parse(localStorage.getItem('cartData'));
            setCartData(cartData);
        }
    }

    useEffect(() => {
        getProduct();
    },[cartData]);

    
  return (
      <>
      <div className='my-3'>
      <MiniCart cart={cartData} inital={products} quantityChage={quantityChage}/>
      </div>
        <div className='my-3'>
            <h3 className='text-center my-3'>Shopping Cart</h3>
            {    products.map((element)=>{
                    return <div key={element.id}>
                            <CartItems cart={cartData} quantityChage={quantityChage} {...element}/>
                            </div>
                })
            }
        </div>
        </>
);
}
