
import type { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-pretty text-base">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted ">
          <img
            alt={product.title}
            src={product.thumbnail}
            className="h-58 ml-10"
          />
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold">${product.price}</span>
          <Link to={`/products/${product.id}`} className="text-sm">
            <Button size="sm" className="hover:cursor-pointer">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
