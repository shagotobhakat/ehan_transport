"use client";

import TeamCarousel from "./teamCarousel";

export default function Gallery() {
  return (
    <TeamCarousel
      className="z-30"
      fitMode="cover"
      autoPlay={3000}
      members={[
        { id: 1, image: "/gal1.jpg",  },
        { id: 2, image: "/gal2.jpg",  },
        { id: 3, image: "/gal3.jpg",  },
        { id: 4, image: "/gal4.jpg",  },
        { id: 5, image: "/gal5.jpg",  },
        { id: 6, image: "/gal6.jpg",  },
        { id: 7, image: "/gal7.jpg",  },
      ]}
    />
  );
}
