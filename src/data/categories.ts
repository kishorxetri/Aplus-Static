export interface SubcategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  isPopular?: boolean;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  subcategories: SubcategoryItem[];
}

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: "sports-equipment",
    name: "Sports Equipment",
    slug: "sports-equipment",
    shortDescription: "Professional athletic gear, match balls, tournament nets, and court infrastructure.",
    image: "/images/categories/sports-equipment.jpg",
    subcategories: [
      {
        id: "football",
        name: "Football & Soccer Balls",
        slug: "football",
        image: "/images/subcategories/football.jpg",
        href: "/category/sports-equipment?sub=football",
        isPopular: true,
      },
      {
        id: "basketball",
        name: "Basketball Posts & Backboards",
        slug: "basketball",
        image: "/products/BB%20post.jpg",
        href: "/category/sports-equipment?sub=basketball",
        isPopular: true,
      },
      {
        id: "badminton",
        name: "Badminton Rackets & Shuttles",
        slug: "badminton",
        image: "/images/subcategories/badminton.jpg",
        href: "/category/sports-equipment?sub=badminton",
        isPopular: true,
      },
      {
        id: "volleyball",
        name: "Volleyballs & Tournament Nets",
        slug: "volleyball",
        image: "/images/subcategories/volleyball.jpg",
        href: "/category/sports-equipment?sub=volleyball",
      },
      {
        id: "table-tennis",
        name: "Table Tennis & Paddles",
        slug: "table-tennis",
        image: "/images/subcategories/table-tennis.jpg",
        href: "/category/sports-equipment?sub=table-tennis",
        isPopular: true,
      },
      {
        id: "crash-mats",
        name: "High-Density Crash Mats",
        slug: "crash-mats",
        image: "/products/folding%20mat.jpg",
        href: "/category/sports-equipment?sub=crash-mats",
      },
      {
        id: "yoga-mats",
        name: "Yoga & Activity Floor Mats",
        slug: "yoga-mats",
        image: "/products/yoga%20mat.jpg",
        href: "/category/sports-equipment?sub=yoga-mats",
      },
      {
        id: "court-systems",
        name: "Athletic Court Systems",
        slug: "court-systems",
        image: "/images/categories/sports-equipment.jpg",
        href: "/category/sports-equipment?sub=court-systems",
      },
      {
        id: "training-nets",
        name: "Soft Ball Training Nets",
        slug: "training-nets",
        image: "/products/net%20ball%20pool.jpg",
        href: "/category/sports-equipment?sub=training-nets",
      },
      {
        id: "institutional-post",
        name: "Institutional Basketball Post",
        slug: "institutional-post",
        image: "/products/BB%20post.jpg",
        href: "/category/sports-equipment?sub=institutional-post",
      },
    ],
  },
  {
    id: "kids-educational",
    name: "Kids & Educational Products",
    slug: "kids-educational",
    shortDescription: "Certified Montessori materials, wooden cognitive toys, and preschool classroom equipment.",
    image: "/images/categories/kids-educational.jpg",
    subcategories: [
      {
        id: "alphabet-boards",
        name: "Wooden Alphabet Boards",
        slug: "alphabet-boards",
        image: "/products/nepali%20alphabet%20board.jpg",
        href: "/category/kids-educational?sub=alphabet-boards",
        isPopular: true,
      },
      {
        id: "puzzles",
        name: "Shape & Size Puzzle Boards",
        slug: "puzzles",
        image: "/products/puzzle%20board.jpg",
        href: "/category/kids-educational?sub=puzzles",
        isPopular: true,
      },
      {
        id: "train-tracks",
        name: "Wooden Train & Track Series",
        slug: "train-tracks",
        image: "/products/blocks%20small%20train.jpg",
        href: "/category/kids-educational?sub=train-tracks",
        isPopular: true,
      },
      {
        id: "doctor-set",
        name: "Pretend Doctor Medical Sets",
        slug: "doctor-set",
        image: "/products/doctor%20set.jpg",
        href: "/category/kids-educational?sub=doctor-set",
        isPopular: true,
      },
      {
        id: "doll-house",
        name: "Wooden Doll Houses & Figures",
        slug: "doll-house",
        image: "/products/doll%20house.jpg",
        href: "/category/kids-educational?sub=doll-house",
      },
      {
        id: "tool-box",
        name: "Wooden Tool Box & Workbench",
        slug: "tool-box",
        image: "/products/wooden%20tool%20box.jpg",
        href: "/category/kids-educational?sub=tool-box",
        isPopular: true,
      },
      {
        id: "life-cycle",
        name: "Butterfly Life Cycle Boards",
        slug: "life-cycle",
        image: "/products/butterfly%20life%20cycle.jpg",
        href: "/category/kids-educational?sub=life-cycle",
      },
      {
        id: "plasma-cars",
        name: "Plasma Cars & Ride-ons",
        slug: "plasma-cars",
        image: "/products/plasma%20car.jpg",
        href: "/category/kids-educational?sub=plasma-cars",
        isPopular: true,
      },
      {
        id: "moon-tables",
        name: "Ergonomic Moon Tables",
        slug: "moon-tables",
        image: "/products/moon%20table.jpg",
        href: "/category/kids-educational?sub=moon-tables",
        isPopular: true,
      },
      {
        id: "shoe-racks",
        name: "Preschool Shoe Storage Racks",
        slug: "shoe-racks",
        image: "/products/shoe%20rack.jpg",
        href: "/category/kids-educational?sub=shoe-racks",
      },
    ],
  },
  {
    id: "playground-recreation",
    name: "Playground & Recreation",
    slug: "playground-recreation",
    shortDescription: "Commercial playground structures, certified safety slides, inground trampolines, and seesaws.",
    image: "/images/categories/playground-recreation.jpg",
    subcategories: [
      {
        id: "multi-play",
        name: "Multi-Play Tower Structures",
        slug: "multi-play",
        image: "/images/categories/playground-recreation.jpg",
        href: "/category/playground-recreation?sub=multi-play",
        isPopular: true,
      },
      {
        id: "trampolines",
        name: "Inground Trampoline Systems",
        slug: "trampolines",
        image: "/products/trampoline.jpg",
        href: "/category/playground-recreation?sub=trampolines",
        isPopular: true,
      },
      {
        id: "climbing-domes",
        name: "Spider Web Climbing Domes",
        slug: "climbing-domes",
        image: "/products/climbing.jpg",
        href: "/category/playground-recreation?sub=climbing-domes",
        isPopular: true,
      },
      {
        id: "seesaws",
        name: "Animal Spring Seesaws (Camel)",
        slug: "seesaws",
        image: "/products/camel%20seesaw.jpg",
        href: "/category/playground-recreation?sub=seesaws",
        isPopular: true,
      },
      {
        id: "ball-pools",
        name: "Soft Play Ball Pool Arenas",
        slug: "ball-pools",
        image: "/products/net%20ball%20pool.jpg",
        href: "/category/playground-recreation?sub=ball-pools",
        isPopular: true,
      },
      {
        id: "net-swings",
        name: "Heavy-Duty Net Bird Swings",
        slug: "net-swings",
        image: "/products/net%20swing.jpg",
        href: "/category/playground-recreation?sub=net-swings",
      },
      {
        id: "jump-o-lene",
        name: "Jump-o-lene Inflatables",
        slug: "jump-o-lene",
        image: "/products/jump-o-lene.jpg",
        href: "/category/playground-recreation?sub=jump-o-lene",
      },
      {
        id: "rockers",
        name: "Humpty Animal Rockers",
        slug: "rockers",
        image: "/products/humpty%20rider.jpg",
        href: "/category/playground-recreation?sub=rockers",
      },
      {
        id: "ship-houses",
        name: "Themed Ship Playhouses",
        slug: "ship-houses",
        image: "/products/ship%20house.jpg",
        href: "/category/playground-recreation?sub=ship-houses",
      },
      {
        id: "hammocks",
        name: "Recreational Hammocks",
        slug: "hammocks",
        image: "/products/hammock.jpg",
        href: "/category/playground-recreation?sub=hammocks",
      },
    ],
  },
  {
    id: "artificial-turf",
    name: "Artificial Turf",
    slug: "artificial-turf",
    shortDescription: "FIFA-quality synthetic grass for football pitches, futsal arenas, schools, and landscape lawns.",
    image: "/images/categories/artificial-turf.jpg",
    subcategories: [
      {
        id: "football-turf",
        name: "Football Pitch Turf (50mm)",
        slug: "football-turf",
        image: "/images/subcategories/turf-roll.jpg",
        href: "/category/artificial-turf?sub=football-turf",
        isPopular: true,
      },
      {
        id: "futsal-turf",
        name: "Futsal Arena Synthetic Grass",
        slug: "futsal-turf",
        image: "/images/categories/artificial-turf.jpg",
        href: "/category/artificial-turf?sub=futsal-turf",
        isPopular: true,
      },
      {
        id: "landscape-turf",
        name: "Landscape & Garden Turf (30mm)",
        slug: "landscape-turf",
        image: "/images/categories/artificial-turf.jpg",
        href: "/category/artificial-turf?sub=landscape-turf",
        isPopular: true,
      },
      {
        id: "golf-green",
        name: "Pro Golf Putting Greens",
        slug: "golf-green",
        image: "/images/subcategories/turf-roll.jpg",
        href: "/category/artificial-turf?sub=golf-green",
      },
      {
        id: "playground-turf",
        name: "Playground Soft Cushion Turf",
        slug: "playground-turf",
        image: "/images/categories/artificial-turf.jpg",
        href: "/category/artificial-turf?sub=playground-turf",
      },
    ],
  },
  {
    id: "commercial-fitness",
    name: "Commercial & Fitness",
    slug: "commercial-fitness",
    shortDescription: "Heavy-duty commercial gym equipment, dumbbell racks, rubber flooring, and fitness mats.",
    image: "/images/categories/commercial-fitness.jpg",
    subcategories: [
      {
        id: "dumbbells",
        name: "Commercial Dumbbell Racks",
        slug: "dumbbells",
        image: "/images/categories/commercial-fitness.jpg",
        href: "/category/commercial-fitness?sub=dumbbells",
        isPopular: true,
      },
      {
        id: "gym-tiles",
        name: "Interlocking Rubber Gym Tiles",
        slug: "gym-tiles",
        image: "/images/subcategories/gym-flooring.jpg",
        href: "/category/commercial-fitness?sub=gym-tiles",
        isPopular: true,
      },
      {
        id: "crash-mats",
        name: "High-Density Crash Mats",
        slug: "crash-mats",
        image: "/products/folding%20mat.jpg",
        href: "/category/commercial-fitness?sub=crash-mats",
        isPopular: true,
      },
      {
        id: "yoga-mats",
        name: "Commercial Yoga & Pilates Mats",
        slug: "yoga-mats",
        image: "/products/yoga%20mat.jpg",
        href: "/category/commercial-fitness?sub=yoga-mats",
      },
      {
        id: "gym-stations",
        name: "Multi-Station Gym Equipment",
        slug: "gym-stations",
        image: "/images/categories/commercial-fitness.jpg",
        href: "/category/commercial-fitness?sub=gym-stations",
      },
    ],
  },
  {
    id: "kindergarten-furniture",
    name: "School & Furniture",
    slug: "kindergarten-furniture",
    shortDescription: "Ergonomic kindergarten activity tables, activity chairs, Montessori shelves, and preschool storage.",
    image: "/images/categories/school-furniture.jpg",
    subcategories: [
      {
        id: "moon-tables",
        name: "Kindergarten Activity Moon Tables",
        slug: "moon-tables",
        image: "/products/moon%20table.jpg",
        href: "/category/kindergarten-furniture?sub=moon-tables",
        isPopular: true,
      },
      {
        id: "shelves",
        name: "Montessori Wooden Storage Shelves",
        slug: "shelves",
        image: "/products/shoe%20rack.jpg",
        href: "/category/kindergarten-furniture?sub=shelves",
        isPopular: true,
      },
      {
        id: "toolboxes",
        name: "Wooden Learning Toolboxes",
        slug: "toolboxes",
        image: "/products/wooden%20tool%20box.jpg",
        href: "/category/kindergarten-furniture?sub=toolboxes",
        isPopular: true,
      },
      {
        id: "playhouses",
        name: "Preschool Activity Playhouses",
        slug: "playhouses",
        image: "/products/ship%20house.jpg",
        href: "/category/kindergarten-furniture?sub=playhouses",
      },
      {
        id: "plasma-cars",
        name: "Kids Balance Plasma Cars",
        slug: "plasma-cars",
        image: "/products/plasma%20car.jpg",
        href: "/category/kindergarten-furniture?sub=plasma-cars",
      },
    ],
  },
];

