export const ArrowheadS01 = () => (
    <svg style={{ overflow: 'visible' }}>
        <defs>
            <marker
                id='arrowhead-s01'
                markerWidth='10'
                markerHeight='10'
                refX='9' // These values will depend on the size and shape of arrow
                refY='3'
                orient='auto-start-reverse'
                markerUnits='strokeWidth'
            >
                <path d='M0,0 L0,6 L9,3 z' fill='#f00' /> {/* Custom arrow shape */}
            </marker>
        </defs>
    </svg>
)

export default ArrowheadS01