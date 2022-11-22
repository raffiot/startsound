import { Box, Text, Input } from "native-base";

export type InputTextProps = {
  label: string;
  placeholder: string;
  emoji: string;
};
export const InputText = ({ label, placeholder, emoji }: InputTextProps) => {
  return (
    <>
      <Text pb="2" fontSize="2xl">
        {label}
      </Text>
      <Input
        p="2"
        size="2xl"
        fontSize="2xl"
        rounded="lg"
        InputLeftElement={
          <Text mx="2" fontSize="2xl">
            {emoji}
          </Text>
        }
        placeholder={placeholder}
        backgroundColor="white"
      />
    </>
  );
};
