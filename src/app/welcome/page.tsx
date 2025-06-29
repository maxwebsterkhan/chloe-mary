import WelcomeHero from "../_components/welcome-hero/welcome-hero";
import WelcomeInfo from "../_components/welcome-info/welcome-info";

export const metadata = {
  title: "Welcome | Chloe Mary Photography",
  description:
    "Welcome to your journey with Chloe Mary Photography. Let's create beautiful memories together.",
};

export default function WelcomePage() {
  return (
    <main>
      <WelcomeHero />
      <WelcomeInfo />
    </main>
  );
}
