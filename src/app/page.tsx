export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="container">
        <h1>Scaling System Test</h1>
        <p>
          This is a test of the fluid scaling system. The container and text
          should scale smoothly based on the viewport width.
        </p>
        <p>
          The body font-size uses <code>var(--size-font)</code> and the
          container uses <code>var(--size-container)</code>.
        </p>
      </div>
    </main>
  );
}
