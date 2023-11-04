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
    <div className="h-screen text-black font-serif overflow-y-auto relative">
      {/* Background image with blur effect */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{
          backgroundImage: `url(${Poster})`,
        }}
      ></div>
      <div className="w-10/12 py-10 flex-wrap flex justify-evenly items-center text-xl mx-auto relative">
        <div className="pb-5 md:pb-0">
          {/* Movie poster (as a foreground image) */}
          <img
            className="border-8 border-slate-800 hover:border-yellow-400 object-cover"
            src={Poster}
            alt={Title}
          />
        </div>
        <div className="w-11/12 md:w-4/12  bg-white bg-opacity-70 p-3 rounded-lg shadow-xl shadow-black">
          {/* Back button to navigate back to MovieList */}
          <Link to="/" className="cursor-pointer">
            <AiFillBackward className="text-white text-2xl font-bold absolute top-2 -left-8 lg:-left-20" />
          </Link>
          {/* Display movie details */}
          <h2 className="text-3xl font-bold pb-10 text-center ">
            {Title}
          </h2>
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
