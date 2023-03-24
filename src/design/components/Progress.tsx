import { Progress as NativeProgress } from "native-base";
import { IProgressProps } from "native-base/lib/typescript/components/composites";

export type ProgressProps = {
  value: number;
} & IProgressProps;
export const Progress = ({ value, ...props }: ProgressProps) => {
  return (
    <NativeProgress
      value={value}
      _filledTrack={{
        bg: "aqua",
      }}
      bg={{
        linearGradient: {
          colors: ["white", "#B5CBFE"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      {...props}
    />
  );
};
