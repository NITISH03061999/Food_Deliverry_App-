import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="container-fluid " style={{ width: "100%"}}>
  <footer className="d-flex flex-wrap justify-content-evenly py-3 my-4 border-top">
    <div className="col-md-4 d-flex text align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      </a>

      <span className="text-muted">© 2025 Dhaka's Kitchen, Inc</span>
      </div>
      <div><span className='text-muted'>Rights Under * Nitish Dhaka *</span></div>
      
    
   

    {/* <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">

    </ul> */}
  </footer>
</div>
  )
}
