import { IPressableProps, Pressable, Text } from "native-base";

export type SubmitProps = {
  title: string;
} & IPressableProps;
export const Submit = ({ onPress, title, ...props }: SubmitProps) => {
  return (
    <Pressable bg="black" onPress={onPress} p="2" rounded="lg" {...props}>
      <Text color="white" fontSize="2xl">
        {title}
      </Text>
    </Pressable>
  );
};
