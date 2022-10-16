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
- namespaces are a way to organize our code similar to folders and make sure that if two classes with same under different namespaces are still unique (especially when sharing code through pacakges)

- Generic Example

```csharp
using System;

namespace CSharpTestingConsole
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var bank = new BankAccount();
            Person person = new(); // will do object creation implicitly

            Console.WriteLine("Hello World");

            string wage = Console.ReadLine();

            // int wageValue = int.Parse(wage);

            int wageValue;
            if (int.TryParse(wage, out wageValue))
            {
                Console.WriteLine("Success");
            }
        }
    }

    public class BankAccount {
        public string GetTransactions() {
            // Object-Initializer: https://www.youtube.com/watch?v=4_J_CLKwoto
            // It's a way to avoid creating multiple constructors
            var person = new Person
            {
                Name = "Abdu",
                City = "Berlin"
            };


        GetSum(y: 10, x: 20);

        return person.Name;
    }

    public int GetSum(int x, int y)
    {
        return x + y;
    }

    /**
     * `ref` pass by reference and need to be initialized
     * `out` will pass by reference but doesn't need to be initialized. It's used in case you need to return n+1 things
     */
    public int GetSumAndRef(int x, out int y)
    {
        y = 10;
        return x + y;
    }

    /**
    Async/Await operation is handled by Tasks
    **/
    // public static Task async callVisa(){
    //     Task<VisaOperation> = await VisaService.CallVisa();
    //     // Task.WhenAll === Promise.all
    //     // Task.WhenAny === Promise.any
    // }
    }

    public class Person {
        public string Name;
        public string City;
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public Person() {

        }

        public string GetFullName()
        {
            // return String.Format("{0} {1}", FirstName, LastName);
            // return String.Concat(FirstName, LastName);
            return FirstName + LastName;
        }
    }
};


```

### Modifiers

- `abstract`: Can't use `new`, need to be inherited and implemented. In case of preprties, methods, indexers, events -> you must implement them
- `override`: Required to extend or modify the abstract or virtual implementation of an inherited method, property, indexer, or event.
- `static`: method,proptery is shared across all objects on the class-level and we call them through the class, so no need to use the `new` keyword

### Types in .NET

Value Types:

- `enum`: Collection of values as a string
- `struct`: Similar to classes by lightweight and is value type instead of a pointer like classes

Reference Types:

- `class`
- `interface`
- `delegate`

### null and nullable

Reference types can hold the value null when they reference to nothing

Value Types needs to hold a value but we can define them as "Nullable Value Types" which means that they can hold a value or null. They are defined by appending a `?` ex: `int? x`.

### Keywords

- `using` statement forces the code to run `Dispose` method instead of writing `try...finally`
- `new` It can be used as a modifier to override inherited properties and methods in a class by creating a new one

### Important Classes

- `JsonSerializer`: To Serialize/Deserialize JSON to Object
- `JsonSerializerOptions`: To pass options for the `JsonSerializer`. Use `JsonSerializerDefaults.web` to get default options used for the web.
- `HttpClient`: To do HTTP requests
- `StringBuilder`: Used when we are doing too many operations on strings to save memory. THat's because strings are immutable and are referenced-type instead of value
- `HttpClientJsonExtensions`: Extentions to the `HttpClient` to send/recieve HTTP content as JSON
- `HttpContentJsonExtensions`: Extentions to the `HttpClient` to read and parse the HttpContent based on JSON

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

- What is the difference between struct and classes?

struct are value-typed, so when you assign the value of a variable to another variable we create a new complete copy of it while classes is a pointer to an object on the heap and when we assign an object to another variable it gets the pointer instead of the whole object.

[Read more here](https://stackoverflow.com/questions/13049/whats-the-difference-between-struct-and-class-in-net)
