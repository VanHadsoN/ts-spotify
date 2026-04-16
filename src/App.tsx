import './App.css'
import {SearchField} from "@/components/elements/search-field/SearchField.tsx";
import {Play} from "lucide-react";

function App() {
  return (
      <div className="relative">
          <SearchField />
          <div>
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
      </div>
  )
}

export default App
