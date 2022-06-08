import React from "react";
// import './css/landing.css'

const Header = () => {
    const something=(event)=> {
        if (event.keyCode === 13) {
            console.log('enter')
        }
    }
return (
    <div>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <input  type='text' onKeyDown={(e) => something(e) }/>
    </div>
);
}


export default Header;