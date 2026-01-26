
"use client";

export default function Home() {
  const data = [
    {
      title: "Beds",
      description:
        "Custom-designed beds with storage options, headboards, and platform designs",
      features: [
        "King & Queen Size",
        "Storage Beds",
        "Custom Headboards",
        "Upholstered Options",
      ],
      price: "₹15,000 - ₹80,000",
      image:
        "https://casagold.in/cdn/shop/articles/Scandinavian_Wavy_Rattan_Bed_1.webp?v=1736146037&width=2048",
    },
    {
      title: "Wardrobes",
      description:
        "Space-efficient wardrobes with smart storage solutions and modern designs",
      features: [
        "Sliding Doors",
        "Walk-in Closets",
        "Mirror Finish",
        "Soft-Close Drawers",
      ],
      price: "₹25,000 - ₹1,50,000",
      image:
        "https://ik.imagekit.io/2xkwa8s1i/img/wardrobes/r1/WWRB4DMH1GINGHAMCWR1/1.jpg?tr=w-1200",
    },
    {
      title: "Sofas & Seating",
      description:
        "Comfortable and stylish sofas, sectionals, and living room seating",
      features: [
        "L-Shaped Sofas",
        "Recliners",
        "Fabric & Leather",
        "Modular Designs",
      ],
      price: "₹20,000 - ₹1,20,000",
      image:
        "https://images.unsplash.com/photo-1759722668253-1767030ad9b2?fm=jpg&w=1080",
    },
    {
      title: "Modular Kitchen",
      description:
        "Modern modular kitchens designed for efficiency, style, and durability",
      features: [
        "Custom Layouts",
        "Soft-Close Cabinets",
        "Premium Hardware",
        "Easy Maintenance",
      ],
      price: "₹1,20,000 - ₹5,00,000",
      image:
        "https://images.unsplash.com/photo-1544614940-686234a602e9?fm=jpg&w=1080",
    },
    {
      title: "TV Units",
      description:
        "Stylish TV units that enhance your living room aesthetics",
      features: [
        "Wall-Mounted Units",
        "Storage Drawers",
        "Custom Finishes",
        "LED Panels",
      ],
      price: "₹18,000 - ₹90,000",
      image:
        "https://framerusercontent.com/images/osEW4PNZOf6lmRPT3yeYPuie65I.png?width=1600&height=900",
    },
    {
      title: "Study Tables",
      description:
        "Ergonomic study tables designed for productivity and comfort",
      features: [
        "Compact Designs",
        "Cable Management",
        "Built-in Storage",
        "Custom Sizes",
      ],
      price: "₹8,000 - ₹45,000",
      image:
        "https://ikiru.in/cdn/shop/products/buy-study-table-wooden-side-study-table-with-drawer-or-work-desk-for-living-room-by-the-home-dekor-on-ikiru-online-store-1.jpg?v=1739197530",
    },
    {
      title: "Dining Sets",
      description:
        "Elegant dining sets perfect for family meals and gatherings",
      features: [
        "4 & 6 Seater Options",
        "Solid Wood",
        "Modern Designs",
        "Easy Maintenance",
      ],
      price: "₹25,000 - ₹1,80,000",
      image:
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?fm=jpg&w=1080",
    },
  ];

  return (
    <div className="bg-gray-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-lg text-gray-600">
          Comprehensive furniture solutions tailored to your needs. From single
          pieces to complete home interiors, we bring your vision to life with
          quality craftsmanship.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-16">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-orange-500 text-white flex items-center justify-center rounded">
                  ★
                </div>
                <h3 className="text-orange-500 font-semibold text-lg">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">{item.description}</p>

              <strong className="text-gray-800 mb-2">Key Features</strong>
              <ul className="list-disc list-inside text-gray-700 mb-4 text-sm flex-grow">
                {item.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-orange-500 font-semibold">{item.price}</span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium 
                                   hover:bg-orange-600 hover:scale-105 transition duration-200">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-orange-500 text-white text-center rounded-xl max-w-3xl mx-auto py-12 px-6 mb-16">
        <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-lg">
          Get a personalized quote with our AI-powered assistant and see
          estimated prices instantly!
        </p>
        <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold
                           hover:bg-gray-100 hover:scale-105 transition duration-200">
          Request Free Quote
        </button>
      </div>
    </div>
  );
}
