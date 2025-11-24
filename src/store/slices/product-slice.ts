import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

type SortOrder = "asc" | "desc"
type ProductState = {
  q: string
  sortBy: "price" | "title" | ""
  order: SortOrder
  category: string
  page: number
  limit: number
  total: number
  lastPageItems: Product[]
}

const initialState: ProductState = {
  q: "",
  sortBy: "",
  order: "asc",
  category: "all",
  page: 1,
  limit: 12,
  total: 0,
  lastPageItems: [],
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.q = action.payload
      state.page = 1
    },
    setSort(state, action: PayloadAction<{ sortBy: ProductState["sortBy"]; order: SortOrder }>) {
      state.sortBy = action.payload.sortBy
      state.order = action.payload.order
      state.page = 1
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
      state.page = 1
    },
    syncFromQuery(state, action: PayloadAction<{ total: number; items: Product[] }>) {
      state.total = action.payload.total
      state.lastPageItems = action.payload.items
    },
  },
})

export const { setQuery, setSort, setCategory, setPage, setLimit, syncFromQuery } = productSlice.actions;
export default productSlice.reducer;
