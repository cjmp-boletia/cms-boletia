import React, { useState } from 'react';
import { DataGrid, DeleteIcon, EditIcon, Pagination } from '@boletia/react-ui';
import { Link } from 'react-router-dom'
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    gridPaginationRowRangeSelector,
} from '@mui/x-data-grid';
import { Image } from '../../components/atoms/Image';
import { useDeleteEventMutation, useGetEventsQuery } from '../../store/api/event.api';
import { ModalAlert } from '../../components/atoms/Modal';
import useExtractImageId from '../../hooks/useExtractImageId';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const { firstRowIndex, lastRowIndex } = useGridSelector(
        apiRef,
        gridPaginationRowRangeSelector,
    ) || { firstRowIndex: 0, lastRowIndex: 0 };
    const rowCount = useGridSelector(
        apiRef,
        (state) => state.pagination.rowCount,
    );

    return (
        <Pagination
            firstRowIndex={firstRowIndex + 1}
            lastRowIndex={lastRowIndex + 1}
            count={pageCount}
            rowCount={rowCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

const Banners = () => {
    const [event, setEvent] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    const { data: events } = useGetEventsQuery();
    const [deleteEvent] = useDeleteEventMutation();
    const { removeImage } = useExtractImageId(null, () => {}, () => {});

    const onClose = () => {
        setShowQuestion(false)
        setEvent(null)
    }
    const onShowModal = (idBanner) => {
        const event = events.filter(event => event.id === idBanner)[0];
        setEvent(event);
        setShowQuestion(true)
    }

    const removeBanner = async () => {
        try {
            //delete images from S3
            removeImage(event.image);
            removeImage(event.image2);
            removeImage(event.image3);
            //delete object from dynamoDB
            await deleteEvent(event.id).unwrap();
            onClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ height: 500, width: '95%', margin: 'auto' }}>
            <h1>Banners</h1>

            <DataGrid
                columns={[
                    { field: 'id', headerName: 'Arreglo', width: 150 },
                    { field: 'image', headerName: 'Imagen', width: 150, renderCell: (params) => <Image width='72px' height='48px' borderRadius='6px' src={params.value} /> },
                    { field: 'name', headerName: 'Nombre', width: 200 },
                    { field: 'date', headerName: 'Fecha', width: 280 },
                    { field: 'venue', headerName: 'Venue', width: 120 },
                    { field: 'link', headerName: 'Link', width: 250, renderCell: (params) => <a href={params.value} target="_blank" rel="noreferrer">{params.value}</a> },
                    {
                        field: 'key',
                        headerName: 'Moverse',
                        width: 180,
                        renderCell:
                            (params) =>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link to={`/edit-banner/${params.value}`} style={{ textDecoration: 'none', color: '#000' }}><EditIcon style={{ width: '16px', cursor: 'pointer' }} /></Link>
                                    <DeleteIcon onClick={() => onShowModal(params.value)} style={{ width: '16px', cursor: 'pointer' }} />
                                </div>
                    }
                ]}
                rows={events ? events : []}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{
                    Pagination: CustomPagination,
                }}
            />

            {showQuestion &&
                <ModalAlert
                    id={1}
                    title='Está segur@ de eliminar este banner?'
                    severity='warning'
                    color='warning'
                    labelButtonOk='Eliminar'
                    showButtonCancel
                    onClose={onClose}
                    onSuccess={removeBanner}
                />
            }
        </div>
    );
}

export default Banners;