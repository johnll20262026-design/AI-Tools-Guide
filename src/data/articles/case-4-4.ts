import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'case-4-4',
  title: 'AI Agent 实战（四）：工具调用与多Agent协作',
  description: '给Agent配订单查询、工单创建、人工转接工具，路由Agent分发到专业子Agent，Function Calling配置示例。',
  date: '2026-05-07',
  readTime: '5-7 分钟',
  content: `## 通俗类比：工具调用让Agent从"嘴炮"变成"实干家"

上一篇我们搭的RAG客服Agent只能"答"，不能"做"——查不了订单、建不了工单、转不了人工，就像银行大堂经理只能解答问题，办业务还得去窗口。Function Calling就是给Agent装上"手"和"脚"，让它从"只能说"变成"能说又能做"。

大模型并不会真的调用API，它只负责"决策"：根据用户问题判断要不要调工具、调哪个、传什么参数，输出一段JSON；真正执行API是你的代码，执行完把结果回传给大模型，它再整理成自然语言回答。整个过程是"大模型决策→代码执行→结果回传→大模型回答"的多轮对话。

多Agent协作则是团队化分工：路由Agent分诊，产品Agent答产品，订单Agent查订单，售后Agent处理退换货，人工兜底。每个Agent只干一件事，准确率比单Agent高得多。

## Function Calling底层原理
理解原理能避开很多坑：
1. 你用JSON Schema描述工具列表给LLM
2. LLM判断是否调用，返回工具名+参数
3. 你的代码执行API
4. 结果回传LLM，LLM整理回答

工具设计六大原则：
1. **单一职责**：一个工具只干一件事，不要做万能工具
2. **描述清晰**：写清"干什么""什么时候用""什么时候别用"
3. **参数精确**：用Pydantic+Field描述每个参数的格式和示例
4. **结果简洁**：只返回关键字段，不要返回一大坨原始JSON
5. **错误处理**：API超时、不存在要返回友好错误
6. **敏感确认**：退款、删数据等操作要先跟用户确认

**避坑**：单Agent工具别超5个，多了容易选错；工具描述太简单LLM会乱用；一定要设max_iterations防止死循环；verbose上线要关掉；敏感操作必须确认。

## 核心目标

光有知识库的Agent只能"答"，不能"做"。本篇教你给Agent装上"手"——通过Function Calling让它调用真实API查订单、建工单、转人工。再实现多Agent架构：路由Agent判断用户意图，分发给专业子Agent处理，子Agent间共享记忆协同工作。

## 操作步骤

### 步骤1：理解Function Calling原理
大模型不能直接调用API，但能"决定"调用什么工具、传什么参数：
1. 你先给LLM描述有哪些工具、参数是什么（JSON Schema格式）
2. 用户提问后，LLM判断要不要调用工具
3. 需要调用就返回工具名+参数JSON，你的代码执行API
4. 把结果返回LLM，LLM整理成自然语言回答用户

### 步骤2：定义工具列表
定义三个客服场景最常用的工具：
\\\`\\\`\\\`python
from langchain_core.tools import tool
from pydantic import BaseModel, Field
import time

class OrderQueryInput(BaseModel):
    order_id: str = Field(description="订单号，格式ORD开头加数字，如ORD123456")

class CreateTicketInput(BaseModel):
    order_id: str = Field(description="订单号")
    problem_type: str = Field(description="问题类型：质量问题/物流问题/退换货/其他")
    description: str = Field(description="问题详细描述")

class TransferHumanInput(BaseModel):
    reason: str = Field(description="转人工原因")

@tool(args_schema=OrderQueryInput)
def query_order(order_id: str) -> dict:
    """查询订单物流状态，当用户问订单到哪了、发货了吗时用"""
    mock_orders = {
        "ORD123456": {
            "status": "已发货",
            "logistics": "顺丰速运 SF1234567890",
            "estimated_delivery": "2026-05-10"
        }
    }
    return mock_orders.get(order_id, {"error": "未找到订单，请确认订单号"})

@tool(args_schema=CreateTicketInput)
def create_ticket(order_id: str, problem_type: str, description: str) -> dict:
    """创建售后工单，用户申请售后、退换货、投诉时用"""
    ticket_id = f"TK{order_id[-6:]}{int(time.time()) % 10000}"
    return {
        "ticket_id": ticket_id,
        "message": f"工单已创建，{ticket_id}，客服24小时内联系您"
    }

@tool(args_schema=TransferHumanInput)
def transfer_to_human(reason: str) -> dict:
    """转接人工客服，用户要求转人工、问题解决不了时用"""
    return {"message": "正在为您转接人工客服，预计等待3分钟，请稍候..."}

tools = [query_order, create_ticket, transfer_to_human]
\\\`\\\`\\`,
};

export default article;
