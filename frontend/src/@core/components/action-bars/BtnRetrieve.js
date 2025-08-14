import {
  Row,
  Col,
  Button
} from 'reactstrap'
import { RefreshCw, FilePlus } from 'react-feather'


const BtnRetrieve = ({handleReloadData}) => {

  return (
    <>
      <div className='d-flex align-items-center justify-content-end pe-0 me-0'>
        <div className='mx-1'>
          <Button.Ripple 
            outline 
            color='primary' 
            className='btn-icon rounded-circle'
            onClick={handleReloadData}
            title='Refresh'
          >
            <RefreshCw size={16} />
          </Button.Ripple>
        </div>
      </div>
    </>
  )

}

export default BtnRetrieve