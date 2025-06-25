
import { Heart, Zap, Target, Users } from "lucide-react";

const CompanyCulture = () => {
  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We believe our people are our greatest asset. We invest in their growth, well-being, and success.",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We encourage creative thinking and bold ideas that push the boundaries of what's possible.",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to customer experience.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work together as one team, sharing knowledge and supporting each other's success.",
      color: "text-green-500"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className=" mb-4 flex justify-center"><p className="bg-blue-100 text-blue-800 border-blue-200 px-2 py-1 rounded-lg">Our Culture</p></div>
          <h2 className="md:text-4xl  text-xl font-bold text-gray-900 mb-4">What We Believe In</h2>
          <p className="md:text-xl text-md text-gray-600 max-w-3xl mx-auto">
            Our values guide everything we do, from how we build products to how we treat each other. 
            Join a culture that celebrates diversity, innovation, and personal growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${value.color}`}>
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg p-8 shadow-xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Employee Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
              <div className="text-gray-600">Glassdoor Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCulture;
