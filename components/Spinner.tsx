"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "1rem auto",
};

export default function Spinner() {
  return <ClipLoader color='#3b82f6' cssOverride={override} size={150} aria-label='Loading Spinner' />;
}
