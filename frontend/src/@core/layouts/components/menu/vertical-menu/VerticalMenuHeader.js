// ** React Imports
import { useEffect, useState  } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

// ** Utils
import { getUserData, isUserLoggedIn } from '@utils'

// ** Custom Components
import Avatar from '@components/avatar'
import { TableContainer, TableRow, TableCell } from '@components/tables/TableComponents'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { MoreVertical, Menu, X, User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

import getInfoCardBgImage from './hourlyImage'


const VerticalMenuHeader = props => {
    const { menuCollapsed, setMenuCollapsed, setGroupOpen, menuHover } = props

    const infoCardBgImagePath = '/assets/images'
    
    const [infoCardBgImage, setInfoCardBgImage] = useState(getInfoCardBgImage(infoCardBgImagePath))

    const navigate = useNavigate()

    const { newAttendance } = useSelector((state) => state.attendance.newAttendance)

    // ** Vars
    const user = getUserData()

    // ** Menu toggler component
    const Toggler = () => {
        if (!menuCollapsed) {
            return (
            <MoreVertical /* Disc */
                size={22}
                data-tour='toggle-icon'
                className='text-primary toggle-icon d-none d-xl-block menu-header-toggler infocard-item-bg'
                onClick={() => setMenuCollapsed(true)}
            />
            )
        } else {
            return (
            <Menu /* Circle */
                size={22}
                data-tour='toggle-icon'
                className='text-primary toggle-icon d-none d-xl-block menu-header-toggler infocard-item-bg'
                onClick={() => setMenuCollapsed(false)}
            />
            )
        }
    }

    const dispatch = useDispatch()

    // ** State
    const [userData, setUserData] = useState(null)

    //** Vars
    // const userAvatar = (userData && userData.avatar) || defaultAvatar
    const userAvatar = defaultAvatar

    const openDTR = () => navigate('/apps/humanresource/entries/DailyTimeRecord')

    const openProfile = () => navigate('/pages/profile')

    const menuInfoCardStyle = {
        backgroundImage:`url(${infoCardBgImage})`, 
        backgroundSize:'cover',
        backgroundPosition:'center'
    }


    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }

        const intervalID = setInterval(() => {

            setInfoCardBgImage(getInfoCardBgImage(infoCardBgImagePath))
        }, 60 * 60 * 1000) // 60 mins * 60 secs * 1000 milliseconds

        
        return () => { 
            clearInterval(intervalID) // Cleanup function upon unmount
        }

    }, [])

    // ** Reset open group
    useEffect(() => {
        if (!menuHover && menuCollapsed) setGroupOpen([])

    }, [menuHover, menuCollapsed])


    return (
        <div className='navbar-header  w-100 h-100'>

            {/* <NavLink to={user ? getHomeRouteForLoggedInUser(user.role) : '/'} className='navbar-brand'> */}

            <div className='menu-infocard m-0 pr-1' style={menuInfoCardStyle}>
            <TableContainer style={{ width: "250px", height: '100%' }}>
            <TableRow style={{ height: '100%' }}>
                {/* Left section */}
                <TableCell flexBasis='60px' className='my-auto'>
                    <TableRow>
                        {/* Avatar */}
                        <TableCell className='text-center normal-white'>
                            <Link to='/pages/profile'>
                                <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow style={{marginTop: '10px'}}>
                        {/* Menu Width Toggler */}
                        <TableCell className='d-flex justify-content-center'>
                            <div className='nav-link modern-nav-toggle cursor-pointer'>
                                <Toggler />
                            </div>
                        </TableCell>
                    </TableRow>
                </TableCell>

                {/* Right section */}
                <TableCell>
                    <TableRow style={{ marginTop: '3px' }}>
                        {/* Date */}
                        <TableCell className='fs-8 collapsible-item text-center normal-white' style={{ paddingBottom: '8px' }}>
                            <span className='infocard-item-bg infocard-item-pad1 infocard-item-br1'>
                                {(new Date()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', weekday: 'short' })}
                            </span>
                        </TableCell>
                    </TableRow>
                    <TableRow className='fs-8 cursor-pointer' onClick={() => openDTR()}>
                        {/* Time */}
                        <TableCell className='normal-white collapsible-item' style={{ flexBasis: 'auto' }}>
                            <span className='infocard-item-bg infocard-item-pad1 infocard-item-br1'>
                                IN: {newAttendance.in1 || '00:00'}
                            </span>
                        </TableCell>
                        <TableCell className='normal-white collapsible-item'>
                            <span className='infocard-item-bg infocard-item-pad1 infocard-item-br1'>
                                OUT: {newAttendance.out2 || '00:00'}
                            </span>
                        </TableCell>
                    </TableRow>

                    <TableRow style={{ marginTop: '6px' }}>
                        {/* User Name */}
                        <TableCell  className='collapsible-item'>
                            <Link to='/pages/account-settings' className='d-flex pl-1 muted-white'>
                                <span className='text-truncate text-truncate-sm d-inline-block'>
                                    <span className='user-status fs-8 infocard-item-bg infocard-item-pad1 infocard-item-br1'>
                                        {(userData && userData.role) || 'Admin'}
                                    </span>
                                </span>
                            </Link>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        {/* Log Out switch */}
                        <TableCell className='fs-8 text-center collapsible-item'>
                            <a href='#'>
                                <span 
                                    className='text-warning infocard-item-bg infocard-item-pad1 infocard-item-br1' 
                                    onClick={() => dispatch(handleLogout())} 
                                    style={{color: 'rgb(var(--theme-rgb-warning-800))'}}
                                >
                                    Log<i className='fal fa-power-off'></i>ut
                                </span>
                            </a>
                        </TableCell>
                    </TableRow>
                </TableCell>
            </TableRow>
            </TableContainer>
  
            </div>

        </div>
    )
}

export default VerticalMenuHeader
