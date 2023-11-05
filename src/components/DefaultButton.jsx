/* eslint-disable react/prop-types */
import { Button } from "@mui/material"

const DefaultButton = ({name}) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
                mt: 3, mb: 2, bgcolor: '#302253', '&:hover': {
                    bgcolor: '#5e2b96',
                },
            }}
        >
            {name}
        </Button>
    )
}

export default DefaultButton