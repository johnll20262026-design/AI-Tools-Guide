import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-professional-5',
  title: '企业级落地实践：CI/CD、版本管理、A/B 测试与 SLO',
  description: 'AI应用生产环境必备工程能力：四维版本管理、CI/CD流水线集成LLM评估、A/B测试体系、SLO可观测性与降级策略。',
  date: '2026-05-22',
  readTime: '15-20 分钟',
  related: ['deploy-2', 'agent-4', 'path-professional-4', 'path-professional-6'],
  content: `## 为什么企业级AI应用需要专门的工程实践？

个人玩具项目和企业级生产应用之间，隔着一整套工程实践的鸿沟。你在本地Jupyter Notebook里跑通了一个RAG Demo，不代表它能支撑每天10万次调用的生产流量。企业关心的是：服务不能挂、回答不能错、成本不能爆、问题能定位、版本能回滚。

2024-2025年大量AI应用踩过的坑：Prompt改了一版效果变好但另一类问题全崩了、模型升级导致回答风格突变、某个用户的长对话触发了token爆增成本飙升、上线后发现幻觉率高达30%却没法快速回滚。这些问题不是模型能力的问题，而是工程实践的问题。

本篇从四个维度讲清楚企业级AI应用落地必备的工程能力：版本管理、CI/CD流水线、A/B测试体系、SLO与可观测性。

## 一、四维版本管理：不只是代码版本

传统软件只需要管理代码版本，但AI应用有四个独立变化的维度，每个都需要版本控制：

| 维度 | 版本对象 | 变更频率 | 风险等级 | 版本管理方式 |
|------|---------|---------|---------|------------|
| 代码 | Python/TS代码、API接口 | 天/周级别 | 中 | Git分支 + PR |
| Prompt | System Prompt、Few-shot示例、模板 | 小时/天级别 | 高 | Prompt Registry + 版本号 |
| 模型 | GPT-5.5/Claude版本、Embedding模型、微调权重 | 月/季度 | 极高 | 模型配置中心 + 灰度 |
| 数据 | 知识库文档、训练数据、RAG索引 | 天/周级别 | 中 | 数据版本控制(DVC) + 索引快照 |

### Prompt版本管理最佳实践

Prompt是AI应用最常改动也最容易出问题的部分，必须有严格的版本管理：

1. **Prompt Registry**：所有Prompt集中存储在配置中心或数据库，不要硬编码在代码里。每个Prompt有唯一ID、版本号、创建人、变更记录
2. **变更评审**：Prompt修改必须走PR流程，至少两人review，核心Prompt（如客服、风控）必须经业务方确认
3. **效果回归测试**：每次修改Prompt必须跑一遍标准测试集（20-50个典型问题），准确率下降超过阈值禁止上线
4. **一键回滚**：任何Prompt版本都能一键切回历史版本，不需要重新部署代码

\\\`\\\`\\\`python
class PromptRegistry:
    def __init__(self, db):
        self.db = db
    
    def get_prompt(self, prompt_id: str, version: str = "latest") -> str:
        if version == "latest":
            return self.db.query(
                "SELECT content FROM prompts WHERE id = ? ORDER BY version DESC LIMIT 1",
                prompt_id
            )
        return self.db.query(
            "SELECT content FROM prompts WHERE id = ? AND version = ?",
            prompt_id, version
        )
    
    def rollback(self, prompt_id: str, target_version: str):
        self.db.execute(
            "UPDATE prompts SET is_active = (version = ?) WHERE id = ?",
            target_version, prompt_id
        )
\\\`\\\`\\`,
};

export default article;
