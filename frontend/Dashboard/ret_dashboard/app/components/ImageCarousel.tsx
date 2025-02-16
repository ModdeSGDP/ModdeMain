"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded-lg shadow-sm">
            {images.length > 0 ? (
                images.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt="Product Image"
                        width={300}
                        height={250}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))
            ) : (
                <p>No images uploaded</p>
            )}
        </div>
    );
};

export default ImageCarousel;
