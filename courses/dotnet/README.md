# .NET

## YouTube Video

## Content

- [What is .NET](https://www.youtube.com/watch?v=bEfBfBQq7EE)
- [Article on What is .NET](https://www.codecademy.com/article/what-is-net)
- [C# for Beginners](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oVxKLQCHpiUWun7vlJJvUiN)
- [ASP.NET Tutorial](https://www.youtube.com/watch?v=lE8NdaX97m0&list=PLdo4fOcmZ0oW8nviYduHq7bmKode-p8Wy)
- [Another Good Summary](https://learnxinyminutes.com/docs/csharp/)
- [Asynchronous Programming with C#](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)

## Topics

### How is the .NET world structured

A .NET is a collection of language and libraries. Then we have our target which can be web (ASP.NET) or Mobile or Desktop or IoT and so on. C# is the main language.

We have .NET framework which is the old .NET and can only work on Windows.

Today we have the new .NET Core which is cross-platform and can work anywhere (aka. like JAVA).

There is a package manager callend NuGet

### Tools

- We can use Visual Studio, Visual Studio Code or JetBrains Rider
- We need to install the .NET Sdk
- There is also a CLI tool `dotnet` which supports multiple templates

### Language Summary

- The config files for a project is under `*.csproj`. It's similar to `package.json`

- Generic Example

```csharp
namespace ProgramNamespace;

public class BankAccount {
  public BankAccount() {

  }

  public string GetTransactions() {
    // Object-Initializer: https://www.youtube.com/watch?v=4_J_CLKwoto
    // It's a way to avoid creating multiple constructors
    var person = new Person {
      Name: "Abdu",
      City: "Berlin"
    }
  }

  public int getSum(int x, int y) {

  }

  /**
  Async/Await operation is handled by Tasks
  **/
  public static Task async CallVisa(){
    Task<VisaOperation> = await VisaService.CallVisa();
    // Task.WhenAll === Promise.all
    // Task.WhenAny === Promise.any
  }
}

public class Person {
  string Name;
  string City;

  public Person() {

  }
}
```

### Modifiers

- `abstract`: Can't use `new`, need to be inherited and implemented. In case of preprties, methods, indexers, events -> you must implement them
- `override`: Required to extend or modify the abstract or virtual implementation of an inherited method, property, indexer, or event.

### Keywords

- `using` statement forces the code to run `Dispose` method instead of writing `try...finally`
- `new` It can be used as a modifier to override inherited properties and methods in a class by creating a new one

### Important Classes

- `JsonSerializer`: To Serialize/Deserialize JSON to Object
- `HttpClient`: To do HTTP requests

### Questions

- What is the difference between `interface` and `abstract` class?

We inherit from one class but can implement multiple interfaces. Abstract class are used as base classes and can have partial implementation but interfaces are more as contract

- What is the difference between `new` and `override`+`virtual`?

`new` will create a new method that only exists for this type. So if we used casting it will use the parent method rather than the child method

`override`+`virtual` is to actually override the member methods in correct polymorphism

- How C# complier knows where is Main method?

Newer versions can find main implicitly. You can set the flag `EnableDefaultCompileItems` to false in the project configs and then you will need to explicitly include the entry point

```xml
<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <ImplicitUsings>enable</ImplicitUsings>
        <Nullable>enable</Nullable>
        <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
    </PropertyGroup>

    <ItemGroup>
        <Compile Include="Program.cs" />
    </ItemGroup>

</Project>
```
