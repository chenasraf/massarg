/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['master', { name: 'pre', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        // only update the pkg version on doc, don't publish
        npmPublish: false,
        pkgRoot: 'doc',
      },
    ],
    [
      '@semantic-release/npm',
      {
        // publish from build dir instead of root
        pkgRoot: 'build',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['*.tgz'],
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Change Log',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md'],
      },
    ],
    //
    // [
    //   '@semantic-release/exec',
    //   {
    //     verifyReleaseCmd: 'echo ${nextRelease.version} > .VERSION',
    //   },
    // ],
  ],
}
