import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "./supabaseClient";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-teal-600">CentraHealth</h1>
        <p className="mb-8 text-lg text-gray-600">
          Welcome to our modern management platform. Please register or login to
          continue.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
