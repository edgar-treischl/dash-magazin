import Link from "next/link";
import { getAllStories } from "@/lib/story-loader";

export default function Home() {
  const stories = getAllStories();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #008DC9 0%, #0066a1 100%)",
          padding: "6rem 1.5rem",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
            transform: "translate(150px, -150px)",
          }}
        />
        <div style={{ maxWidth: "56rem", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              marginBottom: "1rem",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            Dash Magazin
          </h1>
          <p
            style={{
              fontSize: "1.375rem",
              marginBottom: "2rem",
              opacity: "0.95",
              maxWidth: "32rem",
              lineHeight: "1.6",
            }}
          >
            Explore data-driven stories that reveal insights and inspire action. Preview, author, and publish compelling narratives.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="#stories"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#ffffff",
                color: "#008DC9",
                fontWeight: "600",
                borderRadius: "0.5rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Explore Stories
            </a>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {stories.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "rgb(107, 114, 128)", fontSize: "1rem" }}>
              No stories available yet. Create one in the{" "}
              <code
                style={{
                  backgroundColor: "rgb(243, 244, 246)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  fontFamily: "monospace",
                }}
              >
                stories/
              </code>{" "}
              directory.
            </p>
          </div>
        ) : (
          <div>
            <h2
              id="stories"
              style={{
                fontSize: "1.875rem",
                fontWeight: "600",
                color: "rgb(17, 24, 39)",
                marginBottom: "1.5rem",
              }}
            >
              Available Stories
            </h2>
            <style>{`
              .story-card {
                display: block;
                padding: 1.5rem;
                border: 1px solid rgb(229, 231, 235);
                border-radius: 0.5rem;
                text-decoration: none;
                transition: all 0.3s ease;
              }
              .story-card:hover {
                border-color: #008DC9;
                box-shadow: 0 10px 25px rgba(0, 141, 201, 0.1);
              }
            `}</style>
            <div style={{ display: "grid", gap: "1rem" }}>
              {stories.map((story) => (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="story-card"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          color: "rgb(17, 24, 39)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {story.metadata.title}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "rgb(107, 114, 128)" }}>
                        v{story.metadata.version}
                      </p>
                    </div>
                    <span
                      style={{
                        marginLeft: "1rem",
                        color: "rgb(209, 213, 219)",
                        fontSize: "1.25rem",
                      }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
