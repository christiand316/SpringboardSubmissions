"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type SlackJokeType = {
  attachments: [
    {
      text: string;
    }
  ];
};
export default function Home() {
  return (
    <div className="w-dvw min-h-dvh bg-slate-950 overflow-hidden">
      <div className="m-auto w-1/2 mt-16 bg-slate-900 border-2 border-slate-100 rounded-md p-4 flex flex-col gap-4">
        <Joke />
        <Joke />
        <Joke />
        <Joke />
        <Joke />
      </div>
    </div>
  );
}

function Joke() {
  const [joke, setJoke] = useState<SlackJokeType | null>(null);
  const [loading, setLoading] = useState(true);

  const [votes, setVotes] = useState(0);
  const handleUpvote = () => {
    setVotes((prev) => prev + 1);
  };
  const handleDownvote = () => {
    setVotes((prev) => prev - 1);
  };

  useEffect(() => {
    async function getJoke() {
      setLoading(true);
      const result = await axios.get<SlackJokeType>(
        "https://icanhazdadjoke.com/slack"
      );
      setJoke(result.data);
      setLoading(false);
    }
    getJoke();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="border-slate-100 rounded p-2 border-2">
      <h3>{joke?.attachments[0].text}</h3>
      <div className="flex gap-2">
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleDownvote}>Downvote</button>
        <span>{votes}</span>
      </div>
    </div>
  );
}
