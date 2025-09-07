import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input, Label, FormGroup, FormFeedback } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import 'flatpickr/dist/plugins/monthSelect/style.css';

type InputType = 'DATE' | 'SELECT' | 'REACTSELECT' | 'MULTISELECT' | 'CLASSICSELECT' | 'RADIO' | 'FILE' | 'numericstring' | 'text' | 'number' | 'password' | 'email';

interface RadioValue {
    value: string | number;
    label: string;
}

interface SelectOption {
    value: any;
    label: string;
}

interface ControllerInputProps {
    crudOperation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
    labelText?: string;
    controlName: string;
    controlRef: Control<any>;
    inputType?: InputType;
    defaultValue: { create: any, update: any };
    isRequired?: boolean;
    validationRules?: any;
    placeholder?: string;
    moreClassNames?: string;
    radioValues?: RadioValue[];
    radioVertical?: boolean;
    rows?: number;
    cols?: number;
    selectOptions?: SelectOption[];
    onInputFileChange?: (name: string, files: FileList | null) => void;
}

const ControllerInput: React.FC<ControllerInputProps> = ({
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
    radioValues,
    radioVertical,
    rows,
    cols,
    selectOptions = [],
    onInputFileChange
}) => {
    const mergedRules = {
        required: isRequired ? 'This field is required' : false,
        ...validationRules
    };

    const attributeObject = {
        ...(crudOperation === 'READ' && { readOnly: true })
    };

    const crudClass = (crudOperation === 'READ' ? 'readonly' : '');

    const isMultiSelect = inputType?.toUpperCase() === 'MULTISELECT' ? { isMulti: true } : {};

    return (
        <div className='mb-2'>
            {labelText && <Label for={controlName}>{labelText}</Label>}
            <Controller
                name={controlName}
                control={controlRef}
                defaultValue={crudOperation.startsWith('CREATE') ? defaultValue.create : defaultValue.update}
                rules={mergedRules}
                render={({ field, fieldState }: any) => (
                    <>
                        {inputType?.toUpperCase() === 'DATE' ?
                            (
                                <Flatpickr
                                    id={controlName}
                                    {...field}
                                    value={field.value}
                                    onChange={(selectedDates: Date[]) => {
                                        if (selectedDates[0]) {
                                            field.onChange(selectedDates[0].toLocaleDateString('en-CA'));
                                        }
                                    }}
                                    options={{
                                        dateFormat: "Y-m-d"
                                    }}
                                    className={`form-control ${crudClass} ${moreClassNames || ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                    {...attributeObject}
                                />
                            ) :
                            ['SELECT', 'REACTSELECT', 'MULTISELECT'].includes(inputType?.toUpperCase() || '') ?
                                (
                                    <Select
                                        name={controlName}
                                        id={controlName}
                                        {...isMultiSelect}
                                        {...field}
                                        className={`react-select ${crudClass} ${moreClassNames || ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                        classNamePrefix='select'
                                        options={selectOptions}
                                        onChange={(optionSet: any) => {
                                            if (inputType?.toUpperCase() === 'MULTISELECT') {
                                                const values = optionSet ? optionSet.map((option: SelectOption) => option.value) : [];
                                                field.onChange(values);
                                            } else {
                                                field.onChange(optionSet?.value);
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
                                            className={`form-control ${crudClass} ${moreClassNames || ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
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
                                                {radioValues.map(({ value, label }) => (
                                                    <FormGroup check key={value}>
                                                        <Label check htmlFor={`${controlName}-${value}`} className={`me-2 ${moreClassNames || ''}`} style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                                            <Input
                                                                name={controlName}
                                                                id={`${controlName}-${value}`}
                                                                type='radio'
                                                                {...field}
                                                                value={value}
                                                                checked={field.value === value}
                                                                onChange={() => field.onChange(value)}
                                                                className={`mb-0 ${crudClass}`}
                                                                {...attributeObject}
                                                            />
                                                            <span style={{ margin: '0.3rem' }}>{label}</span>
                                                        </Label>
                                                    </FormGroup>
                                                ))}
                                            </div>
                                        ) :
                                        inputType?.toUpperCase() === 'FILE' ?
                                            (
                                                <Input
                                                    type='file'
                                                    id={controlName}
                                                    name={controlName}
                                                    multiple
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputFileChange?.(controlName, event.target.files)}
                                                    className={`react-select ${crudClass} ${moreClassNames || ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                                />
                                            ) :
                                            (
                                                <Input
                                                    name={controlName}
                                                    id={controlName}
                                                    {...field}
                                                    type={inputType === 'numericstring' ? 'number' : inputType || 'text'}
                                                    placeholder={placeholder}
                                                    className={`mb-0 ${crudClass} ${moreClassNames || ''} ${fieldState.invalid ? 'is-invalid' : ''}`}
                                                    invalid={!!fieldState.error}
                                                    rows={rows}
                                                    cols={cols}
                                                    {...attributeObject}
                                                />
                                            )
                        }
                        <FormFeedback>{fieldState.error?.message}</FormFeedback>
                    </>
                )}
            />
        </div>
    );
};

export default ControllerInput;