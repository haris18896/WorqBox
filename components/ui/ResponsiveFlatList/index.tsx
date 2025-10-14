import { isTablet, isWeb } from "@/theme/responsive";
import React from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
} from "react-native";

export interface ResponsiveFlatListProps<T>
  extends Omit<FlatListProps<T>, "numColumns"> {
  renderItem: (props: { item: T; index: number }) => React.ReactElement;
  itemSpacing?: number;
  columnSpacing?: number;
  forceColumns?: number; // Override automatic column detection
}

// Get number of columns based on screen size using existing responsive utilities
const getColumnCount = (): number => {
  if (isWeb()) {
    // For web, check if it's a very large screen (2560px+)
    const { width } = Dimensions.get("window");
    if (width >= 2560) return 3;
    return 2;
  }
  if (isTablet()) return 2;
  return 1;
};

export const ResponsiveFlatList = <T,>({
  data = [],
  renderItem,
  itemSpacing = 12,
  columnSpacing = 16,
  forceColumns,
  contentContainerStyle,
  style,
  ...props
}: ResponsiveFlatListProps<T>) => {
  const numColumns = forceColumns || getColumnCount();

  const renderItemWithSpacing = ({
    item,
    index,
  }: {
    item: T;
    index: number;
  }) => {
    const isLastInRow = (index + 1) % numColumns === 0;
    const isLastRow =
      index >=
      (data?.length || 0) - ((data?.length || 0) % numColumns || numColumns);

    return (
      <View
        style={[
          styles.itemContainer,
          {
            marginRight: isLastInRow ? 0 : columnSpacing,
            marginBottom: isLastRow ? 0 : itemSpacing,
            flex: numColumns === 1 ? undefined : 1,
            minHeight: numColumns === 1 ? undefined : 200, // Ensure consistent height in multi-column layout
          },
        ]}
      >
        {renderItem({ item, index })}
      </View>
    );
  };

  const responsiveContentContainerStyle = [
    styles.contentContainer,
    contentContainerStyle,
  ];

  const responsiveStyle = [styles.container, style];

  return (
    <FlatList
      {...props}
      data={data}
      renderItem={renderItemWithSpacing}
      numColumns={numColumns}
      contentContainerStyle={responsiveContentContainerStyle}
      style={responsiveStyle}
      key={`${numColumns}-columns`} // Force re-render when columns change
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    // Container for each item with spacing
  },
});

export default ResponsiveFlatList;
