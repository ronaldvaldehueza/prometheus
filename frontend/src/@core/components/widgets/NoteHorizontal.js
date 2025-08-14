// ** Third Party Components
import PropTypes from 'prop-types'
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

const NoteHorizontal = ({ icon, color, topNote, bottomNote, cardClass, bodyClass, topNoteMargin }) => {
  return (
    <Card className={`note-card ${cardClass}`}>
      <CardBody className={bodyClass}>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h6
              className={classnames('fw-bolder', {
                'mb-0': !topNoteMargin,
                [topNoteMargin]: topNoteMargin
              })}
            >
              {topNote}
            </h6>

            <div className='card-text custom-color'>
              <h6
                style={{color:`rgb(var(--theme-rgb-${color}-1000))`}}
              >
                {bottomNote}
              </h6>
            </div>
          </div>
          <div 
            className='avatar avatar-stats p-50 m-0 not-printable'
            style={{background: 'rgba(255,255,255,0.8)'}}
            data-html2canvas-ignore='true'>
            <div className='avatar-content'>{icon}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default NoteHorizontal

// ** PropTypes
NoteHorizontal.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  topNote: PropTypes.string,
  bottomNote: PropTypes.any.isRequired,
  cardClass: PropTypes.string,
  bodyClass: PropTypes.string,
  topNoteMargin: PropTypes.oneOf(['mb-0', 'mb-25', 'mb-50', 'mb-75', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'])
}
