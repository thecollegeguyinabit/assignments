import { ModeToggle } from '../theme/mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function SiteHeader() {
  const navigate = useNavigate();
  
  return (
    <header className="flex h-16 shrink-0 justify-between pr-5 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <span className="font-bold">Admin Dashboard</span>
      </div>

      <div className='flex gap-2'>
        <Button
          variant="outline"
          size="default"
          onClick={() => navigate("/") }
          className='cursor-pointer'
          >
          Home
        </Button>
        <ModeToggle />
        </div>
    </header>
  )
}