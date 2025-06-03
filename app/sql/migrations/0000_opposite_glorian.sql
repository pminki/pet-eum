CREATE TYPE "public"."pet_weight_category" AS ENUM('0~5kg', '6~10kg', '11~15kg', '16~20kg', '21kg~');--> statement-breakpoint
CREATE TYPE "public"."service_status" AS ENUM('reservation_requested', 'approved', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('visit_care', 'walk', 'daytime_care', 'house_care');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('follow', 'review', 'reply', 'mention');--> statement-breakpoint
CREATE TABLE "post_replies" (
	"post_reply_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "post_replies_post_reply_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"post_id" bigint,
	"parent_id" bigint,
	"profile_id" uuid NOT NULL,
	"reply" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_upvotes" (
	"post_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "post_upvotes_post_id_profile_id_pk" PRIMARY KEY("post_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"post_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_post_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"upvotes" bigint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"topic_id" bigint,
	"profile_id" uuid
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"revies_id" bigint,
	"service_id" bigint NOT NULL,
	"reviewer_id" bigint NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"topic_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "topics_topic_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helpers" (
	"helper_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "helpers_helper_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"profile_id" uuid,
	"bio" text,
	"experience" text,
	"available_from" time,
	"available_to" time,
	"location" text,
	"evaluation_score" real
);
--> statement-breakpoint
CREATE TABLE "service_pets" (
	"service_pet_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "service_pets_service_pet_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"service_id" bigint NOT NULL,
	"pet_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"service_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_service_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"profile_id" uuid,
	"helper_id" bigint,
	"service_type" "service_type" NOT NULL,
	"address" text,
	"start_datetime" timestamp NOT NULL,
	"end_datetime" timestamp NOT NULL,
	"pet_weight" "pet_weight_category" NOT NULL,
	"pet_count" integer DEFAULT 1,
	"special_requests" text,
	"status" "service_status" DEFAULT 'reservation_requested',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follower_id" uuid,
	"following_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_room_members" (
	"message_room_id" bigint,
	"profile_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "message_room_members_message_room_id_profile_id_pk" PRIMARY KEY("message_room_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "message_rooms" (
	"message_room_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "message_rooms_message_room_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"message_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "messages_message_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"message_room_id" bigint,
	"sender_id" uuid,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"notification_id" bigint,
	"source_id" uuid,
	"service_id" bigint,
	"post_id" bigint,
	"target_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"pet_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pets_pet_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"profile_id" uuid,
	"name" varchar(255) NOT NULL,
	"species" varchar(50),
	"breed" varchar(100),
	"weight" real,
	"birthdate" date,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"avatar" text,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"headline" text,
	"bio" text,
	"stats" jsonb,
	"views" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_parent_id_post_replies_post_reply_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_replies"("post_reply_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_upvotes" ADD CONSTRAINT "post_upvotes_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_upvotes" ADD CONSTRAINT "post_upvotes_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_topic_id_topics_topic_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("topic_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "helpers" ADD CONSTRAINT "helpers_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_pets" ADD CONSTRAINT "service_pets_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_pets" ADD CONSTRAINT "service_pets_pet_id_pets_pet_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("pet_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_profile_profile_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_profile_profile_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_room_members" ADD CONSTRAINT "message_room_members_message_room_id_message_rooms_message_room_id_fk" FOREIGN KEY ("message_room_id") REFERENCES "public"."message_rooms"("message_room_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_room_members" ADD CONSTRAINT "message_room_members_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_message_room_id_message_rooms_message_room_id_fk" FOREIGN KEY ("message_room_id") REFERENCES "public"."message_rooms"("message_room_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_profile_profile_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_source_id_profile_profile_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_target_id_profile_profile_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;