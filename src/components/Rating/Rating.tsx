import { IconStarFilled } from "@tabler/icons-react";

export const Rating = ({ rating }: { rating: number }) => {
  const arr = Array(rating).fill(rating);

  return (
    <div className="flex">
      {arr.map((index) => (
        <IconStarFilled className="text-red-500 size-4" key={index} />
      ))}
    </div>
  );
};
