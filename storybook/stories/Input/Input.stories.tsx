import { storiesOf } from "@storybook/react-native";
import { InputText } from "@/components/Input/InputText";
import { DatetimePicker } from "@/components/Input/DatetimePicker";

storiesOf("Input", module)
  .add("Input Username", () => (
    <InputText
      label="Your Username"
      placeholder="Alexandre"
      emoji="👤"
      w="70%"
    />
  ))
  .add("Default InlineDatetimePicker", () => (
    <>
      <DatetimePicker
        value={new Date(2020, 6, 7)}
        mode="date"
        onChange={() => {}}
        label="Your birthday"
        emoji="🎂"
      />
      <DatetimePicker
        value={new Date(2020, 6, 7, 10, 10)}
        mode="time"
        onChange={() => {}}
        label="Your birth hour"
        emoji="🕛"
      />
    </>
  ));
