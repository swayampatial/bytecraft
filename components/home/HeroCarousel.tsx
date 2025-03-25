import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const carouselImages = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/hero4.jpg',
];

function HeroCarousel() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel className="relative">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <Card className="shadow-lg">
                <CardContent className="p-2">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-md object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
