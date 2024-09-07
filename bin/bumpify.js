#!/usr/bin/env node

const { updatePackageFile, updateReadme, updateWorkflowVersion } = require('../lib/helpers');

const newVersion = process.argv[2];
if (!newVersion) {
    console.error('Please provide a new version (e.g., bumpify 2.0.2)');
    process.exit(1);
}

// Run updates
updatePackageFile('package.json', newVersion);
updatePackageFile('package-lock.json', newVersion);
updateReadme(newVersion);
updateWorkflowVersion(newVersion);
