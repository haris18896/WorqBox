// Test examples for the HTML stripping utility
// These examples are based on the HTML content seen in the project descriptions

const testExamples = {
  // Example 1: Simple paragraph
  paragraph: "<p>test test</p>",
  // Expected: "test test"

  // Example 2: Complex description with spans
  complexDescription:
    "<p>Workbox is a comprehensive enterprise management platform that integrates essential tools for efficient orga...</p>",
  // Expected: "Workbox is a comprehensive enterprise management platform that integrates essential tools for efficient orga..."

  // Example 3: List with multiple items
  listDescription:
    "<ul><li>Grants Management system will serve as a comprehensive solution, revolutionizing the way grants...</li></ul>",
  // Expected: "• Grants Management system will serve as a comprehensive solution, revolutionizing the way grants..."

  // Example 4: Description with inline styles
  styledDescription:
    '<p><span style="color: rgb(34, 34, 34);">The team is</span></p>',
  // Expected: "The team is"
};

// Usage examples:
// import { stripHtmlTags } from '@/utils/textUtils';
//
// const plainText = stripHtmlTags(testExamples.paragraph);
// console.log(plainText); // "test test"
//
// const truncatedText = stripHtmlTags(testExamples.complexDescription, 50);
// console.log(truncatedText); // "Workbox is a comprehensive enterprise management..."

export default testExamples;
