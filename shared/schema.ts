import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const speakerBookings = pgTable("speaker_bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  organizationName: text("organization_name").notNull(),
  phoneNumber: text("phone_number"),
  eventLocation: text("event_location").notNull(),
  eventDate: text("event_date").notNull(),
  eventDescription: text("event_description").notNull(),
  audienceSize: text("audience_size").notNull(),
  eventType: text("event_type").notNull(),
  timeZone: text("time_zone").notNull(),
  additionalNotes: text("additional_notes"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const consultingRequests = pgTable("consulting_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  organizationName: text("organization_name").notNull(),
  phoneNumber: text("phone_number"),
  companyWebsite: text("company_website"),
  consultingArea: text("consulting_area").notNull(),
  projectDescription: text("project_description").notNull(),
  preferredStartDate: text("preferred_start_date").notNull(),
  projectTimeline: text("project_timeline").notNull(),
  additionalNotes: text("additional_notes"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  email: true,
});

export const insertSpeakerBookingSchema = createInsertSchema(speakerBookings).omit({
  id: true,
  submittedAt: true,
});

export const insertConsultingRequestSchema = createInsertSchema(consultingRequests).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSpeakerBooking = z.infer<typeof insertSpeakerBookingSchema>;
export type SpeakerBooking = typeof speakerBookings.$inferSelect;
export type InsertConsultingRequest = z.infer<typeof insertConsultingRequestSchema>;
export type ConsultingRequest = typeof consultingRequests.$inferSelect;
