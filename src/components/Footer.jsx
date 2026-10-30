
export default function SiteFooter() {
  return (
    <footer
      style={{
        width: "100%",
        boxSizing: "border-box",
        marginTop: "48px",
        padding: "24px 16px calc(24px + env(safe-area-inset-bottom, 0px))",
        textAlign: "center",
        background: "#0b0b0b",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        style={{
          color: "#777",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "4px",
        }}
      >
        Cinenow Doesn't host any content.
      </span>
    </footer>
  );
}
