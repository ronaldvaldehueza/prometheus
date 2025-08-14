import {
  Row,
  Col,
  Input,
  Button,
  CardHeader
} from 'reactstrap'

import BtnRetrieve from './BtnRetrieve'
import BtnSavePrint from './BtnSavePrint'


const ActionBarF01a = ({
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