Marech is an HTML precompiler, where you can split your code and print JavaScript outputs in HTML. And much more coming soon...


## 😎 How to Install
  Marech is available in the NPM.

  ```sh
  # Install Marech CLI globally
  npm install marech -g
  ```


## 😅 Get's started
### Create configuration file
  You need marech-config.js into your project. To create, use the command:
  ```sh
  # Start in the current directory
  marech init
  ```

### Compile
  ```sh
  # Compile and create final file(s)
  marech compile
  ```

## 🤓 Developer for MarechCore
  Before making changes to the source code, please ignore the "How to Install" topic, uninstalling marech globally.

### Get the MarechCore
  ```sh
  # Clone this repository
  git clone https://github.com/antunesrodrigues/marech.git

  # Go to MarechCore folder
  cd marech
  
  # Install required packages
  npm install

  # Compile the source-code
  npm run compile
  ```

### Local changes at "global" package
  ```sh
  # Emulate "npm install marech -g"
  npm link
  ```

  Now, just use
  ```sh
  marech [...]
  ```

## 🤝 Contribute
Please send issues, share to friends, improve the source-code etc

## 📝 License
Licensed under the [MIT License](LICENSE.txt).

Created by [Gabriel Rodrigues](https://github.com/antunesrodrigues)