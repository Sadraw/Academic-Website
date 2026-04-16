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
      <h1 style={{fontSize: "3rem", letterSpacing: "1px"
      }}>
        Sadra Daneshmand
      </h1>

      <p style={{ marginTop: "1rem", fontSize: "1.5rem"
      }}>
        MA English Studies · Discourse · Media · Language
      </p>

      <div style={{fontSize: "1.4rem", marginTop: "2.5rem", display: "flex", gap: "1.5rem"}}>
        <a href="/papers">Papers</a>
        <a href="/videos">Media</a>
        <a href="/cv">CV</a>
        <a href="https://github.com/Sadraw" target="_blank" rel="noopener noreferrer">Github</a>


      </div>
    </main>
  );
}