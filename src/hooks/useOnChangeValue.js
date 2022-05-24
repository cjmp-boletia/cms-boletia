import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dataEvent } from '../mocks/event.mocks'
import { useAddEventMutation, useUpdateEventMutation } from '../store/api/event.api';

const useOnChangeValue = (idbanner) => {
    const [data, setData] = useState(dataEvent);
    const [showSuccess, setShowSuccess] = useState(false);
    const [addEvent] = useAddEventMutation();
    const [updateEvent] = useUpdateEventMutation();
    const [error, setError] = useState({
        name: null,
        date: null,
        venue: null,
        link: null,
        image: null,
        image2: null,
        image3: null
    });
    const [disableInputs, setDisableInputs] = useState(false);
    const navigate = useNavigate();

    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const onSuccess = () => {
        setShowSuccess(false)
        navigate('/banners')
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (data.name === '') {
            setError({
                ...error,
                name: 'Debe agregar el nombre del evento'
            })
        } else if (data.date === '') {
            setError({
                ...error,
                date: 'Debe agregar la fecha del evento, Del 20 de mayo al 22 de mayo del 2022'
            })
        } else if (data.venue === '') {
            setError({
                ...error,
                venue: 'Debe agregar el venue del evento'
            })
        } else if (data.link === '') {
            setError({
                ...error,
                link: 'Debe agregar el link del evento'
            })
        } else if (data.image === '') {
            setError({
                ...error,
                image: 'Debe agregar el primer banner del evento con las especificaciones detalladas'
            })
        } else if (data.image2 === '') {
            setError({
                ...error,
                image2: 'Debe agregar el segundo banner del evento con las especificaciones detalladas'
            })
        } else if (data.image3 === '') {
            setError({
                ...error,
                image3: 'Debe agregar el tercer banner del evento con las especificaciones detalladas'
            })
        } else {
            setError({
                name: null,
                date: null,
                venue: null,
                link: null,
                image: null,
                image2: null,
                image3: null
            })
            setDisableInputs(true)
            setData(dataEvent)
            try {
                await idbanner ? updateEvent(data).unwrap() : addEvent(data).unwrap();
                setDisableInputs(false)
                setShowSuccess(true);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return {
        data,
        error,
        disableInputs,
        showSuccess,
        setData,
        onChange,
        onSubmit,
        onSuccess
    }
}

export default useOnChangeValue