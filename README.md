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
  - ### 👨‍🎨 Final User
    - Create marech file
    
      You need marech-config.js into your project, created in "How to Install"

    - Create final file(s)
    ```sh
      # Compile and create final file(s)
      marech c
      # OR
      marech compile
    ```

  - ### 👨‍🔬 Developer for MarechCli and/or MarechCore
    Please disregard the "How to Install" topic by uninstalling marech so you can make changes to the source code

    - Local changes at "global" package
    ```sh
      # Clone this repository
      git clone https://github.com/antunesrodrigues/marech.git

      # Go to marech folder
      cd marech
      
      # Emulate "npm install marech -g"
      npm link
      # Install required packages
      npm install
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