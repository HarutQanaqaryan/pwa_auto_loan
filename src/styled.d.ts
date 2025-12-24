import {} from "styled-components";

import { AppThemeType } from "@shared";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultTheme extends AppThemeType {}
}
