'use client'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from "next/navigation";

const Product = () => {
    const params = useSearchParams();
    const id = params.get("id");
    // Mutations
    const mutation: any = useMutation({
        mutationFn: (newProduct) => {
            return axios.put(`https://dummyjson.com/products/${id}`, newProduct);
        },
    });

    const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        return data;
    };

    const {
        isLoading,
        error,
        data: product,
    } = useQuery({
        queryKey: ['product', id],
        queryFn: fetchProduct,
        // staleTime: 10000,
    });

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }

    if (mutation.isLoading) {
        return <h3>Updating...</h3>;
    }

    if (mutation.isError) {
        return <h3>Error while updating. {mutation.error.message}</h3>;
    }

    return (
        <>
            <div>Product: {product.title}</div>
            <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <button
                                        onClick={() => {
                                            mutation.mutate({ title: 'Updated product' });
                                        }}>
                                        Create product
                                    </button>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>

            <button
                onClick={() => {
                    mutation.mutate({ title: 'Updated product' });
                }}>
                Create product
            </button>
        </>
    );
};

export default Product;
