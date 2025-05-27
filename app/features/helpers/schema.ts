import { bigint, pgTable, real, text, time, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";


export const petsitters = pgTable("helpers", {
  helper_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  bio: text(),
  experience: text(),
  available_from: time(),
  available_to: time(),
  location: text(),
  evaluation_score: real(),
});