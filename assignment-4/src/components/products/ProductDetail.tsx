
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
  const [thumbnailImage, setThumbnailImage] = useState<string>("");
  useEffect(() =>{
    
    if(data?.images){
      setThumbnailImage(data.images[0]);
    }
  }, [data?.images]);

  if (isLoading) return <main className="p-6">Loading...</main>
  if (error || !data) return <main className="p-6">Failed to load product.</main>

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
          {thumbnailImage && <img
            alt={data.title}
            src={thumbnailImage}
            className="object-cover"
          />}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="mt-2 text-muted-foreground">{data.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-xl font-semibold">${data.price}</span>
            {data.rating ? <span className="text-sm">Rating: {data.rating}</span> : null}
            {data.stock ? <span className="text-sm">Stock: {data.stock}</span> : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-5">
            {(data.images || []).slice(0, 4).map((src: string, i: number) => {
              const isSelected = src === thumbnailImage;
              return (
                  <div key={i} 
                      className={`relative h-20 w-20 overflow-hidden rounded bg-muted cursor-pointer transition-colors ${isSelected ? "ring-2 ring-offset-2 ring-primary" : "hover:ring-2 hover:ring-offset-2 hover:ring-primary/50"}`} 
                      onClick={() => setThumbnailImage(src)}>
                    <img alt={`${data.title} ${i + 1}`} src={src } className="object-cover" />
                  </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
