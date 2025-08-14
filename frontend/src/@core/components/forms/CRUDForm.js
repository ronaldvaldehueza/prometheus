import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** Third party Components
import { useForm, Controller } from 'react-hook-form'
import { get } from 'lodash'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Custom
import ModalMessage from '@components/modals/ModalMessage'
import SaveSpinner from '@components/spinners/SaveSpinner'

// ** Reactstrap Imports
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


const CRUDForm = ({
    crudOperation, 
    title, 
    showModal, 
    setShowModal, 
    Fields, 
    handleReloadData, 
    dataSource, 
    dataDestination, 
    lookupData,
    statePath,
    resetCreateState
}) => {

    const [showMessageModal, setShowMessageModal] = useState(false)
    const [modalMsgOptions, setModalMsgOptions] = useState({message: 'Saved', autoClose: true, bodyColor: 'success'})
    const [showSaveSpinner, setShowSaveSpinner] = useState(false)

    const dispatch = useDispatch()

    const {
        reset,
        control,
        handleSubmit,
        formState: { dirtyFields }
    } = useForm()


    const [fulfilledCreate, setFulfilledCreate] = useState(false)
    const fulfilledCreateRedux = useSelector(state => get(state, `${statePath}Create.fulfilled`, false))

    useEffect(() => {
        setFulfilledCreate(fulfilledCreateRedux) // Reset the local state to false every time the form is re-opened
    }, [fulfilledCreateRedux])


    const handleClose = () => {
        if (resetCreateState) dispatch(resetCreateState())
        setShowModal(false)
    }

    const [fileInputs, setFileInputs] = useState({}) // For use by input control of type 'file'
    const [slides, setSlides] = useState({})

    // For use by input control of type 'file'
    const handleInputFileChange = (controlName, fileList) => {
        const newSlides = Array.from(fileList).map(file => URL.createObjectURL(file))
        setSlides(prev => ({ ...prev, [controlName]: newSlides }))
        setFileInputs(prev => ({ ...prev, [controlName]: fileList }))
    }


    const onSubmit = async (formData) => {

        // Check for modified fields
        const isDirtyFieldsEmpty = Object.keys(dirtyFields).length === 0

        // Check for file selections
        const isFileInputsEmpty = Object.keys(fileInputs).every(key => fileInputs[key].length === 0)

        if (isDirtyFieldsEmpty && isFileInputsEmpty) {
            setModalMsgOptions({message: 'No changes to save.', autoClose: false, bodyColor: 'warning'})
            setShowMessageModal(true)
            return
        }
        setShowSaveSpinner(true)
      
        try {
            const dataToProcess = crudOperation.startsWith('CREATE') ? formData : dirtyFields
            let action

            if (crudOperation === 'CREATEWITHBINARY' || crudOperation === 'UPDATEWITHBINARY') {
                // Handling binary data with FormData
                const fileData = new FormData()
                Object.keys(fileInputs).forEach(key => {
                    Array.from(fileInputs[key]).forEach(file => {
                        fileData.append(key, file)
                    })
                })
        
                Object.keys(dataToProcess).forEach(key => {
                    if (!fileInputs[key]) { // Add non-file fields
                        fileData.append(key, formData[key])
                    }
                })
        
                action = await dispatch(dataDestination({
                    id: crudOperation === 'CREATEWITHBINARY' ? undefined : dataSource?.id,
                    formData: fileData
                }))

            } else { // if (crudOperation === 'CREATE' || crudOperation === 'UPDATE') 

                // Handling JSON data. Note for CREATE operations modifiedFields represent new data
                const modifiedFields = Object.keys(dataToProcess).reduce((acc, key) => {
                    acc[key] = formData[key]
                    return acc
                }, {})
        
                action = await dispatch(dataDestination({
                    id: crudOperation === 'CREATE' ? undefined : dataSource.id,
                    modifiedFields
                }))
            }

            // Check the action outcome to decide on the message to display
            if (action.error) {
                throw new Error(action.payload ? action.payload.message : 'An error occurred while processing your request.')
            }

            setTimeout(() => {
                setShowSaveSpinner(false)
                setModalMsgOptions({message: 'Saved.', autoClose: true, bodyColor: 'success'})  
                setShowMessageModal(true)
                handleReloadData()
            }, 2000)

        } catch (error) {
            // Handling errors
            if (import.meta.env.DEV) {
                console.error("Submission error:", error)
            }
            setShowSaveSpinner(false)
            setModalMsgOptions({ message: `Error: ${error.message || 'Unknown error'}`, autoClose: false, bodyColor: 'danger' })
            setShowMessageModal(true)
        }

    }


    useEffect(() => {
        return () => {
            // Cleanup for all slides sets
            Object.values(slides).forEach(slideSet => {
                slideSet.forEach(slide => {
                    if (slide.startsWith('blob:')) {
                        URL.revokeObjectURL(slide)
                    }
                })
            })
        }
    }, [])
    
    useEffect(() => {
        if (dataSource) {
            // reset()
            // setFileInputs({})
        }
    }, [dataSource, reset])

    return (
        <>            
            {showSaveSpinner && <SaveSpinner />}
            <Modal isOpen={showModal} className='modal-dialog-centered' size='lg'> 
                <ModalHeader className='bg-transparent' toggle={() => setShowModal(!showModal)}>
                {title}
                </ModalHeader>
                <ModalBody className='px-4'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Fields
                            crudOperation={crudOperation}
                            controlRef={control}
                            dataSource={dataSource}
                            lookupData={lookupData}
                            onInputFileChange={handleInputFileChange}
                            slides={slides}
                            setSlides={setSlides}
                        />
                        <Row>
                            <Col xs={12} className='d-flex justify-content-end mt-2 mb-2'>
                                { 
                                    (crudOperation.startsWith('CREATE')  && !fulfilledCreate) || crudOperation.startsWith('UPDATE')  || crudOperation.startsWith('DELETE') ?  
                                        (
                                            <Button className='me-2' color='primary'>
                                                {crudOperation.startsWith('CREATE') ? 'Create' : crudOperation.startsWith('UPDATE') ? 'Save' : ''}
                                            </Button>
                                        )
                                        : null 
                                }

                                <Button className='' color='secondary' type='reset' onClick={handleClose}>
                                    Close
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>

            </Modal>

            { showMessageModal && <ModalMessage 
                showModal={showMessageModal} 
                setShowModal={setShowMessageModal}
                message={modalMsgOptions.message}
                options={{autoClose: modalMsgOptions.autoClose, bodyColor: modalMsgOptions.bodyColor}}
            /> }

        </>
    )

}

CRUDForm.propTypes = {
    Fields: PropTypes.elementType.isRequired
  }

export default CRUDForm