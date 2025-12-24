export interface NotificationItemType {
  key: string | number;
  message?: string | number;
  title?: string | number;
  status?: NotificationItemStatusType;
  view?: NotificationItemViewType;
  autoClose?: boolean | number;
  icon?: React.ReactNode | React.FC<IconProps>;
  actions?: NotificationPropItemActionType[];
  onClose?: (item: NotificationItemType) => void;
  withCloseButton?: boolean;
  onAutoClose?: (item: NotificationItemType) => void;
  onlyMessage?: boolean;
  withAutoCloseTimer?: boolean;
  hiddenMessage?: boolean;
  titleButtonMoreOn?: string;
  titleButtonMoreOff?: string;
}

export type NotificationType = {
  items: NotificationItemType[];
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: never;
};

export type NotificationItemStatusType = "info" | "system" | "success" | "warning" | "error";

type NotificationItemViewType = "outlined" | "filled";

type NotificationPropItemActionType = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
  iconLeft?: IconComponentType;
  iconSize?: IconPropSizeType;
  view?: ButtonPropViewType;
};

type IconComponentType = React.FC<IconProps>;
type IconPropSizeType = "xs" | "s" | "m" | "l";

type IconPropViewType =
  | "error"
  | "brand"
  | "ghost"
  | "link"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "white"
  | "disabled";

type IconProps = PropsWithHtmlAttributesAndRefProps<
  {
    view?: IconPropViewType;
    size?: IconPropSizeType;
  },
  HTMLSpanElement
>;

type ButtonPropViewType = "primary" | "clear" | "ghost" | "secondary" | "link";

declare type PropsWithHtmlAttributesAndRefProps<Props, HTMLElement> = PropsWithHtmlAttributesProps<
  React.PropsWithoutRef<Props>,
  HTMLElement
> &
  React.RefAttributes<HTMLElement>;

type PropsWithHtmlAttributesProps<Props, HTMLElement> = Props &
  Omit<React.HTMLAttributes<HTMLElement>, keyof Props | "css">;
