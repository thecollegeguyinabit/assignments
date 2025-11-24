
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { setPage, syncFromQuery } from "@/store/slices/product-slice";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/filters";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import type { Product } from "@/types";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { q, sortBy, order, category, page, limit, total } = useSelector((s: RootState) => s.products);
  
  const skip = (page - 1) * limit;
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products", { q, sortBy, order, category, page, limit }],
    queryFn: () => fetchProducts({ q, sortBy: sortBy || undefined, order, category, limit, skip }),
  });

  useEffect(() => {
    if (data) {
      dispatch(syncFromQuery({ total: data.total, items: data.products }))
    }
  }, [dispatch, data]);

  const totalPages = Math.max(1, Math.ceil((data?.total ?? total) / limit));

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-semibold text-balance">Products</h1>
      {/* filtering components */}
      <ProductFilters />
      {/* product components */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Spinner className="h-4 w-4" />
            <span>Loading products...</span>
          </div>
        ) : error ? (
          <p className="text-destructive">Failed to load products</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(data?.products || []).map((p: Product) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
              {/*pagination ui*/}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages} {isFetching ? "(updating...)" : ""}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled={page <= 1} onClick={() => dispatch(setPage(page - 1))} className="hover:cursor-pointer">
                  Previous
                </Button>
                <Button disabled={page >= totalPages} onClick={() => dispatch(setPage(page + 1))} className="hover:cursor-pointer">
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
