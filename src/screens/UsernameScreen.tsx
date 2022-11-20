import React, { useCallback } from "react";
import { Box, Center } from "native-base";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";

export const UsernameScreen = () => {
  const onSubmit = useCallback(() => {}, []);

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
