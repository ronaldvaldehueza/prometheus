import React from 'react'
import {
  Row,
  Col,
  CardHeader
} from 'reactstrap'
import BtnSavePrint from './BtnSavePrint'

interface ActionBarF01Props {
  domRefToSave: React.RefObject<any>;
  pageOrientation: 'p' | 'portrait' | 'l' | 'landscape';
  destinationFile: string;
}

const ActionBarF01: React.FC<ActionBarF01Props> = ({ domRefToSave, pageOrientation, destinationFile }) => {
  return (
    <CardHeader className='not-printable' data-html2canvas-ignore='true'>
      <div className='w-100'>
        <Row>
          <Col>
            <BtnSavePrint 
              domRefToSave={domRefToSave}
              pageOrientation={pageOrientation}
              destinationFile={destinationFile}/>
          </Col>
        </Row>
      </div>

    </CardHeader>
  )

}

export default ActionBarF01