/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['master', { name: 'pre', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'build/**', label: 'Package Bundle' }],
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
      },
    ],
  ],
}
