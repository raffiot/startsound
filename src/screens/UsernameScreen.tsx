import React, { useCallback } from "react";
import { Box, Center } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";
import { AuthStackParamList } from "src/navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Username">;
export const UsernameScreen = ({ navigation }: Props) => {
  const onSubmit = useCallback(() => {
    return navigation.navigate("Birth");
  }, []);

  return (
    <Box flex="1" my="16" display="flex" justifyContent="space-between">
      <Center my="auto">
        <Box w="70%">
          <InputText label="Your Username" emoji="👤" placeholder="Alexandre" />
        </Box>
      </Center>
      <Center>
        <Submit onPress={onSubmit} title="Next >" />
      </Center>
    </Box>
  );
};
