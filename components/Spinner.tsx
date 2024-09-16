"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "1rem auto",
};

export default function Spinner({ size = 150 }: { size?: number }) {
  return <ClipLoader color='#3b82f6' cssOverride={override} size={size} aria-label='Loading Spinner' />;
}
