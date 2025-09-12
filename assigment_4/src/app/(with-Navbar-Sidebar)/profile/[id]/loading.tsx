import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
     <LoaderIcon className="animate-spin"/>
    </div>
  );
}
