/**
 * Example usage of the Vuexy-inspired theme system
 * This file demonstrates how to use all the theme utilities
 */

import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createColorCombinations,
  HP,
  resolveColorPath,
  scaleSize,
  useTheme,
  WP,
} from "./index";

// Example component showing theme usage
export const ThemeExample: React.FC = () => {
  const { theme, toggleTheme, isDark, styles, palette } = useTheme();

  // You can also create custom styles using the palette
  // const customStyles = createThemedStyles(palette);

  // Access color combinations
  const colors = createColorCombinations(palette);

  // Resolve specific color paths
  const primaryColor = resolveColorPath(palette, "primary.main");
  const textColor = resolveColorPath(palette, "text.primary");

  return (
    <ScrollView style={styles.container.screen}>
      <View style={styles.container.center}>
        {/* Typography Examples */}
        <Text style={styles.text.display.large}>Display Large</Text>
        <Text style={styles.text.headline.medium}>Headline Medium</Text>
        <Text style={styles.text.title.small}>Title Small</Text>
        <Text style={styles.text.body.medium}>Body Medium Text</Text>
        <Text style={styles.text.label.large}>Label Large</Text>
        <Text style={styles.text.caption.medium}>Caption Medium</Text>

        {/* Colored Text Examples */}
        <Text style={[styles.text.body.medium, styles.text.primary]}>
          Primary Text
        </Text>
        <Text style={[styles.text.body.medium, styles.text.success]}>
          Success Text
        </Text>
        <Text style={[styles.text.body.medium, styles.text.error]}>
          Error Text
        </Text>
        <Text style={[styles.text.body.medium, styles.text.warning]}>
          Warning Text
        </Text>

        {/* Button Examples */}
        <TouchableOpacity style={[styles.button.primary, styles.button.md]}>
          <Text style={styles.button.text.primary}>Primary Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button.secondary, styles.button.md]}>
          <Text style={styles.button.text.secondary}>Secondary Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button.outline, styles.button.md]}>
          <Text style={styles.button.text.outline}>Outline Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button.ghost, styles.button.md]}>
          <Text style={styles.button.text.ghost}>Ghost Button</Text>
        </TouchableOpacity>

        {/* Button Sizes */}
        <TouchableOpacity style={[styles.button.primary, styles.button.xs]}>
          <Text style={styles.button.text.primary}>XS Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button.primary, styles.button.lg]}>
          <Text style={styles.button.text.primary}>LG Button</Text>
        </TouchableOpacity>

        {/* Card Examples */}
        <View style={styles.card.container}>
          <Text style={styles.text.title.medium}>Card Title</Text>
          <Text style={styles.text.body.small}>
            This is a card with themed styling.
          </Text>
        </View>

        <View style={styles.card.elevated}>
          <Text style={styles.text.title.medium}>Elevated Card</Text>
          <Text style={styles.text.body.small}>
            This card has elevation shadow.
          </Text>
        </View>

        <View style={styles.card.outlined}>
          <Text style={styles.text.title.medium}>Outlined Card</Text>
          <Text style={styles.text.body.small}>
            This card has a border outline.
          </Text>
        </View>

        {/* Input Examples */}
        <View style={styles.input.container}>
          <Text style={styles.input.label}>Input Label</Text>
          <TextInput
            style={styles.input.textInput}
            placeholder="Enter text here"
            placeholderTextColor={colors.text.placeholder}
          />
        </View>

        <View style={styles.input.container}>
          <Text style={styles.input.label}>Focused Input</Text>
          <TextInput
            style={[styles.input.textInput, styles.input.textInputFocused]}
            placeholder="Focused input"
            placeholderTextColor={colors.text.placeholder}
          />
        </View>

        <View style={styles.input.container}>
          <Text style={styles.input.label}>Error Input</Text>
          <TextInput
            style={[styles.input.textInput, styles.input.textInputError]}
            placeholder="Error input"
            placeholderTextColor={colors.text.placeholder}
          />
          <Text style={styles.input.errorText}>This field has an error</Text>
        </View>

        {/* Divider Examples */}
        <View style={styles.divider.horizontal} />

        {/* Spacing Examples */}
        <View style={styles.spacing.paddingMd}>
          <Text style={styles.text.body.medium}>This has medium padding</Text>
        </View>

        {/* Custom styling with direct color access */}
        <View
          style={{
            backgroundColor: primaryColor,
            padding: scaleSize(16),
            borderRadius: scaleSize(8),
            width: WP(80),
            marginVertical: HP(2),
          }}
        >
          <Text style={{ color: textColor, textAlign: "center" }}>
            Custom styled view with direct color access
          </Text>
        </View>

        {/* Theme toggle button */}
        <TouchableOpacity
          style={[styles.button.outline, styles.button.lg]}
          onPress={toggleTheme}
        >
          <Text style={styles.button.text.outline}>
            Toggle Theme ({isDark ? "Dark" : "Light"})
          </Text>
        </TouchableOpacity>

        {/* Theme info */}
        <Text style={styles.text.caption.medium}>Current theme: {theme}</Text>
      </View>
    </ScrollView>
  );
};

// Example of creating custom themed components
export const CustomThemedComponent: React.FC<{
  title: string;
  onPress: () => void;
}> = ({ title, onPress }) => {
  const { styles } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button.primary, styles.button.md]}
      onPress={onPress}
    >
      <Text style={styles.button.text.primary}>{title}</Text>
    </TouchableOpacity>
  );
};

// Example of using responsive utilities
export const ResponsiveExample: React.FC = () => {
  const { styles } = useTheme();

  return (
    <View
      style={{
        ...styles.container.screen,
        paddingHorizontal: WP(5), // 5% of screen width
        paddingVertical: HP(2), // 2% of screen height
      }}
    >
      <Text style={[styles.text.headline.medium, { fontSize: scaleSize(24) }]}>
        Responsive Text
      </Text>
    </View>
  );
};
