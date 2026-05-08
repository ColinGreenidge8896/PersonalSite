Hosting a website from home usually means logging into your router and forwarding a port so incoming traffic can reach your machine. I share internet service with others in the building and do not have access to the router admin panel, so that was not an option. Tailscale Funnel solved this without needing any of that.

## How it works

Tailscale is a VPN tool that connects your devices into a private network. Funnel is an extension of that which lets you expose a service on your Tailscale network to the public internet, with Tailscale handling the public-facing side entirely. No router config, no exposed ports on your home network.

The traffic flow for this site is:

1. A request comes in from the public internet
2. Tailscale Funnel receives it at their edge
3. It gets forwarded through the Tailscale network to the Pi
4. nginx serves the static files from `/var/www/html`

Tailscale also handles HTTPS automatically, so the site gets a valid certificate without any extra configuration.

## The nginx setup

nginx is configured to serve the built React app as static files. The Vite build outputs to a `dist` folder, and those files get copied to `/var/www/html` on the Pi. The nginx config for this is straightforward:

```nginx
server {
    listen 80;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The `try_files` line is important for a single-page app: it makes sure that navigating directly to any route (like `/about` or `/blog/some-post`) falls back to `index.html` and lets React Router handle it, rather than nginx returning a 404.

## Deploying updates

The deploy process is manual for now. After making changes locally:

1. Run `npm run build` to produce the `dist` folder
2. Use WinSCP to SFTP the contents of `dist` to `/var/www/html` on the Pi

Not automated, but it works fine for a personal site that does not change that frequently.

## Why this over alternatives

The main reason is the shared internet situation. Beyond that, Funnel is genuinely easy to set up and the zero-config HTTPS is convenient. If you have normal router access, traditional port forwarding works fine too, but this approach keeps my home network out of the picture entirely.
