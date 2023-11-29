import React, { useState,useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'

const ProductPolicies = () => {
    const[policies, setPolicies] = useState([])
    const[loading, setLoading] = useState(true)

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
        <Grid container spacing={2}>
            {policies.map((policy, index) => (
                <Grid item xs={12} sm={6} md={4} key={policy.id}>
              {/* Modifiqué el margin bottom porque quedaba texto tapado por el footer */}
                {/* <div style={{ marginBottom: index !== policies.length - 1 ? '20px' : '0' }}> */}
                <div style={{ marginBottom: index !== policies.length - 1 ? '20px' : '50px' }}>
                    <Typography variant="h6">{policy.title}</Typography>
                    <Typography variant="body1">{policy.description}</Typography>
                </div>
                </Grid>
            ))}
        </Grid>
)
}

export default ProductPolicies