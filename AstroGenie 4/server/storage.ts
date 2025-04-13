import { 
  User, 
  InsertUser, 
  users, 
  HoroscopeRecord, 
  InsertHoroscopeRecord, 
  HoroscopeResult, 
  horoscopeRecords 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveHoroscopeRecord(record: Omit<InsertHoroscopeRecord, "userId"> & { userId: number | null }): Promise<HoroscopeRecord>;
  getHoroscopeRecordById(id: number): Promise<HoroscopeRecord | undefined>;
  getHoroscopeRecordsByUserId(userId: number): Promise<HoroscopeRecord[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async saveHoroscopeRecord(record: Omit<InsertHoroscopeRecord, "userId"> & { userId: number | null }): Promise<HoroscopeRecord> {
    const [horoscopeRecord] = await db
      .insert(horoscopeRecords)
      .values({
        userId: record.userId,
        fullName: record.fullName,
        birthDate: record.birthDate,
        birthTime: record.birthTime,
        birthPlace: record.birthPlace,
        result: record.result,
        createdAt: record.createdAt
      })
      .returning();
    return horoscopeRecord;
  }

  async getHoroscopeRecordById(id: number): Promise<HoroscopeRecord | undefined> {
    const [record] = await db.select().from(horoscopeRecords).where(eq(horoscopeRecords.id, id));
    return record || undefined;
  }

  async getHoroscopeRecordsByUserId(userId: number): Promise<HoroscopeRecord[]> {
    return await db.select().from(horoscopeRecords).where(eq(horoscopeRecords.userId, userId));
  }
}

export const storage = new DatabaseStorage();
