import {
  Row,
  Col,
  Button
} from 'reactstrap'
import { Download, Printer } from 'react-feather'
import generatePDF from '@utility/save/generatePDF'
import { useEffect, useRef } from 'react'


const BtnSavePrint = ({domRefToSave, pageOrientation, destinationFile}) => {
  const iframeRef = useRef(null)

  const handleSavePDF = () => {
    generatePDF(domRefToSave, pageOrientation, destinationFile, true)
  }

  const handlePrintPDF = () => {
    generatePDF(domRefToSave, pageOrientation, destinationFile, false).then((pdf) => {
      if (pdf) {
        const pdfDataUrl = pdf.output('bloburl')
        iframeRef.current.src = pdfDataUrl
      } 

    })

  }

  useEffect(() => {
    if (iframeRef.current) {
      const handleIframeLoad = () => {
        // // * console.log("Handling load...")
        const contentDocument = iframeRef.current?.contentDocument
        if (contentDocument && contentDocument.body.innerHTML !== '') {
          // // * console.log("Printing...")
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
            onClick={handleSavePDF}
            title='Save As'
          >
            <Download size={16} />
          </Button.Ripple>
        </div>
        <div>
          <Button.Ripple 
            outline 
            color='primary' 
            className='btn-icon rounded-circle'
            onClick={handlePrintPDF}
            title='Print'
          >
            <Printer size={16} />
          </Button.Ripple>
        </div>
      </div>
      <iframe
        type='application/pdf'
        ref={iframeRef}
        style={{ display: 'none' }}
        title="Print PDF"
      />
    </>
  )

}

export default BtnSavePrint