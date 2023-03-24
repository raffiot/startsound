import { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box } from "native-base";
import { AuthStackParamList } from "@/navigation/types";
import { Progress } from "@/components/Progress";
import { Submit } from "@/components/Buttons/Submit";
import { TimePicker } from "@/components/Input/TimePicker";

type Props = NativeStackScreenProps<AuthStackParamList, "BirthHour">;
export const BirthHourScreen = ({ route, navigation }: Props) => {
  const [birthHour, setBirthHour] = useState(new Date(route.params.birthday));

  const onSubmit = useCallback(async () => {
    if (birthHour) {
      return navigation.navigate("BirthPlace", {
        username: route.params.username,
        birthday: birthHour.toString(),
      });
    }
  }, [birthHour, navigation]);

  return (
    <Box my="12" width="70%" flex="1" mx="auto">
      <Progress value={60} />
      <TimePicker
        mt="16"
        value={birthHour}
        onChange={setBirthHour}
        label="AT WHAT TIME?"
      />
      <Box mt="auto">
        <Submit onPress={onSubmit} title="NEXT" width="100%" />
      </Box>
    </Box>
  );
};
