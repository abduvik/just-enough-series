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
- Even versions of ASP.NET are LTS (3 years) and odd versions are short term support (6 months) and are called Current versions.

Architecture of ASP.NET:

- ASP.NET Core Platform: These are shared features between all ASP.NET projects types
  - They are like: Kestrel, Middleware, Razor, Dependency Injection, Model binding, Logging, etc.
- ASP.NET Core Application Platforms: These are the specific features for each project type
  - They are like: MVC, Razor Pages, Blazor
- Other Supporting features: Things that are in the .NET Eco-system
  - They are like: Entity Framework Core, Core Identity, etc.

## Common Concepts in ASP.NET

### Main files

- `Program.cs`: The main start file which starts running everything
- We have a web server called Kestrel which is a cross-platform web server. We then use it behind a reverse proxy like Nginx or Apache.
- `Program.cs` Do the follow:
  - Create a host builder using `CreateBuilder` method and pass the args which are the command line arguments
  - We can configure the builder to add Services to its Dependency Injection container
    - `AddScoped`: To add a scoped service to the DI container, which means that it's created once per request
    - `AddSingleton`: To add a singleton service to the DI container, which means that it's created once and then it's reused
    - `AddTransient`: To add a transient service to the DI container, which means that it's created every time it's requested
    - `builder.Services.AddScoped<IShoppingCart, ShoppingCart>(sp => ShoppingCart.GetCart(sp));` to inject the service provider to the a dependency. Good for creating objects from static methods
    - `AddHttpContextAccessor`: To add the `HttpContextAccessor` service to the DI container which allows access to the `HttpContext` in the controllers which contains the request and response objects
    - `AddSession`: To add the `Session` service to the DI container
  - We then build the host using the `Build` method
  - Then we define a couple of middleware to be used by the web server. They are executed in the order they are defined
    - `UseStaticFiles`: To serve static files like images, css, js, etc.
    - `UseRouting`: To define the routes
    - `UseEndpoints`: To define the endpoints
    - `UseAuthentication`: To define the authentication
    - `UseHttpsRedirection`: To redirect to https
    - `UseDeveloperExceptionPage`: To show the developer exception page. They show more details for errors in the browser. Use only with `app.Environment.IsDevelopment()`
    - `MapDefaultControllerRoute`: To map the default controller route. It's exactly `app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}")`
    - `UseSession`: To use session,
  - Then we run the web server using the `Run` method
- `appSettings.json`: It's a JSON file which contains the configurations for the app. It's the environment variables.
- `launchSettings.json`: It's a JSON file which contains the configurations for the launch of the app. It's like `scripts` in `package.json` in Node.js
- `wwwroot`: It's a folder which contains the static files like images, css, js, etc.
- `Dependencies`: It's a folder which contains the dependencies of the project. It's like `node_modules` in Node.js. We use `nuget` to install dependencies.

## MVC

MVC stands for Model-View-Controller:

- Model: It's the data layer. It's the data that we want to display in the view.
- View: It's the presentation layer. It's the HTML code that we want to display to the user.
- Controller: It's the logic layer. It's the logic that we want to execute to get the data and pass it to the view. It's unaware of the model.

Calls the `app.MapControllerRoute` method in `Program.cs` to map the controller to a route.

Important classes:

Important Directives:

- `asp-action`: To specify the action of the controller

Important Stuff for `Controller`:

- `View()`: To render a view. These are .cshtml files which are Razor pages.
  - We can pass data to the view either using:
    - `ViewBag` and access it using `@ViewBag.<param_name>`
    - `ViewData` and access it using `@ViewData["<param_name>"]`
    - `ViewBag` and `ViewData` are almost the same thing. Also, they both don't support type safety.
    - or using a model (type-safe) or passing to the `View` method (sets the @model in the view & use it as `Model`)
  - We can use `@` to execute C# code in the view or `@{...}` for multiple lines of code
  - We can also create a ViewModel and pass it to the view and use it as `Model` which will be more cleaner for complex data
  - Couple of redirect methods:
    - `RedirectToAction()`: To redirect to an action of a controller
    - `RedirectToRoute()`: To redirect to a route
    - `Redirect()`: To redirect to a URL

