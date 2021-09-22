-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


DROP DATABASE "Cacophony";
CREATE DATABASE "Cacophony";

\c Cacophony

CREATE TABLE "USERS" (
    "id"  SERIAL  NOT NULL,
    "username" varchar   NOT NULL,
    "hashed_password" varchar   NOT NULL,
    "picture_url" varchar,
    "joining_date" datetime   NOT NULL,
    "last_on" datetime   NOT NULL,
    "setting" varbinary   NOT NULL,
    CONSTRAINT "pk_USERS" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_USERS_username" UNIQUE (
        "username"
    )
);

CREATE TABLE "SERVERS" (
    "id"  SERIAL  NOT NULL,
    "name" varchar   NOT NULL,
    "picture_url" varchar,
    "start_date" datetime   NOT NULL,
    "settings" varbinary   NOT NULL,
    CONSTRAINT "pk_SERVERS" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_SERVERS_name" UNIQUE (
        "name"
    )
);

CREATE TABLE "INVITE" (
    "link" varchar   NOT NULL,
    "role_id" int   NOT NULL,
    "user_cap" int,
    "expiration_time" datetime,
    CONSTRAINT "pk_INVITE" PRIMARY KEY (
        "link"
     )
);

CREATE TABLE "ROLES" (
    "id"  SERIAL  NOT NULL,
    "title" varchar   NOT NULL,
    "server_id" int   NOT NULL,
    "color" int   NOT NULL,
    "is_admit" binary   NOT NULL,
    "settings" varbinary   NOT NULL,
    CONSTRAINT "pk_ROLES" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "MEMBERSHIP" (
    "id"  SERIAL  NOT NULL,
    "user_id" int   NOT NULL,
    "role_id" int   NOT NULL,
    "server_id" int   NOT NULL,
    "nickname" varchar   NOT NULL,
    "joining_date" datetime   NOT NULL,
    "settings" varbinary   NOT NULL,
    CONSTRAINT "pk_MEMBERSHIP" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "ROOMS" (
    "id"  SERIAL  NOT NULL,
    "server_id" int   NOT NULL,
    "type" varchar   NOT NULL,
    "settings" varbinary   NOT NULL,
    CONSTRAINT "pk_ROOMS" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "ACCESS" (
    "room_id" int   NOT NULL,
    "role_id" int   NOT NULL
);

CREATE TABLE "POSTS" (
    "id"  SERIAL  NOT NULL,
    "room_id" int   NOT NULL,
    "member_id" int   NOT NULL,
    "content" varchar   NOT NULL,
    "post_date" datetime   NOT NULL,
    "threaded_from" int,
    CONSTRAINT "pk_POSTS" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "REACTIONS" (
    "post_id" int   NOT NULL,
    "member_id" int   NOT NULL,
    "type" varchar   NOT NULL
);

ALTER TABLE "INVITE" ADD CONSTRAINT "fk_INVITE_role_id" FOREIGN KEY("role_id")
REFERENCES "ROLES" ("id");

ALTER TABLE "ROLES" ADD CONSTRAINT "fk_ROLES_server_id" FOREIGN KEY("server_id")
REFERENCES "SERVERS" ("id");

ALTER TABLE "MEMBERSHIP" ADD CONSTRAINT "fk_MEMBERSHIP_user_id" FOREIGN KEY("user_id")
REFERENCES "USERS" ("id");

ALTER TABLE "MEMBERSHIP" ADD CONSTRAINT "fk_MEMBERSHIP_role_id" FOREIGN KEY("role_id")
REFERENCES "ROLES" ("id");

ALTER TABLE "MEMBERSHIP" ADD CONSTRAINT "fk_MEMBERSHIP_server_id" FOREIGN KEY("server_id")
REFERENCES "SERVERS" ("id");

ALTER TABLE "ROOMS" ADD CONSTRAINT "fk_ROOMS_server_id" FOREIGN KEY("server_id")
REFERENCES "SERVERS" ("id");

ALTER TABLE "ACCESS" ADD CONSTRAINT "fk_ACCESS_room_id" FOREIGN KEY("room_id")
REFERENCES "ROOMS" ("id");

ALTER TABLE "ACCESS" ADD CONSTRAINT "fk_ACCESS_role_id" FOREIGN KEY("role_id")
REFERENCES "ROLES" ("id");

ALTER TABLE "POSTS" ADD CONSTRAINT "fk_POSTS_room_id" FOREIGN KEY("room_id")
REFERENCES "ROOMS" ("id");

ALTER TABLE "POSTS" ADD CONSTRAINT "fk_POSTS_membership_id" FOREIGN KEY("membership_id")
REFERENCES "MEMBERSHIP" ("id");

ALTER TABLE "POSTS" ADD CONSTRAINT "fk_POSTS_threaded_from" FOREIGN KEY("threaded_from")
REFERENCES "POSTS" ("id");

ALTER TABLE "REACTIONS" ADD CONSTRAINT "fk_REACTIONS_post_id" FOREIGN KEY("post_id")
REFERENCES "POSTS" ("id");

ALTER TABLE "REACTIONS" ADD CONSTRAINT "fk_REACTIONS_membership_id" FOREIGN KEY("membership_id")
REFERENCES "MEMBERSHIP" ("id");

