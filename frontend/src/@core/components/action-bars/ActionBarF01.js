import {
  Row,
  Col,
  Input,
  Button,
  CardHeader
} from 'reactstrap'
import BtnSavePrint from './BtnSavePrint'


const ActionBarF01 = ({domRefToSave, pageOrientation, destinationFile}) => {
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