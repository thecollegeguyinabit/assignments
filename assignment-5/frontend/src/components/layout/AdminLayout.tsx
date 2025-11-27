import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '../admin/Sidebar';
import { SiteHeader } from '../admin/Header';
import { Outlet } from 'react-router-dom';


export function AdminLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '200px', 
          '--header-height': 'calc(var(--spacing) * 12)', // 48px
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-4 md:p-6">
              <Outlet /> 
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}