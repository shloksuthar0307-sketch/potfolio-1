import axios from 'axios';

const GITHUB_USERNAME = 'shloksuthar0307-sketch';

export const fetchGithubRepos = async () => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
    );

    // Filter to exclude forks and the profile readme repo, sort by stars
    const repos = response.data
      .filter((repo) => !repo.fork && repo.name !== GITHUB_USERNAME)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6); // Get top 6

    return repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      topics: repo.topics || [],
      language: repo.language,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Fallback data
    return [
      {
        id: 1,
        name: 'Portfolio-3D',
        description: 'Immersive premium developer portfolio with 3D elements.',
        html_url: '#',
        homepage: '#',
        stargazers_count: 120,
        topics: ['react', 'threejs', 'gsap'],
        language: 'JavaScript',
      },
      {
        id: 2,
        name: 'E-commerce UI',
        description: 'Modern glassmorphism e-commerce frontend.',
        html_url: '#',
        homepage: '#',
        stargazers_count: 85,
        topics: ['tailwind', 'framer-motion'],
        language: 'TypeScript',
      },
      {
        id: 3,
        name: 'NovaDash Admin',
        description: 'React Admin panel dashboard with full analytics.',
        html_url: '#',
        homepage: '#',
        stargazers_count: 65,
        topics: ['react', 'recharts'],
        language: 'JavaScript',
      },
    ];
  }
};
