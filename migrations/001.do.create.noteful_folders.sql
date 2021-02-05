CREATE TABLE noteful_folders(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    folder_name TEXT NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);