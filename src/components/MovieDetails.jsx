import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiFillBackward } from "react-icons/ai";

function MovieDetails() {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch movie details when the component mounts or imdbID changes
    const fetchMovieDetails = async () => {
      // Make an API request to get movie details
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=d860c9a&i=${imdbID}`
        );
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movieDetails) {
    // Display a loading message while fetching data
    return <div className="text-center">Loading...</div>;
  }

  const {
    Title,
    Released,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    Poster,
    Ratings,
  } = movieDetails;

  return (
    <div
      className="h-screen  bg-cover bg-center text-black font-serif"
      style={{
        backgroundImage: `url(${Poster})`,
        opacity: 0.9,
      }}
    >

      <div className="w-10/12 pt-10 flex-wrap flex justify-evenly items-center text-xl mx-auto">
        <div className="pb-5 md:pb-0">
          {/* Movie poster */}
          <img
            className=" border-8 border-slate-800 hover:border-yellow-400 object-cover"
            src={Poster}
            alt={Title}
          />
        </div>
        <div className="w-11/12 md:w-4/12">
          {/* Back button to navigate back to MovieList */}
          <Link to="/" className="cursor-pointer">
            <AiFillBackward className="text-2xl font-bold absolute top-72 lg:top-64 left-2" />
          </Link>
          {/* Display movie details */}
          <h2 className="text-3xl font-bold pb-10 text-center md:text-left">
            {Title}
          </h2>
          {/*<p>Year: {Year}</p>*/}
          <p>
            Released: <span className="font-bold ml-1">{Released}</span>
          </p>
          <p>
            Runtime: <span className="font-bold ml-1">{Runtime}</span>
          </p>
          <p>
            Director: <span className="font-bold ml-1">{Director}</span>
          </p>
          <p>
            Cast: <span className="font-bold ml-1">{Actors}</span>
          </p>
          <p>
            Genre: <span className="font-bold ml-1">{Genre}</span>
          </p>
          <p>
            Plot: <span className="font-bold ml-1 text-lg">{Plot}</span>
          </p>
          <h3 className="font-semibold">Ratings:</h3>
          <ul className="">
            {/* Display movie ratings */}
            {Ratings.map((rating) => (
              <li key={rating.Source}>
                <span>{rating.Source}</span>:
                <span className="font-bold ml-1">{rating.Value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
