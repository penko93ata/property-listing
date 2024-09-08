"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function PropertyImages({ images }: { images: string[] }) {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          {images.length === 1 ? (
            <Item original={images[0]} thumbnail={images[0]} width='1000' height='600'>
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  ref={ref}
                  onClick={open}
                  alt=''
                  className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {images.map((image, index) => {
                const isLastImageOdd = images.length % 2 === 1 && index === images.length - 1;
                return (
                  <div key={index} className={isLastImageOdd ? "col-span-2" : "col-span-1"}>
                    <Item original={image} thumbnail={image} width='1000' height='600'>
                      {({ ref, open }) => (
                        <Image
                          src={image}
                          ref={ref}
                          onClick={open}
                          alt=''
                          className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                          width={900}
                          height={400}
                          priority={true}
                        />
                      )}
                    </Item>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}
