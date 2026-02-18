const Hero = () => {
  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>Train Smarter with AI</h1>
      <p style={styles.subtitle}>
        AI-powered workouts, nutrition plans & supplements
      </p>
      <button style={styles.button}>Get Started</button>
    </section>
  );
};

const styles = {
  hero: {
    height: "80vh",
    backgroundColor: "#222",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    maxWidth: "500px",
  },
  button: {
    marginTop: "25px",
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Hero;
