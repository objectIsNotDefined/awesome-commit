const log = require('./assets/log')
const queryForm = require('./assets/query_form')
const simpleGit = require('simple-git')
const git = simpleGit()
const osLocale = require('os-locale')

let getFormData = async () => {
  let locale = await osLocale()
  // 如果本机语言不是中文，则显示英文
  locale !== 'zh-CN' && (locale = 'en-US')
  const txt_config = {
    feat: {
      'zh-CN': '新功能、新特性',
      'en-US': 'new function or feature'
    },
    fix: {
      'zh-CN': '修改 bug',
      'en-US': 'fix bug'
    },
    perf: {
      'zh-CN': '更改代码，以提高性能',
      'en-US': 'change code to improve performance'
    },
    refactor: {
      'zh-CN': '代码重构（重构，在不影响代码内部行为、功能下的代码修改）',
      'en-US': 'code refactoring (code modification without affecting the internal behavior and function of the code)'
    },
    merge: {
      'zh-CN': '合并代码，解决冲突',
      'en-US': 'merge code, resolve conflict'
    },
    docs: {
      'zh-CN': '文档修改',
      'en-US': 'document modification'
    },
    style: {
      'zh-CN': '代码格式修改, 注意不是 css 修改（例如分号修改）',
      'en-US': 'code format, not css modification'
    },
    test: {
      'zh-CN': '测试用例新增、修改',
      'en-US': 'add or modified test cases'
    },
    build: {
      'zh-CN': '影响项目构建或依赖项修改',
      'en-US': 'project construction or dependency modification'
    },
    revert: {
      'zh-CN': '恢复上一次提交',
      'en-US': 'resume the last commit'
    },
    ci: {
      'zh-CN': '持续集成相关文件修改',
      'en-US': 'continuous integration file modification'
    },
    chore: {
      'zh-CN': '其他修改（构建过程或辅助工具的变动）',
      'en-US': 'other modifications (changes in the construction process or auxiliary tools)'
    },
    release: {
      'zh-CN': '发布新版本',
      'en-US': 'release new version'
    },
    workflow: {
      'zh-CN': '工作流相关文件修改',
      'en-US': 'workflow file modification'
    }
  }
  return [
    {
      type: 'list',
      name: 'name',
      message: 'type      ',
      loop: false,
      choices: [
        { name: `feat:     ${txt_config.feat[locale]}`, value: 'feat', short: 'feat' },
        { name: `fix:      ${txt_config.fix[locale]}`, value: 'fix', short: 'fix' },
        { name: `perf:     ${txt_config.perf[locale]}`, value: 'perf', short: 'perf' },
        { name: `refactor: ${txt_config.refactor[locale]}`, value: 'refactor', short: 'refactor' },
        { name: `merge:    ${txt_config.merge[locale]}`, value: 'merge', short: 'merge' },
        { name: `docs:     ${txt_config.docs[locale]}`, value: 'docs', short: 'docs' },
        { name: `style:    ${txt_config.style[locale]}`, value: 'style', short: 'style' },
        { name: `test:     ${txt_config.test[locale]}`, value: 'test', short: 'test' },
        { name: `build:    ${txt_config.build[locale]}`, value: 'build', short: 'build' },
        { name: `revert:   ${txt_config.revert[locale]}`, value: 'revert', short: 'revert' },
        { name: `ci:       ${txt_config.ci[locale]}`, value: 'ci', short: 'ci' },
        { name: `chore:    ${txt_config.chore[locale]}`, value: 'chore', short: 'chore' },
        { name: `release:  ${txt_config.release[locale]}`, value: 'release', short: 'release' },
        { name: `workflow: ${txt_config.workflow[locale]}`, value: 'workflow', short: 'workflow' }
      ],
      prefix: '1.'
    },
    {
      type: 'input',
      name: 'subject',
      message: 'subject   ',
      prefix: '2.',
      filter: (val) => {
        return val.trim()
      },
      validate: (val) => {
        let msg = val.trim()
        if (msg) return true
        return 'please enter the subject'
      }
    },
    {
      type: 'input',
      name: 'body',
      message: 'body      ',
      prefix: '3.',
      filter: (val) => {
        return val.trim()
      }
    },
    {
      type: 'input',
      name: 'footer',
      message: 'footer    ',
      prefix: '4.',
      filter: (val) => {
        return val.trim()
      }
    }
  ]
}

const handle = async () => {
  await git.cwd(process.cwd())
  try {
    await git.add('./*')
  } catch (e) {
    log('error', String(e).trim())
    process.exit()
  }
  let git_status = null
  try {
    git_status = await git.status()
  } catch (e) {
    log('error', String(e).trim())
    process.exit()
  }
  if (git_status.files.length == 0) {
    log('error', `Error: nothing to commit`)
    process.exit()
  }
  try {
    let config = await queryForm(await getFormData())
    let commit_msg = `${config.name}: ${config.subject}\n\n${config.body}\n\n${config.footer}`.trim()
    await git.commit(commit_msg)
    log('success', 'success')
  } catch (e) {
    log('error', String(e).trim())
  }
}

handle()

