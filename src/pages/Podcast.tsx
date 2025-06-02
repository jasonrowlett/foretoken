import { Headphones, Play, PlayCircle, ExternalLink, Calendar, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  duration?: string;
  audioUrl?: string;
  link?: string;
}

interface PodcastFeed {
  title: string;
  description: string;
  image?: string;
  episodes: PodcastEpisode[];
}

const Podcast = () => {
  const { data: foretokenPodcast, isLoading: foretokenLoading } = useQuery<PodcastFeed>({
    queryKey: ["/api/podcast/foretoken"],
  });

  const { data: rowlettPodcast, isLoading: rowlettLoading } = useQuery<PodcastFeed>({
    queryKey: ["/api/podcast/rowlett"],
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return '';
    // Convert seconds to minutes if it's in seconds format
    if (duration.match(/^\d+$/)) {
      const minutes = Math.floor(parseInt(duration) / 60);
      return `${minutes} min`;
    }
    return duration;
  };

  const allEpisodes = [
    ...(foretokenPodcast?.episodes.map(ep => ({ ...ep, podcastName: foretokenPodcast.title })) || []),
    ...(rowlettPodcast?.episodes.map(ep => ({ ...ep, podcastName: rowlettPodcast.title })) || [])
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 10);

  type ExtendedEpisode = PodcastEpisode & { podcastName: string };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Podcasts</h1>
          <p className="text-xl text-gray-300">Listen to expert insights on tokenized finance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Foretoken Podcast */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
            {foretokenLoading ? (
              <div className="flex items-center justify-center h-48 bg-gray-800 rounded-xl mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              </div>
            ) : (
              <img 
                src={foretokenPodcast?.image || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"} 
                alt="Foretoken Podcast artwork" 
                className="w-full h-48 object-cover rounded-xl mb-6" 
              />
            )}
            <h2 className="text-3xl font-bold mb-4 text-purple-500">
              {foretokenPodcast?.title || "Foretoken Podcast"}
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {foretokenPodcast?.description || "Loading podcast description..."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://open.spotify.com/show/1234567890" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Listen on Spotify
              </a>
              <a 
                href="https://podcasts.apple.com/podcast/id1234567890" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Listen on Apple
              </a>
            </div>
          </div>

          {/* The Rowlett Report */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
            {rowlettLoading ? (
              <div className="flex items-center justify-center h-48 bg-gray-800 rounded-xl mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              </div>
            ) : (
              <img 
                src={rowlettPodcast?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"} 
                alt="The Rowlett Report podcast artwork" 
                className="w-full h-48 object-cover rounded-xl mb-6" 
              />
            )}
            <h2 className="text-3xl font-bold mb-4 text-purple-500">
              {rowlettPodcast?.title || "The Rowlett Report"}
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {rowlettPodcast?.description || "Loading podcast description..."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://open.spotify.com/show/0987654321" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Listen on Spotify
              </a>
              <a 
                href="https://podcasts.apple.com/podcast/id0987654321" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Listen on Apple
              </a>
            </div>
          </div>
        </div>

        {/* Recent Episodes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Episodes</h2>
          {(foretokenLoading || rowlettLoading) ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <div className="space-y-6">
              {allEpisodes.map((episode) => (
                <div 
                  key={episode.id}
                  className="bg-gray-900/30 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                      <div className="flex items-center gap-2 text-gray-400 mb-2 flex-wrap">
                        <span className="text-purple-400">{episode.podcastName}</span>
                        {episode.pubDate && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(episode.pubDate)}</span>
                            </div>
                          </>
                        )}
                        {episode.duration && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDuration(episode.duration)}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-gray-300 line-clamp-3">{episode.description}</p>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      {episode.audioUrl && (
                        <a
                          href={episode.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-500 hover:text-purple-400 transition-colors"
                          title="Play audio"
                        >
                          <PlayCircle className="w-8 h-8" />
                        </a>
                      )}
                      {episode.link && (
                        <a
                          href={episode.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300 transition-colors"
                          title="View episode"
                        >
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {allEpisodes.length === 0 && !foretokenLoading && !rowlettLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No episodes available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Podcast;
