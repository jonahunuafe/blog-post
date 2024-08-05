import Image from "next/image";
import demoImg from "../public/image/home_bird.png"

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3/">
        <p className="special-word text-xs">Protect All the Birds</p>
        <h1 className="pb-5">
          The world's <span className="special-word">Rarest</span><br /> Birds
        </h1>

        <p>
          This is one of the most rarest bird on the planet. This bird has the capacity to fly a 100ft
          into the air without been exhausted. It hunts for prey excellently well. It has a weight of
          approxiamtely 150lbs and height of 50ft.
        </p>
      </div>

      <div className="hidden md:block basis-1/3 mt-14">
        <Image 
        src={demoImg} 
        alt="avatar"
        sizes="100vw"
        className="w-full h-auto"
        />
      </div>
    </div>
  );
}
