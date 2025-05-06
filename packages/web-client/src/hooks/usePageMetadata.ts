import { useEffect } from "react";

interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  robots?: string;
}

export default function usePageMetadata(metadata: PageMetadata) {
  useEffect(() => {
    const title = document.title;
    document.title = metadata.title;

    return () => {
      document.title = title;
    };
  }, [metadata]);
}
