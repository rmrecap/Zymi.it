declare global {
  type ProductType = 
    | "B2B_GARMENT" 
    | "DROPSHIP" 
    | "AFFILIATE_AMAZON" 
    | "DIGITAL_DOWNLOAD";

  interface Product {
    id: string;
    slug: string;
    title: string;
    price: number;
    rating: number;
    description: string;
    mainImage: string;
    manufacturer: string;
    categoryId: string;
    category?: { name: string } | null;
    inStock: number;

    // Hybrid Platform Multi-Model fields
    productType?: ProductType;
    moq?: number;
    leadTime?: string | null;
    fabricDetails?: string | null;
    customizationOptions?: string | null;
    affiliateUrl?: string | null;
    asin?: string | null;
    amazonDisclaimer?: string | null;
    downloadUrl?: string | null;
    fileSize?: string | null;
    digitalFormat?: string | null;
    supplierSku?: string | null;
    estimatedDelivery?: string | null;
  }

  interface Post {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt?: string | null;
    coverImage?: string | null;
    author: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    tags?: string | null;
    category?: string | null;
    published: boolean;
    readingTime: number;
    createdAt: string;
    updatedAt: string;
    featuredProducts?: {
      id: string;
      product: Product;
    }[];
  }

  interface B2BLead {
    id?: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    country: string;
    targetQuantity: number;
    targetPrice?: string | null;
    fabricPreference?: string | null;
    specifications: string;
    sampleNeeded: boolean;
    status?: "PENDING" | "REVIEWED" | "SAMPLE_REQUESTED" | "QUOTED" | "ACCEPTED" | "REJECTED";
    productId?: string | null;
    product?: Product | null;
    createdAt?: string;
  }

  interface DigitalAsset {
    id: string;
    productId: string;
    product?: Product;
    fileName: string;
    fileUrl: string;
    fileSize: string;
    downloadLimit: number;
    accessKey: string;
    createdAt: string;
  }

  interface Merchant {
    id: string;
    name: string;
    email: string | null;
    description: string | null;
    phone: string | null;
    address: string | null;
    status: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  interface SingleProductPageProps {
    params: {
      id: string;
      productSlug: string;
    };
  }

  type ProductInWishlist = {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
    stockAvailabillity: number;
  };

  interface OtherImages {
    imageID: string | number;
    productID: string | number;
    image: string;
  }

  interface Category {
    id: string;
    name: string;
  }

  interface User {
    id: string;
    email: string;
    password?: string | null;
    role?: string | null;
  }

  interface Order {
    id: string;
    adress: string;
    apartment: string;
    company: string;
    dateTime: Date | string | null;
    email: string;
    lastname: string;
    name: string;
    phone: string;
    postalCode: string;
    status: string;
    city: string;
    country: string;
    orderNotice?: string | null;
    total: number;
  }

  interface SingleProductBtnProps {
    product: Product;
    quantityCount: number;
  }

  interface WishListItem {
    id: string;
    userId: string;
    productId: string;
    product: Product;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: string;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | null;
  }
}

export type Product = globalThis.Product;
export type ProductType = globalThis.ProductType;
export type Post = globalThis.Post;
export type B2BLead = globalThis.B2BLead;
export type DigitalAsset = globalThis.DigitalAsset;
export type Category = globalThis.Category;
export type Merchant = globalThis.Merchant;
export type Order = globalThis.Order;
export type User = globalThis.User;
export type SingleProductBtnProps = globalThis.SingleProductBtnProps;
export type ProductInWishlist = globalThis.ProductInWishlist;
