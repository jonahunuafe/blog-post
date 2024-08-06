import Image from "next/image";
import demoImg from "../public/image/home_bird.png"

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3/">
        <p className="special-word text-sm">Protect All Birds</p>
        <h1 className="pb-5">
          The world's <span className="special-word">Rarest</span><br /> Birds
        </h1>

        <p>
          Birds are some of the most amazing animals to watch. From their beautiful colors to 
          their captivating body structures. According to National Geographic, there are between 
          50 - 430 billion birds in the world. But out of all these birds, there are many rare
          species that are hard to find and on the verge of bird extinction.
          Do you know some of these birds? If yes, dive right in and create a blog on some of them. 
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
