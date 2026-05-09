# colingreenidge.dev (in spirit)

My personal site. **Live at [colins-pi.tail7346be.ts.net](https://colins-pi.tail7346be.ts.net/)**

Yes, that hostname is the Pi it's running on, a proper domain or host service is on the to-do list!

Built with React + Vite + TypeScript and self-hosted on a Raspberry Pi 4, exposed to the internet via Tailscale Funnel. Just a Pi, a TLS cert from Let's Encrypt, and whatever bandwidth Bell gives me on a given Tuesday.

## Running locally

```bash
cd personalsite
npm install
npm run dev
```

Vite serves it at `http://localhost:5173`.

## Deploying

There is no deploy script. The Pi pulls from `main`, builds, and a tiny web server reads from `dist/`. If something looks broken on the live site, that's why.

## Monitoring

[Netdata](https://www.netdata.cloud/) runs on the Pi for live system metrics — CPU, memory, network, disk. Tailnet-only; not publicly exposed (no auth on netdata, so I'd rather not).

## Repo layout

- `personalsite/` — the current site (React + Vite)
- `past versions/v2/` — the previous iteration, kept around so I can look back and cringe

If you found this from my resume, hi!
