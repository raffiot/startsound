import React, { useCallback, useContext, useState } from "react";
import { Box, Center } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";
import { AuthStackParamList } from "@/navigation/types";
import { UserContext } from "@/context/UserContext";
import { Progress } from "@/components/Progress";

type Props = NativeStackScreenProps<AuthStackParamList, "Username">;
export const UsernameScreen = ({ navigation }: Props) => {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState<string>(user?.username || "");

  const onSubmit = useCallback(async () => {
    if (username) {
      return navigation.navigate("Birth", { username });
    }
  }, [username, navigation]);

  return (
    <Box mt="8" width="70%" flex="1" mx="auto">
      <Progress value={20} />
      <InputText
        mt="16"
        label="WHAT'S YOUR NAME?"
        placeholder="Alexandre"
        input={{
          value: username,
          onChangeText: setUsername,
        }}
      />
      <Box mt="auto">
        <Submit
          onPress={onSubmit}
          title="NEXT"
          width="100%"
          disabled={!username}
        />
      </Box>
    </Box>
  );
};
