const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { updatePackageFile, updateReadme } = require('../lib/helpers');

describe('bumpify', function() {
    const version = '2.0.2';
    
    afterEach(() => {
        // Clean up any modifications after each test if necessary
        if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
            const packagePath = path.resolve(process.cwd(), 'package.json');
            const originalContent = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
            originalContent.version = '1.0.0'; // Reset version to default for test purposes
            fs.writeFileSync(packagePath, JSON.stringify(originalContent, null, 2));
        }
        if (fs.existsSync(path.resolve(process.cwd(), 'package-lock.json'))) {
            const lockPath = path.resolve(process.cwd(), 'package-lock.json');
            const originalContent = JSON.parse(fs.readFileSync(lockPath, 'utf-8'));
            originalContent.version = '1.0.0'; // Reset version to default for test purposes
            fs.writeFileSync(lockPath, JSON.stringify(originalContent, null, 2));
        }
    });

    it('should update the version in package.json', function() {
        // Simulate updating the version in package.json
        const packagePath = path.resolve(process.cwd(), 'package.json');
        updatePackageFile('package.json', version);
        const updatedContent = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
        assert.strictEqual(updatedContent.version, version, 'package.json version should be updated');
    });

    it('should update the version in package-lock.json', function() {
        // Simulate updating the version in package-lock.json
        const lockPath = path.resolve(process.cwd(), 'package-lock.json');
        updatePackageFile('package-lock.json', version);
        const updatedContent = JSON.parse(fs.readFileSync(lockPath, 'utf-8'));
        assert.strictEqual(updatedContent.version, version, 'package-lock.json version should be updated');
    });

    it('should update the README.md if version badge exists', function() {
        const readmePath = path.resolve(process.cwd(), 'README.md');
        if (fs.existsSync(readmePath)) {
            updateReadme(version);
            const readmeContent = fs.readFileSync(readmePath, 'utf-8');
            assert.match(readmeContent, new RegExp(`https://img.shields.io/badge/version-v${version}-blue.svg`), 'README.md version badge should be updated');
        }
    });

    it('should skip README.md update if file does not exist', function() {
        const readmePath = path.resolve(process.cwd(), 'README.md');
        if (fs.existsSync(readmePath)) {
            fs.unlinkSync(readmePath); // Simulate file not existing
        }
        assert.doesNotThrow(() => updateReadme(version), 'updateReadme should not throw if README.md does not exist');
        assert.ok(!fs.existsSync(readmePath), 'README.md should not be created if it does not exist');
    });
});
