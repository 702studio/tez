# TODO & Future Enhancements for 702.studio Coming Soon Page

This document outlines potential areas for future development, refinement, and improvement for the 702.studio coming soon page.

## Potential Features

*   **Backend Integration for Forms:**
    *   **Newsletter:** Implement actual newsletter subscription functionality. This could involve:
        *   Saving emails to a database (e.g., Supabase, Firebase, or a custom backend).
        *   Integrating with an email marketing service (e.g., Mailchimp, SendGrid).
    *   **Contact Form:** Implement actual email sending for the contact form. This could involve:
        *   Using a serverless function or a simple backend to process and send the email (to avoid exposing credentials on the client-side).
        *   Integrating with a form handling service (e.g., Formspree, Netlify Forms).
    *   Add more robust server-side validation and spam protection (e.g., CAPTCHA) for both forms.

*   **Social Media Links:**
    *   Add a section for social media icons/links if 702.studio has a presence on platforms like Instagram, Behance, LinkedIn, etc.

*   **Countdown Timer:**
    *   If there's a specific launch date, a visually appealing countdown timer could be added.

*   **More Detailed "About Us" / "Services" Teaser:**
    *   The current description is a placeholder. This could be expanded or made more engaging, perhaps with a link to a temporary PDF/document if detailed info is ready.

## UI/UX Refinements

*   **Advanced Animations:**
    *   Explore more complex or subtle hover effects for interactive elements.
    *   Refine existing animation timings and easing functions based on further user testing and feedback.
    *   Consider entry animations for elements within the toggle sections as they become visible (currently, the form elements fade/slide in, which is good).

*   **Accessibility (A11y) Review:**
    *   Conduct a more thorough accessibility audit:
        *   Test with screen readers.
        *   Ensure all interactive elements are fully keyboard navigable and operable.
        *   Check color contrast ratios for all text and UI elements, especially in both light and dark modes.
        *   Add ARIA attributes where appropriate to enhance semantic meaning (e.g., `aria-live` for notifications, more detailed `aria-controls` or `aria-labelledby` for toggle sections if needed).

*   **Custom Scrollbar:**
    *   For a more polished look, consider styling the browser scrollbar (though this has varying levels of support and can be controversial).

*   **Footer Text Justification:**
    *   The user mentioned left-align or justified ("tam paragraf gibi") for the footer. It's currently left-aligned. If a more "block" or justified look is desired, `text-align: justify;` could be experimented with, keeping in mind potential issues with word spacing.

*   **Loading State for Theme Toggle:**
    *   The theme is applied on load based on `localStorage` or `prefers-color-scheme`. There's a slight moment where the default theme might show before the correct one is applied by JS. This could be mitigated by placing a small script very early in the `<head>` to set the theme class on `<body>` before rendering, or by ensuring the CSS is structured to avoid a flash of unstyled content (FOUC). The current `applyTheme(initialUserTheme, true);` call before DOMContentLoaded is good, but FOUC for theme can still occur if CSS isn't structured for it.

## Technical Debt / Improvements

*   **Code Minification & Bundling:**
    *   For production, the embedded CSS and JavaScript could be minified to reduce file size.
    *   If the project were to grow (e.g., with more JS modules or complex CSS), consider using a build tool (like Vite, Parcel, or Webpack) to manage dependencies, bundle assets, and enable features like SCSS/Sass or modern JS transpilation if needed. (Currently, it's simple enough that this is not critical).

*   **Image Optimization:**
    *   If images are added in the future, ensure they are optimized for the web (correct format, compression, responsive sizes using `<picture>` or `srcset`).

*   **Cross-Browser Testing:**
    *   Perform thorough testing on a wider range of browsers (Chrome, Firefox, Safari, Edge) and devices to catch any inconsistencies in rendering or behavior.

*   **Performance Monitoring:**
    *   Use browser developer tools (Lighthouse, Performance tab) to check for any performance bottlenecks, especially around animations and initial load time.

## Content Updates

*   **Finalize Placeholder Text:**
    *   Replace all placeholder text (e.g., in the main message, footer) with final content.
    *   Update the direct mail email address if `support@702.studio` is not the final one.
