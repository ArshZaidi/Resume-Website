"use client";

interface Props {
  worldLength: number;
  margin: number;
}

export default function Railway({ worldLength, margin }: Props) {
  return (
    <div
      className="railway"
      style={{
        width: worldLength + margin * 2,
        left: -margin,
      }}
      aria-hidden="true"
    >
      <div className="railway__bed" />
      <div className="railway__rail railway__rail--top" />
      <div className="railway__rail railway__rail--bottom" />
    </div>
  );
}