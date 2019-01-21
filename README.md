Marech is an HTML precompiler, where you can split your code and print JavaScript outputs in HTML. And much more coming soon...


## 🕺 How to Install
  Marech is available in the Node Package Manager. If you want, follow the steps of the installation:

  ```sh
  # Install Marech CLI globally
  npm install marech -g

  # Start marech at this directory 
  marech init
  ```


## 🤙 Get's started
### Create configuration file
  You need marech-config.js into your project (created in "How to Install")

### Compile
  ```sh
  # Compile and create final file(s)
  marech compile
  ```

## 👨‍🔬 Developer for MarechCore
  Before making changes to the source code, please ignore the "How to Install" topic, uninstalling marech globally.

  - Local changes at "global" package
    ```sh
    # Clone this repository
    git clone https://github.com/antunesrodrigues/marech.git

    # Go to MarechCore folder
    cd marech
    
    # Install required packages
    npm install

    # Compile the source-code
    npm run compile

    # Emulate "npm install marech -g"
    npm link
    ```

    Now, just use
    ```sh
    marech [...]
    ```


## 🤝 Contribute
Please send issues, share to friends, improve the source-code (and send a pull-requests) etc


## 📝 License
Licensed under the [MIT License](LICENSE.txt)
Created by [Gabriel Rodrigues](https://github.com/antunesrodrigues)