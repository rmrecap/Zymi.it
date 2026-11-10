// *********************
// Role of the component: Component that displays current page location in the application 
// Name of the component: Breadcrumb.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Breadcrumb />
// Input parameters: No input parameters
// Output: Page location in the application
// *********************

import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";

const Breadcrumb = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        name: "Home",
        item: "https://zymi.it/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        name: "Shop",
        item: "https://zymi.it/shop",
      },
      {
        "@type": "ListItem",
        "position": 3,
        name: "All Products",
        item: "https://zymi.it/shop",
      },
    ],
  };

  return (
    <div className="text-lg breadcrumbs pb-10 py-5 max-sm:text-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ul>
        <li>
          <Link href="/">
            <FaHouse className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/shop">All products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
