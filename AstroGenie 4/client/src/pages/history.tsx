import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Link } from "wouter";

interface HoroscopeHistoryItem {
  id: number;
  fullName: string;
  birthDate: string;
  createdAt: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
}

export default function HistoryPage() {
  const { user, isLoading: authLoading } = useAuth();
  
  const { data: horoscopeHistory, isLoading, error } = useQuery({
    queryKey: ['/api/user/horoscopes'],
    enabled: !!user, // Only fetch if user is logged in
  });

  // If auth is still loading, show loading state
  if (authLoading) {
    return <div className="container py-10">Loading authentication state...</div>;
  }

  // Redirect to home if not logged in
  if (!user && !authLoading) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Horoscope History</h1>
        <Link href="/">
          <Button>Generate New Horoscope</Button>
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-3 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-[100px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">Failed to load your horoscope history.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && horoscopeHistory?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven't generated any horoscopes yet.</p>
          <Link href="/">
            <Button>Generate Your First Horoscope</Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && horoscopeHistory?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(horoscopeHistory as HoroscopeHistoryItem[]).map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{item.fullName}</CardTitle>
                <CardDescription>
                  Born: {formatDate(new Date(item.birthDate))}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Sun Sign:</span> {item.sunSign}</p>
                  <p><span className="font-medium">Moon Sign:</span> {item.moonSign}</p>
                  <p><span className="font-medium">Rising Sign:</span> {item.risingSign}</p>
                  <p className="text-sm text-gray-500">
                    Generated on {formatDate(new Date(item.createdAt))}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/horoscope/${item.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}