export const CATEGORY_ALIASES: Record<string, string> = {
  playground: "playground-recreation",
  "playground-recreation": "playground-recreation",
  "kids-zone": "kids-educational",
  "kids-educational": "kids-educational",
  montessori: "kids-educational",
  "school-furniture": "kindergarten-furniture",
  "kindergarten-furniture": "kindergarten-furniture",
  kindergarten: "kindergarten-furniture",
  sports: "sports-equipment",
  "sports-equipment": "sports-equipment",
  turf: "artificial-turf",
  "artificial-turf": "artificial-turf",
  fitness: "commercial-fitness",
  "commercial-fitness": "commercial-fitness",
  gym: "commercial-fitness",
};

export function getCategoryBySlug(slug: string): MainCategory | undefined {
  const normalizedSlug = slug ? slug.toLowerCase().trim() : "";
  const resolvedSlug = CATEGORY_ALIASES[normalizedSlug] || normalizedSlug;
  return MAIN_CATEGORIES.find(
    (c) => c.slug === resolvedSlug || c.id === resolvedSlug
  );
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subSlug: string
): SubcategoryItem | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const normalizedSub = subSlug ? subSlug.toLowerCase().trim() : "";
  return category.subcategories.find(
    (s) => s.slug === normalizedSub || s.id === normalizedSub
  );
}

export const TOP_NAV_LINKS = [
  { name: "All Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "B2B", href: "/b2b" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

