import React, { useState, useEffect } from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios'

const ProductPolicies = () => {
    const[policies, setPolicies] = useState([])
    const[loading, setLoading] = useState(true)
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/policies')
                setPolicies(response.data)
                setLoading(false)
            }catch (error) {
                console.error("Error fetching policies", error)
                setLoading(false)
            }
        }
            fetchPolicies()
    }, [])

    if (loading) {
        return <div>Loading policies...</div>
    }

    // Verifica si policies es un array antes de intentar mapear
    if (!Array.isArray(policies)) {
        return <p>No policies available.</p>;
    }

    return (
        <Grid container style={{ margin: 0, width: '100%' }}>
        {/* <Grid container spacing={0}> */}
            {policies.map((policy, index) => (
                <Grid item xs={12} sm={6} md={4} key={policy.id} style={{ padding: '0 13px' }}>
                <div style={{ marginBottom: index !== policies.length - 1 ? (isSmallScreen ? '10px' : '20px') : '0', }}>
                    <Typography variant="h6" sx={{marginBottom: '12px', fontFamily: 'Quicksand', fontWeight:'800'}}>{policy.title}</Typography>
                    <Typography variant="body1" style={{ paddingBottom: '0px', textAlign:'justify', fontFamily: 'Quicksand', fontWeight:'600' }}>{policy.description}</Typography>
                </div>
                </Grid>
            ))}
        </Grid>
        
    )
}

export default ProductPolicies