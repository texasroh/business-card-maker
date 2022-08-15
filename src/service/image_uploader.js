class ImageUploader {
    async upload(file) {
        const url = "https://api.cloudinary.com/v1_1/dvwft02io/image/upload";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fb6veduf");

        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });
        return await res.json();
    }
}

export default ImageUploader;
