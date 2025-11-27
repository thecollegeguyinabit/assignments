import { Input } from '@/components/ui/input'

export function SearchBar({search, setSearch}: {search: string, setSearch: (value: string) => void}) {
  
  return (
    <div className="my-4 p-2">
      <Input placeholder="Search blogs..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}