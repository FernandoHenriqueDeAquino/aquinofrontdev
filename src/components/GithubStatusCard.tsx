import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "FernandoHenriqueDeAquino";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

type GithubCommit = {
  sha: string;
  message: string;
  url: string;
};

type GithubEvent = {
  type: string;
  payload: { commits: GithubCommit[] };
  repo: { name: string };
  created_at: string;
};

type GithubRepo = {
  pushed_at: string | null;
};

function daysSince(dateString: string) {
  const last = new Date(dateString);
  const now = new Date();
  return Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
}

const GithubStatusCard: React.FC = () => {
  const [commitCount, setCommitCount] = useState<number>(0);
  const [repoCount, setRepoCount] = useState<number>(0);
  const [daysLastCommit, setDaysLastCommit] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      // Fetch recent events (last 300 events)
      const eventsResp = await fetch(GITHUB_API);
      const events: GithubEvent[] = await eventsResp.json();
      // Filter for PushEvents (commits)
      const pushEvents = events.filter((e: GithubEvent) => e.type === "PushEvent");
      let totalCommits = 0;
      const repos = new Set<string>();
      let lastCommitDate = null;
      for (const event of pushEvents) {
        totalCommits += event.payload.commits.length;
        repos.add(event.repo.name);
        if (!lastCommitDate || new Date(event.created_at) > new Date(lastCommitDate)) {
          lastCommitDate = event.created_at;
        }
      }
      // Fetch all repos to count total repos committed to
      const reposResp = await fetch(GITHUB_REPOS_API);
      const reposData: GithubRepo[] = await reposResp.json();
      // Only count repos with at least 1 commit (pushed_at not null)
      const committedRepos = reposData.filter((r: GithubRepo) => r.pushed_at);
      setCommitCount(totalCommits);
      setRepoCount(committedRepos.length);
      setDaysLastCommit(lastCommitDate ? daysSince(lastCommitDate) : null);
      setLoading(false);
    }
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crt-glow" style={{
      background: '#111',
      border: '2px solid #39ff14',
      borderRadius: 8,
      padding: 24,
      color: '#39ff14',
      fontFamily: 'Fira Mono, Consolas, Courier New, monospace',
      maxWidth: 400,
      margin: '32px auto',
      boxShadow: '0 0 16px #39ff14',
      textAlign: 'left',
    }}>
      <h2 style={{marginTop:0}}>GitHub Status</h2>
      {loading ? <p>Loading...</p> : (
        <>
          <p>Commits (last 300 events): <b>{commitCount}</b></p>
          <p>Repositories committed to: <b>{repoCount}</b></p>
          <p>Days since last commit: <b>{daysLastCommit !== null ? daysLastCommit : 'N/A'}</b></p>
        </>
      )}
    </div>
  );
};

export default GithubStatusCard;
