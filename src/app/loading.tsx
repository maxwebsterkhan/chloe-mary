import LogoLoader from "./_components/logo-loader/logo-loader";

export default function Loading() {
  return (
    <main id="main" tabIndex={-1}>
      <LogoLoader showOnce={false} duration={0.6} />
    </main>
  );
}

