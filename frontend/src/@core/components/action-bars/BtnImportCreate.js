import {
  Row,
  Col,
  Button
} from 'reactstrap'
import { Upload, FilePlus } from 'react-feather'
import { useEffect, useRef } from 'react'


const BtnImportCreate = ({setShowImportModal, handleCreateClick}) => {
  const iframeRef = useRef(null)

  const handleImport = () => {
    setShowImportModal(true)
  }
  

  useEffect(() => {
    if (iframeRef.current) {
      const handleIframeLoad = () => {
        const contentDocument = iframeRef.current?.contentDocument
        if (contentDocument && contentDocument.body.innerHTML !== '') {
          iframeRef.current.contentWindow.print()
        }
      }

      iframeRef.current.addEventListener('load', handleIframeLoad)

      // Cleanup after print
      return () => {
        if (iframeRef.current) iframeRef.current.removeEventListener('load', handleIframeLoad)
      }
    }
  }, [])  // Run once only


  return (
    <>
      <div className='d-flex align-items-center justify-content-end pe-0 me-1'>
        <div className='mx-1'>
          <Button.Ripple 
            outline 
            color='primary' 
            className='btn-icon rounded-circle'
            onClick={handleImport}
            title='Import'
          >
            <Upload size={16} />
          </Button.Ripple>
        </div>
        <div>
          <Button.Ripple 
            outline 
            color='primary' 
            className='btn-icon rounded-circle'
            onClick={() => handleCreateClick()}
            title='Create'
          >
            <FilePlus size={16} />
          </Button.Ripple>
        </div>
      </div>
    </>
  )

}

export default BtnImportCreate