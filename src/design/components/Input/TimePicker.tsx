import React, { useState } from "react";
import {
  Pressable,
  Text,
  Center,
  IBoxProps,
  IFlexProps,
  Flex,
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export type TimePickerProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
} & IFlexProps;

const TimeBox = ({ value, ...props }: { value: string } & IBoxProps) => {
  const valueFormatted = value.length === 1 ? `0${value}` : value;
  return (
    <Center backgroundColor="lightRose" p="4" rounded="2xl" flex="1" {...props}>
      <Text fontSize="2xl" pr="2" backgroundColor="lightRose">
        {valueFormatted}
      </Text>
    </Center>
  );
};

export const TimePicker = ({
  label,
  value,
  onChange,
  ...props
}: TimePickerProps) => {
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

  return (
    <Flex {...props}>
      <Text pb="2" fontSize="2xl" fontWeight="bold">
        {label}
      </Text>
      <Pressable onPress={showDatePicker} rounded="lg" flexDirection="row">
        <TimeBox value={value.getHours().toString()} />
        <TimeBox value={value.getMinutes().toString()} ml="4" />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={value}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Pressable>
    </Flex>
  );
};
