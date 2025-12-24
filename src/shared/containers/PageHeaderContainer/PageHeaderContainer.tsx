import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext, useAuthService } from "@common/auth";
import { useTranslate } from "@common/hooks";
import { IntlContext } from "@common/localization";
import { IconButton, Typography } from "@common/ui-kit";
import { SignOutIcon } from "@shared";

import { Select } from "antd";
import { styled } from "styled-components";

import { PageHeaderProps, PageHeader as PageHeaderComponent } from "../../components";

const { Option } = Select;
type Props = Pick<PageHeaderProps, "title">;

const StyledUsername = styled(Typography)`
  color: black;
  width: 100%;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  @media (width > 768px) {
    color: black;
  }
`;

export const PageHeaderContainer = ({ title }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isAuthenticated, profile } = useAuthContext();
  const { login, logout } = useAuthService();

  const { onChangeLocale, locale, availableLocales } = useContext(IntlContext);

  const navigate = useNavigate();

  const { translate } = useTranslate();

  const authButtonLabel = isAuthenticated ? translate("auth.button.logout") : translate("auth.button.login");

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  const handleLogoClick = () => {
    navigate("/loan-apps");
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  return (
    <PageHeaderComponent
      isSidebarOpen={isSidebarOpen}
      onSidebarOpen={handleSidebarOpen}
      onSidebarClose={handleSidebarClose}
      onLogoClick={handleLogoClick}
      title={title}
      controls={
        <>
          <StyledUsername>{profile?.preferred_username}</StyledUsername>
          <Select value={locale} onChange={onChangeLocale} style={{ width: "100%" }}>
            {availableLocales.map((el) => (
              <Option key={el} value={el}>
                {el?.toUpperCase()}
              </Option>
            ))}
          </Select>
          <IconButton
            title={authButtonLabel}
            icon={SignOutIcon}
            onClick={handleAuthButtonClick}
            width="21px"
            height="22px"
            style={{ borderRadius: "4px", backgroundColor: "white" }}
          />
        </>
      }
    />
  );
};
