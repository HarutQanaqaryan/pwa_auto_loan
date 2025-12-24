export interface AppThemeType {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bgPrimary: string;
    bgSecondary: string;
    bgDefault: string;
    bgDefaultHover: string;
    success: string;
    warning: string;
    error: string;
    active: string;
  };
  spaces: SizeType;
  borders: BorderType;
  borderRadius: SizeType;
  fonts: FontType;
  shadows: ShadowType;
}

export interface SizeType {
  xxs: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
}

export interface BorderType {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
}

export interface ShadowType {
  group: string;
  layer: string;
  modal: string;
  table: string;
  sticky: string;
  card: string;
  container: string;
}

export interface FontType {
  light: string;
  regular: string;
  bold: string;
}
