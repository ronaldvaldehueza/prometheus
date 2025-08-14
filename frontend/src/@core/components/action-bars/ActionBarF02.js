import {
    Row,
    Col,
    Input,
    Button,
    CardHeader
  } from 'reactstrap'
  import BtnSavePrint from './BtnSavePrint'
  

const ActionBarF02 = ({ handleFilter, value, handlePerPage, rowsPerPage, domRefToSave, pageOrientation, destinationFile}) => {

    return (
      <CardHeader className='not-printable' data-html2canvas-ignore='true'>
        <div className='w-100 py-2 not-printable'>
          <Row className='d-flex g-2'>
            <Col lg={6}
                className='me-auto'
            >
              <div className='d-flex align-items-center'>
                <label htmlFor='search-report'>Search</label>
                <Input
                  id='search-report'
                  className='ms-50 me-2 w-100'
                  type='text'
                  value={value}
                  onChange={e => handleFilter(e.target.value)}
                  placeholder='Search Report'
                />
              </div>
            </Col>
    
            <Col lg={4}>
              <div className='d-flex align-items-center justify-content-end pe-0 me-0'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                  type='select'
                  id='rows-per-page'
                  value={rowsPerPage}
                  onChange={handlePerPage}
                  className='form-control ms-50 pe-3 me-1'
                >
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                </Input>

                <BtnSavePrint 
                  domRefToSave={domRefToSave}
                  pageOrientation={pageOrientation}
                  destinationFile={destinationFile}/>

              </div>
            </Col>
          </Row>
        </div>
      </CardHeader>
    )
  }

  export default ActionBarF02