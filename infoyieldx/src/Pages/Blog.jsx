import React, { useState } from "react";
import { Calendar, User, ArrowRight, Clock, Search } from "lucide-react";
import { motion } from "framer-motion";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll ,setShowAll] = useState(false)

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt:
        "Explore the latest trends in web development including AI integration, serverless architecture, and progressive web apps that are shaping the industry.",
      author: "InfoYieldX Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Oracle EBS Migration: Best Practices and Common Pitfalls",
      excerpt:
        "Learn essential strategies for successful Oracle E-Business Suite migration, including planning, testing, and post-migration optimization techniques.",
      author: "InfoYieldX Team",
      date: "December 12, 2024",
      readTime: "8 min read",
      category: "Oracle EBS",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Mobile App Security: Protecting Your Business and Users",
      excerpt:
        "Discover essential mobile app security practices to protect sensitive data and maintain user trust in an increasingly connected world.",
      author: "InfoYieldX Team",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Database Optimization Techniques for Enterprise Applications",
      excerpt:
        "Master advanced database optimization strategies to improve performance, reduce costs, and ensure scalability for enterprise-level applications.",
      author: "InfoYieldX Team",
      date: "December 8, 2024",
      readTime: "7 min read",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop",
    },
    {
      id: 5,
      title:
        "Streamlining Financial Processes with Digital Accounting Solutions",
      excerpt:
        "How modern accounting software and automation can transform your financial operations and improve accuracy while reducing manual work.",
      author: "InfoYieldX Team",
      date: "December 5, 2024",
      readTime: "4 min read",
      category: "Accounting",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
    },
    {
      id: 6,
      title:
        "Building Scalable React Applications: Architecture Best Practices",
      excerpt:
        "Learn how to structure React applications for maximum scalability, maintainability, and performance in enterprise environments.",
      author: "InfoYieldX Team",
      date: "December 3, 2024",
      readTime: "9 min read",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    },
    {
      id: 7,
      title: "Cross-Platform Mobile Development: React Native vs Flutter",
      excerpt:
        "A comprehensive comparison of React Native and Flutter for enterprise mobile app development, including performance, cost, and maintenance considerations.",
      author: "InfoYieldX Team",
      date: "December 1, 2024",
      readTime: "12 min read",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
    },
    {
      id: 8,
      title: "Oracle EBS Performance Tuning: Advanced Optimization Strategies",
      excerpt:
        "Deep dive into Oracle EBS performance optimization including SQL tuning, concurrent programs optimization, and system configuration best practices.",
      author: "InfoYieldX Team",
      date: "November 28, 2024",
      readTime: "11 min read",
      category: "Oracle EBS",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    },
    {
      id: 9,
      title: "Cloud Migration for Accounting Systems: A Complete Guide",
      excerpt:
        "Everything you need to know about migrating your accounting systems to the cloud, including security considerations, compliance, and cost optimization.",
      author: "InfoYieldX Team",
      date: "November 25, 2024",
      readTime: "10 min read",
      category: "Accounting",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
    },
    {
      id: 10,
      title: "Big Data Analytics: Transforming Raw Data into Business Insights",
      excerpt:
        "Explore how big data analytics can revolutionize your business intelligence, from data collection and processing to actionable insights and decision-making.",
      author: "InfoYieldX Team",
      date: "November 22, 2024",
      readTime: "8 min read",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    },
    {
      id: 11,
      title: "Progressive Web Apps: The Future of Web and Mobile Convergence",
      excerpt:
        "Discover how PWAs combine the best of web and mobile apps, offering offline functionality, push notifications, and native-like performance.",
      author: "InfoYieldX Team",
      date: "November 20, 2024",
      readTime: "7 min read",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop",
    },
    {
      id: 12,
      title: "API-First Development: Building Scalable Backend Architectures",
      excerpt:
        "Learn why API-first development is crucial for modern applications and how to design robust, scalable APIs that support multiple client applications.",
      author: "InfoYieldX Team",
      date: "November 18, 2024",
      readTime: "6 min read",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
    },
    {
      id: 13,
      title:
        "Mobile App User Experience: Design Principles That Drive Engagement",
      excerpt:
        "Essential UX principles for mobile app design that increase user engagement, retention, and conversion rates in today's competitive mobile landscape.",
      author: "InfoYieldX Team",
      date: "November 15, 2024",
      readTime: "5 min read",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=500&h=300&fit=crop",
    },
    {
      id: 14,
      title:
        "Oracle EBS Integration: Connecting Legacy Systems with Modern Applications",
      excerpt:
        "Best practices for integrating Oracle EBS with modern cloud applications, APIs, and third-party systems while maintaining data integrity and security.",
      author: "InfoYieldX Team",
      date: "November 12, 2024",
      readTime: "9 min read",
      category: "Oracle EBS",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    },
    {
      id: 15,
      title: "Automated Financial Reporting: Reducing Errors and Saving Time",
      excerpt:
        "How automation in financial reporting can eliminate manual errors, ensure compliance, and provide real-time insights for better business decisions.",
      author: "InfoYieldX Team",
      date: "November 10, 2024",
      readTime: "6 min read",
      category: "Accounting",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    },
  ];

  const categories = [
    "All",
    "Web Development",
    "Oracle EBS",
    "Mobile Development",
    "Database",
    "Accounting",
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "bg-blue-100 text-blue-800",
      "Oracle EBS": "bg-orange-100 text-orange-800",
      "Mobile Development": "bg-green-100 text-green-800",
      Database: "bg-purple-100 text-purple-800",
      Accounting: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };
   const showAllBlogs = showAll ? blogPosts.length + 1 : 3;
  
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F4ecfe]/20">
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="md:text-7xl font-bold text-[#0e3f18] mb-4 text-3xl pb-8">
              Latest Insights & Expertise
            </h2>
            <p className="md:text-xl text-md text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, best practices, and insights
              from the world of technology and business solutions.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <section className="py-8 px-4 bg-[#E66c32]/10 rounded-xl my-8">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                  <input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-2 w-full outline-none border rounded-md"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer bg-white p-2 text-xs shadow-md rounded-xl transition-all duration-300 hover:bg-[#0E3F18] hover:text-white hover:-translate-y-2 ${
                        selectedCategory === category
                          ? "bg-black text-blue-900"
                          : ""
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Cards */}
          <h2 className="text-3xl font-bold text-center py-10 text-[#385A42]">
            Latest Articles
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.splice(0,showAllBlogs).map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 transition-transform duration-300 group-hover:scale-105">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                        post.category
                      )} transition-all duration-300`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-all duration-300 hover:translate-x-1 group/button">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8" onClick={()=>setShowAll(!showAll)}>
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                {showAll ? "View Less Articles" :"View All Articles"}
              </button>
              {/* <button className="border-2  text-black px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                Subscribe to Newsletter
              </button> */}
            </div>
            <p className="text-gray-600 text-sm">
              Join 500+ professionals who get our weekly insights delivered to
              their inbox
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
