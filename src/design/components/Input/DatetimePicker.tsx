import React, { useState } from "react";
import { Pressable, Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCallback } from "react";

export type DatetimePickerProps = {
  label: string;
  value: Date;
  emoji: string;
  mode: "date" | "time";
  onChange: (date: Date) => void;
};
export const DatetimePicker = ({
  label,
  value,
  emoji,
  mode,
  onChange,
}: DatetimePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  const displayDate = useCallback((value: Date) => {
    if (mode === "date") return value.toDateString();
    const hours = value.getHours();
    return `${hours}:${value.getMinutes()} ${hours > 12 ? "PM" : "AM"}`;
  }, []);

  return (
    <>
      <Text pb="2" fontSize="2xl">
        {label}
      </Text>
      <Pressable
        bg="white"
        onPress={showDatePicker}
        p="2"
        rounded="lg"
        flexDirection="row"
      >
        <Text color="black" fontSize="2xl" mx="2">
          {emoji}
        </Text>
        <Text color="black" fontSize="2xl" pr="2">
          {displayDate(value)}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={value}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Pressable>
    </>
  );
};
