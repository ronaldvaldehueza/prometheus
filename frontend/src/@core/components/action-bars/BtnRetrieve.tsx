import React from 'react'
import RippleButton from '../ripple-button'
import { RefreshCw } from 'react-feather'

interface BtnRetrieveProps {
  handleReloadData: () => void;
}

const BtnRetrieve: React.FC<BtnRetrieveProps> = ({ handleReloadData }) => {

  return (
    <>
      <div className='d-flex align-items-center justify-content-end pe-0 me-0'>
        <div className='mx-1'>
          <RippleButton
            outline
            color='primary'
            className='btn-icon rounded-circle'
            onClick={handleReloadData}
            title='Refresh'
          >
            <RefreshCw size={16} />
          </RippleButton>
        </div>
      </div>
    </>
  )

}

export default BtnRetrieve