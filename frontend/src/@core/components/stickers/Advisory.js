import ConnectionFailure from '@images/vcron/svg/No data-amico.svg'

const AdvisorySticker = () => (
    <div className='row sticker d-flex justify-content-center align-items-center text-center'>
        <img src={ConnectionFailure} alt='Connection Failure'/>
        <h5>A server or network disconnection has occurred.<br/>Please contact tech support.</h5>
    </div>
)

export default AdvisorySticker