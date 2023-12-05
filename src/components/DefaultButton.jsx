/* eslint-disable react/prop-types */
import { Button } from "@mui/material"

const DefaultButton = ({name, type, callback}) => {
    return (
        <Button
            type={type}
            fullWidth
            variant="contained"
            sx={{
                mt: 3, mb: 2, bgcolor: '#302253', '&:hover': {
                    bgcolor: '#5e2b96',
                },
            }}
            onClick={type !== 'submit' ? callback : null}
        >
            {name}
        </Button>
    )
}

export default DefaultButton