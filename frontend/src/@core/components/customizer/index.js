// ** React Imports
import { useState } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { Settings, X, SkipBack, SkipForward, Play, DollarSign, HelpCircle, FileText, Archive } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleAppliedTheme, handleAppliedThemeAlias, handleWallpaperCounter } from '@store/layout'

// ** Third Party Components
import 
    SwiperCore, 
    {
    FreeMode,
    Grid,
    Lazy,
    Virtual,
    Autoplay,
    Navigation,
    Pagination,
    EffectFade,
    EffectCube,
    EffectCoverflow
  } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import themes from './themes'

// ** Reactstrap Imports
import { Row, Col, Input, Label, Button, Accordion, AccordionHeader, AccordionBody, AccordionItem } from 'reactstrap'

// ** Custom components
import ThumbnailSelector from '@components/swiper/ThumbnailSelector'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/swiper/swiper.scss'
// import 'swiper/swiper.min.css'
// import '@css/React/swiper/pagination.min.css'


const Customizer = props => {
    // ** Props
    const {
        // skin,
        layout,
        // setSkin,
        isHidden,
        // setLayout,
        footerType,
        // navbarType,
        navbarColor,
        setIsHidden,
        // themeConfig,
        // contentWidth,
        menuCollapsed,
        // setLastLayout,
        // setNavbarType,
        setFooterType,
        openCustomizer,
        // setContentWidth,
        setMenuCollapsed,
        setOpenCustomizer,
        showChildren,
        setShowChildren
    } = props

    // ** Selectors
    const { appliedTheme, appliedThemeAlias, wallpaperCounter } = useSelector((state) => state.layout)

    // ** States
    const [wallpaperPreviewToggle, setWallpaperPreviewToggle] = useState('0')
    const [selectedSlide, setSelectedSlide] = useState(null)

    // // ** Refs
    // const swiperRef = useRef(null)

    const dispatch = useDispatch()

    const themeRoot = '/assets/css/themes/'
    const slides = [1, 2, 3, 4, 5, 6, 7]

    const toggleWallpaperPreview = () => {
        // TODO: Hide/show main window components
        setWallpaperPreviewToggle(wallpaperPreviewToggle === '1' ? '0' : '1') 
    }

    // Update theme
    const updateAppliedTheme = (newTheme, newColorName) => {
        dispatch(handleAppliedTheme(newTheme))
        dispatch(handleAppliedThemeAlias(newColorName))
        dispatch(handleWallpaperCounter(1))
    }

    // Update wallpaper counter
    const shiftWallpaperCounter = action => {
        let counter = wallpaperCounter

        switch (action) {
        case 'increment':
            counter++
            break
        case 'decrement':
            counter--
            break
        default:
            break
        }

        if (counter < 1) {
            counter = 1
        }

        setSelectedSlide(counter)
        dispatch(handleWallpaperCounter(counter))
    }
    
    const handleSetTheme = selectedColor => {
        // setNavbarColor(color)

        themes.forEach(theme => {
            if (theme.colorName === selectedColor) {
                updateAppliedTheme(theme.name, theme.colorName)
            }
        })
    }

    // ** Render Navbar Colors Options
    const renderNavbarColors = () => {
 
        return themes.map(theme => (
            <li
                key={theme.colorName}
                title={theme.colorName}
                className={classnames('btn btn-icon rounded-circle color-box', {
                    selected: navbarColor === theme.colorHex
                })}
                onClick={() => handleSetTheme(theme.colorName)}
                style={{
                        backgroundColor: theme.colorHex, 
                        border: (theme.name === appliedTheme ? '3px solid white' : '1px solid darkgray'),
                        backgroundImage: `radial-gradient(circle closest-side at 50% 88%, ${theme.colorAccent} 10%, rgba(255,255,255,0) 80%), radial-gradient(circle closest-side at 50% 88%, ${theme.colorAccent}, rgba(255,255,255,0) 340%)`
                       }}
            >
            </li>
        ))
    }

    // ** Render Footer Type Options
    const renderFooterTypeRadio = () => {
        const footerTypeArr = [
            {
                name: 'sticky',
                label: 'Sticky',
                checked: footerType === 'sticky'
            },
            {
                name: 'static',
                label: 'Static',
                checked: footerType === 'static'
            },
            {
                name: 'hidden',
                label: 'Hidden',
                checked: footerType === 'hidden'
            }
        ]

        return footerTypeArr.map((radio, index) => {
            const marginCondition = index !== footerTypeArr.length - 1

            return (
                <div key={index} className={classnames('form-check', { 'mb-2 me-1': marginCondition })}>
                    <Input
                        type='radio'
                        checked={radio.checked}
                        id={`footer-${radio.name}`}
                        onChange={() => setFooterType(radio.name)}
                    />
                    <Label className='form-check-label' for={`footer-${radio.name}`}>
                        {radio.label}
                    </Label>
                </div>
            )
        })
    }

    // ** Toggles Customizer
    const handleToggle = e => {
        e.preventDefault()
        setOpenCustomizer(!openCustomizer)
    }

    const generateSlideContent = (slideNumber) => {
        return <img width={70} height={40} src={`${themeRoot}${appliedTheme}/vista/${slideNumber}.jpg`} />
      }


    // ** Customizer return
    return (
        <div
            className={classnames('customizer d-none d-md-block sidepanel', {
                open: openCustomizer
            })}
        >

            <PerfectScrollbar className='customizer-content' options={{ wheelPropagation: false }}>

                <div className='customizer-header px-2 pt-1 pb-0 position-relative'>
                    <h4 className='mb-0'>Layout Settings</h4>
                    <a href='/' className='customizer-close' 
                        onClick={handleToggle} 
                    >
                        <X />
                    </a>
                </div>

                <hr />

                <div className='px-2'>
                    {layout !== 'horizontal' ? 
                    (<div className='form-switch mb-2 ps-0'>
                        <div className='d-flex align-items-center'>
                            <p className='fs-7 me-auto mb-0'>Collapsed Menu</p>
                            <Input
                                type='switch'
                                id='menu-collapsed'
                                name='menu-collapsed'
                                checked={menuCollapsed}
                                onChange={() => setMenuCollapsed(!menuCollapsed)}
                            />
                        </div>
                    </div>
                    ) 
                    : null}

                    <div className='form-switch mb-2 ps-0'>
                        <div className='d-flex align-items-center'>
                            <p className='fs-7 me-auto m-0'>Hidden Menu</p>
                            <Input
                                type='switch'
                                id='menu-hidden'
                                name='menu-hidden'
                                checked={isHidden}
                                onChange={() => setIsHidden(!isHidden)}
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <div className='px-2'>
                    <>
                        <div className='mb-2'>
                            <p className='fw-bold'>Theme Color</p>
                            <ul className='list-inline unstyled-list'>{renderNavbarColors()}</ul>
                        </div>
                        <div className='form-switch mb-2 ps-0'>
                            <Accordion 
                                open={ wallpaperPreviewToggle } 
                                toggle={ toggleWallpaperPreview } 
                                className='btn-outline' >
                                <AccordionItem className='glass-skin glass-thin-white'>
                                    <AccordionHeader targetId='1'><div className='fs-6'>Browse Wallpaper</div></AccordionHeader>
                                    <AccordionBody accordionId='1'>
                                        <Row className='d-flex align-items-center'>
                                            <p className='fs-7 m-0' style={{color: 'black'}}>Show Wallpaper</p>
                                            <Input
                                                type='switch'
                                                id='show-wallpaper'
                                                name='show-wallpaper'
                                                checked={!showChildren}
                                                onChange={() => setShowChildren(!showChildren)}
                                            />
                                        </Row>
                                        <Row>
                                            <ThumbnailSelector
                                                slides={slides}
                                                generateSlideContent={generateSlideContent}
                                                afterSlideClick={handleWallpaperCounter}
                                                selectedSlide={selectedSlide}
                                                setSelectedSlide={setSelectedSlide}
                                            />
                                        </Row>
                                        <Row className='d-flex align-items-center justify-content-center'>
                                            <Col className='d-flex justify-content-end'>
                                                <Button.Ripple 
                                                    className='btn-icon'
                                                    outline
                                                    color='primary'
                                                    onClick={() => shiftWallpaperCounter('decrement')}>
                                                    <SkipBack size={18} />
                                                </Button.Ripple>
                                            </Col>
                                            <Col className='text-center fs-7' style={{color: 'rgb(var(--theme-rgb-dark-1000))'}}>
                                                {appliedThemeAlias}
                                            </Col>
                                            <Col className='d-flex justify-content-start'>
                                                <Button.Ripple 
                                                    className='btn-icon'
                                                    outline
                                                    color='primary'
                                                    onClick={() => shiftWallpaperCounter('increment')}>
                                                    <SkipForward size={18} />
                                                </Button.Ripple>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    </>         
                </div>

                <hr />

                <div className='px-2'>
                    <div className='mb-2'>
                        <p className='fw-bold'>Footer Type</p>
                        <div className='d-flex'>{renderFooterTypeRadio()}</div>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default Customizer
