export interface Service {
  id: number;
  category: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  categorySlug: string;
}

export interface Category {
  name: string;
  count: number;
  slug: string;
}

export interface ServicesData {
  services: Service[];
  categories: Category[];
}

export const services: Service[] = [
  {
    id: 1,
    category: "CRIMINAL",
    name: "15-minute advice session on criminal issues in the UAE",
    price: 28,
    description: "A 15-minute phone call with a lawyer to get advice on criminal law issues in the UAE. Experienced civil lawyer to get quick, professional help. Guidance on any criminal matter such as theft, assault, or financial crime.",
    icon: "Shield",
    categorySlug: "criminal"
  },
  {
    id: 2,
    category: "DISPUTE",
    name: "15-minute business advice session on setting up in the UAE",
    price: 28,
    description: "A 15-minute phone call with a lawyer to get free advice on setting up your business in UAE. Questions about types like starting a business, legal requirements, and costs of establishing.",
    icon: "Briefcase",
    categorySlug: "business"
  },
  {
    id: 3,
    category: "EMPLOYMENT",
    name: "15-minute UAE employment advice session",
    price: 28,
    description: "A 15-minute phone call with a lawyer to get advice about your UAE employment issue. The attorney can help and answer your questions about working in the UAE, including contracts, labour filing, employment offers and labour contracts, salaries and benefits.",
    icon: "Users",
    categorySlug: "employment"
  },
  {
    id: 4,
    category: "TAXES & FINES",
    name: "15-minute advice session on taxes in the UAE",
    price: 28,
    description: "A 15-minute phone call with an experienced tax lawyer to get answers to your questions about taxation in the UAE. The UAE has introduced VAT and other forms of taxation and guidance on wage advice and practice.",
    icon: "DollarSign",
    categorySlug: "taxes"
  },
  {
    id: 5,
    category: "REAL PROPERTY",
    name: "15-minute advice session on real property related issues",
    price: 28,
    description: "A 15-minute call with a lawyer to get advice on legal issues related to real estate in the UAE. The attorney will review your real estate questions and give you legal advice on topics like tenancy contracts, real property, real and personal property.",
    icon: "Home",
    categorySlug: "property"
  },
  {
    id: 6,
    category: "TAXES & FINES",
    name: "15-minute advice session on bounced cheque issues",
    price: 28,
    description: "A 15-minute phone call with an experienced UAE lawyer to get advice about bounced cheques. UAE bounced cheque law allows you to recover your cheque or the cheque you presented for payment, through arbitration or litigation.",
    icon: "FileText",
    categorySlug: "taxes"
  },
  {
    id: 7,
    category: "FAMILY",
    name: "20-minute advice session on family matters",
    price: 30,
    description: "A 20-minute phone call with a lawyer to get advice on family matters for Muslim/ Non-Muslims as per UAE laws. The attorney will answer your questions about marriage, divorce, inheritance, custody of children, domestic abuse, registration of the case with the police.",
    icon: "Heart",
    categorySlug: "family"
  },
  {
    id: 8,
    category: "INTELLECTUAL PROPERTY",
    name: "Two-hour intellectual Property counselling session",
    price: 38,
    description: "Get your intellectual property assessed by an Intellectual Property (IP) specialist. We at lawyer can help you with your project. The lawyer can evaluate your invention or work and advise you on any fees, possible ways of implementation or take up your case for filing.",
    icon: "Package",
    categorySlug: "intellectual"
  },
  {
    id: 9,
    category: "LABOUR & EMPLOYMENT",
    name: "UAE employment contract review + One-hour advice session",
    price: 45,
    description: "Get your job employment contract reviewed by an employment attorney. The lawyer you talk to has previous experience with contracts and will be available to review your employment-related questions and give you thorough, understandable advice on your job.",
    icon: "Users",
    categorySlug: "employment"
  },
  {
    id: 10,
    category: "BANKING & FINANCE",
    name: "Debt consolidation and settlement",
    price: 80,
    description: "Hire an experienced attorney to pursue an outstanding debt on your behalf. To debt collectors on your behalf, they will work with possible solution to resolve the debt to obtain the best debt relief solution.",
    icon: "DollarSign",
    categorySlug: "banking"
  },
  {
    id: 11,
    category: "LITIGATION",
    name: "Drafting and serving a legal notice",
    price: 95,
    description: "Hire an experienced UAE attorney to properly draft and serve a legal notice for you to an opponent. Send you situation with the lawyer and get the attorney's legal advice as per UAE law. Send your paperwork, including the scheduling party on your behalf.",
    icon: "Scale",
    categorySlug: "litigation"
  },
  {
    id: 12,
    category: "REAL PROPERTY",
    name: "Real property related contract review + One-hour advice session",
    price: 95,
    description: "Get your real property related contract (e.g., USA, reviewed by an experienced advocate. The lawyer you talk to will review your contracts with you and give you advice. It also has in-depth knowledge of real estate and can answer your questions and advise you on any recent developments.",
    icon: "Home",
    categorySlug: "property"
  },
  {
    id: 13,
    category: "CRIMINAL",
    name: "Checking for court cases filed against a person in the UAE",
    price: 95,
    description: "Hire a lawyer to conduct a check through the court system for possible cases filed against yourself. In the UAE, you can be arrested for cases of defaulting on loans and other financial court judgements without notice.",
    icon: "Shield",
    categorySlug: "criminal"
  },
  {
    id: 14,
    category: "INTELLECTUAL PROPERTY",
    name: "Trademark clearance (UAE, EU, USA, Canada & Australia)",
    price: 230,
    description: "Hire an experienced attorney to conduct a detailed trademark search to ensure your proposed trademark is available. We will do an expert application to permanently list your trademark in those countries.",
    icon: "Package",
    categorySlug: "intellectual"
  },
  {
    id: 15,
    category: "INTELLECTUAL PROPERTY",
    name: "IP-related contract review + One-hour advice session",
    price: 270,
    description: "Get any IP-related contracts reviewed by an experienced intellectual property lawyer. Provide full rights, ask your lawyer questions about your case and assess your agreement related to intellectual property rights.",
    icon: "Package",
    categorySlug: "intellectual"
  },
  {
    id: 16,
    category: "CRIMINAL",
    name: "UAE travel ban and arrest warrant check",
    price: 290,
    description: "Hire a lawyer to conduct a criminal check on yourself. In the UAE, you may be arrested for defaulting on loans. Check whether you have been blacklisted as per the UAE law and prevent any UAE government authorities personally.",
    icon: "Shield",
    categorySlug: "criminal"
  }
];

// Dynamically calculate category counts
const getCategoryCount = (slug: string): number => {
  if (slug === 'all') return services.length;
  return services.filter(service => service.categorySlug === slug).length;
};

export const categories: Category[] = [
  { name: "Criminal", count: getCategoryCount("criminal"), slug: "criminal" },
  { name: "Employment", count: getCategoryCount("employment"), slug: "employment" },
  { name: "Business", count: getCategoryCount("business"), slug: "business" },
  { name: "Contract", count: getCategoryCount("contract"), slug: "contract" },
  { name: "Litigation", count: getCategoryCount("litigation"), slug: "litigation" },
  { name: "Real Property", count: getCategoryCount("property"), slug: "property" },
  { name: "Banking & Finance", count: getCategoryCount("banking"), slug: "banking" },
  { name: "Family Law", count: getCategoryCount("family"), slug: "family" },
  { name: "Intellectual Property", count: getCategoryCount("intellectual"), slug: "intellectual" },
  { name: "Taxes & Fines", count: getCategoryCount("taxes"), slug: "taxes" }
];