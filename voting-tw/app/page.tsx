"use client";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import barbie from "./(assets)/barbie.jpg";
import oppenheimer from "./(assets)/oppenheimer.jpg";
import vs from "./(assets)/vs.png";

import { getVotes, vote } from "./(voting)/voting";

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full h-6 bg-gray-200 rounded-full">
    <div
      className="h-6 bg-blue-600 rounded-full"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const VersusImage = () => (
  <div className="relative w-10 h-10">
    <Image
      src={vs}
      width={500}
      height={500}
      alt="Versus"
      className="absolute max-w-none"
      style={{
        left: -125,
        top: -150,
        width: 300,
        height: 300,
      }}
    />
  </div>
);

const Card = ({
  image,
  onClick,
  percentage,
  width,
  height,
  alt,
}: {
  image: StaticImageData;
  onClick: () => void;
  percentage: number;
  width: number;
  height: number;
  alt: string;
}) => (
  <div
    className="bg-slate-500 rounded-xl p-5 flex flex-col justify-center items-center"
    onClick={onClick}
  >
    <Image
      src={image}
      width={width}
      height={height}
      alt={alt}
      className="object-contain object-center h-96 mb-5 pointer-events-none"
    />
    <ProgressBar percentage={percentage} />
  </div>
);

const Header = ({ totalVotes }: { totalVotes: number }) => (
  <header className="flex bg-slate-800 text-white text-3xl shadow-lg px-4 py-2 rounded-b-2xl">
    <div className="flex-grow font-bold">Barbenheimer</div>
    <div className="font-thin">{totalVotes} Votes</div>
  </header>
);

export default function Home() {
  const [votes, setVotes] = useState({ barbie: 0, oppenheimer: 0 });

  useEffect(() => {
    getVotes().then(setVotes);
  }, []);

  const totalVotes = votes.barbie + votes.oppenheimer;

  return (
    <main className="mx-auto max-w-7xl px-0 md:px-5">
      <Header totalVotes={totalVotes} />

      <div className="mt-3 md:grid md:grid-cols-11">
        <div className="md:col-span-5 mx-5 md:mx-0 mb-10 md:mb-0">
          <Card
            image={barbie}
            width={550}
            height={800}
            alt="Barbie Poster"
            onClick={() => vote("barbie").then(setVotes)}
            percentage={(votes.barbie / totalVotes) * 100}
          />
        </div>

        <div className="md:col-span-1 flex justify-center items-center">
          <VersusImage />
        </div>

        <div className="md:col-span-5 mx-5 md:mx-0">
          <Card
            image={oppenheimer}
            width={194}
            height={300}
            alt="Oppenheimer Poster"
            onClick={() => vote("oppenheimer").then(setVotes)}
            percentage={(votes.oppenheimer / totalVotes) * 100}
          />
        </div>
      </div>
    </main>
  );
}