Important Stuff for `View`:

- `@model`: To specify the model of the view
- We can create a default layout for all views using `_Layout.cshtml` file under `Views/Shared` folder
  - We can use `@RenderBody()` to render the body of the view and define the `_Layout` in the page to use it
- We can also create a `_ViewStart.cshtml` file under `Views` folder to specify the default layout for all views
  - We can then define the layout using `@Layout` directive inside it
- We can create a `_ViewImports.cshtml` file under `Views` folder to specify the default namespaces for all views
  - We can then define the namespaces using `@using` directive inside it
- Static files like images, css, js, etc. are stored under `wwwroot` folder
- There is also ViewComponents which acts like HoC in which they contains logic and view
  - We can create then by:
    - Inheriting from `ViewComponent` class
    - Using `ViewComponent` attribute
    - Suffixed with `ViewComponent` in the name
  - They need to be added into:
    - `Components` folder for C# code
    - `Views/Shared/Components` folder for the view
  - It needs to have a method called `InvokeAsync` which returns a `Task<IViewComponentResult>` or `Invoke` which returns `IViewComponentResult`
  - We can then use them in the view using `<vc:component_name>`
  - We can also pass data to the view component using `InvokeAsync` method
  - We need to define some code in the `_ViewImports.cshtml` file to use the view components tags
    - `@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers`
    - `@addTagHelper *, <name_of_project_to_import_its_tags>`
- We can also create TagHelpers which are like directives
  - They render HTML code
  - They are C# Classes with a suffix of `TagHelper`
  - We can add them into the `TagHelpers` folder
  - It needs to have a method `override ProcessAsync` which returns `Task` or `override Process` which returns `void`
  - We need to add the following into the `_ViewImports.cshtml` file to use the tag helpers
    - `@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers`
    - `@addTagHelper <namespace>.TagHelpers.* , <namespace>`

Entity Framework Core:

- It's an ORM (Object Relational Mapper) which is used to map the database tables to C# classes
- It's used to create migrations and update the database
- It consists of 4 main components:
  - There are packages that integrate with various database providers like `Microsoft.EntityFrameworkCore.SqlServer` for SQL Server, `Microsoft.EntityFrameworkCore.Sqlite` for SQLite, etc.
  - Model Classes which are the C# classes that we use to represent the database tables
  - DbContext which is the class that we use to interact with the database and it has a `DbSet` for each table
  - Configuration which is used to configure the database connection and other configurations
- When we set it up, we will:
  - Create a model class for each table
  - Create a DbContext class which inherits from `DbContext` class
  - Add Connection String to `appSettings.json`
  - Add DbContext to the dependency injection container in `Startup.cs` using `services.AddDbContext`
  - Create a migration using `dotnet ef migrations add <migration_name>`
  - Update the database using `dotnet ef database update`
- Some operations that we can do with Entity Framework Core:
  - `Add()`: To add a new record to the database
  - `Update()`: To update an existing record in the database
  - `Remove()`: To remove an existing record from the database
  - `SaveChanges()`: To save the changes to the database
  - `Find()`: To find a record by its primary key
  - `FirstOrDefault()`: To find the first record that matches the condition
  - `Where()`: To filter the records
  - `OrderBy()`: To sort the records
  - `Include()`: To include related data
  - `AsNoTracking()`: To disable tracking of the data
  - `RemoveRange()`: To remove multiple records

Migrations:

- It's a way to make a change the database schema based on the model classes. It's like a version control for the database.
- The package `Microsoft.EntityFrameworkCore.Tools` is used to create migrations and update the database
- Use command `dotnet ef migrations add <migration_name>` to create a migration
- Use command `dotnet ef database update` to update the database with the migrations
  - In case the build fails, just try to rebuild the project and run the command again
- When we want to seed the database, we can:
  - Create a static class with `Seed()` method
  - Get access to the DbContext using DI: `var context = applicationBuilder.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<PieShopDbContext>();`

Routing:

- We need to use TagHelpers to generate the URLs for the links
- We will need to add the following line to the `_ViewImports.cshtml` file to use the TagHelpers
  - `@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers`
