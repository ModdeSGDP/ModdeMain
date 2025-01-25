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
    url: "/Dashboard",
    icon: () => <Image src="public/sidebar-icons/dashboard.svg" alt="dashboard" width={24} height={24} />,
  },
  {
    name: "Analytics",
    url: "/Analytics",
    icon: () => <Image src="E:\Modde\ModdeMain\frontend\Dashboard\ret_dashboard\public\sidebar-icons\analytics.svg" alt="Analytics" width={24} height={24} />,
  },
  {
    name: "Product",
    url: "/Product",
    icon: () => <Image src="/icons/project3.svg" alt="Product" width={24} height={24} />,
  },
  {
    name: "Payment",
    url: "/Payment",
    icon: () => <Image src="/icons/project3.svg" alt="Payment" width={24} height={24} />,
  },
  {
    name: "Orders",
    url: "/Orders",
    icon: () => <Image src="/icons/project3.svg" alt="Orders" width={24} height={24} />,
  },

  {
    name: "Enquiry",
    url: "/Enquiry",
    icon: () => <Image src="/icons/project3.svg" alt="Project 3" width={24} height={24} />,
  },

  {
    name: "Marketing",
    url: "/Marketing",
    icon: () => <Image src="/icons/project3.svg" alt="Project 3" width={24} height={24} />,
  },
  
  {
    name: "Settings",
    url: "/Settings",
    icon: () => <Image src="/icons/project3.svg" alt="Project 3" width={24} height={24} />,
  },
  {
    name: "Logout",
    url: "/Logout",
    icon: () => <Image src="/icons/project3.svg" alt="Project 3" width={24} height={24} />,
  },

];
  return (
    <header>
     <Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
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
