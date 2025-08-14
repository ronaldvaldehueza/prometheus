// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

// ** Third Party Components
import { Settings, X } from 'react-feather'

// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Custom Components
import Customizer from '@components/customizer'
import NotificationDropdown from './NotificationDropdown'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'


const NavbarUser = props => {
    const { openCustomizer, setOpenCustomizer } = props

    // ** Toggles Customizer
    const handleToggle = e => {
        e.preventDefault()
        setOpenCustomizer(!openCustomizer)
    }
        
    return (
        <>
            <ul className='nav navbar-nav align-items-center ms-auto'>
                <NotificationDropdown />
            </ul>
            <ul className='nav navbar-nav align-items-center ms-1'>
                <a href='/' 
                    className='customizer-toggle' 
                    onClick={handleToggle}
                >
                    <Settings size={20} className='xspinner' />
                </a>
            </ul>
        </>
    )
}
export default NavbarUser
