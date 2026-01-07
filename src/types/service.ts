// src/types/service.ts
// Create this file to define proper types for your service metadata

export interface ServiceMetadata {
    whatsIncluded?: string[];
    howItWorks?: HowItWorksStep[];
    faqs?: FAQ[];
    terms?: Terms;
    cancellationPolicy?: CancellationPolicy;
    privacyPolicy?: PrivacyPolicy;
    disclaimer?: string;
  }
  
  export interface HowItWorksStep {
    step: number;
    title: string;
    description: string;
  }
  
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  export interface Terms {
    serviceAgreement?: string;
    paymentTerms?: string;
    confidentiality?: string;
    scopeOfService?: string;
  }
  
  export interface CancellationPolicy {
    moreThan48Hours?: string;
    between24And48Hours?: string;
    lessThan24Hours?: string;
    contactInfo?: string;
    refundTimeframe?: string;
  }
  
  export interface PrivacyPolicy {
    commitment?: string;
    protections?: string[];
  }
  
  // Main Service interface
  export interface Service {
    id: number;
    categoryId: number;
    category_name: string;
    category_slug: string;
    name: string;
    slug: string;
    price: number;
    description: string | null;
    icon: string | null;
    duration: string | null;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
    metadata?: ServiceMetadata; // Use ServiceMetadata instead of any
    createdAt?: string;
    updatedAt?: string;
  }
  
  // For API responses that include category details
  export interface ServiceWithCategory extends Service {
    category: {
      id: number;
      name: string;
      slug: string;
      description: string | null;
      icon: string | null;
      sortOrder: number;
      isActive: boolean;
    };
  }
  
  // Helper function to parse metadata from JSON string
  export function parseServiceMetadata(metadataString: string | null): ServiceMetadata | undefined {
    if (!metadataString) return undefined;
    
    try {
      return JSON.parse(metadataString) as ServiceMetadata;
    } catch (error) {
      console.error('Failed to parse service metadata:', error);
      return undefined;
    }
  }