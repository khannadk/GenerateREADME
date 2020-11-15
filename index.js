const inquirer = require("inquirer");
const fs = require("fs");

// Questions that will be displayed to the user.
inquirer
    .prompt([
        {
            type: "input",
            name: "github",
            message: "What is your GitHub username?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
            type: "input",
            name: "projectName",
            message: "What is your project's name?",
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of your project.",
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "None"],
        },
        {
            type: "input",
            name: "installation",
            message: "What command should be run to install dependencies?",
        },
        {
            type: "input",
            name: "tests",
            message: "What command should be run to run tests?",
        },
        {
            type: "input",
            name: "usage",
            message: "What does the user need to know about using the repo?",
        },
        {
            type: "input",
            name: "contributing",
            message: "What does the user need to know about contributing to the repo?",
        },
    ])
    // Promise returned by the prompts.
    .then(res => {
        // Take the license chose by user and replace any space by %20 to be added to the URL that will display the badge.
        const licenseType = res.license.split(" ").join("%20");
        // If None has been selected as a license then the message "No license listed." will be added to the license section, else it will display the license statement.
        let licenseText = res.license === "None" ? "No license listed."
        : `This project is licensed under the terms of the ${res.license} license.`;
        // const newReadMe builts the README with the provided responses by the user.
        const newReadMe =
`![License](https://img.shields.io/badge/license-${licenseType}-blue)
# ${res.projectName}
## Description
${res.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Contact](#contact)
## Installation
To install necessary dependencies, run the following command:
${"```"}
${res.installation}
${"```"}
## Usage
${res.usage}
## License
${licenseText}
## Contributing
${res.contributing}
## Tests
To run tests, run the following command:
${"```"}
${res.tests}
${"```"}
## Contact
You may contact me at ${res.email} if you have questions or contributions. You can fork my work at [${res.github}](https://github.com/${res.github}).
`
        // Use fs module to create a new README file with the const newReadMe as a content to this file.
        fs.writeFile("README.md", newReadMe, err => {err ? console.log(err) : console.log("New ReadME has been generated")})
    })