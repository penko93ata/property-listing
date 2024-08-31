"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

import { TProperty } from "@/types/properties.types";

export default function ShareButtons({ property }: { property: TProperty }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property.id}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>Share This Property:</h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton title={property.name} url={shareUrl} hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton title={property.name} url={shareUrl} hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <WhatsappShareButton title={property.name} url={shareUrl} separator='::'>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <EmailShareButton subject={property.name} url={shareUrl} body={`Check out this property listing: ${shareUrl}`}>
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
}
