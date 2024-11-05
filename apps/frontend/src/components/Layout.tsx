
      import React, { useState } from 'react';
      import { Sidebar, SidebarProps } from './Sidebar/Sidebar';
      import { useCurrentUser } from '../hooks';

      export function AppLayout({ children }: { children: React.ReactNode }) {
        
        const currentUser = useCurrentUser();
        const sidebarGroups: SidebarProps['items'] = [{"title":"Homepage","href":"/","icon":"home-01"},{"title":"Dashboard","href":"/dashboard","icon":"dashboard-square-01"},{"title":"Clients","href":"/clients","icon":"user-multiple","subitems":[{"title":"Client List","href":"/clients","icon":"user-list"},{"title":"Client Profile","href":"/clients/profile","icon":"user-circle"}]},{"title":"Package Tracking","href":"/tracking","icon":"package-search"},{"title":"Notifications","href":"/notifications","icon":"notification-01"},{"title":"Analytics","href":"/analytics","icon":"chart-line-data-01"},{"title":"Driver Assignments","href":"/drivers","icon":"car-01"}];
        
        
        return (
          <div className="flex h-screen">
              <Sidebar
              
                items={sidebarGroups}
                iconStyle={"hugeicons"}
                currentUser={currentUser || undefined}
                
              />
              <div className={`ml-[18rem] w-[calc(100%-18rem)] flex-1 p-4`}>
                  {children}
              </div>
          </div>
        )
      }