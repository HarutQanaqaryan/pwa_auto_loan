import { styled } from "styled-components";

import { Notification as NotificationKit, Props, Item } from "nx-design/Notification";

import { NotificationProps, WrappedNotification } from "../../components/Wrappers";

const NotificationContainer = styled(NotificationKit)`
  /* stylelint-disable selector-class-pattern, max-nesting-depth */
  top: 63px;
  right: 16px;
  bottom: inherit;
  z-index: 1001 !important;

  @media (width <= 768px) {
    max-width: 400px;
  }

  > .Notification-Item_view_outlined {
    height: 81px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }

  > .Notification-Item_status_error {
    border: 1px solid #ffd0d0;
    background: #fdd !important;
  }

  > .Notification-Item_status_success {
    border: 1px solid #e0faef;
    background: #e0faef !important;
  }
`;

export type NotificationItemType = Item;
export const Notification = (props: NotificationProps<Props>) => {
  return <WrappedNotification component={NotificationContainer} props={props} />;
};
