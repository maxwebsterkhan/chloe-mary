import { Metadata } from "next";
import WelcomeHero from "../_components/welcome-hero/welcome-hero";
import WelcomeInfo from "../_components/welcome-info/welcome-info";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function WelcomePage() {
  return (
    <main>
      <WelcomeHero />
      <WelcomeInfo />
    </main>
  );
}
