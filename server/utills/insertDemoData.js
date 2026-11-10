const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoCategories = [
  { name: "Circular Knitwear" },
  { name: "Flat Knit Sweaters" },
  { name: "Denim & Chinos" },
  { name: "Activewear" },
  { name: "Organic & Sustainable RMG" },
  { name: "Tech Packs & Digital Specs" },
];

const demoProducts = [
  {
    id: "rmg-prod-01",
    title: "Heavyweight 220 GSM Combed Cotton T-Shirt (B2B Bulk Export)",
    price: 5,
    rating: 5,
    description:
      "Export grade circular knit crewneck t-shirt manufactured by Apparel Emporium (aelbd.net). 100% Combed Compact Cotton, reactive dyed with silicon softener finish. Pre-shrunk fabric with less than 3% shrinkage tolerance. Fully customizable with brand labels, custom embroidery, and screen print.",
    mainImage: "category_knit.svg",
    slug: "heavyweight-220gsm-combed-cotton-tshirt-b2b",
    manufacturer: "Apparel Emporium (aelbd.net)",
    category: "Circular Knitwear",
    inStock: 50000,
    productType: "B2B_GARMENT",
    moq: 500,
    leadTime: "15-25 days",
    fabricDetails: "100% Combed Cotton Single Jersey, 220 GSM, Bio-Polished",
    customizationOptions: "Custom woven labels, puff print, screen print, custom polybags",
  },
  {
    id: "rmg-prod-02",
    title: "Premium 340 GSM Brushed French Terry Hoodie (OEM Wholesale)",
    price: 10,
    rating: 5,
    description:
      "Heavyweight streetwear hoodie produced in Apparel Emporium's audited facilities. 3-end fleece with double-lined hood, kangaroo pocket, 2x2 heavy spandex rib at cuffs and hem, and flatlock reinforced seams. BSCI and OEKO-TEX Standard 100 certified.",
    mainImage: "category_sweater.svg",
    slug: "premium-340gsm-brushed-french-terry-hoodie-oem",
    manufacturer: "Apparel Emporium (aelbd.net)",
    category: "Circular Knitwear",
    inStock: 25000,
    productType: "B2B_GARMENT",
    moq: 400,
    leadTime: "20-30 days",
    fabricDetails: "80% Cotton / 20% Polyester Brushed Fleece, 340 GSM",
    customizationOptions: "Custom metal aglets, high-density chest embroidery, neck tape",
  },
  {
    id: "rmg-prod-03",
    title: "12.5 Oz Stretch Denim Indigo Jeans (Factory Production)",
    price: 12,
    rating: 5,
    description:
      "5-pocket classic straight and slim tapered denim manufactured for international private labels. Sustainable ozone wash and laser whiskers treatment reducing water consumption by 65%. Custom YKK brass hardware.",
    mainImage: "category_denim.svg",
    slug: "12-5oz-stretch-denim-indigo-jeans-b2b",
    manufacturer: "Apparel Emporium (aelbd.net)",
    category: "Denim & Chinos",
    inStock: 15000,
    productType: "B2B_GARMENT",
    moq: 600,
    leadTime: "25-35 days",
    fabricDetails: "98% Cotton 2% Spandex Ring Denim, 12.5 oz/yd²",
    customizationOptions: "Genuine leather back patch, custom rivets, pocket lining print",
  },
  {
    id: "rmg-prod-04",
    title: "Complete Hoodie Tech Pack & Graded Spec Template",
    price: 19,
    rating: 5,
    description:
      "Production-ready streetwear oversized hoodie tech pack created by senior garment technical designers. Includes graded measurement specs (XS to 3XL), stitching details, fabric consumption formulas, and print placement diagrams.",
    mainImage: "category_digital.svg",
    slug: "complete-hoodie-tech-pack-graded-spec-template",
    manufacturer: "ZYMI Tech Pack Studio",
    category: "Tech Packs & Digital Specs",
    inStock: 9999,
    productType: "DIGITAL_DOWNLOAD",
    downloadUrl: "/downloads/hoodie_tech_pack_master.pdf",
    digitalFormat: "Vector PDF + Editable Adobe Illustrator (AI)",
    fileSize: "18.4 MB",
  },
  {
    id: "rmg-prod-05",
    title: "Apparel Merchandiser's Fabric Consumption Master Sheet (Excel)",
    price: 0,
    rating: 5,
    description:
      "Free automated Excel tool with built-in macros to calculate knit fabric consumption per dozen, yarn requirements, marker efficiency estimations, and dyeing wastage formulas.",
    mainImage: "category_digital.svg",
    slug: "apparel-merchandiser-fabric-consumption-master-sheet",
    manufacturer: "ZYMI Engineering",
    category: "Tech Packs & Digital Specs",
    inStock: 9999,
    productType: "DIGITAL_DOWNLOAD",
    downloadUrl: "/downloads/fabric_consumption_v3.xlsx",
    digitalFormat: "Microsoft Excel (XLSX)",
    fileSize: "3.2 MB",
  },
  {
    id: "rmg-prod-06",
    title: "Carhartt Heavyweight Hooded Sweatshirt (Verified Amazon Deal)",
    price: 55,
    rating: 5,
    description:
      "Iconic heavyweight workwear hoodie with thermal lined protection. 13-ounce 75% cotton / 25% polyester blend with Rain Defender durable water-repellent finish.",
    mainImage: "category_sweater.svg",
    slug: "carhartt-heavyweight-hooded-sweatshirt-amazon",
    manufacturer: "Carhartt",
    category: "Activewear",
    inStock: 100,
    productType: "AFFILIATE_AMAZON",
    asin: "B002G9UD6C",
    affiliateUrl: "https://www.amazon.com/dp/B002G9UD6C",
    amazonDisclaimer: "As an Amazon Associate, we earn from qualifying purchases.",
  },
  {
    id: "rmg-prod-07",
    title: "Gildan Ultra Cotton Adult T-Shirt Multi-Pack (Amazon Best Seller)",
    price: 24,
    rating: 5,
    description:
      "Classic heavyweight 6.0 oz pre-shrunk cotton crewneck shirt. Ideal for everyday basics, screen printing, and casual wear.",
    mainImage: "category_knit.svg",
    slug: "gildan-ultra-cotton-adult-tshirt-amazon",
    manufacturer: "Gildan",
    category: "Circular Knitwear",
    inStock: 250,
    productType: "AFFILIATE_AMAZON",
    asin: "B07F2W8K4L",
    affiliateUrl: "https://www.amazon.com/dp/B07F2W8K4L",
    amazonDisclaimer: "As an Amazon Associate, we earn from qualifying purchases.",
  },
  {
    id: "rmg-prod-08",
    title: "Vintage Acid Wash Oversized Graphic Tee (Global Dropship)",
    price: 29,
    rating: 5,
    description:
      "Mineral washed 240 GSM drop-shoulder boxy tee with distressed vintage collar. Fast dispatch worldwide with tracked priority airmail.",
    mainImage: "category_knit.svg",
    slug: "vintage-acid-wash-oversized-graphic-tee-dropship",
    manufacturer: "ZYMI Dropship Fashion",
    category: "Circular Knitwear",
    inStock: 80,
    productType: "DROPSHIP",
    supplierSku: "DS-VINTAGE-TEE-99",
    estimatedDelivery: "5-8 business days",
  },
];

