// ** React Imports
import classnames from 'classnames'

// ** Third Party Components
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import saveLottie from './animation_ln4suyd1.json'

const SaveSpinner = ({ className }) => {

  return (
    <div
        className={classnames('spinner-s1', {
            [className]: className
        })}

        style={{
            position:'fixed', 
            height:'auto',
            width:'auto',
            top:'50vh', 
            left:'50%', 
            transform:'translate(-50%, -50%)',
            zIndex:'2000'
            // , border:'1px solid purple'
        }}
    > 
        <div className='effect effect-1'
            style={{ zIndex:'2010' }}></div>

        <Player
            autoplay
            loop
            src={saveLottie}
            style={{ height: '300px', width: '300px' }}
        > </Player>
    </div>
    )
}

export default SaveSpinner
