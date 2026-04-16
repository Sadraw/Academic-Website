// home landing page 
export default function Home() {
  return (
    <main
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",
      textAlign: "center",
      fontFamily: "sherif",
      background: "#188639",
    }}
    >
      <h1 style={{fontSize: "2.9rem", letterSpacing: "1px", marginBottom: "0.8rem"
      }}>
        Sadra Daneshmand
      </h1>

      <p style={{ marginBottom: "2rem", fontSize: "1.5rem"
      }}>
        MA English Studies · Discourse · Media · Language
      </p>

      <div style={{fontSize: "1.4rem", marginTop: "0.2rem", display: "flex", gap: "1.5rem"}}>
        <a href="/papers">Papers</a>
        <a href="/videos">Media</a>
        <a href="/cv">CV</a>
        <a href="https://github.com/Sadraw" target="_blank" rel="noopener noreferrer">Github</a>


      </div>
    </main>
  );
}