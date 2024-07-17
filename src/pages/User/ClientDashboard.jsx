import React, { useState } from 'react';

import ClientSidebar from '../../partials/ClientSidebar';
import ClientHeader from '../../partials/ClientHeader';

function ClientDashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <ClientSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <ClientHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          
        </main>


      </div>
    </div>
  );
}

export default ClientDashboard;