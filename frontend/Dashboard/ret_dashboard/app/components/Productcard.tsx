// ProductCard.tsx
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  description: string;
  salesCount: number;
  remainingCount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  description,
  salesCount,
  remainingCount,
}) => {
  const totalStock = salesCount + remainingCount;
  const stockPercentage = (remainingCount / totalStock) * 100;

  return (
    <Card className="w-full md:w-[300px] rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-4">
      {/* Image and Menu */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
        <button className="absolute top-2 right-2">
          <MoreVertical className="text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <CardContent className="mt-2">
        {/* Title, Category, and Price */}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-md font-bold text-gray-800 mt-1">{price}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardContent>

      {/* Sales and Stock Info */}
      <CardFooter className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-gray-700">
            Sales <span className="text-gray-900 font-medium">↑ {salesCount}</span>
          </span>
          <span className="flex items-center gap-1 text-gray-700">
            Remaining <span className="text-gray-900 font-medium">{remainingCount}</span>
          </span>
        </div>

        {/* Stock Progress Bar */}
        <Progress value={stockPercentage} className="h-2 rounded-md bg-gray-200" />

        {/* View Details Button */}
        <Button className="mt-2 w-full" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

// Usage Example
/*
<ProductCard
  image="/images/product1.jpg"
  title="Hooded Long Sleeve - New York"
  category="Women"
  price="LKR 4850"
  description="Lorem ipsum is placeholder text commonly used in the graphic."
  salesCount={1269}
  remainingCount={1269}
/>
*/






