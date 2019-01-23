# Configuration File – Marech

## Settings File
  By default, `marech init` creates a marech configuration file, called `marech-config.json`. The file created has the following structure:

  ```json
  {
    "input": {
      "path": "src",
      "files": "**/*.html"
    },

    "components": {
      "path": "src/marech"
    },
    
    "output": "dist",
  }
  ```

## Understanding the Commands
- ### Components
  Define the path and files to be used for the import.
  
  - **path** **`Type: String`**
    
    Indicates where the components are
  
  - **files** **`Type: Optional, Array`**
  
    By default, you can create a file in your path (like foo.html), and import it using `<Marech@foo />`.
    
    But let's say you wanted a different name for the file or the import name. To do this, use this property to customize them.
    
    **ARRAY STRUCTURE:**
    ```json
    {"id": "...", "file": "..."}
    ```

    Where **id** represents the **name to be called in `<Marech@... />`**.
    
    And the **file** its respective **location within the _path_.**
    
    
- ### Input
  Define the path and input files (those that import components).

  - **path** **`Type: String`**
    
    Indicates where the _input_ files are.
  
  - **files** **`Type: String`**
    
    This property indicates the files to use for _path_. It is based on glob.

- ### Output `Type: String`

  Set the output path (where the rendered and compiled files will be).


## Docs
**Next Step:** [Components](/docs/components/README.md).

### Starter Guide
- [Getting Started](/docs/guide/README.md)
- [Directory Structure](/docs/guide/directory-structure.md)
- [Configuration File](/docs/guide/configuration.md)

### Components
- [Getting Started](/docs/components/README.md)
- [Defining Attributes](/docs/components/defining-attributes.md)
- [Default Attributes](/docs/components/default-attributes.md)