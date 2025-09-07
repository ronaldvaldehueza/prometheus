import React, { useEffect, useRef } from 'react'
import RippleButton from '../ripple-button'
import { Download, Printer } from 'react-feather'
// TODO: Cannot find module '@utility/save/generatePDF'. Commenting out related code.
// import generatePDF from '@utility/save/generatePDF'

interface BtnSavePrintProps {
  domRefToSave: React.RefObject<any>;
  pageOrientation: 'p' | 'portrait' | 'l' | 'landscape';
  destinationFile: string;
}

const BtnSavePrint: React.FC<BtnSavePrintProps> = ({ domRefToSave, pageOrientation, destinationFile }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleSavePDF = () => {
    // generatePDF(domRefToSave, pageOrientation, destinationFile, true)
    console.log("Save PDF functionality disabled due to missing generatePDF utility.")
  }

  const handlePrintPDF = () => {
    // generatePDF(domRefToSave, pageOrientation, destinationFile, false).then((pdf: any) => {
    //   if (pdf && iframeRef.current) {
    //     const pdfDataUrl = pdf.output('bloburl')
    //     iframeRef.current.src = pdfDataUrl
    //   }
    // })
    console.log("Print PDF functionality disabled due to missing generatePDF utility.")
  }

  useEffect(() => {
    if (iframeRef.current) {
      const handleIframeLoad = () => {
        const contentDocument = iframeRef.current?.contentDocument
        if (contentDocument && contentDocument.body.innerHTML !== '' && iframeRef.current?.contentWindow) {
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
          <RippleButton
            outline
            color='primary'
            className='btn-icon rounded-circle'
            onClick={handleSavePDF}
            title='Save As'
          >
            <Download size={16} />
          </RippleButton>
        </div>
        <div>
          <RippleButton
            outline
            color='primary'
            className='btn-icon rounded-circle'
            onClick={handlePrintPDF}
            title='Print'
          >
            <Printer size={16} />
          </RippleButton>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        style={{ display: 'none' }}
        title="Print PDF"
      />
    </>
  )

}

export default BtnSavePrint