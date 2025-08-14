import classnames from 'classnames'

import logo from '@src/assets/images/logo/logo-warning.png'

const ComponentSpinner = ({ className }) => {
  return (
    <div
      className={classnames('fallback-spinner', {
        [className]: className
      })}

      style={{zIndex:'2000'}}
    >
      <img className='app-logo' src={logo} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default ComponentSpinner
