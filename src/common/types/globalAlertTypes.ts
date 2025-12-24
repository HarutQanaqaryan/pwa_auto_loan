export const GLOBAL_ALERT_TYPES = {
  choose_card: "choose_card",
  filling_form: "filling_form",
  filling_form_process: "filling_form_process",
  underwriter: "underwriter",
  credit_manager: "credit_manager",
  task_checkbox: "task_checkbox",
  close_task: "close_task",
  clear_database: "clear_database",
  show_comment: "show_comment",
  all_tasks_closed: "all_tasks_closed",
} as const;

export const GLOBAL_ALERT_MESSAGES = {
  [GLOBAL_ALERT_TYPES.choose_card]: "common.globalAlert.messages.chooseCard",
  [GLOBAL_ALERT_TYPES.filling_form]: "common.globalAlert.messages.fillingForm",
  [GLOBAL_ALERT_TYPES.filling_form_process]: "common.globalAlert.messages.fillingFormProcess",
  [GLOBAL_ALERT_TYPES.underwriter]: "common.globalAlert.messages.underwriter",
  [GLOBAL_ALERT_TYPES.credit_manager]: "common.globalAlert.messages.creditManager",
  [GLOBAL_ALERT_TYPES.task_checkbox]: "common.globalAlert.messages.taskCheckbox",
  [GLOBAL_ALERT_TYPES.close_task]: "common.globalAlert.messages.closeTask",
  [GLOBAL_ALERT_TYPES.clear_database]: "common.globalAlert.messages.clearDatabase",
  [GLOBAL_ALERT_TYPES.show_comment]: "common.globalAlert.messages.showComment",
  [GLOBAL_ALERT_TYPES.all_tasks_closed]: "common.globalAlert.messages.allTasksClosed",
} as const;

export type GlobalAlertMessagesType = keyof typeof GLOBAL_ALERT_MESSAGES;

export type AlertContextType = {
  messageType: GlobalAlertMessagesType;
  visible: boolean;
  isHideOnTime: boolean;
  setGlobalAlertMessageType: (message: GlobalAlertMessagesType) => void;
  hideAlert: () => void;
  handleHideOnTime: () => void;
  switchGlobalAlertVisible: () => void;
};
