import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Username = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const userRes = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUser(userRes.data);

        // const reposResponse = await axios.get(
        //         `https://api.github.com/users/${username}/repos`
        //       );
        //       setRepos(reposResponse.data);
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepositories = response.data.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setRepositories(sortedRepositories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div className="text-neutral-100 flex justify-center py-10">
      <div>
        {user && (
          <div>
            <div className="flex items-center">
              <div>
                <img className="w-24 h-24 rounded-full" src={user.avatar_url} />
              </div>
              <h2 className="text-3xl font-extrabold pl-8">{user.name}</h2>
            </div>

            <p className="text-neutral-400 text-lg font-medium py-5">
              {user.bio}
            </p>
          </div>
        )}

        <h3 className="text-teal-400 text-xl pb-3">Repositories:</h3>
        {repositories.map((repo) => (
          <div key={repo.id} className="py-2">
            <div className="flex items-center">
              <div className="bg-teal-600 w-3 h-3 rounded-full"></div>
              <h4 className="pl-2 text-teal-600 text-lg font-medium">
                {repo.name}
              </h4>
            </div>

            <p className="text-neutral-500 py-1">{repo.description}</p>
            <div className="flex items-center text-neutral-700">
              <p>Forks: {repo.forks_count}</p>
              <p className="pl-10">Stars: {repo.stargazers_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
