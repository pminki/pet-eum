import { bigint, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pets, profiles } from "../users/schema";

export const serviceTypeEnum = pgEnum("service_type", [
  "visit_care",
  "walk",
  "daytime_care",
  "house_care",
]);

export const petWeightEnum = pgEnum("pet_weight_category", [
  "0~5kg",
  "6~10kg",
  "11~15kg",
  "16~20kg",
  "21kg~",
]);

export const serviceStatusEnum = pgEnum("service_status", [
  "reservation_requested",
  "approved",
  "in_progress",
  "completed",
  "cancelled",
]);

export const services = pgTable("services", {
  service_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  profile_id: uuid(),
  helper_id: bigint({ mode: "number" }),
  service_type: serviceTypeEnum().notNull(),
  address: text(),
  start_datetime: timestamp().notNull(),
  end_datetime: timestamp().notNull(),
  pet_weight: petWeightEnum().notNull(),
  pet_count: integer().default(1),
  special_requests: text(),
  status: serviceStatusEnum().default('reservation_requested'),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const service_pets = pgTable("service_pets", {
  service_pet_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  service_id: bigint({ mode: "number" }).notNull().references(() => services.service_id),
  pet_id: bigint({ mode: "number"} ).notNull().references(() => pets.pet_id),
});