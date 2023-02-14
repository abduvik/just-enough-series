# ASP.NET

## Summary

There are 4 types of ASP.NET web projects

- Razor Pages: It's a page-centric approach with C#-in-HTML `.cshtml` which makes it easier to create webapps and is a Server-Side-Rendering (SSR) framework.
- MVC: It's a controller-centric with actions approach with `.cshtml` views and is a Server-Side-Rendering (SSR) framework. Stands for Model-View-Controller.
- Blazor: It's a client-side web framework which uses C# and WebAssembly to run on the browser. And there is also Blazor Server which keeps the state on the server and uses
  SignalR to communicate with the client. SignalR is a library for real-time communication uses WebSockets or Server-Sent Events (SSE) or Long Polling to communicate with the client.
- API: There are two ways of communications:
  - REST: It's a stateless communication protocol which uses HTTP methods like GET, POST, PUT, DELETE, etc. to communicate with the server.
  - gRPC: It's a stateful communication protocol which uses HTTP/2 and Protocol Buffers to communicate with the server.

Quick info:

- And they can all exists in the same project ASP.NET uses Kestrel as a web server.
- In older versions of ASP.NET, the main start file was `Startup.cs` but in the newer versions, it's `Program.cs` which is the main start file.

## Razor Pages

Calls the `app.MapRazorPages` method in `Program.cs` to map the Razor Page to a route.

There are tags helpers in ASP.NET which are similar to Angular's directives and they start with `asp-` prefix. They generate HTML code.

Examples are:

- `asp-route-<param_name>`: To pass a route param
- `asp-for`: To bind a model to a form field. We bind the model using `[BindProperty]` attribute in the controller
- `asp-validation-summary`: To show validation errors

Important classes:

- `PageModel`: The base class for all Razor Pages

Important Methods in `PageModel`:

- `RedirectToPage()`: To redirect to a Razor Page
- `Redirect()`: To redirect to a URL
- `Page()`: To render a Razor Page

## MVC

Calls the `app.MapControllerRoute` method in `Program.cs` to map the controller to a route.

Important classes:

Important Directives:

- `asp-action`: To specify the action of the controller

Important Methods in `Controller`:

- `View()`: To render a view

## Blazor

## API

## Important Classes

- `IConfiguration`: To get configurations for example from env variables & app.settings.json
- `IServiceCollection`: For configuring the dependency injections

## DB Migrations

In case the project with data is different from the one from the one that has the startup project, we need to link to it by passing a param `-s <project_with_startup_path>`

- `dotnet ef dbcontext info`: Information about the dbcontext used in the project
- `dotnet ef migrations add <migration_name>`: Create a DB migration code

- `dotnet ef database update`: Update database with migrations

## Resources

- [IAmTimCorey YouTube Channel](https://www.youtube.com/@IAmTimCorey)
