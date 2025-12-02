# Noctra Studio Footer Update

This update implements a premium, glassmorphic footer with advanced interactions and responsive design.

## Changes

- **Component**: `src/components/coming-soon/footer.tsx` - Contains the full footer logic, styles, and SVG icons.
- **Integration**: `src/app/page.tsx` - Imported and placed the `<Footer />` component.
- **Styling**: Uses Tailwind CSS for glassmorphism (`backdrop-blur`, `bg-white/5`), gradients, and responsive layout.
- **Icons**: Custom SVGs for X and Instagram; generic SVG for LinkedIn.

## Configuration

- **LinkedIn URL**: Update the `LINKEDIN_URL` constant in `src/components/coming-soon/footer.tsx` to enable the LinkedIn icon. Currently set to empty string (disabled state).

## Testing Steps

1. **Entrance Animation**: Reload the page. The footer should fade in after a 300ms delay.
2. **Hover Effects**: Hover over the X or Instagram icons. They should scale up (1.05x) and show a subtle glow.
3. **LinkedIn Placeholder**: Hover over the LinkedIn icon. It should be semi-transparent (opacity-40) and show a "LinkedIn profile coming soon" tooltip title. It is not clickable.
4. **Responsiveness**:
   - **Desktop**: Footer is fixed at the bottom with a glassmorphic look.
   - **Mobile**: Footer content stacks vertically (signature top, icons bottom) and is centered.
5. **Accessibility**: Tab through the icons. Focus rings should be visible. Screen readers should read the `aria-label` for each link.
