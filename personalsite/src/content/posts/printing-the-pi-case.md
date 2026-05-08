I wanted a case for the Raspberry Pi 4B running my portfolio server, and since I had an Anycubic Kobra 2 Neo sitting around, it seemed like a good excuse to actually use it.

I found [Malolo's screw-less snap-fit Pi 4 case](https://cults3d.com/en/3d-model/gadget/malolo-s-screw-less-snap-fit-raspberry-pi-4-model-b-case-stands) on Cults3D, a two-part design with ventilation slots, port cutouts, and a lid featuring the Raspberry Pi logo cut through it. I downloaded it, loaded it into PrusaSlicer, and got a solid education in 3D printer calibration.

## Slicer setup

The first issue was poor bed adhesion. Parts were peeling up mid-print and the first layers looked rough. Re-running the auto-leveling and cleaning the bed with isopropyl alcohol helped, but prints were still coming out weak and gappy.

Looking at the slicer profile more carefully turned up the actual culprit: the filament diameter was set to 2.85mm instead of 1.75mm. That one setting causes severe under-extrusion across the whole print. On top of that, the nozzle temperature was sitting at 170°C, which is below the working range for standard PLA.

The imported profile had also come in with a bed temperature of 0°C, a retraction length of 2mm (it should be around 0.8 to 1.0mm for this printer), and slightly off layer heights. I scrapped it and set everything manually. PrusaSlicer was also in Simple Mode by default, which hides most of the useful settings. Switching to Advanced or Expert mode unlocks retraction, cooling, and speed controls.

The settings that ended up working well:

| Setting | Value |
|---|---|
| Filament diameter | 1.75mm |
| Nozzle temp | 200°C |
| Bed temp | 60°C |
| Layer height | 0.20mm |
| First layer height | 0.24mm |
| Retraction length | 0.8mm |
| First layer speed | 15 to 20 mm/s |

I used AI to help work through the diagnosis, which was useful for narrowing down which settings were causing which symptoms. Most of the issues came down to the profile problems above rather than anything wrong with the hardware.

## The logo lid

The lid design has the Raspberry Pi logo cut through it, which requires the printer to bridge filament across open space. With settings still being dialed in, that area came out stringy across a few attempts. The box of scraps in the photos tells that story pretty well.

I ended up going with a cleaner lid design without the cutout, which printed reliably first try. The finished case is the two-tone blue and gray one in the photos and it has been sitting on my desk running nginx without issue since.

## Takeaways

Check the slicer profile before printing anything. The wrong filament diameter is the kind of setting that quietly undermines every print until you catch it, and it is worth going through the core settings manually rather than trusting an imported profile.

It is also worth matching design complexity to where your calibration actually is. The decorative logo lid is achievable, just not the best starting point when you are still sorting out the basics. Getting simpler geometry printing cleanly first makes the more interesting designs easier to tackle.
