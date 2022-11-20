import { Box, Text, Input } from "native-base";

export type InputTextProps = {
  label: string;
  placeholder: string;
  emoji: string;
};
export const InputText = ({ label, placeholder, emoji }: InputTextProps) => {
  return (
    <Box>
      <Text pb="2" fontSize="xl">
        {label}
      </Text>
      <Input
        w="70%"
        py="2"
        size="xl"
        InputLeftElement={
          <Text px="2" fontSize="xl">
            {emoji}
          </Text>
        }
        placeholder={placeholder}
        backgroundColor="white"
      />
    </Box>
  );
};
