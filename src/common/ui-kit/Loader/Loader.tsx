import React from "react";

import styled from "styled-components";
import { Spin } from "antd";

const StyledSpin = styled(Spin)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loader = () => <StyledSpin size="large" />;
