import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItem } from './SidebarMenuItems'

export default function Sidebar(props: { items: MenuItem[] }) {
  const { items } = props

  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? '<' : '>'}
        </button>
        <ul className="menu">
          {items.map((item) => (
            <li key={item.path} className="menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.icon && <span className="icon">{item.icon}</span>}
                {isOpen && <span className="name">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

// // Sidebar.css
// .sidebar {
//   width: 250px;
//   height: 100vh;
//   background-color: #333;
//   color: white;
//   transition: width 0.3s ease;
//   overflow: hidden;
// }

// .sidebar.closed {
//   width: 60px;
// }

// .toggle-btn {
//   background: none;
//   border: none;
//   color: white;
//   font-size: 18px;
//   cursor: pointer;
//   padding: 10px;
// }

// .menu {
//   list-style: none;
//   padding: 0;
//   margin: 0;
// }

// .menu-item {
//   padding: 10px 20px;
// }

// .menu-item a {
//   text-decoration: none;
//   color: white;
//   display: flex;
//   align-items: center;
// }

// .menu-item a.active {
//   background-color: #555;
// }

// .icon {
//   margin-right: 10px;
// }

// .name {
//   margin-left: 10px;
// }
