

import { relations } from "drizzle-orm";
import { pgTable, varchar, boolean, timestamp, text, serial } from "drizzle-orm/pg-core"



export const users = pgTable('users', {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: boolean('email-verified').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})


export const sessions = pgTable('sessions', {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).references(() => users.id)
        .notNull(),
    token: varchar('token', { length: 255 }),
    expireAt: timestamp('expires_at').notNull(),
    ipAddress: varchar('ip_address', { length: 255 }),
    userAgent: text('user_agent'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()

})

export const accounts = pgTable('accounts', {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 })
        .references(() => users.id)
        .notNull(),
    accountId: varchar("account_id"),
    providerId: varchar('provider_id', { length: 255 }).notNull(),
    password: text('password'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()


});


export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    content: text('content').notNull(),
    authorId: varchar("author_id", { length: 255 }).references(() => users.id)
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()


});


export const userRelations = relations(posts, ({ one }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id]
    })
}));

export const postsRelation = relations(posts, ({ one }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id]
    })
}));

export const accountRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    })
}
));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));


export const schema ={
    users,
    accounts,
    sessions,
    posts
}