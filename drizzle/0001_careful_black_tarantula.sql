CREATE TABLE `apiKeys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`keyHash` varchar(255) NOT NULL,
	`maskedKey` varchar(64) NOT NULL,
	`status` enum('active','revoked') NOT NULL DEFAULT 'active',
	`requestsCount` int NOT NULL DEFAULT 0,
	`lastUsedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `apiKeys_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referredUserId` int NOT NULL,
	`status` enum('pending','active','churned') NOT NULL DEFAULT 'active',
	`commissionEarned` decimal(10,2) NOT NULL DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revenueLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`source` enum('subscription','api_usage','affiliate') NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'USD',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revenueLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionTier` enum('FREE','STARTER','PRO','ENTERPRISE') DEFAULT 'FREE' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` varchar(64) DEFAULT 'inactive' NOT NULL;