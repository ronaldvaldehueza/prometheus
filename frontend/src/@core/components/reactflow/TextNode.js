import React, { memo } from "react"
import { Handle, Position } from "reactflow"


// export default memo(({ data, isConnectable }) => {
const ImageNode = ({ data }) => {
    return (
        <>
            <div 
                className='d-flex flex-row align-items-start justify-content-end pe-1'
                style={{ 
                    position: 'absolute',
                    fontSize: '10pt',
                    fontFamily: 'Montserrat',
                    // fontWeight: 300,
                    color: 'rgb(var(--darkgray-200))',
                    width: '100%'
                }}
            >
                {data.label}
            </div>
            <div 
                className={`d-flex
                    ${data.orientation === 'vertical' ? 'flex-row justify-content-center align-items-center' : 'flex-row align-items-center justify-content-center'}`
                } 

                style={{ 
                    fontSize: data.fontSize || '8pt',
                    fontFamily: data.fontFamily,
                    fontWeight: 800,
                    color: data.fontColor || 'black',
                    ...(data.orientation === 'vertical' ? { width: '100%' } : {}),
                    height: '100%',
                    lineHeight: 'normal'
                }}>
                    <div 
                        className={`d-flex
                        ${data.orientation === 'vertical' && 'vertical-text'}`
                        }
                    >
                        {data.label}
                    </div>
            </div>
        </>
    )
}

export default ImageNode