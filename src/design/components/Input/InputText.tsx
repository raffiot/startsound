import { Text, Input, Flex, IFlexProps, IInputProps } from "native-base";

export type InputTextProps = {
  label: string;
  placeholder: string;
  input: IInputProps;
} & IFlexProps;
export const InputText = ({
  label,
  placeholder,
  input,
  ...props
}: InputTextProps) => {
  return (
    <Flex {...props}>
      <Text pb="2" fontSize="2xl" fontWeight="bold">
        {label}
      </Text>
      <Input
        borderWidth={0}
        px="4"
        py="6"
        size="2xl"
        fontSize="2xl"
        fontWeight="regular"
        rounded="2xl"
        placeholder={placeholder}
        placeholderTextColor="lightGray"
        backgroundColor="lightRose"
        {...input}
      />
    </Flex>
  );
};
