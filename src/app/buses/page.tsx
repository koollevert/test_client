
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function ImageCard() {
  return (

    <div className="rounded-2xl shadow-lg overflow-hidden bg-white w-80">
      <Image
        src="/IMG_20240205_174752_0.jpg"
        alt="Example Image"
        width={600}
        height={400}
        layout="responsive"
        />
      <div className="p-4">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-gray-600">
          A short description or supporting text goes here.
        </p>
      </div>
    </div>

);
}

// className="w-full h-48 object-cover"