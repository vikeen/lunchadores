"use strict";

module.exports = {
    options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    heroku: {
        options: {
            remote: 'heroku',
            branch: 'master'
        }
    }
};
