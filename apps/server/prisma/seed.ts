import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedData() {
  await prisma.category.createMany({
    data: [{ name: "men" }, { name: "women" }, { name: "kids" }],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Git fusion Classic T-Shirt",
        price: 18.45,
        size: "S",
        images: [
          "https://ih1.redbubble.net/image.4917627233.0973/ssrco,classic_tee,womens,fafafa:ca443f4786,front_alt,tall_three_quarter,750x1000.u1.jpg",
          "https://ih1.redbubble.net/image.4917627233.0973/raf,750x1000,075,t,fafafa:ca443f4786.u1.jpg",
          "https://ih1.redbubble.net/image.4917627233.0973/ssrco,classic_tee,womens,fafafa:ca443f4786,side_front,alt_crop,750x1000.u1.jpg",
        ],
        description: "Loose-fit round neck T-shirt",
        stockQuantity: 50,
        featured: true,
        newArrivals: false,
        categoryId: 2,
      },
      {
        name: "Hackathon developer and computer science T-shirt",
        price: 19.45,
        size: "S",
        images: [
          "https://ih1.redbubble.net/image.811953195.5228/ssrco,classic_tee,womens,101010:01c5ca27c6,side_front,alt_crop,750x1000.u5.jpg",
          "https://ih1.redbubble.net/image.811953195.5228/raf,750x1000,075,t,101010:01c5ca27c6.u5.jpg",
          "https://ih1.redbubble.net/image.811953195.5228/ssrco,classic_tee,flatlay,101010:01c5ca27c6,front,wide_portrait,750x1000.u5.jpg",
        ],
        description: "Loose-fit round neck T-shirt",
        stockQuantity: 50,
        featured: true,
        newArrivals: true,
        categoryId: 2,
      },
      {
        name: "GraphQL Classic T-Shirt",
        price: 25,
        size: "XL",
        images: [
          "https://ih1.redbubble.net/image.319451379.5740/ssrco,classic_tee,womens,e5d6c5:f62bbf65ee,front_alt,tall_three_quarter,750x1000.jpg",
          "https://ih1.redbubble.net/image.319451379.5740/raf,750x1000,075,t,e5d6c5:f62bbf65ee.jpg",
          "https://ih1.redbubble.net/image.319451379.5740/ssrco,classic_tee,womens,e5d6c5:f62bbf65ee,side_front,alt_crop,750x1000.jpg",
        ],
        description: "Loose-fit round neck T-shirt",
        stockQuantity: 60,
        featured: false,
        newArrivals: true,
        categoryId: 2,
      },
      {
        name: "Monolith vs Microservices T-Shirt",
        price: 20.99,
        size: "M",
        images: [
          "https://ih1.redbubble.net/image.708698872.7801/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.u2.jpg",
          "https://ih1.redbubble.net/image.708698872.7801/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,tall_portrait,750x1000.u2.jpg",
          "https://ih1.redbubble.net/image.708698872.7801/ssrco,classic_tee,mens,fafafa:ca443f4786,side,tall_three_quarter,750x1000.u2.jpg",
        ],
        description: "Loose-fit round neck T-shirt",
        stockQuantity: 100,
        featured: true,
        newArrivals: true,
        categoryId: 1,
      },
      {
        name: "Location API T-shirt",
        price: 15.49,
        size: "L",
        images: [
          "https://ih1.redbubble.net/image.456581054.0458/ssrco,classic_tee,mens,5e504c:7bf03840f4,front_alt,tall_portrait,750x1000.u5.jpg",
          "https://ih1.redbubble.net/image.456581054.0458/ssrco,classic_tee,flatlay,5e504c:7bf03840f4,front,wide_portrait,750x1000.u5.jpg",
          "https://ih1.redbubble.net/image.456581054.0458/ssrco,classic_tee,mens,5e504c:7bf03840f4,side,tall_three_quarter,750x1000.u5.jpg",
        ],
        description: "Loose-fit round neck T-shirt",
        stockQuantity: 80,
        featured: true,
        newArrivals: true,
        categoryId: 1,
      },

      {
        name: "Yoda RTFM T-Shirt",
        price: 30,
        size: "S",
        images: [
          "https://ih1.redbubble.net/image.4917648849.1559/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,tall_portrait,750x1000.u1.jpg",
          "https://ih1.redbubble.net/image.4917648849.1559/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.u1.jpg",
          "https://ih1.redbubble.net/image.4917648849.1559/ssrco,classic_tee,mens,fafafa:ca443f4786,side,tall_three_quarter,750x1000.u1.jpg",
        ],
        description: "Loose-fit round neck T-shirt",
        stockQuantity: 70,
        featured: false,
        newArrivals: true,
        categoryId: 1,
      },
      {
        name: "No Rest Kids T-Shirt ",
        price: 35,
        size: "M",
        images: [
          "https://ih1.redbubble.net/image.35839027.7765/ra,kids_tee,x900,000000:44f0b734a5,front-pad,750x1000,f8f8f8.u5.jpg",
          "https://ih1.redbubble.net/image.35839027.7765/raf,750x1000,075,t,000000:44f0b734a5.u5.jpg",
        ],
        description: "Ribbed round neck (does not deform with use)",
        stockQuantity: 90,
        featured: true,
        newArrivals: true,
        categoryId: 3,
      },
      {
        name: "OK, but coding first Kids T-Shirt",
        price: 40,
        size: "L",
        images: [
          "https://ih1.redbubble.net/image.2420673567.1194/ra,kids_tee,x900,000000:44f0b734a5,front-pad,750x1000,f8f8f8.jpg",
          "https://ih1.redbubble.net/image.2420673567.1194/raf,750x1000,075,t,000000:44f0b734a5.jpg",
        ],
        description: "Ribbed round neck (does not deform with use)",
        stockQuantity: 120,
        featured: true,
        newArrivals: true,
        categoryId: 3,
      },
      {
        name: "Web Developer Kids  T-Shirt ",
        price: 45,
        size: "S",
        images: [
          "https://ih1.redbubble.net/image.1780592501.7942/ra,kids_tee,x900,FFFFFF:97ab1c12de,front-pad,750x1000,f8f8f8.jpg",
          "https://ih1.redbubble.net/image.1780592501.7942/raf,750x1000,075,t,FFFFFF:97ab1c12de.jpg",
        ],
        description: "Ribbed round neck (does not deform with use)",
        stockQuantity: 110,
        featured: true,
        newArrivals: true,
        categoryId: 3,
      },
      {
        name: "URL Structure Kids T-Shirt",
        price: 50,
        size: "S",
        images: [
          "https://ih1.redbubble.net/image.2978090614.1385/ra,kids_tee,x900,FFFFFF:97ab1c12de,front-pad,750x1000,f8f8f8.jpg",
          "https://ih1.redbubble.net/image.2978090614.1385/raf,750x1000,075,t,FFFFFF:97ab1c12de.jpg",
        ],
        description: "Ribbed round neck (does not deform with use)",
        stockQuantity: 75,
        featured: true,
        newArrivals: true,
        categoryId: 3,
      },
    ],
  });
  await prisma.user.createMany({
    data: [
      { name: "Max", password: "12345", email: "max@gmail.com", isAdmin: true },
      {
        name: "Ilias",
        password: "12345",
        email: "ilias@gmail.com",
        isAdmin: true,
      },
      {
        name: "Agnes",
        password: "12345",
        email: "agnes@gmail.com",
        isAdmin: true,
      },
    ],
  });

  console.log("Data seeded successfully!");
}

seedData()
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
