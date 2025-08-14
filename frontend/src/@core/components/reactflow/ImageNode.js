import React, { memo } from "react"
import { Handle, Position } from "reactflow"


// export default memo(({ data, isConnectable }) => {
const ImageNode = ({ data }) => {
    return (
        <>
            <div 
                className='d-flex align-items-center flex-column' 
                style={{ width: data.width }}
            >
                <img src={data.imageSrc} 
                    style={{ 
                        width: data.width, 
                        height: data.height
                        // filter: 'drop-shadow(3px 3px 8px rgba(0,0,0, 0.8))'
                    }}
                />
                <div style={{ 
                    fontSize: data.fontSize || '8pt',
                    fontWeight: 600,
                    color: 'black',
                    paddingTop: '4px',
                    maxWidth: data.width + 20,
                    textAlign: 'center'
                }}>
                    {data.label}
                </div>
            </div>

            <Handle
                id='top'
                type={data.topHandleType || 'target'}
                position={Position.Top}
                style={{ background: 'none', border: '0' }}
            />
 
            <Handle
                id='bottom'
                type={data.bottomHandleType || 'source'}
                position={Position.Bottom}
                style={{ background: 'none', border: '0' }}
            />

            <Handle
                id='left'
                type={data.leftHandleType || 'target'}
                position={Position.Left}
                style={{ background: 'none', border: '0' }}
            />

            <Handle
                id='right'
                type={data.rightHandleType || 'source'}
                position={Position.Right}
                style={{ background: 'none', border: '0' }}
            />
        </>
    )
}

export default ImageNode