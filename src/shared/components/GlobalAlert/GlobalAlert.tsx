/* eslint-disable import/no-restricted-paths */
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router-dom";

import { useTranslate } from "@common/hooks";
import { GLOBAL_ALERT_MESSAGES, GLOBAL_ALERT_TYPES, GlobalAlertMessagesType } from "@common/types";
import { Button, IconButton } from "@common/ui-kit";
import { KmAvatarIcon, UwAvatarIcon, CloseCircleIcon } from "@shared";

import { styled } from "styled-components";

import { useGlobalAlert } from "../../hooks";

const StyledAlert = styled.div`
  padding: 16px 24px;
  background-color: #f5ecf1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  z-index: 8;
  position: relative;
`;

const AlertText = styled.span`
  flex-grow: 1;
  text-align: center;
`;

const AlertContainer = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  width: 598px;
  width: ${(props) => props.width};
  margin: 0 auto;
`;

const AlertImage = styled.img`
  margin: 0 16px;
`;

const GlobalAlertUser = ({
  messageType,
  icon,
  label,
}: {
  messageType: GlobalAlertMessagesType;
  icon: string;
  label: string;
}) => {
  const { isAuthenticated, signinRedirect, signoutSilent, removeUser } = useAuth();

  const { translate } = useTranslate();

  const handleAuthButtonClick = async () => {
    if (isAuthenticated) {
      await signoutSilent();
      await removeUser();

      await signinRedirect({ redirect_uri: `${window.location.origin}/resolver` });
    }
  };

  return (
    <AlertContainer width={messageType === "underwriter" ? "509px" : "598px"}>
      {translate(GLOBAL_ALERT_MESSAGES[messageType])}
      <AlertImage alt="avatar" src={icon} />
      <Button size="l" label={label} onClick={handleAuthButtonClick} />
    </AlertContainer>
  );
};

const GlobarAlertContent = ({ messageType }: { messageType: GlobalAlertMessagesType }) => {
  const { translate } = useTranslate();

  if (messageType === GLOBAL_ALERT_TYPES.underwriter) {
    return (
      <GlobalAlertUser
        messageType={messageType}
        icon={UwAvatarIcon}
        label={translate("common.globalAlert.types.underwriter")}
      />
    );
  }
  if (messageType === GLOBAL_ALERT_TYPES.credit_manager) {
    return (
      <GlobalAlertUser
        messageType={messageType}
        icon={KmAvatarIcon}
        label={translate("common.globalAlert.types.creditManager")}
      />
    );
  }

  return <AlertText>{translate(GLOBAL_ALERT_MESSAGES[messageType])}</AlertText>;
};

export const GlobalAlert = () => {
  const { visible, isHideOnTime, setGlobalAlertMessageType, hideAlert, handleHideOnTime, messageType } =
    useGlobalAlert();
  const location = useLocation();

  useEffect(() => {
    let hideAlert = true;

    if (location.pathname === "/products") {
      setGlobalAlertMessageType(GLOBAL_ALERT_TYPES.choose_card);
      hideAlert = false;
    }
    if (location.pathname === "/loan-apps") {
      setGlobalAlertMessageType(GLOBAL_ALERT_TYPES.show_comment);
      hideAlert = false;
    }
    if (location.pathname === "/loan-apps/new") {
      setGlobalAlertMessageType(GLOBAL_ALERT_TYPES.filling_form);
      hideAlert = false;
    }
    if (location.pathname === "/settings") {
      setGlobalAlertMessageType(GLOBAL_ALERT_TYPES.clear_database);
      hideAlert = false;
    }
    if (/^\/tasks\/\d+$/.test(location.pathname)) {
      setGlobalAlertMessageType(GLOBAL_ALERT_TYPES.task_checkbox);
      hideAlert = false;
    }

    if (hideAlert) {
      handleHideOnTime();
    }
  }, [location.pathname]);

  if (!visible || isHideOnTime) return null;

  return (
    <StyledAlert>
      <GlobarAlertContent messageType={messageType} />
      <IconButton
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        icon={CloseCircleIcon}
        onClick={hideAlert}
        width="20px"
        height="20px"
        style={{ position: "absolute", top: "16px", right: "38px" }}
      />
    </StyledAlert>
  );
};
