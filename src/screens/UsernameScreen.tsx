import React, { useCallback, useContext, useState } from "react";
import { Box, Center } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";
import { AuthStackParamList } from "@/navigation/types";
import { UserContext } from "@/context/UserContext";

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
    <Box flex="1" my="16" display="flex" justifyContent="space-between">
      <Center my="auto">
        <Box w="70%">
          <InputText
            label="Your Username"
            emoji="👤"
            placeholder="Alexandre"
            input={{
              value: username,
              onChangeText: setUsername,
            }}
          />
        </Box>
      </Center>
      <Center>
        <Submit onPress={onSubmit} title="Next >" disabled={!username} />
      </Center>
    </Box>
  );
};
