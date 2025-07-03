CREATE TABLE "shortened_urls" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"shortened_url" text NOT NULL,
	"access_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shortened_urls_shortened_url_unique" UNIQUE("shortened_url")
);
