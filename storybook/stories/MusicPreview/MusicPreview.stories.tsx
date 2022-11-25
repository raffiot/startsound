import { storiesOf } from "@storybook/react-native";
import { MusicPreview } from "@/components/MusicPreview/MusicPreview";

storiesOf("MusicPreview", module).add("MusicPreview", () => (
  <MusicPreview
    isPlaying={false}
    title="If I Ain't Got You"
    artist="Alicia Keys"
    onPress={() => {}}
  />
));
