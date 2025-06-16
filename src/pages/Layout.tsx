import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
    <SidebarProvider>
    <AppSidebar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col">
            <div className="px-4 lg:px-6">
              <SidebarTrigger />
            </div>
            {children}
            
          </div>
             <Toaster />
        </div>
      </div>
    </SidebarProvider>
  )
}
