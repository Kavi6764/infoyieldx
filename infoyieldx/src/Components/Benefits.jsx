
import { 
  Shield, 
  Plane, 
  GraduationCap, 
  Heart, 
  Home, 
  DollarSign,
  Coffee,
  Gamepad2
} from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance with 100% premium coverage",
      color: "text-blue-500"
    },
    {
      icon: Plane,
      title: "Time Off",
      description: "Unlimited PTO policy and flexible working arrangements for work-life balance",
      color: "text-green-500"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "$3,000 annual learning budget for courses, conferences, and skill development",
      color: "text-purple-500"
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-leading salaries with equity participation and performance bonuses",
      color: "text-yellow-500"
    },
    {
      icon: Home,
      title: "Remote First",
      description: "Work from anywhere with a $1,000 home office setup stipend",
      color: "text-red-500"
    },
    {
      icon: Heart,
      title: "Family Support",
      description: "Parental leave, fertility benefits, and family planning assistance",
      color: "text-pink-500"
    },
    {
      icon: Coffee,
      title: "Office Perks",
      description: "Free meals, snacks, and beverages in all our office locations",
      color: "text-orange-500"
    },
    {
      icon: Gamepad2,
      title: "Fun & Games",
      description: "Team events, game rooms, and monthly social activities",
      color: "text-indigo-500"
    }
  ];
  const scrollToJobs = () => {
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pb-20 px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4"><p className="text-center mx-auto px-2 py-2 rounded-xl bg-blue-100 text-blue-800">Benefits & Perks</p></div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">We Take Care of Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive benefits and perks designed to support your health, 
            growth, and happiness both in and out of work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 hover:bg-white shadow-lg transition-all duration-300 hover:scale-105 border border-transparent hover:border-gray-200"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-sm mb-4 ${benefit.color}`}>
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-black via-gray-950 to-slate-900 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Team?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Take the next step in your career and become part of a company that truly values its employees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToJobs} className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Browse Open Roles
              </button>
              <a href="about">
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More About Us
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
