// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'

const ThemeNavbar = props => {

  const { skin, setSkin, /*setMenuVisibility,*/ openCustomizer, setOpenCustomizer } = props

  return (
    <Fragment>
      {/* <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div> */}
      <NavbarUser 
        skin={skin} 
        setSkin={setSkin} 
        openCustomizer={openCustomizer}
        setOpenCustomizer={setOpenCustomizer}
      />
    </Fragment>
  )
}

export default ThemeNavbar
