import TextField from '@mui/material/TextField'

const Header = (props : any) => {

    const filter = (e: any) => {
        props.setParam(e.target.value)
    }

    return (
        <div style={{ 
            height: '7vh',
            backgroundColor: '#abd7eb'
            }}>
            <div style={{ padding: '5px', float: 'right', width: '50vh'}}>
                <TextField onChange={(e)=>{
                        filter(e)
                    }} style={{ backgroundColor: 'white'}} id="outlined-basic" label="Search by name" variant="outlined" />
            </div>
        </div>
    )
}

export default Header