import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

// ** Store & Actions
import { useDispatch } from 'react-redux'

// ** Icons
import { Trash2 } from 'react-feather'

// ** Custom
import SaveSpinner from '@components/spinners/SaveSpinner'

import {
    Row,
    Col,
    Card,
    Form,
    Label,
    Modal,
    Input,
    Button,
    CardBody,
    ModalBody,
    CardTitle,
    CardHeader,
    ModalHeader
  } from 'reactstrap'


const ModalDeleteForm = ({
    showModal, 
    setShowModal, 
    selectedRowId,
    selectedRowName,
    handleReloadData, 
    dataDestination}) => {

    const [showSaveSpinner, setShowSaveSpinner] = useState(false)

    const dispatch = useDispatch()

    const {
        handleSubmit,
        formState: {}
    } = useForm()

    const handleClose = () => {
        setShowModal(false)
    }

    const onSubmit = async () => {
        setShowSaveSpinner(true)
        
        const action = await dispatch(dataDestination(selectedRowId)) 

        if (dataDestination.fulfilled.match(action)) {
                setShowSaveSpinner(false)
                handleReloadData()
                setShowModal(false)
        } else if (dataDestination.rejected.match(action)) {
            setShowSaveSpinner(false)
        }

    }

    return (
        <>
            {showSaveSpinner && <SaveSpinner />}
            <Modal isOpen={showModal} className='modal-dialog-centered'>
                <ModalHeader className='bg-transparent' toggle={() => setShowModal(!showModal)}>
                    Delete Record
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Col xs={12} className='mt-2'>
                            <h4 className='normal-darkred'>
                                {selectedRowName}
                            </h4>
                            <h5 className='d-flex justify-content-center'>
                                <Trash2 className='me-2' />Delete this record?
                            </h5>
                        </Col>
                        <Col xs={12} className='d-flex justify-content-end mt-2 mb-2'>
                            <Button className='me-2' color='primary'>
                                Delete
                            </Button>
                            <Button className='' color='secondary' type='reset' onClick={handleClose}>
                                Cancel
                            </Button>
                        </Col>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )

}

export default ModalDeleteForm