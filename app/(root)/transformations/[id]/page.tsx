
import { DeleteConfirmation } from '@/components/shared/DeleteConfirmation';
import Header from '@/components/shared/Header';
import TransformedImage from '@/components/shared/TransformedImage';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/actions/image.actions';
import { getImageSize } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const TransformationsPage = async ({params: {id}}: SearchParamProps) => {
  const {userId} = auth();

  const image = await getImageById(id)

  return (
    <>
      TransformationsPage
      <Header title={image?.title} subtitle={""} />
      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation</p>
          <p className="capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Prompt</p>
              <p className="capitalize text-purple-400">{image.prommpt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color</p>
              <p className="capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              src={image.secureURL}
              alt="image"
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              className='transformation-original_image'
            />
          </div>

          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            transformationConfig={image.config}
            isTransforming={false}
            hasDownload={true}
          />
        </div>
        
        {userId === image.author.clerkId && (
          <div className='mt-4 space-y-4'>
            <Button asChild type='button' className='submit-button capitalize'> 
              <Link href={`${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id}/>

          </div>
        )}

      </section>
    </>
  );
}

export default TransformationsPage