async function insertDemoData() {
  console.log("Seeding Apparel Emporium & ZYMI RMG Hybrid Catalog...");

  const merchant = await prisma.merchant.upsert({
    where: { id: "merchant-apparel-emporium" },
    update: {},
    create: {
      id: "merchant-apparel-emporium",
      name: "Apparel Emporium",
      email: "export@aelbd.net",
      description: "Premier Export RMG Manufacturer & Knitting Mills (aelbd.net)",
      address: "Dhaka, Bangladesh",
      phone: "+880 1700-000000",
      status: "ACTIVE",
    },
  });

  const categoryMap = {};
  for (const cat of demoCategories) {
    const createdCat = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name },
    });
    categoryMap[cat.name] = createdCat.id;
  }

  for (const prod of demoProducts) {
    const categoryId = categoryMap[prod.category] || Object.values(categoryMap)[0];
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        productType: prod.productType,
        moq: prod.moq,
        leadTime: prod.leadTime,
        fabricDetails: prod.fabricDetails,
        customizationOptions: prod.customizationOptions,
        affiliateUrl: prod.affiliateUrl,
        asin: prod.asin,
        downloadUrl: prod.downloadUrl,
        digitalFormat: prod.digitalFormat,
        fileSize: prod.fileSize,
        supplierSku: prod.supplierSku,
        estimatedDelivery: prod.estimatedDelivery,
      },
      create: {
        id: prod.id,
        slug: prod.slug,
        title: prod.title,
        price: prod.price,
        rating: prod.rating,
        description: prod.description,
        mainImage: prod.mainImage,
        manufacturer: prod.manufacturer,
        categoryId: categoryId,
        inStock: prod.inStock,
        merchantId: merchant.id,
        productType: prod.productType,
        moq: prod.moq,
        leadTime: prod.leadTime,
        fabricDetails: prod.fabricDetails,
        customizationOptions: prod.customizationOptions,
        affiliateUrl: prod.affiliateUrl,
        asin: prod.asin,
        downloadUrl: prod.downloadUrl,
        digitalFormat: prod.digitalFormat,
        fileSize: prod.fileSize,
        supplierSku: prod.supplierSku,
        estimatedDelivery: prod.estimatedDelivery,
      },
    });
  }

  console.log("Successfully seeded Apparel Emporium & ZYMI RMG Hybrid Catalog!");
}

module.exports = { insertDemoData, demoProducts, demoCategories };

if (require.main === module) {
  insertDemoData()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
}
