# Components – Marech Guide

## Defaults Values
- ### Component
  Add a definition on the first line of your component:
  ```html
  <Marech fileName="default-image" />
  <!-- The above line defines default values if they do not exist -->
  
  <img src="{fileName}.png">
  ```
  That is, if we do not specify a value on the import, it will always return `default-image`.
  
  **Attention:** The setting must always be on the first line of the component.