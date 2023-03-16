# [DaSiAi.cn](https://www.dasiai.cn/)

其中周报部分来自，感谢开源：[![Weekly Report](./public/screenshot.jpg)](https://weeklyreport.avemaria.fun/zh)

## 这个项目是如何工作的
这个项目主要使用了 [OpenAI GPT-3.5 API](https://platform.openai.com/docs/introduction) 和 [Vercel Edge functions](https://vercel.com/features/edge-functions)。它根据用户输入构建一个 Prompt，通过 Vercel Edge 函数将其发送到 GPT-3.5 API，然后将响应流传回应用程序。

## 在本地运行

**由于众所周知的原因，OpenAI API 的域名 api.openai.com 已无法在大陆网络环境下访问，本地调试需要自己想办法。如果你有好的想法欢迎提PR**

clone 此 repo，去 [OpenAI](https://beta.openai.com/account/api-keys) 注册一个账号，拿到 API key，放到 `.env` 文件。本地文件 `.env.example` 要改成 `.env`。


确保你本地的 npm 命令生效，执行以下命令
```bash
npm install
npm run dev
```
打开 `http://localhost:3000`


## 线上一键部署

用 [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) 一键部署:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/developer-wgl/openAiApi&env=OPENAI_API_KEY,NEXT_PUBLIC_USE_USER_KEY&project-name=dasiai&repo-name=dasiai)

环境变量如下所示：
```
OPENAI_API_KEY=xxxxx
NEXT_PUBLIC_USE_USER_KEY = false  
```

## Docker 部署

```bash
docker run -d -p 3000:3000 --name dasiai-docker -e OPENAI_API_KEY=sk-xxxxx ihxrainbow/dasiai-docker
```

docker-compose.yml
```yaml
services:
  dasiai-docker:
    container_name: dasiai-docker
    ports:
      - '3000:3000'
    image: ihxrainbow/dasiai-docker
    environment:
      # API key
      - OPENAI_API_KEY=sk-xxxxx
```


