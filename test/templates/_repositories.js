import {
  singleRepo,
  concat,
  user,
  repo,
  args,
  method
} from './_base'

const team = 'my-team'
const forkPath = `https://api.bitbucket.org/2.0/repositories/${user}/${repo}.git`

const response = {
  links: {
    forks: {
      href: forkPath
    }
  },
  parent: {
    links: {
      self: {
        href: forkPath
      }
    }
  }
}

args.commit = concat(args.project, {
  author: 'unknown@gmail.com',
  message: 'first commit',
  files: [{
    'Readme.md': 'hello world'
  }]
})

module.exports = {
  apiName: 'repositories',
  methods: {
    get: method,
    create: method,
    createPullRequest: {
      body: singleRepo,
      args: concat(args.project, {
        type: 'pull'
      })
    },
    commit: {
      body: singleRepo,
      args: args.commit
    },
    getBranches: method,
    getCommit: {
      body: singleRepo,
      args: concat(args.project, '123')
    },
    getByUser: {
      body: singleRepo,
      args: [
        user
      ]
    },
    getByTeam: {
      body: singleRepo,
      args: [
        team
      ]
    },
    getForks: method,
    getForksFromResponse: {
      path: forkPath,
      body: singleRepo,
      args: [
        response
      ]
    },
    getParentFromResponse: {
      body: singleRepo,
      args: [
        response
      ]
    },
  }
  // ... more test data templates
}
