import React from 'react'
import AppBar from '@boletia/react-ui/atoms/AppBar'
import { Box } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { BoletiaIcon, FlatButton, PlusIcon } from '@boletia/react-ui'

const LayoutCMS = () => {
    return (
        <Box sx={{ maxWidth: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppBar>
                <Box sx={{ maxWidth: '100%', display: 'flex', alignItems: 'center', padding: '20px 40px 20px 40px', justifyContent: 'space-between' }}>
                    <Link to='/banners' style={{textDecoration: 'none', color: '#000'}}><BoletiaIcon /></Link>
                    <FlatButton rounded='rounder'>
                        <Link to='/add-banner' style={{textDecoration: 'none', color: '#fff'}}>
                            <PlusIcon
                                sx={{
                                    fontSize: 12,
                                    marginRight: 6
                                }}
                            />
                            Agregar Banner
                        </Link>
                    </FlatButton>
                </Box>
            </AppBar>
            <Box sx={{ width: '100%', margin: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default LayoutCMS