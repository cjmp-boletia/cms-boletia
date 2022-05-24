import { useEffect, useState } from "react";
import { useDeleteImageMutation, useUploadImageBase64Mutation } from "../store/api/upload-file-base64.api";
import reactImageSize from 'react-image-size';

const useFile = (name, data, setData) => {
    const [imgBase64, setImgBase64] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [awaitToImage, setAwaitToImage] = useState(false);
    const [successUploadImage, setSuccessUploadImage] = useState(null);
    const [erroToUploadImage, setErroToUploadImage] = useState(null);
    const [uploadImageBase64] = useUploadImageBase64Mutation();
    const [deleteImage] = useDeleteImageMutation();

    function getModelFromFile(currentFile) {
        if (currentFile.size < 800000) {
            return new Promise(() => {
                if (currentFile) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImgBase64(reader.result);
                        return
                    };
                    reader.readAsDataURL(currentFile);
                }
            });
        } else {
            setErroToUploadImage('La imagen debe tener un peso máximo de 800 KB');
        }
    };

    const onChangeImages = (image) => {
        setData({
            ...data,
            [name]: image
        })
    }


    const handleUploadImageToS3 = async (dataImg) => {
        setImgUrl(null)
        try {
            const res = await uploadImageBase64({ file: dataImg }).unwrap();
            setSuccessUploadImage('La imagen se cargó correctamente!')
            setAwaitToImage(false)
            setImgBase64(null)
            setImgUrl(res.uploadResult.Location)
            res.uploadResult.Location && onChangeImages(res.uploadResult.Location)
        } catch (error) {
            console.log(error);
            setSuccessUploadImage(null)
        }
    };

    const deleteImageFromS3Bucket = async (imageId, extension) => {
        setImgUrl(null)
        try {
            await deleteImage({ id: imageId, extension }).unwrap();
            setSuccessUploadImage('La imagen se eliminó correctamente!')
        } catch (error) {
            console.log(error);
            setSuccessUploadImage(null)
        }
    };

    const validateResolution = async () => {
        setErroToUploadImage(null)
        try {
            const { width, height } = await reactImageSize(imgBase64, 5000);

            if (name === 'image') {
                if (width === 2340 && height === 700) {
                    setAwaitToImage(true)
                    handleUploadImageToS3(imgBase64)
                } else {
                    setErroToUploadImage('La imagen debe tener una resolución de 2340px x 700px');
                }
            } else if (name === 'image2') {
                if (width === 1440 && height === 1080) {
                    setAwaitToImage(true)
                    handleUploadImageToS3(imgBase64)
                } else {
                    setErroToUploadImage('La imagen debe tener una resolución de 1440px x 1080px');
                }
            } else if (name === 'image3') {
                if (width === 1920 && height === 1080) {
                    setAwaitToImage(true)
                    handleUploadImageToS3(imgBase64)
                } else {
                    setErroToUploadImage('La imagen debe tener una resolución de 1920px x 1080px');
                }
            }
        } catch (errorMessage) {
            console.log(errorMessage);
            // if request takes longer than 5 seconds an timeout exception will be thrown
        }
    }

    useEffect(() => {
        if (!imgBase64) return;
        validateResolution()
        //eslint-disable-next-line
    }, [imgBase64]);

    return {
        imgUrl,
        awaitToImage,
        erroToUploadImage,
        successUploadImage,
        setImgUrl,
        getModelFromFile,
        deleteImageFromS3Bucket
    }
}

export default useFile