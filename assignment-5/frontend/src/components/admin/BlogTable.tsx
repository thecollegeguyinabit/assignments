import { type ColumnDef} from "@tanstack/react-table";
import React from "react";
import { useBlogs } from '@/hooks/useApi';
import { useDeleteBlog } from '@/hooks/useApi';
import { formatDate } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/ui/data-table';
import { Edit, Trash2} from "lucide-react";
import { Dialog, 
        DialogContent, 
        DialogClose, 
        DialogDescription, 
        DialogFooter, 
        DialogHeader, 
        DialogTitle, 
        DialogTrigger 
      } from "../ui/dialog";
import type { Blog } from '@/types';


const columns: ColumnDef<Blog>[] = [
  {
    header: "Sr. No",
    cell: ({ row }) => (
      <div className=" text-center text-md">
        {row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className=" text-wrap max-w-48">
        {row.getValue("title")}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-22">
        {row.original.category?.name || 'Uncategorized'}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <div>
        {row.getValue("author")}
      </div>
    ),
  },
  {
    accessorKey: "publishDate",
    header: "Publish Date",
    cell: ({ row }) => (
      <div>
        {formatDate(row.getValue("publishDate"))}
      </div>
    ),
  },
  {
    id: "edit-actions",
    header: "Edit",
    cell: ({ row }) => {
      const navigate = useNavigate()
    
      return (
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="icon"
            className="dark:bg-neutral-600 bg-neutral-300 hover:bg-neutral-400/80 hover:dark:bg-neutral-700/80 text-black dark:text-white cursor-pointer"
            onClick={() => navigate(`/admin/blogs/${row.original._id}/edit`)}
          >
            <Edit />
          </Button>
        </div>
      )
    },
  },
  {
    id: "delete-actions",
    header: "Delete",
    cell: ({ row }) => {
      const deleteBlogMutation = useDeleteBlog()
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

      const handleDelete = () =>{
        deleteBlogMutation.mutate(row.original._id, {
          onSuccess: () => {
            setIsDeleteDialogOpen(false);
          }
        })
      }
      return (
        <div className="flex space-x-2">
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="dark:bg-neutral-600 bg-neutral-300 hover:bg-neutral-400/80 hover:dark:bg-neutral-700/80 text-red-400 cursor-pointer"
              >
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>Are you sure you want to delete this blog?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <Button
                  onClick={handleDelete}
                  disabled={deleteBlogMutation.isPending}
                  variant="default"
                >
                  {deleteBlogMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]

export function BlogTable() {
  const navigate = useNavigate();
  const { data: blogs = [], isLoading, error } = useBlogs();
  
  if (isLoading) return <div className="p-4">Loading blogs...</div>
  if (error) return <div className="p-4 text-destructive">Error loading blogs: {(error as Error).message}</div>

  return (
    <DataTable
      columns={columns}
      data={blogs}
      searchKey="title"
      searchPlaceholder="Filter blogs..."
      title="All Blogs"
      addButtonLabel="Add New Blog"
      addButtonOnClick={() => navigate('/admin/blogs/new')}
    />
  )
}