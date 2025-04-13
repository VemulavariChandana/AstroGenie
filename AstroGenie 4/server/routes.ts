import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { horoscopeFormSchema, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { generateHoroscope } from "./lib/horoscope";
import { fromZodError } from "zod-validation-error";
import passport from "passport";
import bcrypt from "bcryptjs";

// Authentication middleware
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API routes
  const apiRouter = express.Router();
  
  // Auth routes
  apiRouter.post("/auth/register", async (req, res) => {
    try {
      // Validate request body
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error registering user:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  });
  
  apiRouter.post("/auth/login", passport.authenticate("local"), (req, res) => {
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as any;
    res.json(userWithoutPassword);
  });
  
  apiRouter.post("/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  apiRouter.get("/auth/user", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as any;
    res.json(userWithoutPassword);
  });

  // Generate horoscope
  apiRouter.post("/horoscope", async (req, res) => {
    try {
      // Validate request body
      const formData = horoscopeFormSchema.parse(req.body);
      
      // Generate horoscope
      const horoscopeResult = await generateHoroscope(formData);
      
      // Save to storage only if user is authenticated
      if (horoscopeResult && req.isAuthenticated()) {
        const userId = (req.user as any).id;
        await storage.saveHoroscopeRecord({
          userId,
          fullName: formData.fullName,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: formData.birthPlace,
          result: horoscopeResult,
          createdAt: new Date().toISOString(),
        });
      }
      
      // Return the result
      res.json(horoscopeResult);
    } catch (error) {
      console.error("Error generating horoscope:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to generate horoscope" });
      }
    }
  });

  // Get saved horoscope by ID
  apiRouter.get("/horoscope/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const record = await storage.getHoroscopeRecordById(id);
      
      if (!record) {
        return res.status(404).json({ message: "Horoscope record not found" });
      }
      
      res.json(record.result);
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      res.status(500).json({ message: "Failed to fetch horoscope" });
    }
  });
  
  // Get user's horoscope history
  apiRouter.get("/user/horoscopes", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const records = await storage.getHoroscopeRecordsByUserId(userId);
      
      // Format the response to include minimal details needed for the history list
      const history = records.map(record => {
        // Parse JSON string if needed or cast to proper type
        const result = record.result as unknown as {
          signs: {
            sunSign: string;
            moonSign: string;
            risingSign: string;
          }
        };
        
        return {
          id: record.id,
          fullName: record.fullName,
          birthDate: record.birthDate,
          createdAt: record.createdAt,
          sunSign: result.signs.sunSign,
          moonSign: result.signs.moonSign,
          risingSign: result.signs.risingSign
        };
      });
      
      res.json(history);
    } catch (error) {
      console.error("Error fetching user horoscope history:", error);
      res.status(500).json({ message: "Failed to fetch horoscope history" });
    }
  });

  // Mount the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
