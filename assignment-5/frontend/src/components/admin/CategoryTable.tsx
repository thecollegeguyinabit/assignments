import type { ColumnDef } from '@tanstack/react-table';
import {  Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table' 
import type { Category } from '@/types'
import { useCategories, useDeleteCategory } from '@/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../ui/alert-dialog';


export function CategoryTable() {
  const { data: categories = [] } = useCategories();
  const navigate = useNavigate();

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: '_id', 
      header: 'Sr. No',
      cell: ({ row }) =>{
        return (
          <div className='text-center text-md'>{row.index + 1}</div>
        )
      }
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
          </Button>
        )
      },
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
            onClick={() => navigate(`/admin/categories/${row.original._id}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    id: "delete-actions",
    header: "Delete",
    cell: ({ row }) => {
      const deleteCategoryMutation = useDeleteCategory()
      
      return (
        <div className="flex space-x-2">
         <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="default"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>Are you sure you want to delete this category?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCategoryMutation.mutate(row.original._id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
  ]

  return <DataTable 
            columns={columns}
            data={categories} 
            searchKey='name'
            searchPlaceholder='Search categories...'
            title='Categories'
            addButtonLabel='Add Category'
            addButtonOnClick={() => navigate('/admin/categories/new')}
          />
}