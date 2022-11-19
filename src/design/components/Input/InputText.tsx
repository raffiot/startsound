import { Box, Text, Input } from "native-base";

export type InputTextProps = {
  label: string;
  placeholder: string;
  emoji: string;
};
export const InputText = ({ label, placeholder, emoji }: InputTextProps) => {
  return (
    <Box>
      <Text pb="2">{label}</Text>
      <Input
        w="50%"
        py="2"
        InputLeftElement={<Text px="2">{emoji}</Text>}
        placeholder={placeholder}
      />
    </Box>
  );
};
