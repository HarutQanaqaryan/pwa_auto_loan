import { useIntl } from "react-intl";

export const useTranslate = () => {
  const { formatMessage, formatNumber } = useIntl();

  const translate = (id: string, options = {}) => formatMessage({ id }, options);

  return {
    translate,
    formatNumber,
  };
};
