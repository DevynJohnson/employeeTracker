# employeeTracker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A command line application allowing a company to manage a database of employee information including department, role and personal information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)
- [License](#license)

## Installation

<p>This application is designed to be executed using Node.js. The following walkthrough will help guide you through the steps required to run the application.</p> 

<h3>Prerequisites</h3>
<p>Ensure the following are installed on your computer:</p>
<ol>
<li>Node.js: Download and install Node.js by following the steps at <a href="https://www.nodejs.org">nodejs.org</a>.</li>
<li>npm (Node Package Manager): This should come bundled with the Node.js download.</li>
<li>postgreSQL: Download and install postgreSQL by following the steps at <a href="https://www.postgresql.org/">postgresql.org</a>.</li>
<li>Git: Required to clone this repository. Download and install at <a href="https://git-scm.com">git-scm.com</a> or ensure it is already installed by running
<code>git --version</code></li>
</ol>

<h3>Step 1: Clone this Repository</h3>
<p>To clone this repository to your local machine, use the following command. For more detailed instructions, follow the steps at <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository">Github Docs</a> that correspond to your operating system.</p>
<code>git clone https://github.com/DevynJohnson/employeeTracker.git</code>

<h3>Step 2: Navigate to the Project Directory</h3>
<p>Open a terminal or command prompt and use the following command to navigate to the project directory:</p>

<code>cd "project-directory"</code>
<p>Replace "project-directory" with the path of the folder where this repository was cloned.</p>

<h3>Step 3: Install Dependencies</h3>
<p>Install the required npm packages by running:</p>

<code>npm install</code>

<p>This will install all required dependencies required as specified in the package.json file, including <a href="https://www.npmjs.com/package/inquirer">inquirer</a> and <a href="https://www.npmjs.com/package/pg">pg</a> - both necessary for this program to execute correctly.</p>

## Usage

<h3>Step 4: Run the Application</h3>
Run the application by entering the following command in the terminal and follow any prompts to manage database information:
<code>node index.js</code>

## Troubleshooting/Questions
<p>In the case the application is not functioning properly, attempt the following:</p>
<ol>
<li>Check if Node.js and npm are installed correctly by using the following commands to check for the version currently installed on your system, respectively:<br>
<code>node -v</code>
<br>
<code>npm -v</code></li>
<li>Ensure all dependencies are installed by re-running
<code>npm install</code></li>
<li>Review any error messages in the terminal for information that may help resolve the issue.</li>
<li>Reach out to <a href="mailto:dljohnson1313@gmail.com?subject=Employee Tracker Issue">dljohnson1313@gmail.com</a> with an explanation of the issue if you are unable to find a solution using the steps above.</li>

## Credits
<p>This project was created by Devyn Johnson. <a href="https://github.com/DevynJohnson">Github</a> | <a href="https://www.linkedin.com/in/devyn-johnson-a5259213b">LinkedIn</a> | <a href="https://devynjohnson.github.io/online-portfolio/">Portfolio</a>.</p>

<p>This application uses the following npm packages: <a href="https://www.npmjs.com/package/inquirer">inquirer</a>, <a href="https://www.npmjs.com/package/pg">pg</a>.

## License

MIT License

Copyright (c) 2025 Devyn Johnson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
