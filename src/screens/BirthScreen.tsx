import React, { useCallback, useContext, useState } from "react";
import { Box, Center, Spinner } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Submit } from "@/components/Buttons/Submit";
import { DatetimePicker } from "@/components/Input/DatetimePicker";
import { InputText } from "@/components/Input/InputText";
import { AuthStackParamList } from "@/navigation/types";
import { UserContext } from "@/context/UserContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Birth">;
export const BirthScreen = ({ route }: Props) => {
  const { user, updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [birthCity, setBirthCity] = useState<string>(user?.birthplace || "");
  const [birthDate, setBirthDate] = useState(
    user?.birthday ? user.birthday : new Date(834056760000),
  );
  const [birthHour, setBirthHour] = useState(
    user?.birthday ? user.birthday : new Date(834056760000),
  );

  const onSubmit = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      await updateUser({
        id: user.id,
        username: route.params.username,
        birthplace: birthCity,
        birthday: new Date(
          birthDate.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDay(),
          birthHour.getHours(),
          birthHour.getMinutes(),
        ),
        rooms: [],
      });
      setIsLoading(false);
    }
  }, [user, birthCity, birthDate]);

  return (
    <Box flex="1" my="16" display="flex" justifyContent="space-between">
      <Center my="auto">
        <Box w="70%">
          <DatetimePicker
            value={birthDate}
            mode="date"
            onChange={setBirthDate}
            label="Your birthday"
            emoji="🎂"
          />
        </Box>
        <Box w="70%" mt="16">
          <DatetimePicker
            value={birthHour}
            mode="time"
            onChange={setBirthHour}
            label="Your birth hour"
            emoji="🕛"
          />
        </Box>
        <Box w="70%" mt="16">
          <InputText
            emoji="🌍"
            label="Your birth city"
            placeholder="Grenoble"
            input={{
              value: birthCity,
              onChangeText: setBirthCity,
            }}
          />
        </Box>
      </Center>
      <Center>
        {isLoading ? (
          <Spinner />
        ) : (
          <Submit onPress={onSubmit} title="Submit" disabled={!birthCity} />
        )}
      </Center>
    </Box>
  );
};
