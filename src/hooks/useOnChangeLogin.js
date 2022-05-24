import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataLogin } from '../mocks/login.mocks';
import { useLoginMutation } from '../store/api/auth.api';
import { setCredentials } from '../store/slices/auth.slice';

const useOnChangeLogin = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(dataLogin);
    const [error, setError] = useState({
        username: null,
        password: null,
        errorCredentials: null
    });
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const onCloseModal = () => {
        setError({
            username: null,
            password: null,
            errorCredentials: null
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (data.username === '') {
            setError({
                ...error,
                username: 'Debe ingresar un correo electrónico'
            })
        } else if (data.password === '') {
            setError({
                ...error,
                password: 'Debe ingresar una contraseña'
            })
        } else {
            setError({
                username: null,
                password: null
            })
            try {
                const auth = await login(data).unwrap();
                dispatch(setCredentials(auth));
                localStorage.setItem('blt-auth', JSON.stringify(auth));
                navigate('/banners');
            } catch (error) {
                console.log(error);
                setError({
                    errorCredentials: 'Por favor ingrese un correo y contraseña válidos!'
                })
            }
        }
    }

    return {
        data,
        error,
        isLoading,
        onChange,
        onSubmit,
        onCloseModal
    }
}

export default useOnChangeLogin