- We can use the following TagHelpers to generate the URLs:
  - `asp-controller`: To specify the controller. No need to pass the word `Controller` in the value
  - `asp-action`: To specify the action
  - `asp-route-<param_name>`: To specify the route param
  - Also, you can use `@Html.ActionLink` to generate the link, ex: `@Html.ActionLink("Controller", "Action", "ModelProperty")`
- Partial views are used to reuse the code in multiple views
  - We can create a partial view by creating a `.cshtml` file under `Views/Shared` folder and name starts with `_`
  - We can then use it in other views using `<partial name="_<partial_view_name>" @model="<model_name>"/>`

Forms:

- Some of important tag-helpers are:
  - `asp-action`: To specify the action of the form
  - `asp-controller`: To specify the controller of the form
  - `asp-for`: To specify the model property
  - `asp-validation-for`: To specify the model property to be validated
  - `asp-validation-summary`: To specify the validation summary
  - `asp-route-<param_name>`

`ModelState` is used to track and store the state of the model and it's used to validate the model and to display the validation errors.

Some sources of data for the model binding:

- Query String
- Route Data
- Form Data

Some important methods and properties:

- We can use `ModelState.IsValid` to check if the model is valid or not
- We can use `ModelState.AddModelError` to add an error to the model
- We can use `ModelState.GetValidationState` to get the validation of a certain property
- We can use `ModelState.Clear` to clear the model state

To add validation rules to the model, we can:

- Add Attributes, some important ones are:
  - `Required`: To make the property required
  - `StringLength`: To specify the maximum length of the string
  - `Range`: To specify the range of the value
  - `RegularExpression`: To specify the regular expression to validate the value
  - `Compare`: To compare the value of the property with another property
  - `EmailAddress`: To validate the email address
  - `Phone`: To validate the phone number
  - `Url`: To validate the URL
  - `CreditCard`: To validate the credit card number
  - `FileExtensions`: To validate the file extension
  - `Remote`: To validate the value using a remote service
  - `BindRequired`: To make the property required when binding the model
  - `BindNever`: To ignore the property when binding the model
- Use custom validation attributes
  - Create a class that inherits from `ValidationAttribute` class
  - Override the `IsValid` method to validate the value
  - Add the attribute to the property

Attributes can also take the following parameters:

- `ErrorMessage`: To specify the error message

To show the errors we can use `asp-validation-summary` tag helper or `@Html.ValidationSummary` helper. and it should be used on a div.

- `asp-validation-summary="All"`: To show all the errors
- `asp-validation-summary="ModelOnly"`: To show the errors of the model
- `asp-validation-summary="None"`: To not show the errors

## Razor Pages

They are similar to MVC but they are easier to use and they are like Next.js in React.

To set up Razor Pages, in the `Program.cs` file, we need:

- Call `builder.Services.AddRazorPages()` to add Razor Pages to the dependency injection container
- Call `app.MapRazorPages()` to map the Razor Page to a route

All pages are under `Pages` folder and we have access to normal things in MVC like:

- Dependency Injection
- `ViewImports` & `ViewStart` files
- `Layout` file and Shared directory

To create a Razor page, we need to create two files, everything is under `Pages` folder:

- A `.cshtml` file to show the UI view
  - It should have a directive `@page` to make it a Razor Page or in MVC terms like a controller's action. It should be the first thing in the file
  - It should have a directive `@model` to specify the model type and it should have the same name as the class name in `.cshtml.cs` file
- A `.cshtml.cs` file to handle the logic
  - It can have methods `OnGet`, `OnPost`, `OnPut`, `OnDelete` to handle the HTTP requests
  - To bind properties to the form, we can use `BindProperty` attribute on the properties
  - Instead of returning `View()` like MVC, we can return `Page()` to return the same page
  - Instead of `RedirectToAction` like MVC, we can use `RedirectToPage` to redirect to another page

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

## Extra

- When trying to run project with https and fails, you need to allow it to be trusted using

`dotnet dev-certs https --trust`

## Resources

- [IAmTimCorey YouTube Channel](https://www.youtube.com/@IAmTimCorey)
