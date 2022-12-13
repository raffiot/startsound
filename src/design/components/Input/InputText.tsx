import { Text, Input, Flex, IFlexProps, IInputProps } from "native-base";

export type InputTextProps = {
  label: string;
  placeholder: string;
  emoji: string;
  input: IInputProps;
} & IFlexProps;
export const InputText = ({
  label,
  placeholder,
  emoji,
  input,
  ...props
}: InputTextProps) => {
  return (
    <Flex {...props}>
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
        {...input}
      />
    </Flex>
  );
};
