import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const ModalDetail = (props : any) => {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Detail Product
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                    <img width={'300px'} src={props.dataItem.url_img}/>
                </div>
                <p>{props.dataItem.name}</p>
                <div dangerouslySetInnerHTML={{__html:  props.dataItem.text}}/>
            </Typography>
            </Box>
        </Modal>
    )
}

export default ModalDetail