import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'coding-5',
  title: 'AI 代码审查实战：用 GPT-5.5/Claude 做 Code Review 提升代码质量',
  description: '搭建 AI 辅助 Code Review 工作流，自动发现 bug、安全漏洞、性能问题，让团队代码质量提升30%以上。',
  date: '2026-05-21',
  readTime: '16 分钟',
  content: `AI不仅能帮你写代码，还能帮你审查代码。AI Code Review能在PR提交后秒级出review意见，自动发现bug、安全漏洞、性能问题，把代码审查时间从几小时缩短到几分钟，线上bug率降低30%以上。本文教你搭建完整AI代码审查工作流。

---

## 通俗类比：AI代码审查就像有个资深专家帮你做Code Review

你写完代码发PR，希望有个资深大牛帮你review——找bug、看安全漏洞、提性能优化建议、看代码规不规范。但大牛都很忙，等两三天才review完是常态。AI Code Review就是24小时在线的"虚拟资深工程师"，你提交PR它秒级出review意见，帮你发现80%的常见问题，让人类reviewer只需要看AI发现不了的业务逻辑问题。

## 为什么需要AI辅助Code Review？

传统Code Review痛点：
1. **慢**：同事忙，review等几小时到几天
2. **漏**：人会疲劳，很多bug看漏了
3. **标准不统一**：不同人review标准不一样
4. **初级问题占时间**：变量名、格式、空指针这些低级问题占了review 50%的时间

AI Code Review优势：
- 秒级出结果不用等
- 不会疲劳每次标准一致
- 自动发现安全漏洞（SQL注入、XSS、硬编码密钥）
- 自动检测性能问题（N+1查询、内存泄漏）
- 自动检查代码规范（命名、格式、注释）
- 人类reviewer只需要看业务逻辑和架构

## 主流方案

### 1. Cursor/Copilot Chat即时Review
写代码时随时选中代码问："这段代码有什么问题？有什么可以改进的？"这是最轻量化的方式，写代码边写边review。

### 2. GitHub Copilot for Pull Requests
GitHub官方集成，PR提交后Copilot自动生成review意见、PR描述、代码变更摘要。在PR页面直接显示AI评论。

### 3. CodeRabbit / Sourcery / Codacy
专门的AI Code Review工具，集成GitHub/GitLab，支持自定义规则，能发现更复杂的问题：代码复杂度、测试覆盖率建议、架构问题。

### 4. 自建Pipeline：GPT-5.5/Claude API
用LLM API搭建自己的Code Review机器人：PR提交时webhook触发→拉取diff→发给AI分析→评论到PR。灵活可定制，适合有特殊需求的团队。

## 自建AI Code Review工作流

搭建步骤：
1. GitHub/GitLab配置webhook，PR创建/更新时触发
2. 后端服务接收事件，用git diff获取变更代码
3. 把diff发给Claude/GPT-5.5，Prompt让AI做review
4. AI返回结构化JSON：问题位置、严重程度、描述、修复建议
5. 把AI评论发到PR对应的代码行
6. 支持/ai_review命令人工触发重新review

Prompt示例：
\\\`你是一位资深代码审查专家，请审查以下代码变更，从以下维度分析：1.是否有bug 2.是否有安全漏洞（SQL注入/XSS/认证问题）3.是否有性能问题 4.是否有代码规范问题 5.是否有可改进之处。对每个问题给出：文件路径、行号、严重程度（critical/major/minor）、问题描述、修复建议。用JSON格式返回。\\`,
};

export default article;
