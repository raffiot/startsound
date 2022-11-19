import { storiesOf } from "@storybook/react-native";
import { InputText } from "@/components/Input/InputText";

storiesOf("Input", module).add("Input Username", () => (
  <InputText label="Your Username" placeholder="Alexandre" emoji="👤" />
));
