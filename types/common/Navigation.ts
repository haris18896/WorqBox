export interface NavigationParams {
  [key: string]: any;
}

export interface AuthStackParamList {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
}

export interface MainStackParamList {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
}

export interface RootStackParamList
  extends AuthStackParamList,
    MainStackParamList {}

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any;
  route: { params: AuthStackParamList[T] };
};

export type MainStackScreenProps<T extends keyof MainStackParamList> = {
  navigation: any;
  route: { params: MainStackParamList[T] };
};
