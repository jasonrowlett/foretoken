import { 
  users, 
  subscriptions, 
  speakerBookings, 
  consultingRequests,
  type User, 
  type InsertUser, 
  type Subscription, 
  type InsertSubscription,
  type SpeakerBooking,
  type InsertSpeakerBooking,
  type ConsultingRequest,
  type InsertConsultingRequest
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionByEmail(email: string): Promise<Subscription | undefined>;
  getAllSubscriptions(): Promise<Subscription[]>;
  createSpeakerBooking(booking: InsertSpeakerBooking): Promise<SpeakerBooking>;
  createConsultingRequest(request: InsertConsultingRequest): Promise<ConsultingRequest>;
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

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Check if username already exists
    const existingUsername = await this.getUserByUsername(insertUser.username);
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // Check if email already exists
    const existingEmail = await this.getUserByEmail(insertUser.email);
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    // Check if email already exists
    const existing = await this.getSubscriptionByEmail(insertSubscription.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getSubscriptionByEmail(email: string): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.email, email));
    return subscription || undefined;
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return await db.select().from(subscriptions);
  }

  async createSpeakerBooking(insertBooking: InsertSpeakerBooking): Promise<SpeakerBooking> {
    const [booking] = await db
      .insert(speakerBookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async createConsultingRequest(insertRequest: InsertConsultingRequest): Promise<ConsultingRequest> {
    const [request] = await db
      .insert(consultingRequests)
      .values(insertRequest)
      .returning();
    return request;
  }
}

export const storage = new DatabaseStorage();
