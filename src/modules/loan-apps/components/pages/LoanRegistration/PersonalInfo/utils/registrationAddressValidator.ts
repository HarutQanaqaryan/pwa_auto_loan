import type { FormInstance } from "antd";

export const registrationAddressValidator = (form: FormInstance) => {
  const registrationAddress = form.getFieldValue("registrationAddress");
  const residenceAddress = form.getFieldValue("residenceAddress");

  if (registrationAddress && residenceAddress && registrationAddress === residenceAddress) {
    form.setFieldsValue({
      isRegistrationAddress: true,
    });
    return Promise.resolve();
  } else {
    form.setFieldsValue({
      isRegistrationAddress: false,
    });
    return Promise.resolve();
  }
};
