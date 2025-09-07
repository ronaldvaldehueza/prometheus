import React from 'react'
import {
  Row,
  Col,
  CardHeader
} from 'reactstrap'
import BtnRetrieve from './BtnRetrieve'
import BtnSavePrint from './BtnSavePrint'

interface ActionBarF01aProps {
  handleReloadData: () => void;
  domRefToSave: React.RefObject<any>;
  pageOrientation: 'p' | 'portrait' | 'l' | 'landscape';
  destinationFile: string;
}

const ActionBarF01a: React.FC<ActionBarF01aProps> = ({
  handleReloadData,
  domRefToSave,
  pageOrientation,
  destinationFile
}) => {

  return (
    <CardHeader className='not-printable' data-html2canvas-ignore='true'>
      <div className='w-100'>
        <Row>
          <Col>
            <div className='d-flex align-items-center justify-content-end pe-0 me-0'>
                <BtnRetrieve 
                    handleReloadData={handleReloadData} 
                />

                <BtnSavePrint 
                  domRefToSave={domRefToSave}
                  pageOrientation={pageOrientation}
                  destinationFile={destinationFile}
                />
            </div>
          </Col>
        </Row>
      </div>

    </CardHeader>
  )

}

export default ActionBarF01a