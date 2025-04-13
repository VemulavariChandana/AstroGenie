import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { HoroscopeResults } from "@/components/horoscope-results";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HoroscopeResult } from "@shared/schema";
import { ArrowLeft } from "lucide-react";

export default function HoroscopeDetailPage() {
  const params = useParams<{ id: string }>();
  const horoscopeId = params.id;

  const { data: horoscope, isLoading, error } = useQuery({
    queryKey: [`/api/horoscope/${horoscopeId}`],
  });

  if (isLoading) {
    return (
      <div className="container py-10">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/history">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </Link>
        </Button>
        <Skeleton className="h-12 w-1/2 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
          <div>
            <Skeleton className="h-64 w-full mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !horoscope) {
    return (
      <div className="container py-10 text-center">
        <p className="text-red-500 mb-4">Failed to load horoscope details.</p>
        <Button variant="outline" asChild>
          <Link href="/history">Back to History</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/history">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Link>
      </Button>

      <HoroscopeResults 
        result={horoscope as HoroscopeResult} 
        isLoading={false} 
      />
    </div>
  );
}