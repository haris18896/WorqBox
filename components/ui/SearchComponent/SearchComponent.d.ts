export interface SearchComponentProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  style?: any;
  containerStyle?: any;
}
