import { motion } from "motion/react";

const images = [
  { id: "photo-1580582932707-520aed937b7b", alt: "Classroom session" },
  { id: "photo-1509062522246-3755977927d7", alt: "Students studying" },
  { id: "photo-1522202176988-66273c2fd55f", alt: "Group study" },
  { id: "photo-1571260899304-425eee4c7efc", alt: "Teacher explaining" },
  { id: "photo-1503676260728-1c00da094a0b", alt: "Library reading" },
  { id: "photo-1427504494785-3a9ca7044f45", alt: "Student writing" },
  { id: "photo-1516321318423-f06f85e504b3", alt: "Online learning" },
  { id: "photo-1531482615713-2afd69097998", alt: "Whiteboard lecture" },
  { id: "photo-1523240795612-9a054b0db644", alt: "Study group" },
];

export default function Gallery() {
  return (
    <div>
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Gallery
          </h1>
          <p className="text-blue-200">
            A glimpse into life at AIMERS GROUP TUITION
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group overflow-hidden rounded-xl border border-[#E6EAF1] shadow-card"
              >
                <img
                  src={`https://images.unsplash.com/${img.id}?w=600`}
                  alt={img.alt}
                  data-ocid={`gallery.item.${i + 1}`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
