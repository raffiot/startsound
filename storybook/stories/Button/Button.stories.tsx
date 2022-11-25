import { storiesOf } from "@storybook/react-native";
import { SpotifyLogin } from "@/components/Buttons/SpotifyLogin";
import { Submit } from "@/components/Buttons/Submit";
import { AdditionalContent } from "@/components/Buttons/AdditionalContent";
import { SpotifyPlay } from "@/components/Buttons/SpotifyPlay";

storiesOf("Button", module)
  .add("Spotify", () => <SpotifyLogin title="Connect with spotify" />)
  .add("Submit", () => <Submit title="Submit" />)
  .add("Additional Content", () => (
    <AdditionalContent title="🔓 Unlock more attributes" />
  ))
  .add("Spotify Play", () => <SpotifyPlay isPlaying />);
