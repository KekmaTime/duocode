import { pgTable , text } from "drizzle-orm/pg-core"

export const testing = pgTable("testing", {
    id: text("id").primaryKey(),
    name: text("name")
});

