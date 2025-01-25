"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Header() {

const projects = [

  {
    name: "Dashboard",
    url: "/pages/Dashboard",
    icon: () => <Image src="/sidebar-icons/dashboard.svg" alt="dashboard" width={24} height={24} />,
  },
  {
    name: "Analytics",
    url: "/Analytics",
    icon: () => <Image src="/sidebar-icons/analytics.svg" alt="Analytics" width={24} height={24} />,
  },
  {
    name: "Product",
    url: "pages/Product",
    icon: () => <Image src="/sidebar-icons/product.svg" alt="Product" width={24} height={24} />,
  },
  {
    name: "Payment",
    url: "pages/Payment",
    icon: () => <Image src="/sidebar-icons/payment.svg" alt="Payment" width={24} height={24} />,
  },
  {
    name: "Orders",
    url: "/Orders",
    icon: () => <Image src="/sidebar-icons/Oders.svg" alt="Orders" width={24} height={24} />,
  },

  {
    name: "Enquiry",
    url: "/Enquiry",
    icon: () => <Image src="/sidebar-icons/Enquiry.svg" alt="Enqiry" width={24} height={24} />,
  },

  {
    name: "Marketing",
    url: "/Marketing",
    icon: () => <Image src="/sidebar-icons/Marketing.svg" alt="Marketing" width={24} height={24} />,
  },
  
  {
    name: "Settings",
    url: "/Settings",
    icon: () => <Image src="/sidebar-icons/Setting.svg" alt="Setting" width={24} height={24} />,
  },
  {
    name: "Logout",
    url: "/Logout",
    icon: () => <Image src="/sidebar-icons/logout.svg" alt="logtout" width={24} height={24} />,
  },

];
  return (
    <header>
     <Sidebar>
  <SidebarContent>
    <SidebarGroup>
    <SidebarGroupLabel>
  <div className="pt-[100px] flex justify-center">
    <Image src="/logo.svg" alt="Logo" width={127} height={35} />
  </div>
</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.name}>
              <SidebarMenuButton asChild>
                <a href={project.url}>
                  <project.icon />
                  <span>{project.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>

    </header>
  );
}
