import React from 'react'
import { Controller } from 'react-hook-form'
import { Input, Label, FormGroup, FormFeedback } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import Select from 'react-select'

import 'flatpickr/dist/plugins/monthSelect/style.css'


const ControllerInput = ({ 
    crudOperation,
    labelText, 
    controlName, 
    controlRef, 
    inputType, 
    defaultValue, 
    isRequired, 
    validationRules, 
    placeholder, 
    moreClassNames,

    radioValues,        // For input of type radio
    radioVertical,      // For input of type radio
    rows,               // For input of type text
    cols,               // For input of type text 
    selectOptions,      // For input of type select
    onInputFileChange   // For input of type file
}) => {
    const mergedRules = {
    required: isRequired ? 'This field is required' : false,
    ...validationRules
    }

    const attributeObject = {
        ...(crudOperation === 'READ' && {readOnly: true})
    }
    
    const crudClass = (crudOperation === 'READ' ? 'readonly' : '')
    
    const isMultiSelect = inputType?.toUpperCase() === 'MULTISELECT' ? { isMulti: true } : {}

    return (
    <div className='mb-2'>
        {labelText && <Label for={controlName}>{labelText}</Label>}
        <Controller
            name={controlName}
            control={controlRef}
            defaultValue={crudOperation.startsWith('CREATE') ? defaultValue.create : defaultValue.update}
            rules={mergedRules}
            render={({ field, fieldState }) => {

                // // * console.log(field.name, field.value)
                return (
                    <>
                    { inputType?.toUpperCase() === 'DATE' ? 
                        (
                            <Flatpickr 
                                id={controlName}
                                {...field}
                                value={field.value}
                                onChange={(selectedDates) => {
                                    // Remove zone part
                                    field.onChange(selectedDates[0].toLocaleDateString('en-CA'))
                                }}
                                options={{ 
                                    dateFormat: "Y-m-d"
                                }} // Adjust date format as needed
                                className={`form-control ${crudClass ? crudClass : ''} ${moreClassNames ? moreClassNames : ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                {...attributeObject}
                            />
                        ) : 
                        inputType?.toUpperCase() === 'SELECT' || inputType?.toUpperCase() === 'REACTSELECT' || inputType?.toUpperCase() === 'MULTISELECT' ? 
                        (
                            <Select 
                                name={controlName}
                                id={controlName}
                                {...isMultiSelect}
                                {...field}
                                className={`react-select ${crudClass ? crudClass : ''} ${moreClassNames ? moreClassNames : ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                classNamePrefix='select'
                                options={selectOptions}
                                onChange={(optionSet) => {
                                    if (inputType?.toUpperCase() === 'MULTISELECT') {
                                        // Map selected options to their values and update the form
                                        const values = optionSet ? optionSet.map(option => option.value) : []
                                        field.onChange(values)
                                    } else {
                                        field.onChange(optionSet?.value)
                                    }
                                }}
                                value={
                                    inputType?.toUpperCase() === 'MULTISELECT' 
                                    ? selectOptions.filter(option => (field.value || []).includes(option.value))
                                    : selectOptions.find(option => option.value === field.value)
                                }
                                isClearable={false}
                            />
                        ) :
                        inputType?.toUpperCase() === 'CLASSICSELECT' ? 
                        (
                            <select 
                                name={controlName}
                                id={controlName}
                                {...field}
                                className={`form-control ${crudClass ? crudClass : ''} ${moreClassNames ? moreClassNames : ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                            >
                                {selectOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : 
                        inputType?.toUpperCase() === 'RADIO' && radioValues ? 
                        (
                            <div className={`d-flex ${radioVertical ? 'flex-column' : 'flex-row'} react-vcron-radio ${fieldState.invalid ? 'is-invalid' : ''}`}>
                                { radioValues.map(({value, label}) => (
                                    <FormGroup check key={value}>
                                        <Label check htmlFor={`${controlName}-${value}`} className={`me-2 ${moreClassNames ? moreClassNames : ''}`} style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                                            <Input 
                                                name={controlName} 
                                                id={`${controlName}-${value}`} 
                                                type='radio' 
                                                {...field} 
                                                value={value}
                                                checked={field.value === value}
                                                onChange={() => field.onChange(value)} 
                                                className={`mb-0 ${crudClass ? crudClass : ''}`}
                                                {...attributeObject}
                                            />
                                            <span style={{margin: '0.3rem'}}>{label}</span>
                                        </Label>
                                    </FormGroup>
                                )) }
                            </div>
                        ) :
                        inputType?.toUpperCase() === 'FILE' ? 
                        (
                            <Input
                                type='file'
                                id={controlName}
                                name={controlName}
                                multiple
                                onChange={(event) => onInputFileChange(controlName, event.target.files)}
                                className={`react-select ${crudClass ? crudClass : ''} ${moreClassNames ? moreClassNames : ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                            />
                        ) :
                        (
                            <Input 
                                name={controlName} 
                                id={controlName} 
                                {...field} 
                                type={inputType === 'numericstring' ? 'number' : inputType ? inputType : 'text'} 
                                placeholder={placeholder} 
                                className={`mb-0 ${crudClass ? crudClass : ''} ${moreClassNames ? moreClassNames : ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                invalid={fieldState.error ? true : undefined} 
                                rows={rows} 
                                cols={cols}
                                {...attributeObject}
                            />
                        )
                    }
                    <FormFeedback>{fieldState.error?.message}</FormFeedback>
                    </>
                )
            }
            }
        />
    </div>
    )
}


export { ControllerInput }