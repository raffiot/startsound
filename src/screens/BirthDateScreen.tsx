import React, { useCallback, useState } from "react";
import { Box } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Submit } from "@/components/Buttons/Submit";
import { AuthStackParamList } from "@/navigation/types";
import { DatePicker } from "@/components/Input/DatePicker";
import { Progress } from "@/components/Progress";
import { SafeAreaLayout } from "@/components/Layouts/SafeAreaLayout";

type Props = NativeStackScreenProps<AuthStackParamList, "BirthDate">;
export const BirthDateScreen = ({ route, navigation }: Props) => {
  const [birthDate, setBirthDate] = useState(new Date(834056760000));

  const onSubmit = useCallback(async () => {
    return navigation.navigate("BirthHour", {
      username: route.params.username,
      birthday: birthDate.toString(),
    });
  }, [birthDate, navigation]);

  return (
    <SafeAreaLayout>
      <Box my="12" width="70%" flex="1" mx="auto">
        <Progress value={40} />
        <DatePicker
          flex="1"
          mt="16"
          value={birthDate}
          onChange={setBirthDate}
          label="WHEN WERE YOU BORN ?"
        />
        <Box mt="auto">
          <Submit onPress={onSubmit} title="NEXT" width="100%" />
        </Box>
      </Box>
    </SafeAreaLayout>
  );
};
