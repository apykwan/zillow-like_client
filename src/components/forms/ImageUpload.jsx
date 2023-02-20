import toast from 'react-hot-toast';
import axios from 'axios';
import Resizer from "react-image-file-resizer";
import { Avatar } from 'antd';

export default function ImageUpload({ ad, setAd }) {
    async function handleUpload(e) {
        try {
            let files = e.target.files;
            files = [...files];
            if(files?.length) {
                 setAd({ ...ad, uploading: true });

                 files.map(file => {
                    new Promise(() => {
                        Resizer.imageFileResizer(
                            file,
                            1080,
                            720,
                            "JPEG",
                            100,
                            0,
                            async (uri) => {
                                try {
                                    const { data } = await axios.post("/upload-image", {
                                        image: uri
                                    });

                                    setAd(prev => ({
                                        ...prev,
                                        photos: [data, ...prev.photos],
                                        uploading: false
                                    }));
                                    toast.success("Upload successful.");
                                } catch (err) {
                                    console.log(err);
                                    setAd({ ...ad, uploading: false });
                                    toast.error("Upload failed.");
                                }
                            },
                            "base64"
                        );
                    });
                 });
            }

        } catch (err) {
            console.log(err);
            setAd({ ...ad, uploading: false });
        }
    }

    function handleDelete(file) {
        return async function(e) {
            const answer = window.confirm("Delete Image");
            if(!answer) return;
            setAd({ ...ad, uploading: true });
            try {
                const { Bucket, Key } = file;
                const { data } = await axios.post('/remove-image', { Bucket, Key });
                if(data?.ok) {
                    setAd(prev => ({
                        ...ad, 
                        photos: prev.photos.filter(p => p.Key !== Key)
                    }));
                    toast.success("Image is removed!");
                }
            } catch (err) {
                console.log(err);
                setAd({ ...ad, uploading: false });
                toast.error("Removal failed.");
            }
        }
    }
    return (
        <div className="form-control mb-3">
            <label className="btn btn-secondary">
                {ad.uploading ? "Processing..." : "Upload photos"}
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleUpload} 
                    hidden 
                />
            </label>
            {ad.photos?.map((file) => (
                <Avatar
                    key={file?.Key} 
                    src={file?.Location} 
                    shape="square" 
                    size="large" 
                    className="ml-3 mb-4 pointer" 
                    onClick={handleDelete(file)}
                />
            ))}
        </div>
    );
}