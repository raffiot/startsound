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

export type DatePickerProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
} & IFlexProps;

const DateBox = ({ value, ...props }: { value: string } & IBoxProps) => {
  const valueFormatted = value.length === 1 ? `0${value}` : value;
  return (
    <Center backgroundColor="lightRose" p="4" rounded="2xl" {...props}>
      <Text fontSize="2xl" pr="2" backgroundColor="lightRose">
        {valueFormatted}
      </Text>
    </Center>
  );
};

export const DatePicker = ({
  label,
  value,
  onChange,
  ...props
}: DatePickerProps) => {
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
        <DateBox value={value.getDate().toString()} />
        <DateBox value={(value.getMonth() + 1).toString()} ml="4" />
        <DateBox value={value.getFullYear().toString()} ml="4" />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={value}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Pressable>
    </Flex>
  );
};
