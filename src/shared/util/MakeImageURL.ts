const uploadToCloudinary = async (file: File) => {
  const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`;
  const formData = new FormData();
  formData.append("file", file); // 파일 데이터
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
  ); // 업로드 프리셋

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log(data.secure_url);
  return data.secure_url; // Cloudinary에서 반환된 이미지 URL
};

export default uploadToCloudinary;
