'use client'

import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, Shuffle, Repeat, Menu, Home, Search, Library, Plus, Music } from 'lucide-react'

// Dados de exemplo das músicas
const playlists = [
  {
    id: 1,
    name: 'Minhas Favoritas',
    songs: [
      { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop' },
      { id: 2, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
      { id: 3, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop' },
    ]
  },
  {
    id: 2,
    name: 'Chill Vibes',
    songs: [
      { id: 4, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop' },
      { id: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop' },
    ]
  },
  {
    id: 3,
    name: 'Workout Mix',
    songs: [
      { id: 6, title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: '3:18', cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop' },
      { id: 7, title: 'Montero', artist: 'Lil Nas X', album: 'Montero', duration: '2:17', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
    ]
  }
]

export default function MusicPlayer() {
  const [isDark, setIsDark] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(playlists[0].songs[0])
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [likedSongs, setLikedSongs] = useState<number[]>([1])
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const [volume, setVolume] = useState(70)
  const [progress, setProgress] = useState(45)

  const togglePlay = () => setIsPlaying(!isPlaying)
  
  const toggleLike = () => {
    if (likedSongs.includes(currentSong.id)) {
      setLikedSongs(likedSongs.filter(id => id !== currentSong.id))
    } else {
      setLikedSongs([...likedSongs, currentSong.id])
    }
  }

  const playNext = () => {
    const currentIndex = selectedPlaylist.songs.findIndex(s => s.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % selectedPlaylist.songs.length
    setCurrentSong(selectedPlaylist.songs[nextIndex])
    setIsPlaying(true)
  }

  const playPrevious = () => {
    const currentIndex = selectedPlaylist.songs.findIndex(s => s.id === currentSong.id)
    const prevIndex = currentIndex === 0 ? selectedPlaylist.songs.length - 1 : currentIndex - 1
    setCurrentSong(selectedPlaylist.songs[prevIndex])
    setIsPlaying(true)
  }

  const selectSong = (song: typeof currentSong) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const toggleRepeat = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one']
    const currentIndex = modes.indexOf(repeatMode)
    setRepeatMode(modes[(currentIndex + 1) % modes.length])
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex h-screen bg-black text-white overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:flex-col w-64 bg-black border-r border-white/10 p-6">
          <div className="flex items-center gap-2 mb-8">
            <Music className="w-8 h-8 text-emerald-500" />
            <h1 className="text-2xl font-bold">VibeMusic</h1>
          </div>

          <nav className="space-y-4 mb-8">
            <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full">
              <Home className="w-5 h-5" />
              <span>Início</span>
            </button>
            <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full">
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>
            <button className="flex items-center gap-3 text-white font-semibold w-full">
              <Library className="w-5 h-5" />
              <span>Sua Biblioteca</span>
            </button>
          </nav>

          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400">PLAYLISTS</h2>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => setSelectedPlaylist(playlist)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedPlaylist.id === playlist.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Sidebar Mobile - Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/80" onClick={() => setIsSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 p-6">
              <div className="flex items-center gap-2 mb-8">
                <Music className="w-8 h-8 text-emerald-500" />
                <h1 className="text-2xl font-bold">VibeMusic</h1>
              </div>

              <nav className="space-y-4 mb-8">
                <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full">
                  <Home className="w-5 h-5" />
                  <span>Início</span>
                </button>
                <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full">
                  <Search className="w-5 h-5" />
                  <span>Buscar</span>
                </button>
                <button className="flex items-center gap-3 text-white font-semibold w-full">
                  <Library className="w-5 h-5" />
                  <span>Sua Biblioteca</span>
                </button>
              </nav>

              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      setSelectedPlaylist(playlist)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedPlaylist.id === playlist.id
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl md:text-2xl font-bold">{selectedPlaylist.name}</h2>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm"
            >
              {isDark ? '☀️ Claro' : '🌙 Escuro'}
            </button>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {/* Now Playing - Large Card */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="w-48 h-48 md:w-64 md:h-64 rounded-xl shadow-2xl object-cover"
                />
                
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm text-gray-400 mb-2">TOCANDO AGORA</p>
                  <h1 className="text-3xl md:text-5xl font-bold mb-3">{currentSong.title}</h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-6">{currentSong.artist}</p>
                  <p className="text-sm text-gray-400">{currentSong.album}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <span>1:32</span>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span>{currentSong.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist Songs */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-400">Músicas da Playlist</h3>
              {selectedPlaylist.songs.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => selectSong(song)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-white/10 ${
                    currentSong.id === song.id ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="text-gray-400 w-6 text-center">{index + 1}</span>
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${currentSong.id === song.id ? 'text-emerald-500' : ''}`}>
                      {song.title}
                    </p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                  <span className="text-sm text-gray-400">{song.duration}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Player Controls - Fixed Bottom */}
          <div className="border-t border-white/10 bg-black/95 backdrop-blur-lg p-4">
            <div className="max-w-4xl mx-auto">
              {/* Controls */}
              <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`transition-colors ${isShuffled ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}
                >
                  <Shuffle className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                
                <button
                  onClick={playPrevious}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black hover:scale-105 transition-transform flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" />
                  )}
                </button>
                
                <button
                  onClick={playNext}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <button
                  onClick={toggleRepeat}
                  className={`transition-colors ${repeatMode !== 'off' ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}
                >
                  <Repeat className="w-4 h-4 md:w-5 md:h-5" />
                  {repeatMode === 'one' && <span className="text-xs">1</span>}
                </button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleLike}
                  className={`transition-colors ${
                    likedSongs.includes(currentSong.id) ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedSongs.includes(currentSong.id) ? 'fill-current' : ''}`} />
                </button>

                <div className="hidden md:flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 accent-emerald-500"
                  />
                  <span className="text-xs text-gray-400 w-8">{volume}%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
