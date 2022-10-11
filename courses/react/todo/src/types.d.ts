import React from "react"

type DependencyContainer = {
  _dependencies: {
    [key:string]: object
  }
  add: (key: string, dependency: object ) => void,
  get: (key: string) => object
}

type DependencyInjector = (dependencies: {[key:string]: string}, Component: React.ElementType) => any
