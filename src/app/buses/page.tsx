"use client"
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button"; // Shadcn UI button component
import { useState } from "react";

// Mock bus data
const mockBusData = {
  busId: "1",
  name: "Express Line",
  seats: Array(40).fill(false), // 40 seats (false = available, true = booked)
};

// Seat Component
const Seat = ({
  seatId,
  booked,
  onClick,
}: {
  seatId: number;
  booked: boolean;
  onClick: (id: number) => void;
}) => {
  const seatStyles = booked
    ? "bg-red-500 cursor-not-allowed"
    : "bg-green-500 hover:bg-green-600";

  return (
    <Button
      className={`h-10 w-10 rounded-md ${seatStyles}`}
      onClick={() => !booked && onClick(seatId)}
      disabled={booked}
    >
      {seatId + 1}
    </Button>
  );
};

// Bus Layout Page
const BusLayout = () => {
  const router = useRouter();
  const { busId } = router.query; // Extract busId from URL (not used in mock)

  // Use mock data to populate the bus layout
  const [bus, setBus] = useState(mockBusData);

  const handleSeatClick = (seatId: number) => {
    setBus((prevBus) => {
      const updatedSeats = [...prevBus.seats];
      updatedSeats[seatId] = true; // Mark the seat as booked
      return { ...prevBus, seats: updatedSeats };
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bus: {bus.name}</h1>
      <div className="grid grid-cols-5 gap-4">
        {bus.seats.map((booked, index) => {
          const isPathway = (index % 5) === 2; // Pathway logic (3rd column is empty)
          return isPathway ? (
            <div key={index} className="h-10"></div> // Empty space for the pathway
          ) : (
            <Seat key={index} seatId={index} booked={booked} onClick={handleSeatClick} />
          );
        })}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Legend:</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 bg-green-500 rounded-md inline-block"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 bg-red-500 rounded-md inline-block"></span>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusLayout;
