---
title: An Overview of My Network Security Lab
date: 2026-05-08
summary: A walk-through of the virtual lab environment from my network security course, the defensive setup, and the categories of attacks the labs cover.
tags: [Security, Networking, Virtualization, School]
---

My network security course this past term centered on a virtual lab where we set up a small network, secured it, then turned around and attacked it ourselves. The whole thing runs on a laptop using VirtualBox, with each VM playing a specific role in the simulation. This post is an overview of what the lab covered. Future posts will dig into specific attacks in more detail.

## The lab environment

The setup is a miniature corporate network with a clear external-versus-internal split:

- **OPNsense** acts as the firewall and gateway between the external (Bridged) network and the internal (Host-Only) network. It also runs the OpenVPN server later in the term.
- **Parrot OS** sits on the external side and plays the role of the attacker. It comes loaded with most of the tools used throughout the labs.
- **Metasploitable 2** is an intentionally vulnerable Linux VM on the internal side, used as a soft target for early reconnaissance and exploitation exercises.
- **ccVM** is a vulnerable Windows VM also on the internal side, used as a target for browser-based attacks and credential theft.
- Later labs add a **Windows Domain Controller** and a **Windows domain client** to introduce Active Directory.

Everything is isolated from the host machine and from the real internet by design. The Bridged interface simulates the public side, the Host-Only interface simulates the private side, and OPNsense polices what crosses between them.

## Defensive setup first

Before attacking anything, we configured the network the way a small organization actually would. That meant standing up the firewall, configuring DHCP and DNS, and then setting up OpenVPN on OPNsense so that an external client (Parrot) could VPN into the internal network the way a remote employee would.

The VPN setup involved creating an internal certificate authority, generating server and client certificates, and writing firewall rules that allow OpenVPN traffic in on the WAN side while permitting VPN clients to reach the internal network. It is a useful exercise because it forces you to think about each component of how a real VPN trusts its clients and how that trust is enforced at the network layer.

## Then the attacks

With the environment in place, the labs move through a progression of techniques that roughly mirrors how a real intrusion unfolds.

**Reconnaissance.** `nmap` is the first stop. Host discovery, service version identification, OS fingerprinting, stealth scans that skip the third step of the TCP handshake, and decoy scans that try to confuse network defenders about which machine is actually probing. The point is to map what is out there and what versions of services are running, since that determines which exploits are worth trying.

**Denial of service.** `hping3` is used to flood Metasploitable with crafted SYN packets, optionally spoofing the source address or randomizing it across the subnet. The lab is small enough that the target VM occasionally needs to be rebooted afterward, which is its own lesson in how fragile services can be under load.

**Man-in-the-middle.** `ettercap` and `bettercap` are used to perform ARP cache poisoning, redirecting traffic between a victim and the default gateway through the attacker's machine. This is the lab that I think surprises people most. It demonstrates that if an attacker is on the same local network as you, a lot of assumptions about network safety break down.

**Browser exploitation.** BeEF (the Browser Exploitation Framework) hooks a victim browser via injected JavaScript and gives the attacker control over what runs in that browser session. Combined with bettercap doing the ARP poisoning and injecting the BeEF hook into HTTP traffic on the fly, you get a chained attack that starts from network-layer manipulation and ends with a remotely controlled browser.

**Active Directory.** This is the larger second half of the labs. Tools include CrackMapExec for brute-forcing domain accounts, mimikatz for pulling credential hashes out of memory and using them in pass-the-hash attacks, Bloodhound for mapping out who has access to what within the AD domain, and Kerberoasting for cracking the passwords of accounts with elevated privileges. The progression from "I have one regular user's password" to "I have administrator on multiple machines" is the part that really brings the AD security material into focus.

## What the lab actually teaches

The most useful takeaway is intuition for how attackers actually move through a network. Most of the tools are well-documented and not particularly secret, so the value is not in learning to run them, it is in seeing how each step builds on the last. Reconnaissance feeds exploitation, exploitation feeds credential theft, credential theft feeds lateral movement, and so on.

It also makes the defensive side feel more concrete. After watching ARP poisoning work in five minutes flat, you start thinking about why you would actually want to segment a network or use 802.1X, rather than just nodding along when someone mentions it in a lecture. The labs covered in this post will each get a more focused write-up later, looking at how the attacks work, why they work, and what defenders can do about them.
