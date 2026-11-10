import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ZYMI Global & Apparel Emporium",
  description:
    "Get in touch with ZYMI Global and Apparel Emporium for B2B garment manufacturing inquiries, digital design assets, and commercial partnerships in Dhaka, Bangladesh.",
  alternates: {
    canonical: "https://zymi.it/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

