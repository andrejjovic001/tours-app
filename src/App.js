import { useEffect, useState } from "react";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleRemoveTour(id) {
    setTours(tours.filter((tour) => tour.id !== id));
  }

  async function fetchTours() {
    setIsLoading(true);
    try {
      const res = await fetch("https://course-api.com/react-tours-project");

      const data = await res.json();
      setTours(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchTours();
  }, []);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">Tours Agency</h1>
          {tours.length > 0 ? (
            <Tours tours={tours} onRemoveTour={handleRemoveTour} />
          ) : (
            <div className="refresh-btn-container">
              <button className="btn" onClick={() => fetchTours()}>
                Refresh
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

function Loader() {
  return (
    <div>
      <h2 className="loader">Loading...</h2>
    </div>
  );
}

function Tours({ tours, onRemoveTour }) {
  return (
    <div>
      {tours.map((tour) => (
        <Tour tour={tour} key={tour.id} onRemoveTour={onRemoveTour} />
      ))}
    </div>
  );
}

function Tour({ tour, onRemoveTour }) {
  const [isOpen, setIsOpen] = useState(false);
  const fullText = tour.info;
  // const splitedText = tour.info.split(" ").slice(0, 50).join(" ");
  const splitedText = fullText.substring(0, 305);

  return (
    <div className="single-tour">
      <img src={tour.image} alt={tour.name} />
      <footer>
        <div className="tour-info ">
          <h4>{tour.name}</h4>
          <h4 className="tour-price">{tour.price}</h4>
        </div>
        <p>
          {isOpen ? fullText : `${splitedText}...`}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Show less" : "Read more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => onRemoveTour(tour.id)}>
          Not interested
        </button>
      </footer>
    </div>
  );
}

export default App;
