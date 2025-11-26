import { useEffect } from 'react';

const useSEO = ({ title, description, keywords, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, canonical }) => {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (attribute, attributeValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Update description
    if (description) {
      updateMetaTag('name', 'description', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Update Open Graph tags
    if (ogTitle) {
      updateMetaTag('property', 'og:title', ogTitle);
    }
    if (ogDescription) {
      updateMetaTag('property', 'og:description', ogDescription);
    }
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
    }

    // Update Twitter Card tags
    if (twitterTitle) {
      updateMetaTag('name', 'twitter:title', twitterTitle);
    }
    if (twitterDescription) {
      updateMetaTag('name', 'twitter:description', twitterDescription);
    }
    if (twitterImage) {
      updateMetaTag('name', 'twitter:image', twitterImage);
    }

    // Update canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (linkElement) {
        linkElement.setAttribute('href', canonical);
      } else {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', canonical);
        document.head.appendChild(linkElement);
      }
    }

    // Cleanup function
    return () => {
      // Optionally reset to defaults if needed
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, canonical]);
};

export default useSEO;
