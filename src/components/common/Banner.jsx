const Banner = () => (
    <section style={{
      background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
      color: 'white',
      padding: '5rem 0',
      textAlign: 'center'
    }}>
      <div className="container">
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          Dance Room
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
          Студия современных танцев в Барнауле. Раскрой свой талант с лучшими преподавателями!
        </p>
      </div>
    </section>
  );
  
  export default Banner;
  