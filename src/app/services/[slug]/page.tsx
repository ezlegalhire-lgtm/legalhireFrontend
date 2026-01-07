import ServiceDetailPage from "./Servicesdetails";
import type { Metadata } from "next";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string | null;
  noIndex?: boolean;
  h1Tag?: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getServiceData(slug: string): Promise<ServiceData | null> {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms.ezlegalhire.com";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/public/services?slug=${slug}`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch service data for slug: ${slug}. Status: ${response.status}`
      );
      return null;
    }

    const rawData = await response.json();
    return (
      Array.isArray(rawData) ? rawData[0] : rawData
    ) as ServiceData | null;
  } catch (error) {
    console.error("Error fetching service data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const serviceSlug = params.slug;
  const serviceData = await getServiceData(serviceSlug);

  if (!serviceData) {
    return {
      title: "Service Not Found",
      description: "The requested service page does not exist.",
    };
  }

  const defaultTitle = serviceData.title;
  const defaultDescription = serviceData.description.substring(0, 160);
  const canonicalUrl = `https://yourdomain.com/services/${serviceSlug}`;
  const defaultOgImagePath = "/EZLogoText.png";

  return {
    title: serviceData.metaTitle || defaultTitle,
    description: serviceData.metaDescription || defaultDescription,
    keywords: serviceData.metaKeywords,

    robots: serviceData.noIndex ? "noindex, nofollow" : "index, follow",

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: serviceData.ogTitle || serviceData.metaTitle || defaultTitle,
      description:
        serviceData.ogDescription ||
        serviceData.metaDescription ||
        defaultDescription,
      url: canonicalUrl,
      images: serviceData.ogImage
        ? [{ url: serviceData.ogImage }]
        : defaultOgImagePath,
      type: "article",
    },

    twitter: {
      card: serviceData.ogImage ? "summary_large_image" : "summary",
      title: serviceData.ogTitle || serviceData.metaTitle || defaultTitle,
      description:
        serviceData.ogDescription ||
        serviceData.metaDescription ||
        defaultDescription,
      images: serviceData.ogImage ? [serviceData.ogImage] : undefined,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const serviceSlug = params.slug;

  const serviceData = await getServiceData(serviceSlug);

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-600">
          Service Not Found: {serviceSlug}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <ServiceDetailPage serviceSlug={serviceSlug} serviceData={serviceData} />
    </div>
  );
}
