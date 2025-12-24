const path = require("path");

const aliases = {
  "@common/auth": path.resolve(__dirname, "../src/common/auth"),
  "@common/components": path.resolve(__dirname, "../src/common/components"),
  "@common/config-service": path.resolve(__dirname, "../src/common/config-service"),
  "@common/data-access": path.resolve(__dirname, "../src/common/data-access"),
  "@common/event-bus-service": path.resolve(__dirname, "../src/common/event-bus-service"),
  "@common/helpers": path.resolve(__dirname, "../src/common/helpers"),
  "@common/hooks": path.resolve(__dirname, "../src/common/hooks"),
  "@common/localization": path.resolve(__dirname, "../src/common/localization"),
  "@common/logger": path.resolve(__dirname, "../src/common/logger"),
  "@common/notifications": path.resolve(__dirname, "../src/common/notifications"),
  "@common/theme": path.resolve(__dirname, "../src/common/theme"),
  "@common/types": path.resolve(__dirname, "../src/common/types"),
  "@common/ui-kit": path.resolve(__dirname, "../src/common/ui-kit"),
  "@shared": path.resolve(__dirname, "../src/shared"),
  "@main": path.resolve(__dirname, "../src/modules/main"),
  "@loan-apps": path.resolve(__dirname, "../src/modules/loan-apps"),
};

module.exports = {
  aliases,
};
