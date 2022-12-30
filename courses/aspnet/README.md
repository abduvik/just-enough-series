# ASP.NET

## Important Classes

- `IConfiguration`: To get configurations for example from env variables & app.settings.json
- `IServiceCollection`: For configuring the dependency injections

## DB Migrations

In case the project with data is different from the one from the one that has the startup project, we need to link to it by passing a param `-s <project_with_startup_path>`

- `dotnet ef dbcontext info`: Information about the dbcontext used in the project
- `dotnet ef migrations add <migration_name>`: Create a DB migration code

- `dotnet ef database update`: Update database with migrations
