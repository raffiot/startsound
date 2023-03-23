import { Progress as NativeProgress } from "native-base";
import { IProgressProps } from "native-base/lib/typescript/components/composites";

export type ProgressProps = {
  value: number;
} & IProgressProps;
export const Progress = ({ value, ...props }: ProgressProps) => {
  return <NativeProgress value={value} {...props} />;
};
