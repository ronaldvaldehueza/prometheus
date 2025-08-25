import React from 'react'
import RippleButton from '../ripple-button'
import { Upload, FilePlus } from 'react-feather'

interface BtnImportCreateProps {
  setShowImportModal: (value: boolean) => void;
  handleCreateClick: () => void;
}

const BtnImportCreate: React.FC<BtnImportCreateProps> = ({ setShowImportModal, handleCreateClick }) => {

  const handleImport = () => {
    setShowImportModal(true)
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-end pe-0 me-1'>
        <div className='mx-1'>
          <RippleButton
            outline
            color='primary'
            className='btn-icon rounded-circle'
            onClick={handleImport}
            title='Import'
          >
            <Upload size={16} />
          </RippleButton>
        </div>
        <div>
          <RippleButton
            outline
            color='primary'
            className='btn-icon rounded-circle'
            onClick={() => handleCreateClick()}
            title='Create'
          >
            <FilePlus size={16} />
          </RippleButton>
        </div>
      </div>
    </>
  )

}

export default BtnImportCreate