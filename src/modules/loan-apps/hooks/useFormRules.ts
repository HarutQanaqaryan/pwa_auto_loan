import { useTranslate } from "@common/hooks";

import type { RuleObject } from "antd/es/form";
import type { FormInstance } from "antd/lib";

export const useFormRules = () => {
  const { translate, formatNumber } = useTranslate();

  const createRule = (options: {
    required?: boolean;
    pattern?: RegExp;
    messageId: string;
    patternMessageId?: string;
    messageValues?: Record<string, string | number>;
    validator?: (value: string) => boolean;
  }): RuleObject => {
    const rule: RuleObject = {
      validator: (_, value) => {
        const strValue = value?.toString() || "";
        const isEmpty = strValue.trim() === "";

        if (options.required && isEmpty) {
          return Promise.reject(new Error(translate(options.messageId, options.messageValues)));
        }

        if (!options.required && isEmpty) {
          return Promise.resolve();
        }

        if (options.pattern && !options.pattern.test(strValue)) {
          return Promise.reject(
            new Error(translate(options.patternMessageId || options.messageId, options.messageValues)),
          );
        }

        if (options.validator && !options.validator(strValue)) {
          return Promise.reject(
            new Error(translate(options.patternMessageId || options.messageId, options.messageValues)),
          );
        }

        return Promise.resolve();
      },
    };
    if (options?.required) {
      rule.required = true;
    }
    return rule;
  };

  const rules = {
    required: () =>
      createRule({
        required: true,
        messageId: "common.required",
      }),

    russianRequired: () =>
      createRule({
        required: true,
        pattern: /^[а-яА-ЯёЁ\s-]+$/,
        messageId: "common.required",
        patternMessageId: "onlyRussianLetters",
      }),

    russianOptional: () =>
      createRule({
        required: false,
        pattern: /^[а-яА-ЯёЁ\s-]+$/,
        messageId: "onlyRussianLetters",
      }),

    phoneRequired: () =>
      createRule({
        required: true,
        pattern: /^\+7\d{10}$/,
        messageId: "common.required",
        patternMessageId: "phoneFormat",
      }),

    digitsRequired: (length: number) =>
      createRule({
        required: true,
        pattern: new RegExp(`^\\d{${length}}$`),
        messageId: "common.required",
        patternMessageId: "exactlyDigits",
        messageValues: { length },
      }),

    emailRequired: () =>
      createRule({
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messageId: "common.required",
        patternMessageId: "emailFormat",
      }),

    numberRange: (min: number, max: number, required = true, messageId?: string) =>
      createRule({
        required,
        messageId: "common.required",
        patternMessageId: messageId ?? "numberRange",
        pattern: /^\d+$/,
        messageValues: { min: formatNumber(min), max: formatNumber(max) },
        validator: (value: string) => {
          const num = Number(value);
          return num >= min && num <= max;
        },
      }),

    valueLength: (max: number, required = true) =>
      createRule({
        required,
        messageId: "common.required",
        patternMessageId: "maxNumber",
        messageValues: { max },
        validator: (value: string) => {
          return value?.length <= max;
        },
      }),

    digits10or12Required: () =>
      createRule({
        required: true,
        pattern: /^\d{10}$|^\d{12}$/,
        messageId: "common.required",
        patternMessageId: "exactly10or12Digits",
      }),

    downPayment: (percent: number = 0.1, form: FormInstance) => ({
      validator: <T, R>(_: T, value: R) => {
        const loanAmount = form.getFieldValue("loanAmount");

        if (!value) {
          return Promise.resolve();
        }

        if (!loanAmount) {
          return Promise.reject(new Error(translate("fillCreditFirst")));
        }

        const minAmount = Math.ceil(Number(loanAmount) * (percent / 100));

        if (Number(value) < minAmount) {
          return Promise.reject(
            new Error(translate("minDownPayment", { percent, amount: minAmount.toLocaleString() })),
          );
        }

        return Promise.resolve();
      },
    }),

    vinRequired: () =>
      createRule({
        required: true,
        pattern: /^[A-Za-z0-9]{17}$/,
        messageId: "common.required",
        patternMessageId: "step4.vinInvalid",
      }),
  };

  return rules;
};
