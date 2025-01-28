
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ImageCard() {
  return (
    <Card className="w-80 overflow-hidden">
      <img
        src="../public/IMG_20240205_174752_0.jpg"
        alt="Example Image"
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>A short description or supporting text goes here.</CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
