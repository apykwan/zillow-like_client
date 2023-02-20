import toast from 'react-hot-toast';
import axios from 'axios';
import Resizer from "react-image-file-resizer";
import { Avatar } from 'antd';

export default function ProfileUpload({ 
    setPhoto, 
    photo, 
    setUploading, 
    uploading 
}) {
    async function handleUpload(e) {
        e.preventDefault();
        try {
            const file = e.target.files[0];

            if(file) {
                setUploading(true);

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

                                console.log(data);

                                setPhoto(data);
                                setUploading(false);
                                toast.success("Upload successful.");
                            } catch (err) {
                                console.log(err);
                                setUploading(false);
                                toast.error("Upload failed.");
                            }
                        },
                        "base64"
                    );
                });
            }
        } catch (err) {
            console.log(err);
            setUploading(false);
        }
    }

    async function handleDelete() {
        const answer = window.confirm("Delete Image");
        if(!answer) return;
        
        setUploading(true);

        try {
            const { data } = await axios.post('/remove-image', photo);
            if(data?.ok) {
                setPhoto(null);
                setUploading(false);
                toast.success("Image is removed!");
            }
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast.error("Removal failed.");
        }
    }
    return (
        <div className="form-control mb-3">
            <label className="btn btn-secondary">
                {uploading ? "Processing..." : "Upload photos"}
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleUpload} 
                    hidden 
                />
            </label>
            {photo?.Location && <Avatar
                src={photo?.Location} 
                shape="square" 
                size="large" 
                className="ml-3 mt-2 pointer" 
                onClick={handleDelete}
            />}
        </div>
    );
}