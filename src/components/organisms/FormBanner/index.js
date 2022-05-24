import React, { useEffect } from 'react'
import { Button, Input } from '@boletia/react-ui'
import { Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import useOnChangeValue from '../../../hooks/useOnChangeValue'
import { useGetEventQuery } from '../../../store/api/event.api'
import { ModalAlert } from '../../atoms/Modal'
import DragOnDrop from '../DragOnDrop'

const FormBanner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const idbanner = location.pathname.split('/')[2];
    const { data: event } = useGetEventQuery(idbanner);
    const { data, error, disableInputs, showSuccess, setData, onChange, onSubmit, onSuccess } = useOnChangeValue(idbanner);

    useEffect(() => {
        if (!event) return;
        setData(event)
        //eslint-disable-next-line
    }, [event]);

    return (
        <form autoComplete="off" onSubmit={onSubmit} style={{
            maxWidth: '100%',
            height: '50vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            border: '1px solid #EBEBEB',
            padding: '30px',
            borderRadius: '12px'
        }}>
            <Box sx={{ width: '400px' }}>
                <label>{error.name ? error.name : 'Nombre'}</label>
                <Input
                    fullWidth
                    name='name'
                    value={data.name}
                    onChange={onChange}
                    disabled={disableInputs}
                    error={error.name}
                />
            </Box>
            <Box sx={{ width: '400px' }}>
                <label>{error.date ? error.date : 'Fecha'}</label>
                <Input
                    fullWidth
                    name='date'
                    value={data.date}
                    onChange={onChange}
                    disabled={disableInputs}
                    error={error.date}
                />
            </Box>
            <Box sx={{ width: '400px' }}>
                <label>{error.venue ? error.venue : 'Venue'}</label>
                <Input
                    fullWidth
                    name='venue'
                    value={data.venue}
                    onChange={onChange}
                    disabled={disableInputs}
                    error={error.venue}
                />
            </Box>
            <Box sx={{ width: '400px' }}>
                <label>{error.link ? error.link : 'Link'}</label>
                <Input
                    fullWidth
                    name='link'
                    value={data.link}
                    onChange={onChange}
                    disabled={disableInputs}
                    error={error.link}
                />
            </Box>
            <Box sx={{ width: '400px' }}>
                <label>{error.cta ? error.cta : 'Cta'}</label>
                <Input
                    fullWidth
                    name='cta'
                    value={data.cta}
                    onChange={onChange}
                    disabled={disableInputs}
                    error={error.cta}
                />
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                <Box sx={{ width: '400px' }}>
                    <label className='gray'><b className='black'>Imagen</b> (2340px x 700px)</label>
                    <DragOnDrop
                        buttonLabel='Browse files'
                        dragLabel='Drop files here to upload'
                        dropLabel='Drop files here to upload'
                        name='image'
                        data={data}
                        setData={setData}
                        imageEdit={data.image}
                    />
                </Box>
                <Box sx={{ width: '400px' }}>
                    <label className='gray'><b className='black'>Imagen</b> (1440px x 1080px)</label>
                    <DragOnDrop
                        buttonLabel='Browse files'
                        dragLabel='Drop files here to upload'
                        dropLabel='Drop files here to upload'
                        name='image2'
                        data={data}
                        setData={setData}
                        imageEdit={data.image2}
                    />
                </Box>
                <Box sx={{ width: '400px' }}>
                    <label className='gray'><b className='black'>Imagen</b> (1920px x 1080px)</label>
                    <DragOnDrop
                        buttonLabel='Browse files'
                        dragLabel='Drop files here to upload'
                        dropLabel='Drop files here to upload'
                        name='image3'
                        data={data}
                        setData={setData}
                        imageEdit={data.image3}
                    />
                </Box>
                <label className='gray'>jpeg, gif, png no mayor a 800 KB</label>
                <Box sx={{ width: '300px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='secondary'
                        size='small'
                        onClick={() => navigate('/banners')}
                    >
                        Cancelar
                    </Button>
                    <Button
                        size='small'
                        type='submit'
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
            {showSuccess &&
                <ModalAlert
                    title={`Banner ${idbanner ? 'editado' : 'creado'} con éxito!`}
                    severity='success'
                    color='success'
                    labelButtonOk='Ok'
                    onSuccess={onSuccess}
                />
            }
        </form>
    )
}

export default FormBanner