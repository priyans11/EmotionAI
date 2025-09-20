import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Get in Touch</span>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent transition-all duration-500 group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300">
                Contact Us
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-32 transition-all duration-500"></div>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6 max-w-3xl mx-auto">
              Connect with the University Institute of Engineering and Technology
            </p>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Details Card */}
          <div className="group relative">
            <div className="relative rounded-3xl border border-white/10 p-1 transition-all duration-500 hover:border-white/20 group-hover:scale-[1.02]">
              <GlowingEffect
                spread={80}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative h-full rounded-2xl bg-black backdrop-blur-sm p-8 transition-all duration-500 border border-white/5">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-light bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      University Details
                    </h2>
                  </div>

                  <ContactInfoItem
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                    title="Institution"
                    content="University Institute of Engineering and Technology"
                    color="cyan"
                  />

                  <ContactInfoItem
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    title="Address"
                    content={
                      <div>
                        <div>Sector 25, South Campus</div>
                        <div>Panjab University</div>
                        <div>Chandigarh (Union Territory), INDIA</div>
                        <div className="font-medium text-blue-300">PINCODE: 160014</div>
                      </div>
                    }
                    color="blue"
                  />

                  <ContactInfoItem
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                    title="Contact Number"
                    content={
                      <a
                        href="tel:01722541242"
                        className="text-purple-300 hover:text-purple-200 transition-colors duration-300 hover:underline"
                      >
                        0172-2541242
                      </a>
                    }
                    color="purple"
                  />

                  <ContactInfoItem
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                    title="Email"
                    content={
                      <a
                        href="mailto:directoruiet@pu.ac.in"
                        className="text-green-300 hover:text-green-200 transition-colors duration-300 hover:underline"
                      >
                        directoruiet@pu.ac.in
                      </a>
                    }
                    color="green"
                  />

                  <ContactInfoItem
                    icon={
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                      </svg>
                    }
                    title="Website"
                    content={
                      <a
                        href="http://uiet.puchd.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-300 hover:text-orange-200 transition-colors duration-300 hover:underline"
                      >
                        uiet.puchd.ac.in
                      </a>
                    }
                    color="orange"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="group relative">
            <div className="relative rounded-3xl border border-white/10 p-1 transition-all duration-500 hover:border-white/20 group-hover:scale-[1.02]">
              <GlowingEffect
                spread={80}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative h-full rounded-2xl bg-black backdrop-blur-sm p-8 transition-all duration-500 border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-light bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Find Us
                  </h2>
                </div>

                <div className="relative h-96 rounded-xl overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.1966!2d76.7695!3d30.7671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sUniversity%20Institute%20of%20Engineering%20%26%20Technology%2C%20Panjab%20University!5e0!3m2!1sen!2sin!4v1693123456789!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl pointer-events-none"></div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 mb-6">
                  <MetricCard
                    icon={<LocationIcon />}
                    value="Sector 25"
                    label="South Campus"
                    color="orange"
                  />
                  <MetricCard
                    icon={<PhoneIcon />}
                    value="0172-2541242"
                    label="Direct Line"
                    color="red"
                  />
                </div>

                {/* Quick Actions under map */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <PremiumButton 
                    primary
                    onClick={() => window.location.href = 'mailto:directoruiet@pu.ac.in'}
                  >
                    Send Email
                  </PremiumButton>
                  <PremiumButton onClick={() => window.location.href = 'tel:01722541242'}>
                    Call Now
                  </PremiumButton>
                  <PremiumButton onClick={() => window.open('http://uiet.puchd.ac.in/', '_blank')}>
                    Visit Website
                  </PremiumButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Important Contacts */}
        <div className="flex justify-center mt-16">
          <PremiumButton
            onClick={() => window.open('http://uiet.puchd.ac.in/', '_blank')}
            primary
          >
            Click here for more important Contacts
          </PremiumButton>
        </div>
      </div>
    </div>
  );
};

// Contact Info Item Component
interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  color: "cyan" | "blue" | "purple" | "green" | "orange";
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content, color }) => {
  const colorClasses = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-400/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-400/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-400/20",
    green: "text-green-400 bg-green-500/10 border-green-400/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-400/20",
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/5">
      <div className={cn("p-2 rounded-lg", colorClasses[color])}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <div className="text-gray-300">{content}</div>
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: "orange" | "red";
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => {
  const colorClasses = {
    orange: "bg-orange-500/10 border-orange-400/20 text-orange-300 hover:bg-orange-500/20",
    red: "bg-red-500/10 border-red-400/20 text-red-300 hover:bg-red-500/20",
  };

  return (
    <div className={cn(
      "group flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer",
      colorClasses[color]
    )}>
      <div className="text-xl">{icon}</div>
      <div>
        <div className="text-sm font-bold">{value}</div>
        <div className="text-xs font-medium opacity-80">{label}</div>
      </div>
    </div>
  );
};

// Premium Button Component
interface PremiumButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ children, primary = false, onClick }) => {
  const baseClasses = "relative group font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer border rounded-lg overflow-hidden px-6 py-3 text-base";
  const colorClasses = primary
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-cyan-500/15"
    : "bg-transparent text-gray-300 border-white/20 hover:bg-white/5 hover:border-white/30 hover:text-white";

  return (
    <button className={cn(baseClasses, colorClasses)} onClick={onClick}>
      <span className="relative z-10">{children}</span>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
};

// Icons
const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default Contact;
