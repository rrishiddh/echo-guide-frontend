import { apiService } from "./api.service";
import { UploadResponse } from "../types";

class UploadService {
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiService.post<UploadResponse>(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data!;
  }

  async uploadImages(files: File[]): Promise<UploadResponse[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await apiService.post<UploadResponse[]>(
      "/upload/images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data!;
  }

  async uploadToCloudinary(file: File): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        reject(new Error("Cloudinary configuration missing"));
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "echo-guide");

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            filename: data.original_filename,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async uploadMultipleToCloudinary(files: File[]): Promise<UploadResponse[]> {
    const uploadPromises = files.map((file) =>
      this.uploadToCloudinary(file)
    );
    return Promise.all(uploadPromises);
  }

  async deleteFromCloudinary(publicId: string): Promise<void> {
    await apiService.delete("/upload/delete", {
      data: { publicId },
    });
  }
}

export const uploadService = new UploadService();
export default uploadService;