"use strict";

const exec = require('util').promisify(require("child_process").exec);

const queryForm = require('./assets/query_form');

let msg_form = [{
  type: 'list',
  name: 'name',
  message: '修改类型',
  loop: false,
  choices: [{
    name: 'feat: 新功能、新特性',
    value: 'feat',
    short: 'feat'
  }, {
    name: 'fix: 修改 bug',
    value: 'fix',
    short: 'fix'
  }, {
    name: 'perf: 更改代码，以提高性能',
    value: 'perf',
    short: 'perf'
  }, {
    name: 'refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）',
    value: 'refactor',
    short: 'refactor'
  }, {
    name: 'docs: 文档修改',
    value: 'docs',
    short: 'docs'
  }, {
    name: 'style: 代码格式修改, 注意不是 css 修改（例如分号修改）',
    value: 'style',
    short: 'style'
  }, {
    name: 'test: 测试用例新增、修改',
    value: 'test',
    short: 'test'
  }, {
    name: 'build: 影响项目构建或依赖项修改',
    value: 'build',
    short: 'build'
  }, {
    name: 'revert: 恢复上一次提交',
    value: 'revert',
    short: 'revert'
  }, {
    name: 'ci: 持续集成相关文件修改',
    value: 'ci',
    short: 'ci'
  }, {
    name: 'chore: 其他修改（构建过程或辅助工具的变动）',
    value: 'chore',
    short: 'chore'
  }, {
    name: 'release: 发布新版本',
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
  message: '修改概述',
  prefix: '2.',
  filter: val => {
    return val.trim();
  },
  validate: val => {
    let msg = val.trim();
    if (msg) return true;
    return '请输入本次提交主要内容';
  }
}, {
  type: 'input',
  name: 'body',
  message: '详细内容',
  prefix: '2.',
  filter: val => {
    return val.trim();
  }
}, {
  type: 'input',
  name: 'footer',
  message: '注释',
  prefix: '2.',
  suffix: '补充说明,如:bug编号',
  filter: val => {
    return val.trim();
  }
}];

const handle = async () => {
  let config = await queryForm(msg_form);
  let commit_msg = `${config.name}: ${config.subject}\n\n${config.body}\n\n${config.footer}`.trim();
  await exec(`git add . && git commit -m '${commit_msg}'`);
};

handle();