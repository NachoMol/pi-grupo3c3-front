import React, { useState,useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { URL } from '../config/config'

const ProductPolicies = () => {
    const[policies, setPolicies] = useState([])
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get(`${URL}/policies`)
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
        <Grid container spacing={13}>
            {policies.map((policy, index) => (
                <Grid item xs={12} sm={6} md={4} key={policy.id}>
                <div style={{ marginBottom: index !== policies.length - 1 ? '20px' : '0', }}>
                    <Typography variant="h6" sx={{marginBottom: '12px', fontFamily: 'Quicksand', fontWeight:'800'}}>{policy.title}</Typography>
                    <Typography variant="body1" style={{ paddingBottom: '20px', textAlign:'justify', fontFamily: 'Quicksand', fontWeight:'600' }}>{policy.description}</Typography>
                </div>
                <br />
                <br />
                </Grid>
            ))}
        </Grid>
        
    )
}

export default ProductPolicies