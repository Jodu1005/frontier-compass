# 分享链接解析 Buildroom 检视记录

## 性质与 runtime

本记录对应 Buildroom runtime 的隔离分支闭环验证。检视是自动化、独立、只读的交叉检视，**不是人工审批**；是否最终合并仍由人决定。

- 实现：Codex CLI，配置模型 `gpt-5.6-sol`
- 检视：Claude Code CLI，实际返回模型 `deepseek-v4-flash`

## 检视处置

- 原始公开分享解析修复：无阻断项。非法百分号与截断 UTF-8 返回空字符串，正常 token、有效编码和非分享路由语义不变。
- F1 文章深链非法 URI 编码：接受并修复。`deepLinkArticleId` 现在与公开分享解析一致，解码失败返回空字符串；新增畸形百分号、截断 UTF-8、普通 ID、有效编码和非深链路由回归测试。
- 无效分享链接的专门错误页：暂缓，留待后续产品设计，本轮不扩展页面与路由体验。
- 测试收集：已核对 `frontend/package.json` 的 `node:test` 收集方式；原检视所见 82 个测试均被收集，不构成问题。本轮新增 5 个深链用例后共 87 个测试。

## 验证结果

2026-10-16 在任务 checkout 内执行：

- `npm --prefix frontend test`：87 个测试全部通过
- `npm --prefix frontend run lint`：通过
- `npm --prefix frontend run build`：通过，转换 2720 个模块；仍有一条与本次改动无关的既有 CSS 优化警告
- `node --test frontend/test/shareLink.test.mjs`：10 个分享与深链解析回归测试全部通过

