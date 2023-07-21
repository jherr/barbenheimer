"use client";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import barbie from "./(assets)/barbie.jpg";
import oppenheimer from "./(assets)/oppenheimer.jpg";
import vs from "./(assets)/vs.png";

import { getVotes, vote } from "./(voting)/voting";

import { css, cx, cva } from "@/styled-system/css";
import { hstack, vstack, grid, gridItem } from "@/styled-system/patterns";

const progressContainer = cva({
  base: {
    w: "full",
    h: 6,
    bg: "gray.200",
    rounded: "full",
  },
  variants: {},
  defaultVariants: {},
});

const progress = cva({
  base: {
    w: "full",
    h: 6,
    bg: "gray.200",
    rounded: "full",
  },
  variants: {
    color: {
      teal: {
        bg: "teal.600",
      },
      slate: {
        bg: "slate.600",
      },
      red: {
        bg: "red.600",
      },
      yellow: {
        bg: "yellow.600",
      },
      green: {
        bg: "green.600",
      },
      blue: {
        bg: "blue.600",
      },
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className={progressContainer()}>
    <div
      className={progress({ color: "blue" })}
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const VersusImage = () => (
  <div className={css({ position: "relative", w: 10, h: 10 })}>
    <Image
      src={vs}
      width={500}
      height={500}
      alt="Versus"
      className={css({ position: "absolute", maxWidth: "none" })}
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
    className={vstack({
      bg: "slate.500",
      rounded: "xl",
      p: 5,
      flexDir: "column",
      justifyContent: "center",
      alignItems: "center",
    })}
    onClick={onClick}
  >
    <Image
      src={image}
      width={width}
      height={height}
      alt={alt}
      className={css({
        objectFit: "contain",
        objectPosition: "center",
        h: 96,
        mb: 5,
        pointerEvents: "none",
      })}
    />
    <ProgressBar percentage={percentage} />
  </div>
);

const Header = ({ totalVotes }: { totalVotes: number }) => (
  <header
    className={hstack({
      backgroundColor: "slate.800",
      color: "white",
      fontSize: "3xl",
      shadow: "lg",
      px: 4,
      py: 2,
      roundedBottom: "2xl",
    })}
  >
    <div className={css({ flexGrow: 1, fontWeight: "bold" })}>Barbenheimer</div>
    <div className={css({ fontWeight: "thin" })}>{totalVotes} Votes</div>
  </header>
);

export default function Home() {
  const [votes, setVotes] = useState({ barbie: 0, oppenheimer: 0 });

  useEffect(() => {
    getVotes().then(setVotes);
  }, []);

  const totalVotes = votes.barbie + votes.oppenheimer;

  return (
    <main
      className={css({ mx: "auto", maxWidth: "7xl", px: { base: 0, md: 5 } })}
    >
      <Header totalVotes={totalVotes} />

      <div className={grid({ mt: 3, columns: { md: 11 } })}>
        <div
          className={gridItem({
            colSpan: { md: 5 },
            mx: 5,
            md: { mx: 0, mb: 0 },
            mb: 10,
          })}
        >
          <Card
            image={barbie}
            width={550}
            height={800}
            alt="Barbie Poster"
            onClick={() => vote("barbie").then(setVotes)}
            percentage={(votes.barbie / totalVotes) * 100}
          />
        </div>

        <div
          className={cx(
            hstack({ justifyContent: "center", alignItems: "center" }),
            gridItem({ colSpan: { md: 1 } })
          )}
        >
          <VersusImage />
        </div>

        <div
          className={gridItem({
            colSpan: { md: 5 },
            mx: 5,
            md: { mx: 0, mb: 0 },
            mb: 10,
          })}
        >
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
