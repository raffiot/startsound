import { storiesOf } from "@storybook/react-native";
import { SpotifyLogin } from "@/components/Buttons/SpotifyLogin";
import { Submit } from "@/components/Buttons/Submit";

storiesOf("Button", module)
  .add("Spotify", () => <SpotifyLogin title="Connect with spotify" />)
  .add("Submit", () => <Submit title="Submit" />);
