import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ProductCard } from "../components/Productcard";
import { Plus } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import Link from "next/link";

export default function Products() {
    return (

        <div className="pt-0 pl-64">

            <div className="space-y-4 flex justify-end">
                <Button className="mt-2 w-50% ml-auto bg-black text-white hover:bg-gray-800" variant="outline">
                    <Link href="/AddProducts"><Plus className="mr-2 h-5 w-5" /> {/* Icon before text */}
                    Add Products</Link>
                </Button>
            </div>

            <h1 className="text-xl font-bold mb-0">Products</h1>
            <div className="flex">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/Dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                         {/* Horizontal Line */}
        <hr className="my-4 border-gray-300" />

                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <ProductCard
                                image="/images/Productcard.svg"
                                title="Hooded Long Sleeve - New York"
                                category="Women"
                                price="LKR 4850"
                                description="Lorem ipsum is placeholder text commonly used in the graphic."
                                salesCount={1269}
                                remainingCount={1269} />
                        </div>

                        <div>
                            <ProductCard
                                image="/images/Productcard.svg"
                                title="Hooded Long Sleeve - New York"
                                category="Women"
                                price="LKR 4850"
                                description="Lorem ipsum is placeholder text commonly used in the graphic."
                                salesCount={1269}
                                remainingCount={1269} />
                        </div>
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269}
                        />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} />
                    </div>

                </div>
              

            </div>
            
            <div className="mt-6 w-full flex">
                      <div className="w-fit">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </div>

        </div>
        
    );
}