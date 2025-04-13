import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HoroscopeFormData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface HoroscopeFormProps {
  onSuccess: (data: any) => void;
}

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
  birthTime: z.string().min(1, {
    message: "Please enter your birth time.",
  }),
  birthPlace: z.string().min(2, {
    message: "Please enter your birth place.",
  }),
});

export function HoroscopeForm({ onSuccess }: HoroscopeFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
    },
  });

  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: HoroscopeFormData) => {
      try {
        const response = await apiRequest("/api/horoscope", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json"
          }
        });
        return response;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate horoscope. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      setIsLoading(false);
      onSuccess(data);
    },
    onError: (error: any) => {
      setIsLoading(false);
      const message = error.response?.data?.message || error.message || "Unknown error occurred";
      toast({
        title: "Error",
        description: `Failed to generate horoscope: ${message}`,
        variant: "destructive",
      });
      console.error("Horoscope generation error:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    mutation.mutate(values as HoroscopeFormData);
  }

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="px-4 py-3 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="px-4 py-3 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="px-4 py-3 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Place</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Country"
                        {...field}
                        className="px-4 py-3 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 pt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate My Jathakam"}
              </Button>
              <Button
                type="reset"
                variant="outline"
                className="bg-white hover:bg-gray-100 text-gray-800 font-medium px-8 py-3 rounded-full shadow-md border border-gray-300 transition-all w-full md:w-auto"
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}