import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect, memo } from "react";
import * as Constants from '@/Constants';

const DragInput = memo(({ productImages, updateFiles }) => {
    const currentImages = productImages ? JSON.parse(productImages) : null;
    const [images, setImages] = useState(currentImages || []);
    const [uploads, setUploads] = useState([]);
    const [dragging, setDragging] = useState(false);
    const dropzoneRef = useRef(null);
    useEffect(() => {
        if (uploads.length > 0 && JSON.stringify(images) !== JSON.stringify(currentImages)) {
            let filtered = images.filter((image) => !image.url);
            updateFiles('images', [JSON.stringify(filtered), uploads]);
        }
        else if (uploads.length < 1) {
            updateFiles('images', images);
        }
        else {
            updateFiles('images', uploads);
        }
    }, [images, uploads])

    const selectFiles = () => {
        dropzoneRef.current.click();
    }

    const onFilesSelected = (e) => {
        const files = e.target.files;
        if (files.length == 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        display_pos: i
                    }
                ]);
                setUploads((prevFiles) => [
                    ...prevFiles,
                    files[i]
                ]);
            }
        }
    }

    const deletePreview = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setUploads((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }

    const onDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
        e.dataTransfer.dropEffect = "copy";
    }
    const onDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    }
    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ]);
                setUploads((prevFiles) => [
                    ...prevFiles,
                    files[i]
                ]);
            }
        }
    }
    return (
        <div>
            <div
                id="dragArea"
                className="flex items-center justify-center w-full"
                onDragOver={(e) => onDragOver(e)}
                onDragLeave={(e) => onDragLeave(e)}
                onDrop={(e) => onDrop(e)}
            >
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center 
                w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
                bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 
                dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 
                        0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span onClick={selectFiles} className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (Max. Size 7MB).</p>
                    </div>
                    <input id="dropzone-file" type="file" ref={dropzoneRef} className="hidden" onChange={(e) => onFilesSelected(e)} multiple />
                </label>
            </div>
            <div id="previews" className="flex">
                {images.map((image, index) => (
                    <div key={index} id="thumbnail" className="relative">
                        <XMarkIcon className="absolute top-2 right-2 hover:cursor-pointer size-7 text-red-700 dark:text-white" onClick={() => deletePreview(index)} />
                        <img className="m-2 w-24 h-24" src={image.image_path ? Constants.Storage + image.image_path : image.url} alt={image.name} />
                    </div>
                ))}
            </div>
        </div>
    )
});
export default DragInput;