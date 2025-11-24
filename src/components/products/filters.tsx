
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  setCategory,
  setLimit,
  setQuery,
  setSort,
} from "@/store/slices/product-slice";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";

export function ProductFilters() {
  const dispatch = useDispatch<AppDispatch>();
  const { q, sortBy, order, category, limit, total } = useSelector((s: RootState) => s.products );
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      <Input
        placeholder="Search"
        value={q}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        className="md:col-span-2"
      />
      <div className="flex gap-2 md:col-span-2">
        <Select
          value={sortBy ? `${sortBy}:${order}` : "none"}
          onValueChange={(v) => {
            if (!v) return dispatch(setSort({ sortBy: "", order: "asc" }));
            const [s, o] = v.split(":") as [any, any];
            dispatch(setSort({ sortBy: s, order: o }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="price:asc">Price: Low to High</SelectItem>
            <SelectItem value="price:desc">Price: High to Low</SelectItem>
            <SelectItem value="title:asc">Title: A-Z</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={category}
          onValueChange={(v) => dispatch(setCategory(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {(categories || []).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={String(limit)}
          onValueChange={(v) => dispatch(setLimit(Number(v)))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p>showing {total} of 194 {total > 1 ? "totals" : "total"}</p>
    </div>
  );
}
