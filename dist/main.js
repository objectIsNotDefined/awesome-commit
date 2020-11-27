"use strict";

const log = require('./assets/log');

const queryForm = require('./assets/query_form');

const simpleGit = require('simple-git');

const git = simpleGit();
let msg_form = [{
  type: 'list',
  name: 'name',
  message: 'type      ',
  loop: false,
  choices: [{
    name: 'feat:     新功能、新特性',
    value: 'feat',
    short: 'feat'
  }, {
    name: 'fix:      修改 bug',
    value: 'fix',
    short: 'fix'
  }, {
    name: 'perf:     更改代码，以提高性能',
    value: 'perf',
    short: 'perf'
  }, {
    name: 'refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）',
    value: 'refactor',
    short: 'refactor'
  }, {
    name: 'docs:     文档修改',
    value: 'docs',
    short: 'docs'
  }, {
    name: 'style:    代码格式修改, 注意不是 css 修改（例如分号修改）',
    value: 'style',
    short: 'style'
  }, {
    name: 'test:     测试用例新增、修改',
    value: 'test',
    short: 'test'
  }, {
    name: 'build:    影响项目构建或依赖项修改',
    value: 'build',
    short: 'build'
  }, {
    name: 'revert:   恢复上一次提交',
    value: 'revert',
    short: 'revert'
  }, {
    name: 'ci:       持续集成相关文件修改',
    value: 'ci',
    short: 'ci'
  }, {
    name: 'chore:    其他修改（构建过程或辅助工具的变动）',
    value: 'chore',
    short: 'chore'
  }, {
    name: 'release:  发布新版本',
    value: 'release',
    short: 'release'
  }, {
    name: 'workflow: 工作流相关文件修改',
    value: 'workflow',
    short: 'workflow'
  }],
  prefix: '1.'
}, {
  type: 'input',
  name: 'subject',
  message: 'subject   ',
  prefix: '2.',
  filter: val => {
    return val.trim();
  },
  validate: val => {
    let msg = val.trim();
    if (msg) return true;
    return 'please enter the subject';
  }
}, {
  type: 'input',
  name: 'body',
  message: 'body      ',
  prefix: '3.',
  filter: val => {
    return val.trim();
  }
}, {
  type: 'input',
  name: 'footer',
  message: 'footer    ',
  prefix: '4.',
  filter: val => {
    return val.trim();
  }
}];

const handle = async () => {
  await git.cwd(process.cwd());

  try {
    await git.add('./*');
  } catch (e) {
    log('error', String(e).trim());
    process.exit();
  }

  let git_status = null;

  try {
    git_status = await git.status();
  } catch (e) {
    log('error', String(e).trim());
    process.exit();
  }

  if (git_status.files.length == 0) {
    log('error', `Error: nothing to commit`);
    process.exit();
  }

  try {
    let config = await queryForm(msg_form);
    let commit_msg = `${config.name}: ${config.subject}\n\n${config.body}\n\n${config.footer}`.trim();
    await git.commit(commit_msg);
    log('success', 'success');
  } catch (e) {
    log('error', String(e).trim());
  }
};

handle();