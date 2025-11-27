import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import  { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Trash2,
  Code2,
} from 'lucide-react';

import { imageFormSchema } from '@/schema';



type ImageFormData = z.infer<typeof imageFormSchema>;

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const imageForm = useForm<ImageFormData>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      src: '',
      alt: '',
      title: '',
    },
  });


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {levels: [1,2,3], HTMLAttributes: {class: 'font-semibold ml-2 text-xl'}},
        bold: {HTMLAttributes: {class: 'font-bold'}},
        codeBlock: {HTMLAttributes: {class: 'bg-neutral-600 text-white w-3/5 p-2 my-4  rounded-lg'}},
        link: {HTMLAttributes: {class: 'text-primary underline hover:text-primary/80'}},
        italic: {HTMLAttributes: {class: 'italic'}},
        bulletList: {HTMLAttributes: {class: 'list-disc ml-6'}},
        orderedList: {HTMLAttributes: {class: 'list-decimal ml-6'}},

      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full max-h-auto  rounded-lg',
        },
        inline: true,
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-violet-600 underline hover:text-violet-600/80 cursor-pointer',
        },
        linkOnPaste: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose-red  mx-5 my-4 focus:outline-none min-h-[400px] p-4',
      },
    },
  })

  //Handle the Image Submit
  const onImageFormSubmit = (values: ImageFormData) => {
    if (editor?.isActive('image')) {
      // If an image is already selected, update its attributes
      editor.chain().focus().updateAttributes('image', values).run();
    } else {
      // Otherwise, add a new image
      editor?.chain().focus().setImage(values).run();
    }
    setIsImageDialogOpen(false);
    imageForm.reset();
  };

  //Handle Image Dialog Box
  const openImageDialog = () => {
    if (editor?.isActive('image')) {
      // If an image is selected, populate the form with its current attributes
      const currentAttrs = editor.getAttributes('image');
      imageForm.reset(currentAttrs);
    } else {
      imageForm.reset();
    }
    setIsImageDialogOpen(true);
  };


  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
        {/* Heading*/}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        {/* Bold  */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        {/* Italic */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        {/* Lists */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        {/* Code Block */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-zinc-200 dark:bg-zinc-700' : ''}
        >
          <Code2  className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        {/* Image Dialog */}
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm" onClick={openImageDialog}>
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editor.isActive('image') ? 'Edit Image' : 'Add Image'}</DialogTitle>
              <DialogDescription>
                Upload a new image or provide a URL. Make sure to add alt text for accessibility.
              </DialogDescription>
            </DialogHeader>
            <Form {...imageForm}>
              <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                imageForm.handleSubmit(onImageFormSubmit)(e)}} 
                className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="src" className="text-right">
                    Image
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <FormField
                      control={imageForm.control}
                      name="src"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alt" className="text-right">
                    Alt Text
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={imageForm.control}
                      name="alt"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Describe the image for screen readers" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={imageForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Image title (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" >
                    {editor.isActive('image') ? 'Update' : 'Add'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Remove Image Button - only visible when an image is selected */}
        {editor.isActive('image') && (
          <>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setImage({src: ""}).run()}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </>
        )}
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}