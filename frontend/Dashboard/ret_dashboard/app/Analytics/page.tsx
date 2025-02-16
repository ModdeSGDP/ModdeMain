'use client';
import React from 'react';
import AnalyticsSummary from '../components/AnalyticsSummary';
import AnalyticsGraphs from '../components/Analyticsgraphs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

function page() {
  // Dynamic data for Analytics Summary
  const analyticsData = {
    productViews: 300,
    newOrders: 10,
    cancelledOrders: 100,
    totalVisitors: 350
  };

  return (
    <div className="pt-0 pl-4">

      {/* Analytics Heading */}
      <h1 className="font-bold text-2xl mb-2">Analytics</h1>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/Product">Product</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Analytics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Horizontal Line */}
      <hr className="my-4 border-gray-300" />

      {/* Analytics Summary Section */}
      <div className="mt-4">
        <AnalyticsSummary
          productViews={analyticsData.productViews}
          newOrders={analyticsData.newOrders}
          cancelledOrders={analyticsData.cancelledOrders}
          totalVisitors={analyticsData.totalVisitors}
        />
      </div>

      {/* Analytics Graphs Section */}
      <div className="mt-6">
        <AnalyticsGraphs />
      </div>

    </div>
  );
}

export default page;
