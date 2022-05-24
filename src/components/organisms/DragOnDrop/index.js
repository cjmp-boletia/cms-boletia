import React, { useCallback, useEffect } from 'react';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import { useDropzone } from 'react-dropzone';
import { LinearProgress } from '@mui/material';
import useFile from '../../../hooks/useFile';
import { AddPhotoIcon, Toast, TrashIcon } from '@boletia/react-ui';
import useExtractImageId from '../../../hooks/useExtractImageId';

function DragOnDrop({
    imageEdit,
    accept,
    dragLabel,
    dropLabel,
    buttonLabel,
    name,
    data,
    setData
}) {
    const error = '';
    const fileName = '';
    const setError = '';
    const { imgUrl, awaitToImage, successUploadImage, erroToUploadImage, setImgUrl, getModelFromFile } = useFile(name, data, setData);
    const { removeImage } = useExtractImageId(name, data, setData, setImgUrl);

    const onDrop = useCallback((acceptedFiles) => {
        getModelFromFile(acceptedFiles[0])
        //eslint-disable-next-line
    }, []);

    const onDropRejected = useCallback((acceptedFiles) => {
        setError(acceptedFiles[0].errors[0].message);
        //eslint-disable-next-line
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop,
        onDropRejected,
        multiple: false,
    });

    useEffect(() => {
        if(!isDragActive) return;
        removeImage(name === 'image' ? data.image : name === 'image2' ? data.image2 : name === 'image3' ? data.image3 : null)
        //eslint-disable-next-line
    }, [isDragActive]);

    const getLabel = () => {
        let label = dragLabel;
        if (isDragActive) {
            label = dropLabel;
        } else if (error) {
            label = error;
        } else if (fileName) {
            label = fileName;
        } else if (awaitToImage) {
            label = 'Subiendo imagen al bucket en AWS S3'
        } else if (erroToUploadImage) {
            label = erroToUploadImage
        }

        return (
            <Typography
                variant="label3"
                component="div"
                sx={{
                    color: (theme) =>
                        error ? theme.palette.error.main : theme.palette.grey[600],
                    fontWeight: 400,
                    width: '100%',
                    height: '16px',
                    margin: '0',
                    position: 'absolute',
                    transition: '0.5s',
                    textAlign: 'center',
                    top: isDragActive ? '50px' : '24px',
                }}
            >
                {awaitToImage ?
                    <Box sx={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {label}
                        <LinearProgress />
                    </Box>
                    :
                    label
                }

            </Typography>
        );
    };

    const ButtonBefore = () => (
        <Box
            sx={{
                'width': '60%',
                'display': 'flex',
                'marginTop': '10%',
                'position': 'absolute',
                'left': '80px'
            }}
        >
            <Box
                {...getRootProps({
                    onClick: () => removeImage(name === 'image' ? data.image : name === 'image2' ? data.image2 : name === 'image3' ? data.image3 : null)
                })}
                component="div"
                sx={{
                    'width': '40px',
                    'height': '40px',
                    'borderRadius': '100%',
                    'backgroundColor': '#FFF',
                    'display': 'flex',
                    'justifyContent': 'center',
                    'alignItems': 'center',
                    'margin': 'auto',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
            >
                <AddPhotoIcon sx={{ fontSize: '16px' }} />
            </Box>
            <Box
                sx={{
                    'width': '40px',
                    'height': '40px',
                    'borderRadius': '100%',
                    'backgroundColor': '#FFF',
                    'display': 'flex',
                    'justifyContent': 'center',
                    'alignItems': 'center',
                    'margin': 'auto',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                onClick={() => removeImage(name === 'image' ? data.image : name === 'image2' ? data.image2 : name === 'image3' ? data.image3 : null)}

            >
                <TrashIcon sx={{ fontSize: '16px' }} />
            </Box>
        </Box>
    )
    
    return (
        <>
            {!imageEdit &&
                <Box
                    {...getRootProps({
                        onClick: () => removeImage(name === 'image' ? data.image : name === 'image2' ? data.image2 : name === 'image3' ? data.image3 : null)
                    })}
                    component="div"
                    sx={{
                        'transition': '0.5s',
                        'position': 'relative',
                        'boxSizing': 'border-box',
                        'width': '100%',
                        'height': '135px',
                        'border': isDragActive ? '2px dashed #276EF1' : '2px dashed #F5F5F4',
                        'background': isDragActive ? '#edf3fd' : '#ebebeb',
                        'borderRadius': '10px',
                        'overflow': 'hidden',
                        '&::before': {
                            transition: '0.5s',
                            content: `"${!awaitToImage ? buttonLabel : 'Subiendo...'}"`,
                            fontFamily: 'ProximaNova, sans-serif',
                            fontSize: '14px',
                            color: '#282A2E',
                            backgroundColor: '#5678EF',
                            display: 'flex',
                            transform: isDragActive ? 'scale(0)' : 'scale(1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '124px',
                            margin: 'auto',
                            height: '36px',
                            position: 'absolute',
                            bottom: '36px',
                            left: '0',
                            right: '0',
                            borderRadius: '100px',
                            background: '#E0E0E0',
                        },
                    }}
                >
                    {imgUrl ? (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                component="img"
                                src={imgUrl}
                                sx={{
                                    height: '100%',
                                }}
                            />
                        </Box>
                    )
                        : null
                    }

                    <input {...getInputProps({
                        onClick: () => removeImage(name === 'image' ? data.image : name === 'image2' ? data.image2 : name === 'image3' ? data.image3 : null)
                    })} />
                    {getLabel()}
                </Box>
            }
            {imageEdit ?
                <Box
                    component="div"
                    sx={{
                        'transition': '0.5s',
                        'position': 'relative',
                        'boxSizing': 'border-box',
                        'width': '100%',
                        'height': '135px',
                        'border': isDragActive ? '2px dashed #276EF1' : '2px dashed #F5F5F4',
                        'background': isDragActive ? '#edf3fd' : '#ebebeb',
                        'borderRadius': '10px',
                        'overflow': 'hidden'
                    }}
                >

                    {ButtonBefore()}
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={imageEdit}
                            sx={{
                                height: '100%',
                            }}
                        />
                        <input {...getInputProps({
                            onClick: () => removeImage(name === 'image' ? data.image : name === 'image2' ? data.image2 : name === 'image3' ? data.image3 : null)
                        })} />
                    </Box>
                </Box>
                : null}
            {successUploadImage && <Toast>{successUploadImage}</Toast>}
        </>
    );
}

export default DragOnDrop;
