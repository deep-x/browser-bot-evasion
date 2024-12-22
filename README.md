# Browser Bot Evasion

## Prerequisites

### Required
- https://bun.sh/

### Optional
- https://nodejs.org/
- https://www.docker.com/
- A http or socks5 proxy

## Browser tests used

- https://bot-detector.rebrowser.net/
- https://abrahamjuliot.github.io/creepjs/
- https://tcpip.incolumitas.com/classify?by_ip=1&detail=1
- https://antcpt.com/score_detector/
- https://proxy.incolumitas.com/proxy_detect.html
- https://cpa.rip/stati/antidetect-palivo/

## Development

### Install Dependencies
```bash
bun install
```

### Create and fill .env

```bash
cp .env.example .env
```

### Generate the Report
```bash
bun run src/report.ts     # if you want to use bun
npm run tsx src/report.ts # if you want to use node
```

## A note on Rebrowser

...

## A note on Camoufox

- Using playwright with firefox on my M2 Mac resulted in unexplainable errors,
that I did not want to spend a lot of time on debugging so everything got wrapped in
  Dockerfiles since the same code worked just fine on Ubuntu

- I first tried using selenium with the camoufox browser, which worked fine.
However when I wanted it to use a proxy I could not get it to work so I switched back
to Playwright, since that is what the official camoufox python package was using.

- At the time of this writing using Bun on my machine (M2 Mac) to run the camoufox script
resulted in it freezing up on me. When I switched to using Node (using tsx) it worked fine.
