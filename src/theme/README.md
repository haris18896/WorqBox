# Vuexy-Inspired Theme System

A comprehensive, production-ready theming system for React Native + Expo applications, inspired by Vuexy design principles.

## Features

- 🌓 **Light & Dark Mode** - Automatic system theme detection with persistent user preferences
- 🎨 **Vuexy-Inspired Palette** - Beautiful color schemes with semantic naming
- 📱 **Responsive Design** - Scaling utilities for different screen sizes
- 🔤 **Typography System** - Complete Poppins font family integration
- 🧩 **Component Styles** - Pre-built styled components (buttons, cards, inputs, etc.)
- 🧭 **Navigation Integration** - Seamless React Navigation theme support
- 💾 **Persistent Storage** - Theme preferences saved with expo-secure-store
- 🎯 **Type Safety** - Full TypeScript support with IntelliSense

## Quick Start

### 1. Basic Usage

```tsx
import { useTheme } from '@/src/theme';

function MyComponent() {
  const { theme, toggleTheme, isDark, styles } = useTheme();

  return (
    <View style={styles.container.screen}>
      <Text style={styles.text.headline.large}>Hello Vuexy</Text>
      <TouchableOpacity 
        style={[styles.button.primary, styles.button.md]}
        onPress={toggleTheme}
      >
        <Text style={styles.button.text.primary}>
          Toggle Theme ({isDark ? 'Dark' : 'Light'})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 2. App Setup

```tsx
// app/_layout.tsx
import { ThemeProvider } from '@/src/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
```

## API Reference

### Theme Hook

```tsx
const { 
  theme,           // 'light' | 'dark'
  palette,         // ColorPalette object
  styles,          // Pre-built component styles
  navigationTheme,  // React Navigation theme
  isDark,          // boolean
  toggleTheme,     // () => void
  setTheme         // (theme: 'light' | 'dark') => void
} = useTheme();
```

### Color System

#### Color Palette Structure
```tsx
palette = {
  primary: { light: '#38bdf8', main: '#0ea5e9', dark: '#0284c7' },
  secondary: { light: '#94a3b8', main: '#64748b', dark: '#475569' },
  success: { light: '#4ade80', main: '#22c55e', dark: '#16a34a' },
  warning: { light: '#fbbf24', main: '#f59e0b', dark: '#d97706' },
  error: { light: '#f87171', main: '#ef4444', dark: '#dc2626' },
  info: { light: '#60a5fa', main: '#3b82f6', dark: '#2563eb' },
  neutral: { light: '#a3a3a3', main: '#737373', dark: '#525252' },
  surface: { primary: '#ffffff', secondary: '#f8fafc', ... },
  text: { primary: '#0f172a', secondary: '#475569', ... },
  border: { primary: '#e2e8f0', secondary: '#cbd5e1', ... },
  background: { primary: '#ffffff', secondary: '#f8fafc', ... }
}
```

#### Color Utilities
```tsx
import { resolveColorPath, createColorCombinations } from '@/src/theme';

// Resolve nested color paths
const primaryColor = resolveColorPath(palette, 'primary.main');
const textColor = resolveColorPath(palette, 'text.primary');

// Get color combinations
const colors = createColorCombinations(palette);
colors.primary.main    // Main primary color
colors.primary.light   // Light variant
colors.primary.dark    // Dark variant
colors.primary.contrast // Contrast color
```

### Typography System

#### Typography Variants
```tsx
styles.text.display.large    // Large display text
styles.text.headline.medium  // Medium headline
styles.text.title.small     // Small title
styles.text.body.medium     // Medium body text
styles.text.label.large     // Large label
styles.text.caption.medium  // Medium caption
```

#### Font Weights
```tsx
fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  light: 'Poppins-Light',
  extraLight: 'Poppins-ExtraLight',
  thin: 'Poppins-Thin'
}
```

### Component Styles

#### Buttons
```tsx
// Button variants
styles.button.primary   // Primary button
styles.button.secondary // Secondary button
styles.button.outline   // Outline button
styles.button.ghost     // Ghost button

