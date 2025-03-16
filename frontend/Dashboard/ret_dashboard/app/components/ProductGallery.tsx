import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle } from "lucide-react";

interface ImageData {
  file: File;
  url: string;
  progress: number;
  status: "Uploading" | "Completed";
}

export default function ProductGallery({ images, setImages }: { images: string[], setImages: Dispatch<SetStateAction<string[]>> }) {
  const [imagesInternal, setImagesInternal] = useState<ImageData[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        progress: 0, // Start at 0
        status: "Uploading" as const,
      }));

      setImages([...images, ...newImages.map(i => i.url)]);
      setImagesInternal([...imagesInternal, ...newImages]);

      // Simulate upload progress
      newImages.forEach((image) => {
        const interval = setInterval(() => {
          setImagesInternal((prevImages) => {
            return prevImages.map((img) => {
              if (img.url === image.url) {
                const newProgress = Math.min(img.progress + 20, 100);
                return {
                  ...img,
                  progress: newProgress,
                  status: newProgress === 100 ? "Completed" : "Uploading",
                };
              }
              return img;
            });
          });

          if (image.progress >= 100) clearInterval(interval);
        }, 500);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const toRemoveImageURL = imagesInternal[index].url;
    setImages((prevImages) => prevImages.filter(i => i != toRemoveImageURL));
    setImagesInternal((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Product Gallery</h2>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer relative">
        <Upload className="w-10 h-10 mb-2 text-gray-400" />
        <p className="text-sm">Drop your image here, or browse</p>
        <p className="text-xs text-gray-400">Jpeg, png are allowed</p>
        <input
          type="file"
          accept="image/jpeg, image/png"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageUpload}
        />
      </div>

      {/* Image Preview List */}
      <div className="mt-4 space-y-3">
        {imagesInternal.map((image, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg shadow">
            <Image src={image.url}
              alt="Product thumbnail"
              width={48}
              height={48}
              className="w-12 h-12 rounded-md object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700">{image.file.name}</p>
              <Progress value={image.progress} className="h-1 w-full bg-gray-200 mt-1" />
              <p className="text-xs text-gray-500">{image.status}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => handleRemoveImage(index)}>
              <X className="w-5 h-5" />
            </Button>
            {image.status === "Completed" && <CheckCircle className="text-green-500 w-5 h-5 ml-2" />}
          </div>
        ))}
      </div>
    </Card>
  );
}
