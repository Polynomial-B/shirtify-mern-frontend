import '../../styles/Home.css'


const Home = () => {
  return (
    <>
       <div className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 id="home-page-header" className="title is-1 has-text-weight-bold animated-bounce-in">
              Shirtify
            </h1>
          </div>
        </div>
      </div>
      <div className="text-section">
        <div className="container has-text-centered">
          <h1 className="subtitle mb-5">
            Your Imagination, Your Canvas
          </h1>
          <h2 className="title">
            Custom Tee Creations
          </h2>
        </div>
      </div>
    </>
  );
}


export default Home