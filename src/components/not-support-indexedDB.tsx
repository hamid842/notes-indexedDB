import { Card, CardContent, CardTitle } from "./ui/card";

export default function NotSupportIndexedDB() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="p-4 max-w-sm sm:max-w-md md:max-w-lg text-center">
        <CardTitle className="text-lg sm:text-xl font-inter">
          Your browser does NOT support IndexedDB!
        </CardTitle>
        <CardContent className="flex flex-col items-center gap-2 p-2">
          <p className="text-muted-foreground text-sm sm:text-base font-poppins">
            The numbers in the table specify the first browser version that
            fully supports IndexedDB.
          </p>
          <img
            src="/browsers.png"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
            alt="Browsers"
          />
        </CardContent>
      </Card>
    </div>
  );
}
