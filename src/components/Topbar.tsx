import {  
  Navbar, NavbarBrand,} from "@nextui-org/react";

function Topbar() {  
  return (
    <Navbar position="static">
    <NavbarBrand>      
      <p className="font-bold text-inherit">Booklist App</p>
    </NavbarBrand>
  </Navbar>
  )
}

export default Topbar
