import { IButtonProps, Button } from "native-base";

export type SubmitProps = {
  title: string;
} & IButtonProps;
export const Submit = ({ onPress, title, ...props }: SubmitProps) => {
  return (
    <Button bg="black" onPress={onPress} {...props}>
      {title}
    </Button>
  );
};
