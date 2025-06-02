import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Users } from "lucide-react";

export default function Connect() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Connect with Jason Rowlett
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leverage Jason's expertise in RWA tokenization, regulatory strategy, and crypto market insights. 
            Whether you need a compelling speaker for your event or strategic consulting for your project, 
            Jason brings deep knowledge and practical experience to every engagement.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Speaker Booking Card */}
          <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Mic className="w-8 h-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-white">Speaker Booking</CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Book Jason for conferences, panels, and executive briefings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300 space-y-2">
                <p>• RWA tokenization insights</p>
                <p>• Regulatory compliance strategies</p>
                <p>• Crypto adoption trends</p>
                <p>• Market analysis and forecasts</p>
              </div>
              <div className="pt-4">
                <Link href="/connect/speaker-booking">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                    Book Jason as a Speaker
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Consulting Card */}
          <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white">Consulting Services</CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Strategic advisory for tokenization and regulatory projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300 space-y-2">
                <p>• MiCA compliance strategy</p>
                <p>• DORA regulation preparation</p>
                <p>• RWA tokenization launch</p>
                <p>• Investor education programs</p>
              </div>
              <div className="pt-4">
                <Link href="/connect/consulting">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                    Request Consulting Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Jason Section */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center">About Jason Rowlett</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Jason is a recognized expert at the intersection of traditional finance and digital assets, 
            with deep expertise in European regulatory frameworks including MiCA and DORA. As the host 
            of the Foretoken podcast and creator of comprehensive RWA educational content, Jason brings 
            both theoretical knowledge and practical implementation experience to every engagement.
          </p>
        </div>
      </div>
    </div>
  );
}