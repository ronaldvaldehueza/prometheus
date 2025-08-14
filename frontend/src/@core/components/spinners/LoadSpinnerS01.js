// ** React Imports
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Third Party Components
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import openLottie from './animation_ln8zu207.json'

const LoadSpinnerS01 = ({ className }) => {

    return (
    <Row className='d-flex.flex-row.align-items-center'>
        <Row>
            <Col>
            <div
                className={classnames('spinner-s1', {
                    [className]: className
                })}

                style={{
                    position:'relative', 
                    height:'auto',
                    width:'auto',
                    top:'0', 
                    left:'0', 
                    zIndex:'2000'
                    // , border:'1px solid green'
                }}
            >
                <div className='effect effect-4'
                    style={{ zIndex:'2010' }}></div>

                <Player
                    autoplay
                    loop
                    src={openLottie}
                    style={{ height: '300px', width: '300px'}}
                    >
                </Player>
            </div>
            </Col>
        </Row>
        <Row>
            <Col className='text-center'>
            <h6>Loading data, please wait...</h6>
            </Col>
        </Row>
    </Row>
    )
}

export default LoadSpinnerS01
