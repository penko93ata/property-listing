import Image from "next/image";

export default function PropertyImages({ images }: { images: string[] }) {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        {images.length === 1 ? (
          <Image src={images[0]} alt='' className='object-cover h-[400px] mx-auto rounded-xl' width={1800} height={400} priority={true} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {images.map((image, index) => {
              const isLastImageOdd = images.length % 2 === 1 && index === images.length - 1;
              return (
                <div key={index} className={isLastImageOdd ? "col-span-2" : "col-span-1"}>
                  <Image src={image} alt='' className='object-cover h-[400px] w-full rounded-xl' width={900} height={400} priority={true} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
