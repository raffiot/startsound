import {
  getStorybookUI,
  configure,
  addDecorator,
} from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import "./rn-addons";
import { ThemeDecorator } from "./ThemeDecorator";

// enables knobs for all stories
addDecorator(withKnobs);
addDecorator(ThemeDecorator);

// import stories
configure(() => {
  require("./stories");
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  shouldPersistSelection: true,
  onDeviceUI: true,
});

export default StorybookUIRoot;
