import { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

export default function ImageGallery({ photos = [] }) {
    const [current, setCurrent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    const openLightbox = useCallback(function(event, { photo, index}) {
        setCurrent(index);
        setIsOpen(true);
    }, []);

    function closeLightbox () {
        setCurrent(0);
        setIsOpen(false);
    }

    return (
        <>
            <Gallery photos={photos} onClick={openLightbox} />;
            <ModalGateway>
                {isOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel 
                            currentIndex={current} 
                            views={photos.map(function(x) {
                                return ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title,
                                });
                            })} 
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
}