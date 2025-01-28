
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

// export default function ImageCard() {
//   return (

//     <div className="rounded-2xl shadow-lg overflow-hidden bg-white w-80">
//       <Image
//         src="/IMG_20240205_174752_0.jpg"
//         alt="Example Image"
//         width={600}
//         height={400}
//         layout="responsive"
//         />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">Card Title</h3>
//         <p className="text-sm text-gray-600">
//           A short description or supporting text goes here.
//         </p>
//       </div>
//     </div>

// );
// }

// import { Card } from "@/components/ui/card";
// import Image from "next/image";

export default function PropertyCard() {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* Image Container */}
      <div className="relative h-48">
        <Image
          src="/IMG_20240205_174752_0.jpg"
          alt="Property Image"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            For Sale
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="text-2xl font-bold text-gray-900 mb-2">
          $450,000
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-gray-600 mb-2">
          <span className="flex items-center">
            <span className="font-semibold">3</span> bed
          </span>
          <span className="flex items-center">
            <span className="font-semibold">2</span> bath
          </span>
          <span className="flex items-center">
            <span className="font-semibold">1,500</span> sqft
          </span>
        </div>

        {/* Address */}
        <p className="text-gray-700 text-sm mb-2">
          123 Main Street, Anytown, ST 12345
        </p>

        {/* Additional Info */}
        <div className="border-t pt-2 mt-2">
          <p className="text-sm text-gray-500">
            Listed by XYZ Realty
          </p>
        </div>
      </div>
    </div>
  );
}

// className="w-full h-48 object-cover"