import { IPressableProps, Pressable, Text } from "native-base";

export type SubmitProps = {
  title: string;
} & IPressableProps;
export const AdditionalContent = ({
  onPress,
  title,
  ...props
}: SubmitProps) => {
  return (
    <Pressable
      bg="green.600"
      onPress={onPress}
      px="4"
      py="2"
      rounded="xl"
      {...props}
    >
      <Text color="white" fontSize="2xl">
        {title}
      </Text>
    </Pressable>
  );
};
