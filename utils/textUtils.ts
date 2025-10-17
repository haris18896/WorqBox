export const stripHtmlTags = (
  htmlString: string,
  maxLength?: number
): string => {
  if (!htmlString || typeof htmlString !== "string") {
    return "";
  }

  let text = htmlString

    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")

    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<\/li>/gi, "\n")

    .replace(/<\/p>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")

    .replace(/<\/div>/gi, "\n")
    .replace(/<div[^>]*>/gi, "")

    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<h[1-6][^>]*>/gi, "")

    .replace(/<br\s*\/?>/gi, "\n")

    .replace(/<[^>]*>/g, "")

    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .replace(/^\s+|\s+$/g, "")

    .replace(/^\n+|\n+$/g, "");

  if (maxLength && text.length > maxLength) {
    text = text.substring(0, maxLength).trim();

    const lastSpaceIndex = text.lastIndexOf(" ");
    if (lastSpaceIndex > maxLength * 0.8) {
      text = text.substring(0, lastSpaceIndex);
    }
    text += "...";
  }

  return text;
};

export const truncateText = (
  text: string,
  maxLength: number,
  addEllipsis: boolean = true
): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + (addEllipsis ? "..." : "");
  }

  return truncated + (addEllipsis ? "..." : "");
};

export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.warn("Error formatting date:", error);
    return dateString;
  }
};

export const getInitials = (fullName: string): string => {
  if (!fullName || typeof fullName !== "string") {
    return "??";
  }

  const words = fullName.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }

  return fullName.substring(0, 2).toUpperCase();
};

export const isObjEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj !== "object") return false;
  return Object.keys(obj).length === 0;
};