// Button sizes
styles.button.xs        // Extra small
styles.button.sm        // Small
styles.button.md        // Medium (default)
styles.button.lg        // Large
styles.button.xl        // Extra large

// Button text
styles.button.text.primary
styles.button.text.secondary
styles.button.text.outline
styles.button.text.ghost
```

#### Cards
```tsx
styles.card.container   // Basic card
styles.card.elevated    // Card with shadow
styles.card.outlined    // Card with border
styles.card.header      // Card header
styles.card.content     // Card content
styles.card.footer      // Card footer
```

#### Inputs
```tsx
styles.input.container  // Input wrapper
styles.input.field     // Input field
styles.input.focused   // Focused state
styles.input.error     // Error state
styles.input.disabled  // Disabled state
styles.input.text      // Input text
styles.input.label     // Input label
styles.input.error     // Error text
```

#### Containers
```tsx
styles.container.screen   // Full screen container
styles.container.center  // Centered container
styles.container.row     // Row container
styles.container.column  // Column container
styles.container.card    // Card container
styles.container.elevated // Elevated container
```

### Responsive Utilities

```tsx
import { scaleSize, scaleFontSize, WP, HP } from '@/src/theme';

// Scale sizes based on screen width
const scaledSize = scaleSize(16);        // Scale by width
const scaledFont = scaleFontSize(18);    // Scale font size

// Percentage-based sizing
const width80 = WP(80);   // 80% of screen width
const height10 = HP(10);  // 10% of screen height

// Spacing
spacing.xs    // 4px scaled
spacing.sm    // 8px scaled
spacing.md    // 16px scaled
spacing.lg    // 24px scaled
spacing.xl    // 32px scaled

// Border radius
borderRadius.sm    // 4px scaled
borderRadius.md    // 8px scaled
borderRadius.lg    // 12px scaled
borderRadius.xl    // 16px scaled
borderRadius.full  // 9999px (fully rounded)
```

### Navigation Integration

The theme system automatically integrates with React Navigation:

```tsx
// Navigation theme is automatically applied
const { navigationTheme } = useTheme();

// Manual usage
import { getNavigationTheme } from '@/src/theme';
const theme = getNavigationTheme('dark');
```

## Advanced Usage

### Custom Color Paths

```tsx
import { ColorPath } from '@/src/theme';

// Type-safe color paths
const colorPath: ColorPath = 'primary.500';
const resolvedColor = resolveColorPath(palette, colorPath);
```

### Custom Themed Styles

```tsx
import { createThemedStyles } from '@/src/theme';

const customStyles = createThemedStyles(palette);
// Use customStyles.container, customStyles.text, etc.
```

### Theme Persistence

Theme preferences are automatically saved and restored using `expo-secure-store`. The system:

1. Detects system theme preference on first launch
2. Saves user's manual theme selection
3. Restores saved preference on app restart
4. Falls back to system preference if no saved preference exists

## File Structure

```
src/theme/
├── index.ts              # Main exports
├── Colors.ts             # Color palettes and theme detection
├── fonts.ts              # Typography system
├── responsive.ts         # Responsive utilities
├── colorUtils.ts         # Color resolution utilities
├── styleHelpers.ts       # Component style creators
├── navigationTheme.ts     # React Navigation integration
├── ThemeContext.tsx      # Theme provider and hook
├── example.tsx           # Usage examples
└── README.md             # This documentation
```

## Best Practices

1. **Use the hook**: Always use `useTheme()` hook to access theme values
2. **Prefer pre-built styles**: Use `styles.button.primary` instead of custom styles
3. **Responsive design**: Use `scaleSize()` and `WP()`/`HP()` for responsive layouts
4. **Type safety**: Use `ColorPath` type for color resolution
5. **Consistent spacing**: Use the `spacing` object for consistent margins/padding
6. **Semantic colors**: Use semantic color names like `primary`, `success`, `error`

## Migration from Default Colors

Replace your existing color usage:

```tsx
// Before
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    color: '#000000'
  }
});

// After
const { styles } = useTheme();
// Use styles.container.screen, styles.text.primary, etc.
```

This theme system provides a solid foundation for building beautiful, consistent, and maintainable React Native applications with Vuexy-inspired design principles.
