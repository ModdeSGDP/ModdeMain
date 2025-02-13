"use client";

import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProfileForm from "@/app/components/ProfileForm";

function Page() {
  return (
    <div className="pt-0 pl-64">
      {/* Page Heading */}
      <h1 className="font-bold text-2xl mb-2">Settings</h1>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/Dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Horizontal Line */}
      <hr className="my-4 border-gray-300" />

      {/* Profile Form Component */}
      <ProfileForm />
    </div>
  );
}

export default Page;
