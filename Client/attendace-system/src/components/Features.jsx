import React, { useRef } from "react";
import useIsVisble from "../Hook/useIsVisble";
import { Opacity } from "@tsparticles/engine";

const features = [
  {
    title: "🤖 AI-Powered Facial Recognition",
    description:
      "Using advanced face recognition powered by TensorFlow.js, students simply scan their faces using a webcam — no ID cards, no signatures, no PINs. This contactless system eliminates queues and reduces friction in classrooms, creating a seamless and futuristic check-in experience.",
  },
  {
    title: "⏱️ Time-Efficient for Lecturers",
    description:
      "Lecturers don't need to call out names or check registers. With a single click, they can start or end the attendance session, and the system automatically captures and logs all present students — saving valuable lecture time.",
  },
  {
    title: "🔐 Secure & Accurate",
    description:
      "Each face is uniquely encoded and matched with high accuracy, ensuring that only the registered student can mark themselves present. This removes impersonation and keeps records trustworthy.",
  },
  {
    title: "📊 Real-Time Reports",
    description:
      "Lecturers can instantly view who attended, when they checked in, and access summary reports across sessions or semesters — all exportable and neatly organized.",
  },
];

const Features = () => {
    const ref1 = useRef()
    const isVisible1 = useIsVisble(ref1)
  return (
    <div className="bg-[#00294f] py-16 px-6 md:px-16 text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Powerful Features Built for the Future
      </h2>

      <div ref={ref1}  className={`grid gap-10 md:grid-cols-2 transition-opacity ease-in duration-700 ${isVisible1 ? "opacity-100":"opacity-0"}`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#061c33] p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
