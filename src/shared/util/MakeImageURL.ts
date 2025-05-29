const uploadToCloudinary = async (file: File) => {
  const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
  );

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return data.secure_url;
};

export default uploadToCloudinary;
