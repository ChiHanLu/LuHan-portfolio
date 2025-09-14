// Minimal global JSX declarations for libraries that expect a JSX namespace
// This file provides a fallback for environments where the JSX namespace
// isn't automatically available to third-party type definitions.

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: string | number;
  }
  interface IntrinsicClassAttributes<T> {}
  interface IntrinsicElements {
    // Allow any element name with any props — keeps it permissive for 3rd-party libs
    [elemName: string]: any;
  }
}
