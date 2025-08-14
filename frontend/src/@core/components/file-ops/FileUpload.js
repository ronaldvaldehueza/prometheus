// ** React Imports
import { useEffect } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Label,
    Modal,
    Button,
    CardBody,
    ModalBody
    } from 'reactstrap'


const FileUpload = ({
    showModal, 
    setShowModal, 
    message, 
    options}) => {

    const { delay = 3000 } = options

    useEffect(() => {
        if (options.autoClose) {

            const timer = setTimeout(() => {
                setShowModal(false)
                }, delay) 
    
            return () => clearTimeout(timer) // Clear timer once component is unmounted
        }

      }, [showModal])

    return (
        <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className='modal-message modal-dialog-centered' size='sm'>
            <ModalBody className={
                (options.autoClose ? 'm-4 p-0 ' : 'mx-4 mt-4 mb-2 p-0 ') + options.bodyColor
                }>

                <Row className='text-center'>
                    <Col>
                        <CardBody>
                            <h5 className='m-0 card-text opaque-band'>{message}</h5>
                        </CardBody>
                    </Col>
                </Row>
                { !options.autoClose &&
                <Row>
                    <Col className='pt-2 text-center'>
                        <Button.Ripple 
                            color={options.bodyColor}
                            onClick={() => setShowModal(false)}>Close
                        </Button.Ripple>
                    </Col>
                </Row>
                }
            </ModalBody>
        </Modal>
    )

}

export default FileUpload