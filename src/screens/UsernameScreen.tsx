import React, { useCallback } from "react";
import { Box, Center } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";
import { RootStackParamList } from "@/navigators/types";

type Props = NativeStackScreenProps<RootStackParamList, "Username">;
export const UsernameScreen = ({ navigation }: Props) => {
  const onSubmit = useCallback(() => {
    return navigation.navigate("Birth");
  }, []);

  return (
    <Box flex="1" my="16" display="flex" justifyContent="space-between">
      <Center my="auto">
        <InputText label="Your Username" emoji="👤" placeholder="Alexandre" />
      </Center>
      <Center>
        <Submit onPress={onSubmit} title="Next >" />
      </Center>
    </Box>
  );
};
