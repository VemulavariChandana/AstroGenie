import { cn } from "@/lib/utils";
import hanumaImagePath from "@assets/hanuma.webp";

export function Logo({ className, size = "medium" }: { className?: string; size?: "small" | "medium" | "large" }) {
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 48, height: 48 },
  };

  const { width, height } = dimensions[size];

  return (
    <div
      className={cn(
        "bg-primary rounded-full flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ width, height }}
    >
      <img 
        src={hanumaImagePath} 
        alt="Hanuman" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Logo />
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary">AstroGenie</h1>
    </div>
  );
}
