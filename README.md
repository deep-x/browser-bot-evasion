# Browser Bot Evasion

## Prerequisites

**Required:**
- https://bun.sh/

**Optional:**
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

## Technologies being used to evade bot detection

- Using the [camoufox browser](https://github.com/daijro/camoufox)
- Using the [rebrowser patches](https://github.com/rebrowser/rebrowser-patches)

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
# if you want to use bun
bun run src/report.ts

# or if you want to use node
npm run tsx src/report.ts
```

## A note on [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)

This package was, to my knowledge, one of the first pioneering attempts of evading bot
detection technology. However it has not been significantly updated in the last ~2 years
(as the time of this writing) and after testing it on a lot of different bot detection
sites its methods actually led to the browser being detected as a bot even more, than without it.
This may partly be because of its popularity and open-source nature, that bot detector sites
were able to look for the techniques being used in this library specifically and easily
detect them. Since it is a collection of plugins, there are still some plugins that can
be used. However just dropping it in with the default configuration is quite dangerous.

## A note on [Rebrowser](https://github.com/rebrowser/rebrowser-patches)

...

## A note on [Camoufox](https://github.com/daijro/camoufox)

- Using playwright with firefox on my M2 Mac resulted in unexplainable errors,
that I did not want to spend a lot of time on debugging so everything got wrapped in
  Dockerfiles since the same code worked just fine on Ubuntu

- I first tried using selenium with the camoufox browser, which worked fine.
However when I wanted it to use a proxy I could not get it to work so I switched back
to Playwright, since that is what the official camoufox python package was using.

- At the time of this writing using Bun on my machine (M2 Mac) to run the camoufox script
resulted in it freezing up on me. When I switched to using Node (using tsx) it worked fine.
