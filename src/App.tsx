import {SearchField} from "@/components/elements/search-field/SearchField.tsx";
import {Play} from "lucide-react";
import {TRACKS} from "@/data/tracks.data.ts";
import {Track} from "@/components/elements/track-item/Track.tsx";
import {useQueryState} from "nuqs";
import {useMemo} from "react";

function App() {
    const [searchTerm, setSearchTerm] = useQueryState('q');

    const filteredTracks = useMemo(() => {
        if (!searchTerm) return TRACKS

        return TRACKS.filter(track => track.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    }, [searchTerm]);

  return (
      <div>
          <SearchField
              value={searchTerm || ''}
              onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="relative">
              <img src="/banner.png" alt="" className="rounded-xl" />

              <div className="flex items-center justify-between absolute
              bottom-layout left-0 w-full px-layout">
                  <div>
                      <h1 className='text-2xl font-semibold mb-[0.18rem] text-white'>Aerosmith</h1>
                      <h2 className='text-primary font-medium'>25.6m Listeners</h2>
                  </div>

                  <button className="cursor-pointer rounded-full bg-gradient-to-r from-[#2F3034] to-[#1F2026]
                  p-5 border-player-bg border-solid duration-300 hover:translate-y-[-2px] hover:shadow">
                      <Play className="text-primary" fill="var(--color-primary)" />
                  </button>
              </div>
          </div>

          <div>
              {filteredTracks.map(track => (
                  <Track key={track.id} track={track} />
              ))}
          </div>

      </div>
  )
}

export default App;
