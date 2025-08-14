import classnames from 'classnames'

import logo from '@src/assets/images/logo/logo-warning.png'

const LogoSpinner = ({ className }) => {

  return (
    <div
      className={classnames('spinner-s1', {
        [className]: className
      })}

      style={{
        position:'relative', 
        height:'auto',
        width:'auto',
        top:'50vh', 
        left:'50%', 
        transform:'translate(-50%, -50%)',
        zIndex:'2000'
        // , border:'1px solid red'
      }}
    >
      <img className='app-logo' src={logo} alt='logo' />
      <div className='effect effect-1'></div>
      <div className='effect effect-2'></div>
      <div className='effect effect-3'></div>
    </div>
  )
}

export default LogoSpinner
