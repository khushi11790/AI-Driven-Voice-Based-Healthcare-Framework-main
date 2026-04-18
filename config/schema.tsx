import SuggestedDoctorCard from "@/app/(routes)/dashboard/_components/SuggestedDoctorCard";
import { integer, pgTable, text, varchar,json } from "drizzle-orm/pg-core";
import { number } from "motion";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  creadits:integer()
});

export const SessionChatTable=pgTable('sessionChatTable',{
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   sessionId:varchar().notNull(),
   notes:text(),
   selectedDoctor:json(),
   converstaion:json(),
   report:json(),
   createdBy:varchar().references(()=>usersTable.email),
   createdOn:varchar(),

})