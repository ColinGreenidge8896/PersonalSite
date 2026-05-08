// Curated photo grid shown on the homepage. Edit this list to swap or add
// images. Photos live under public/images/.

export type WorkshopPhoto = {
    src: string;
    alt: string;
    caption: string;
};

export const workshopPhotos: WorkshopPhoto[] = [
    {
        src: "/images/printing-the-pi-case/finished-in-use.jpg",
        alt: "The 3D printed Raspberry Pi case in use, with cables connected",
        caption: "Pi running nginx in its 3D printed case",
    },
    {
        src: "/images/printing-the-pi-case/scraps.jpg",
        alt: "A box full of failed 3D prints from the Pi case build",
        caption: "Iteration history",
    },
    {
        src: "/images/printing-the-pi-case/finished-on-printer.jpg",
        alt: "The finished case sitting on the 3D printer bed",
        caption: "Fresh off the print bed",
    },
];
