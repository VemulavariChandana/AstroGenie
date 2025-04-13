import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { HoroscopeResult } from "@shared/schema";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface HoroscopeResultsProps {
  result: HoroscopeResult;
  isLoading: boolean;
}

export function HoroscopeResults({ result, isLoading }: HoroscopeResultsProps) {
  const { toast } = useToast();
  const [language, setLanguage] = useState<"english" | "telugu">("english");
  
  const handleDownloadChart = () => {
    // In a real implementation, this would generate and download the chart
    toast({
      title: "Chart Downloaded",
      description: "Your birth chart has been downloaded successfully.",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-500">Consulting the stars...</p>
      </div>
    );
  }

  const getContent = (section: keyof typeof result.predictions, language: "english" | "telugu") => {
    return language === "english" 
      ? result.predictions[section].english 
      : result.predictions[section].telugu;
  };

  return (
    <div className="space-y-8">
      {/* Language Toggle */}
      <div className="flex items-center justify-end space-x-2">
        <Label htmlFor="language-toggle" className={language === "english" ? "font-medium" : ""}>
          English
        </Label>
        <Switch
          id="language-toggle"
          checked={language === "telugu"}
          onCheckedChange={(checked) => setLanguage(checked ? "telugu" : "english")}
        />
        <Label htmlFor="language-toggle" className={language === "telugu" ? "font-medium" : ""}>
          తెలుగు
        </Label>
      </div>

      {/* Birth Chart Visualization */}
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <h3 className="font-heading text-2xl font-bold mb-6 text-center text-primary">
            {language === "english" ? "Your Birth Chart" : "మీ జన్మ చార్ట్"}
          </h3>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 border-2 border-orange-300 rounded-full p-4">
              {/* Chart visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 300 300"
                  className="birth-chart"
                >
                  {/* Outer circle */}
                  <circle cx="150" cy="150" r="145" fill="transparent" stroke="#FFB74D" strokeWidth="2" />
                  
                  {/* Inner circle */}
                  <circle cx="150" cy="150" r="100" fill="transparent" stroke="#FFB74D" strokeWidth="1" />
                  
                  {/* Dividing lines */}
                  <line x1="5" y1="150" x2="295" y2="150" stroke="#FFB74D" strokeWidth="1" />
                  <line x1="150" y1="5" x2="150" y2="295" stroke="#FFB74D" strokeWidth="1" />
                  <line x1="35" y1="35" x2="265" y2="265" stroke="#FFB74D" strokeWidth="1" />
                  <line x1="35" y1="265" x2="265" y2="35" stroke="#FFB74D" strokeWidth="1" />
                  
                  {/* House numbers */}
                  <text x="175" y="30" fill="#FF7722" fontSize="12" textAnchor="middle">1</text>
                  <text x="240" y="75" fill="#FF7722" fontSize="12" textAnchor="middle">2</text>
                  <text x="270" y="150" fill="#FF7722" fontSize="12" textAnchor="middle">3</text>
                  <text x="240" y="225" fill="#FF7722" fontSize="12" textAnchor="middle">4</text>
                  <text x="175" y="270" fill="#FF7722" fontSize="12" textAnchor="middle">5</text>
                  <text x="125" y="270" fill="#FF7722" fontSize="12" textAnchor="middle">6</text>
                  <text x="60" y="225" fill="#FF7722" fontSize="12" textAnchor="middle">7</text>
                  <text x="30" y="150" fill="#FF7722" fontSize="12" textAnchor="middle">8</text>
                  <text x="60" y="75" fill="#FF7722" fontSize="12" textAnchor="middle">9</text>
                  <text x="125" y="30" fill="#FF7722" fontSize="12" textAnchor="middle">10</text>
                  
                  {/* Planet placements - would be dynamically generated based on actual calculations */}
                  {result.chartSymbols.map((symbol, index) => (
                    <text 
                      key={index}
                      x={symbol.x} 
                      y={symbol.y} 
                      fill="#333" 
                      fontSize="14" 
                      fontWeight="bold" 
                      textAnchor="middle"
                    >
                      {symbol.label}
                    </text>
                  ))}
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={handleDownloadChart}
              className="bg-primary hover:bg-secondary text-white font-medium px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Download size={16} className="mr-2" /> 
              {language === "english" ? "Download Chart" : "చార్ట్ డౌన్‌లోడ్ చేయండి"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Predictions */}
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="general">
            <TabsList className="border-b border-gray-200 rounded-none w-full justify-start">
              <TabsTrigger value="general" className="py-4 px-6">
                {language === "english" ? "General" : "సాధారణ"}
              </TabsTrigger>
              <TabsTrigger value="marriage" className="py-4 px-6">
                {language === "english" ? "Marriage" : "వివాహం"}
              </TabsTrigger>
              <TabsTrigger value="career" className="py-4 px-6">
                {language === "english" ? "Career" : "వృత్తి"}
              </TabsTrigger>
              <TabsTrigger value="health" className="py-4 px-6">
                {language === "english" ? "Health" : "ఆరోగ్యం"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="p-6 space-y-4">
              <h3 className="font-heading text-xl font-bold">
                {language === "english" ? "Your Cosmic Profile" : "మీ కాస్మిక్ ప్రొఫైల్"}
              </h3>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">
                    {language === "english" ? "Sun Sign" : "సూర్య రాశి"}
                  </span>
                  <p className="font-medium">{result.signs.sunSign}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">
                    {language === "english" ? "Moon Sign" : "చంద్ర రాశి"}
                  </span>
                  <p className="font-medium">{result.signs.moonSign}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">
                    {language === "english" ? "Rising Sign" : "లగ్నం"}
                  </span>
                  <p className="font-medium">{result.signs.risingSign}</p>
                </div>
              </div>
              
              <p className="text-gray-800">{getContent("general", language)}</p>
            </TabsContent>
            
            <TabsContent value="marriage" className="p-6 space-y-4">
              <h3 className="font-heading text-xl font-bold">
                {language === "english" ? "Marriage & Relationships" : "వివాహం & సంబంధాలు"}
              </h3>
              
              <p className="text-gray-800">{getContent("marriage", language)}</p>
              
              <div className="bg-orange-50 border-l-4 border-primary p-4 mt-4">
                <h4 className="font-medium text-primary">
                  {language === "english" ? "Key Relationship Periods" : "ముఖ్యమైన సంబంధ కాలాలు"}
                </h4>
                <ul className="list-disc list-inside text-gray-800 mt-2 space-y-1">
                  {result.keyPeriods.marriage.map((period, index) => (
                    <li key={index}>{language === "english" ? period.english : period.telugu}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="career" className="p-6 space-y-4">
              <h3 className="font-heading text-xl font-bold">
                {language === "english" ? "Career & Finances" : "వృత్తి & ఆర్థిక విషయాలు"}
              </h3>
              
              <p className="text-gray-800">{getContent("career", language)}</p>
              
              <div className="bg-orange-50 border-l-4 border-primary p-4 mt-4">
                <h4 className="font-medium text-primary">
                  {language === "english" ? "Career Opportunities" : "వృత్తి అవకాశాలు"}
                </h4>
                <ul className="list-disc list-inside text-gray-800 mt-2 space-y-1">
                  {result.keyPeriods.career.map((period, index) => (
                    <li key={index}>{language === "english" ? period.english : period.telugu}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="p-6 space-y-4">
              <h3 className="font-heading text-xl font-bold">
                {language === "english" ? "Health & Wellbeing" : "ఆరోగ్యం & సంక్షేమం"}
              </h3>
              
              <p className="text-gray-800">{getContent("health", language)}</p>
              
              <div className="bg-orange-50 border-l-4 border-primary p-4 mt-4">
                <h4 className="font-medium text-primary">
                  {language === "english" ? "Wellness Recommendations" : "ఆరోగ్య సూచనలు"}
                </h4>
                <ul className="list-disc list-inside text-gray-800 mt-2 space-y-1">
                  {result.keyPeriods.health.map((period, index) => (
                    <li key={index}>{language === "english" ? period.english : period.telugu}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
