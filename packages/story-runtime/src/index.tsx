export function Callout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderLeft: "4px solid rgb(59, 130, 246)",
        backgroundColor: "rgb(240, 249, 255)",
        paddingLeft: "1rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ fontSize: "0.875rem", color: "rgb(30, 58, 138)" }}>
        {children}
      </div>
    </div>
  );
}

export function StoryHeader({
  title,
  subtitle,
  summary,
}: {
  title: string;
  subtitle?: string;
  summary?: string;
}) {
  return (
    <div
      style={{
        paddingBottom: "2rem",
        marginBottom: "2rem",
        borderBottom: "2px solid rgb(229, 231, 235)",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
          color: "rgb(17, 24, 39)",
          lineHeight: "1.1",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: "1.25rem",
            color: "rgb(75, 85, 99)",
            marginBottom: "1rem",
            fontWeight: "500",
          }}
        >
          {subtitle}
        </p>
      )}

      {summary && (
        <div
          style={{
            fontSize: "1rem",
            color: "rgb(107, 114, 128)",
            lineHeight: "1.6",
            maxWidth: "48rem",
          }}
        >
          {summary}
        </div>
      )}
    </div>
  );
}

// Export all components
export default {
  Callout,
  StoryHeader,
};