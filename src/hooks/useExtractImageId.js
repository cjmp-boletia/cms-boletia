import useFile from "./useFile";

const useExtractImageId = (name, data, setData, setImgUrl) => {
    const { deleteImageFromS3Bucket } = useFile();

    const removeImage = (image) => {
        if (!image) return;
        setImgUrl && setImgUrl(null)
        const parseImage = image?.slice(55, 100);
        const extractExtension = parseImage.slice(37, 41);
        const extractIdImage = parseImage.slice(0, 36);
        deleteImageFromS3Bucket(extractIdImage, extractExtension);

        if (name === 'image') {
            setData({
                ...data,
                image: null
            });
        } else if (name === 'image2') {
            setData({
                ...data,
                image2: null
            });
        } if (name === 'image3') {
            setData({
                ...data,
                image3: null
            });
        }
    }

    return {
        removeImage
    }
}

export default useExtractImageId;