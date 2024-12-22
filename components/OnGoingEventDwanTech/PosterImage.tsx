import Image from "next/image";
import style from "./index.module.css";
import clsx from "clsx";

const PosterImage = () => {
  return (
    <>
      <div
        className={clsx(
          style.dawn_poster_bg,
          // "sm:max-w-[400px] md:max-w-[620px] lg:max-w-[900px] xl:max-w-[1024px] w-full",
          // "h-[calc(100vh-180px)] sm:h-[calc(100vh-40px)] md:h-[calc(100vh+40px)] lg:h-[calc(100vh+160px)] xl:h-[calc(100vh+180px)]",
          "w-full max-w-[1024px] aspect-[844/1055] sm:max-w-[400px] md:max-w-[620px] lg:max-w-[900px]",
          "rounded-xl overflow-hidden transition ease-in-out delay-100 hover:scale-90"
        )}
      >
        <Image
          src="/images/dawn-tech-unplug/dawn-tech-unplug.jpg"
          alt="Example Image"
          layout="fill"
          // objectFit="cover
          // objectFit="contain"
        />
      </div>
    </>
  );
};

export default PosterImage;
