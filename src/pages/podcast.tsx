import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { FaSpotify, FaApple } from "react-icons/fa";
import { SiIheartradio } from "react-icons/si";

// Import podcast images
const ForetokenNewswireImg = "/assets/Foretoken_Newswire_1750868888898-GHymnjxm.png";
const AfricaRWAImg = "/assets/Africa_RWA_Report_1750868888897-DOR5F7C1.png";
const AsiaRWAImg = "/assets/Asia_RWA_Report_1750868888898-CA2ZaAbr.png";
const EuropeRWAImg = "/assets/Europe_RWA_Report_1750868888898-C-XgnGpU.png";
const AmericasRWAImg = "/assets/The_Americas_RWA_Report_1750868888897-DG5fISy9.png";

export default function Podcast() {
  const podcasts = [
    {
      id: "foretoken-newswire",
      title: "Foretoken Newswire",
      image: ForetokenNewswireImg,
      embedSrc: "https://embed.acast.com/682b9cacbc0e758152321dec?feed=true",
      description: "Stay ahead of the tokenization curve with breaking news, market analysis, and insider insights from the world of real-world asset tokenization.",
      links: {
        apple: "https://podcasts.apple.com/us/podcast/foretoken-newswire/id1822379157",
        spotify: "https://open.spotify.com/show/1OJbSDAJftc164PE5la9wz?si=bd00e9127cd24fea",
        iheart: "https://iheart.com/podcast/282587964/"
      }
    },
    {
      id: "africa-rwa",
      title: "Africa RWA Report",
      image: AfricaRWAImg,
      embedSrc: "https://embed.acast.com/6858baf0cb9b8b85b9903735?feed=true",
      description: "Explore the emerging tokenization landscape across African markets, from real estate to commodities and infrastructure development.",
      links: {
        apple: "https://podcasts.apple.com/us/podcast/africa-rwa-report/id1822383433",
        spotify: "https://open.spotify.com/show/5uHVJ6Gl8vdRAPArG3vZiq?si=a6e4d140ba3e4327",
        iheart: "https://iheart.com/podcast/282760688/"
      }
    },
    {
      id: "asia-rwa",
      title: "Asia RWA Report",
      image: AsiaRWAImg,
      embedSrc: "https://embed.acast.com/6858bdc0cb9b8b85b991152f?feed=true",
      description: "Deep dive into Asia-Pacific tokenization trends, regulatory developments, and investment opportunities across the region.",
      links: {
        apple: "https://podcasts.apple.com/us/podcast/asia-rwa-report/id1822383900",
        spotify: "https://open.spotify.com/show/1fEQFWSgR43lKlOEs0VwKB?si=2c7a9974b2c441a3",
        iheart: "https://iheart.com/podcast/282587952/"
      }
    },
    {
      id: "europe-rwa",
      title: "Europe RWA Report",
      image: EuropeRWAImg,
      embedSrc: "https://embed.acast.com/6858bcfdcb9b8b85b990ed04?feed=true",
      description: "Navigate European tokenization regulations, market developments, and institutional adoption across the continent.",
      links: {
        apple: "https://podcasts.apple.com/us/podcast/europe-rwa-report/id1822384288",
        spotify: "https://open.spotify.com/show/0Kwo4srhm08XsbPXfEtnof?si=b839fa9d3dbc47e4",
        iheart: "https://iheart.com/podcast/282587955/"
      }
    },
    {
      id: "americas-rwa",
      title: "The Americas RWA Report",
      image: AmericasRWAImg,
      embedSrc: "https://embed.acast.com/6858be98dc316de3df2586e0?feed=true",
      description: "Comprehensive coverage of tokenization initiatives across North and South America, from policy to practice.",
      links: {
        apple: "https://podcasts.apple.com/us/podcast/the-americas-rwa-report/id1822378526",
        spotify: "https://open.spotify.com/show/3Qzh5jUks4Lj73P3y7X6WV?si=3947267a63ea400e",
        iheart: "https://iheart.com/podcast/282587974/"
      }
    }
  ];

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-notable text-6xl text-white mb-6">FORETOKEN SIGNAL NETWORK</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your global intelligence network for real-world asset tokenization. Regional reports and breaking news from every corner of the tokenization ecosystem.
          </p>
        </div>

        {/* Featured Podcast - Foretoken Newswire */}
        <div className="mb-20">
          <Card className="data-card glow-effect">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src={ForetokenNewswireImg} 
                    alt="Foretoken Newswire"
                    className="w-full max-w-md rounded-lg mx-auto"
                  />
                </div>
                <div>
                  <h2 className="font-notable text-3xl text-white mb-4">FORETOKEN NEWSWIRE</h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    Stay ahead of the tokenization curve with breaking news, market analysis, and insider insights from the world of real-world asset tokenization.
                  </p>
                  
                  {/* Streaming Links */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Button 
                      asChild
                      className="neon-glow bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                    >
                      <a href="https://open.spotify.com/show/1OJbSDAJftc164PE5la9wz?si=bd00e9127cd24fea" target="_blank" rel="noopener noreferrer">
                        <FaSpotify size={16} />
                        Spotify
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="secondary"
                      className="neon-glow bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2"
                    >
                      <a href="https://podcasts.apple.com/us/podcast/foretoken-newswire/id1822379157" target="_blank" rel="noopener noreferrer">
                        <FaApple size={16} />
                        Apple
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="neon-glow border-red-500 text-red-400 hover:bg-red-500 hover:text-white flex items-center gap-2"
                    >
                      <a href="https://iheart.com/podcast/282587964/" target="_blank" rel="noopener noreferrer">
                        <SiIheartradio size={16} />
                        iHeart
                      </a>
                    </Button>
                  </div>

                  {/* Embedded Player */}
                  <div className="rounded-lg overflow-hidden">
                    <iframe 
                      src="https://embed.acast.com/682b9cacbc0e758152321dec?feed=true" 
                      frameBorder="0" 
                      width="100%" 
                      height="400px"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Reports */}
        <div className="mb-12">
          <h2 className="font-notable text-4xl text-white text-center mb-4">REGIONAL REPORTS</h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            In-depth analysis from every major tokenization market worldwide
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {podcasts.slice(1).map((podcast) => (
              <Card key={podcast.id} className="data-card hover:glow-effect transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img 
                      src={podcast.image} 
                      alt={podcast.title}
                      className="w-48 h-48 rounded-lg mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-notable text-2xl text-white mb-3">{podcast.title.toUpperCase()}</h3>
                    <p className="text-gray-300 mb-6">
                      {podcast.description}
                    </p>
                  </div>

                  {/* Streaming Links */}
                  <div className="flex justify-center gap-3 mb-6">
                    <Button 
                      asChild
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      <a href={podcast.links.spotify} target="_blank" rel="noopener noreferrer">
                        <FaSpotify size={14} />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      size="sm"
                      variant="secondary"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      <a href={podcast.links.apple} target="_blank" rel="noopener noreferrer">
                        <FaApple size={14} />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <a href={podcast.links.iheart} target="_blank" rel="noopener noreferrer">
                        <SiIheartradio size={14} />
                      </a>
                    </Button>
                  </div>

                  {/* Embedded Player */}
                  <div className="rounded-lg overflow-hidden">
                    <iframe 
                      src={podcast.embedSrc} 
                      frameBorder="0" 
                      width="100%" 
                      height="300px"
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}