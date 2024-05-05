# Run this application

## Required software

**You must have Docker and Docker Compose installed.**

## Required configuration

Clone the repo.
You have to manually create the table.

### Access the database using psql
Run:
```ps
docker exec -it books-database psql -h localhost -p 5432 -d books -U postgres
```

### Create the table
Run:
```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);
```

### Close psql
Run
```sql
exit
```

## Running

After setting it up, run:
```ps
docker compose up
```

