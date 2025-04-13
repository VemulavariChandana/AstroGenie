import { pgTable, text, serial, integer, date, time, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Horoscope form schema
export const horoscopeFormSchema = z.object({
  fullName: z.string().min(2),
  birthDate: z.string(),
  birthTime: z.string(),
  birthPlace: z.string().min(2),
});

export type HoroscopeFormData = z.infer<typeof horoscopeFormSchema>;

// Horoscope prediction types
export interface BilingualText {
  english: string;
  telugu: string;
}

export interface ChartSymbol {
  label: string;
  x: number;
  y: number;
}

export interface HoroscopeResult {
  userId?: number;
  fullName: string;
  birthDetails: {
    date: string;
    time: string;
    place: string;
  };
  signs: {
    sunSign: string;
    moonSign: string;
    risingSign: string;
  };
  predictions: {
    general: BilingualText;
    marriage: BilingualText;
    career: BilingualText;
    health: BilingualText;
  };
  keyPeriods: {
    marriage: BilingualText[];
    career: BilingualText[];
    health: BilingualText[];
  };
  chartSymbols: ChartSymbol[];
  createdAt: string;
}

// Horoscope storage
export const horoscopeRecords = pgTable("horoscope_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  fullName: text("full_name").notNull(),
  birthDate: date("birth_date").notNull(),
  birthTime: time("birth_time").notNull(),
  birthPlace: text("birth_place").notNull(),
  result: jsonb("result").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertHoroscopeRecordSchema = createInsertSchema(horoscopeRecords)
  .omit({ id: true });

export type InsertHoroscopeRecord = z.infer<typeof insertHoroscopeRecordSchema>;
export type HoroscopeRecord = typeof horoscopeRecords.$inferSelect;
