import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const CopyrigthLogin = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link to={'/'} color="inherit" style={{ textDecoration: 'none' }}>
        <span style={{ color: '#5C4D6B' }}>Explorer</span> 
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
</Typography>
  )
}

export default CopyrigthLogin