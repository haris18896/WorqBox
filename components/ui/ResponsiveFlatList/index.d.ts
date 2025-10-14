import { FlatListProps } from "react-native";

export interface ResponsiveFlatListProps<T>
  extends Omit<FlatListProps<T>, "numColumns"> {
  renderItem: (props: { item: T; index: number }) => React.ReactElement;
  itemSpacing?: number;
  columnSpacing?: number;
  forceColumns?: number;
}
