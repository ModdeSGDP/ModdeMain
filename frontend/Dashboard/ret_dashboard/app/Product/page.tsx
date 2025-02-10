"Use clinet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ProductCard } from "../components/Productcard";
import { Plus } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import Link from "next/link";

export default function Products() {
    return (

        <div className="pt-0 pl-64">

            <div className="pt-0 pl-64">
                <div className="flex justify-end">
                    <Link href="/AddProducts">
                        <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 flex items-center space-x-2">
                            <Plus className="h-5 w-5" />
                            <span>Add Products</span>
                        </Button>
                    </Link>
                </div>
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
                                remainingCount={1269} id={""} />
                        </div>

                        <div>
                            <ProductCard
                                image="/images/Productcard.svg"
                                title="Hooded Long Sleeve - New York"
                                category="Women"
                                price="LKR 4850"
                                description="Lorem ipsum is placeholder text commonly used in the graphic."
                                salesCount={1269}
                                remainingCount={1269} id={""} />
                        </div>
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} id={""} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} id={""} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} id={""} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} id={""} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} id={""} />
                        <ProductCard
                            image="/images/Productcard.svg"
                            title="Hooded Long Sleeve - New York"
                            category="Women"
                            price="LKR 4850"
                            description="Lorem ipsum is placeholder text commonly used in the graphic."
                            salesCount={1269}
                            remainingCount={1269} id={""} />
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