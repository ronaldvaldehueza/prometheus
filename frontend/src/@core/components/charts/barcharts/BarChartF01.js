// ** Third Party Components
import Chart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import getBarChartOptionsS1 from './barChartOptionsS1'
// ** Reactstrap Imports
import { 
  Button,
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle,  
  CardSubtitle,
  Col,
  Input,
  Row } from 'reactstrap'

import { Download, Share2 } from 'react-feather'


const BarChartF01 = ({ series, colors, direction }) => {

  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // ** Chart Options
  const barChartOptions = getBarChartOptionsS1(categories, colors, direction)
  
  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start secondary-tint'>
        <div>
          <CardSubtitle className='text-muted mb-25'>Balance</CardSubtitle>
          <CardTitle className='fw-bolder' tag='h4'>
            P74,382.72
          </CardTitle>
        </div>
        <div className='d-flex align-items-center mt-md-0 mt-1'>
          <Calendar size={20} className='me-1'/>
          <Flatpickr
            className='form-control flat-picker bg-transparent border-0 shadow-none date-ranged-display'
            options={{
              mode: 'range',
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)]
            }}

          />

          <div>
            <Button.Ripple outline color='info' className='btn-icon rounded-circle mx-1'>
              <Download size={16} />
            </Button.Ripple>
            <Button.Ripple outline color='info' className='btn-icon rounded-circle'>
              <Share2 size={16} />
            </Button.Ripple>
          </div>

        </div>
      </CardHeader>
      <CardBody>
        <Chart options={barChartOptions} series={series} type='bar' height={400} />
      </CardBody>
    </Card>
  )
}

export default BarChartF01
