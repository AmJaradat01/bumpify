const fs = require('fs');
const path = require('path');

// Helper to update the version in package.json and package-lock.json
const updatePackageFile = (file, newVersion) => {
    const packagePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(packagePath)) {
        const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
        packageContent.version = newVersion;
        fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2));
        console.log(`${file} updated to version ${newVersion}`);
    } else {
        console.error(`${file} not found. Skipping...`);
    }
};

// Helper to update the version badge in README.md
const updateReadme = (newVersion) => {
    const readmePath = path.resolve(process.cwd(), 'README.md');
    if (fs.existsSync(readmePath)) {
        let readmeContent = fs.readFileSync(readmePath, 'utf-8');
        // Regex to find and update the Shields.io version badge
        const versionBadgeRegex = /(!\[Version\]\(https:\/\/img.shields.io\/badge\/version-v[\d.]+-blue\.svg\))/;

        const versionBadgeExists = versionBadgeRegex.test(readmeContent);

        if (versionBadgeExists) {
            // Replace the old version with the new one in the badge
            readmeContent = readmeContent.replace(
                /(!\[Version\]\(https:\/\/img.shields.io\/badge\/version-v)[\d.]+(-blue\.svg\))/,
                `$1${newVersion}$2`
            );
            fs.writeFileSync(readmePath, readmeContent);
            console.log(`README.md version badge updated to version ${newVersion}`);
        } else {
            console.log('README.md does not contain a version badge. Skipping update for README.md.');
        }
    } else {
        console.log('README.md not found. Skipping...');
    }
};

module.exports = {
    updatePackageFile,
    updateReadme
};
