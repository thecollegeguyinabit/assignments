import type { ProductsResponse, Product, AuthUser } from "@/types";

const BASE_URL = "https://dummyjson.com"

function withParams(url: string, params?: Record<string, string | number | undefined>) {
  const u = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") u.searchParams.set(key, String(value))
    });
  }
  return u.toString();
}

export async function loginApi(username: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function meApi(accessToken?: string): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
}

export async function fetchProducts(options: {
  q?: string
  limit?: number
  skip?: number
  sortBy?: string
  order?: "asc" | "desc"
  category?: string
}): Promise<ProductsResponse> {
  const { q, limit = 12, skip = 0, sortBy, order, category } = options;
  
  if (category && category !== "all") {
    const url = withParams(`${BASE_URL}/products/category/${encodeURIComponent(category)}`, {
      limit,
      skip,
      sortBy,
      order,
    });
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  if (q) {
    const url = withParams(`${BASE_URL}/products/search`, { q, limit, skip, sortBy, order })
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to search products");
    return res.json();
  }

  const url = withParams(`${BASE_URL}/products`, { limit, skip, sortBy, order })
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data: Array<{ slug?: string; name?: string } | string> = await res.json();
  return data.map((c: any) => (typeof c === "string" ? c : c?.slug || c?.name)).filter(Boolean);
}
