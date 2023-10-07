export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "var(--padding)",
      }}
    >
      <small>
        🫠 created by{" "}
        <a href="https://www.jeffwilliams.xyz" target="_blank" rel="noreferrer">
          Jeff Williams
        </a>
      </small>
    </footer>
  );
}
