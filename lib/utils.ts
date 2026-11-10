export const categoryMenuList = [
  {
    id: 1,
    title: "Circular Knitwear",
    src: "/category_knit.svg",
    href: "/shop/circular-knitwear",
  },
  {
    id: 2,
    title: "Flat Knit Sweaters",
    src: "/category_sweater.svg",
    href: "/shop/flat-knit",
  },
  {
    id: 3,
    title: "Denim & Chinos",
    src: "/category_denim.svg",
    href: "/shop/denim",
  },
  {
    id: 4,
    title: "Activewear & Hoodies",
    src: "/category_activewear.svg",
    href: "/shop/activewear",
  },
  {
    id: 5,
    title: "Organic & Sustainable RMG",
    src: "/category_sustainable.svg",
    href: "/shop/sustainable",
  },
  {
    id: 6,
    title: "Tech Packs & Digital Specs",
    src: "/category_digital.svg",
    href: "/shop/digital-specs",
  },
];

export const incentives = [
  {
    name: "Factory-Direct Pricing",
    description:
      "Competitive FOB/CIF manufacturing quotes directly from Apparel Emporium's audited facilities.",
    imageSrc: "/factory_icon.svg",
  },
  {
    name: "Audited Ethical Compliance",
    description:
      "BSCI, OEKO-TEX Standard 100, and WRAP compliant manufacturing standards.",
    imageSrc: "/compliance_icon.svg",
  },
  {
    name: "Rapid Sample Turnaround",
    description:
      "Precision proto samples, lab dips, and fit approvals dispatched via global courier in 7-10 days.",
    imageSrc: "/sample_icon.svg",
  },
];

export const navigation = {
  manufacturing: [
    { name: "Apparel Emporium Hub", href: "/b2b-apparel" },
    { name: "Circular Knitwear", href: "/shop/circular-knitwear" },
    { name: "Denim & Woven", href: "/shop/denim" },
    { name: "Custom Tech Packs", href: "/shop/digital-specs" },
  ],
  tools: [
    { name: "Fabric Consumption Calculator", href: "/tools/fabric-consumption-calculator" },
    { name: "GSM & Costing Estimator", href: "/tools/gsm-costing-estimator" },
    { name: "Yarn Count Converter", href: "/tools/yarn-count-converter" },
    { name: "All RMG Tools Hub", href: "/tools" },
  ],
  insights: [
    { name: "RMG & Textile Blog", href: "/blog" },
    { name: "Global Export Guide", href: "/blog" },
    { name: "Sustainable Fashion Trends", href: "/blog" },
  ],
  about: [
    { name: "About Apparel Emporium", href: "https://aelbd.net" },
    { name: "B2B RFQ Inquiry", href: "/b2b-apparel" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const isValidNameOrLastname = (input: string) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  const cleanedInput = input.replace(/[^0-9]/g, "");
  if (!/^\d{13,19}$/.test(cleanedInput)) {
    return false;
  }
  return luhnCheck(cleanedInput);
};

const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};
