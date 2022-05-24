import React, { useState } from 'react'
import { Box, CircularProgress, IconButton } from '@mui/material'
import { Button, EyeIcon, Input } from '@boletia/react-ui'
import { Image } from '../components/atoms/Image'
import logo from '../assets/logo.svg'
import useOnChangeLogin from '../hooks/useOnChangeLogin'
import { ModalAlert } from '../components/atoms/Modal'

const AuthPage = () => {
    const [viewPassword, setViewPassword] = useState(false);
    const { data, error, isLoading, onChange, onSubmit, onCloseModal } = useOnChangeLogin();
    return (
        <Box sx={{ width: '100%', height: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Image src={logo} width='190px' top='100px' />

            <form autoComplete="off" onSubmit={onSubmit} style={{
                maxWidth: '100%',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                border: '1px solid #EBEBEB',
                padding: '30px',
                borderRadius: '12px',
                marginTop: '50px'
            }}>
                <Box sx={{ width: '400px', marginTop: '40px' }}>
                    <label>{error?.username ? error?.username : 'Correo electrónico'}</label>
                    <Input
                        fullWidth
                        name='username'
                        value={data.username}
                        onChange={onChange}
                        error={error.username}
                    />
                </Box>
                <Box sx={{ width: '400px', marginTop: '40px' }}>
                    <label>{error?.password ? error?.password : 'Contraseña'}</label>
                    <Input
                        fullWidth
                        name='password'
                        value={data.password}
                        onChange={onChange}
                        error={error.password}
                        type={viewPassword ? "text" : "password"}
                        endAdornment={
                            <IconButton onClick={() => setViewPassword(!viewPassword)}>
                                <EyeIcon
                                    color={viewPassword ? "primary" : ""}
                                    fontSize="small"
                                    sx={{ position: 'absolute' }}
                                />
                            </IconButton>
                        }
                    />
                </Box>

                <Box sx={{ width: '100%', marginTop: '40px' }}>
                    <Button type='submit' size='medium' style={{ width: '100%' }}>
                        {isLoading ? <><CircularProgress color='inherit' size={25}/>  Iniciando</> : 'Ingresar'}
                    </Button>
                </Box>
            </form>
            {error.errorCredentials &&
                <ModalAlert 
                    title={error.errorCredentials}
                    severity='error'
                    color='error'
                    labelButtonOk='Ok'
                    onSuccess={onCloseModal}
                />
            }
        </Box>
    )
}

export default AuthPage