import {
    Row,
    Col,
    Input,
    Button,
    CardHeader
  } from 'reactstrap'

import BtnRetrieve from './BtnRetrieve'
import BtnImportCreate from './BtnImportCreate'
import BtnSavePrint from './BtnSavePrint'


const ActionBarF03 = ({ 
        filter, 
        handleFilter, 
        handleReloadData,
        setShowImportModal, 
        handleCreateClick, 
        domRefToSave, 
        pageOrientation, 
        destinationFile
}) => {

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
                        value={filter}
                        onChange={e => handleFilter(e.target.value)}
                        placeholder='Search Report'
                    />
                </div>
                </Col>

                <Col lg={4}>
                <div className='d-flex align-items-center justify-content-end pe-0 me-0'>
                    <BtnRetrieve 
                        handleReloadData={handleReloadData}
                    />
                    <BtnImportCreate 
                        setShowImportModal={setShowImportModal}
                        handleCreateClick={handleCreateClick}
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

  export default ActionBarF03