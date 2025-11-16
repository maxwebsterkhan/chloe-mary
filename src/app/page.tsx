import Image from "next/image";
import { head } from "@vercel/blob";

export default async function Home() {
  // Get image URL by pathname
  const blob = await head("wedding-test.jpg");
  const imageUrl = blob.url;

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

        {imageUrl && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Blob Image Test</h2>
            <Image
              src={imageUrl}
              alt="Wedding test image from Vercel Blob"
              width={800}
              height={600}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
