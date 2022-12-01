import React, { useCallback, useState } from "react";
import { Box, Center } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Submit } from "@/components/Buttons/Submit";
import { DatetimePicker } from "@/components/Input/DatetimePicker";
import { InputText } from "@/components/Input/InputText";
import { AuthStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Birth">;
export const BirthScreen = ({ navigation }: Props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const onDateChange = useCallback(
    (date: Date) => {
      setDate(date);
    },
    [setDate],
  );

  const [hour, setHour] = useState(new Date(1598051730000));
  const onHourChange = useCallback(
    (hour: Date) => {
      setHour(hour);
    },
    [setDate],
  );

  // TODO: Define how to pass from auth stack to user stack
  const onSubmit = useCallback(() => {}, []);

  return (
    <Box flex="1" my="16" display="flex" justifyContent="space-between">
      <Center my="auto">
        <Box w="70%">
          <DatetimePicker
            value={date}
            mode="date"
            onChange={onDateChange}
            label="Your birthday"
            emoji="🎂"
          />
        </Box>
        <Box w="70%" mt="16">
          <DatetimePicker
            value={hour}
            mode="time"
            onChange={onHourChange}
            label="Your birth hour"
            emoji="🕛"
          />
        </Box>
        <Box w="70%" mt="16">
          <InputText
            emoji="🌍"
            label="Your birth city"
            placeholder="Grenoble"
          />
        </Box>
      </Center>
      <Center>
        <Submit onPress={onSubmit} title="Submit" />
      </Center>
    </Box>
  );
};
