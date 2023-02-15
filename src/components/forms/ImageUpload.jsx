import toast from 'react-hot-toast';
import axios from 'axios';
import Resizer from "react-image-file-resizer";

export default function ImageUpload({ ad, setAd }) {
    async function handleUpload (e) {
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
                            72,
                            "JPEG",
                            100,
                            0,
                            async (uri) => {
                                try {
                                    console.log("upload uri", uri);
                                    const { data } = await axios.post("/upload-image", {
                                        image: uri
                                    });
                                    setAd(prev => ({
                                        ...prev,
                                        photos: [data, ...prev.photos],
                                        uploading: false
                                    }))
                                } catch (err) {
                                    console.log(err);
                                    setAd({ ...ad, uploading: false });
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

    async function handleDelete (e) {
        try {
            setAd({ ...ad, uploading: true });
        } catch (err) {
            console.log(err);
            setAd({ ...ad, uploading: false });
        }
    }
    return (
        <div className="form-control mb-3">
            <label className="btn btn-secondary">
                Upload photos
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleUpload} 
                    hidden 
                />
            </label>
        </div>
    );
}